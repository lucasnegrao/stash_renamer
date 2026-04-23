import argparse
import json
import signal
import threading
import time
from pathlib import Path
from typing import Any, Dict, Optional, Set

from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

from backend.services.graphql import GraphQLConfig, GraphQLService


class TriggeringHandler(FileSystemEventHandler):
    def __init__(self, item_id: str, event_types: Set[str], trigger_callback):
        super().__init__()
        self._item_id = item_id
        self._event_types = event_types
        self._trigger_callback = trigger_callback

    def on_modified(self, event):
        if "modified" in self._event_types:
            self._trigger_callback(self._item_id, "modified", event.src_path)

    def on_created(self, event):
        if "created" in self._event_types:
            self._trigger_callback(self._item_id, "created", event.src_path)

    def on_deleted(self, event):
        if "deleted" in self._event_types:
            self._trigger_callback(self._item_id, "deleted", event.src_path)

    def on_moved(self, event):
        if "moved" in self._event_types:
            self._trigger_callback(self._item_id, "moved", event.src_path)


class GraphQLWatchdogWorker:
    def __init__(self, runtime_dir: Path):
        self.runtime_dir = runtime_dir
        self.status_path = runtime_dir / "status.json"
        self.config_path = runtime_dir / "config.json"
        self.log_path = runtime_dir / "watchdog.log"

        self._stop_event = threading.Event()
        self._pending_event = threading.Event()
        self._lock = threading.Lock()

        config = self._load_config()
        gql_config = GraphQLConfig(
            server_url=str(config.get("server_url") or ""),
            cookie_name=str(config.get("cookie_name") or ""),
            cookie_value=str(config.get("cookie_value") or ""),
        )
        self.gql = GraphQLService(gql_config)

        raw_items = config.get("watch_items") or []
        self.watch_items: Dict[str, Dict[str, Any]] = {}
        self._last_trigger_by_item: Dict[str, float] = {}
        for item in raw_items:
            if not isinstance(item, dict):
                continue
            item_id = str(item.get("id") or "").strip()
            if not item_id:
                continue
            self.watch_items[item_id] = item
            self._last_trigger_by_item[item_id] = 0.0

        self.observer: Optional[Observer] = None

    def run(self) -> None:
        self._write_status("running")
        self._log(f"watchdog worker started with {len(self.watch_items)} configs")

        self.observer = Observer()
        for item_id, item in self.watch_items.items():
            event_types = set(item.get("event_types") or ["modified"])
            handler = TriggeringHandler(item_id, event_types, self._on_fs_event)
            self.observer.schedule(
                handler,
                str(item.get("path") or ""),
                recursive=bool(item.get("recursive", True)),
            )

        self.observer.start()

        dispatch_thread = threading.Thread(target=self._dispatch_loop, daemon=True)
        dispatch_thread.start()

        while not self._stop_event.is_set():
            time.sleep(0.25)

        self._shutdown()

    def _shutdown(self) -> None:
        try:
            if self.observer:
                self.observer.stop()
                self.observer.join(timeout=3.0)
        finally:
            self._write_status("stopped")
            self._log("watchdog worker stopped")

    def _on_fs_event(self, item_id: str, event_type: str, path: str) -> None:
        with self._lock:
            self._last_trigger_by_item[item_id] = time.monotonic()
        self._pending_event.set()
        self._log(
            f"filesystem event received: config={item_id}, type={event_type}, path={path}"
        )

    def _dispatch_loop(self) -> None:
        while not self._stop_event.is_set():
            if not self._pending_event.wait(timeout=0.25):
                continue

            ready_ids = []
            with self._lock:
                now = time.monotonic()
                for item_id, last_trigger in list(self._last_trigger_by_item.items()):
                    item = self.watch_items.get(item_id) or {}
                    debounce = self._to_float(item.get("debounce_seconds"), default=1.0)
                    if last_trigger > 0 and (now - last_trigger) >= debounce:
                        ready_ids.append(item_id)

            if not ready_ids:
                time.sleep(0.1)
                continue

            for item_id in ready_ids:
                if self._stop_event.is_set():
                    break
                self._execute_item(item_id)
                with self._lock:
                    self._last_trigger_by_item[item_id] = 0.0

            with self._lock:
                if all(v <= 0 for v in self._last_trigger_by_item.values()):
                    self._pending_event.clear()

    def _execute_item(self, item_id: str) -> None:
        item = self.watch_items.get(item_id) or {}
        query = str(item.get("operation") or "").strip()
        if not query:
            self._log(f"watchdog config {item_id} has empty operation; skipping")
            return

        variables = item.get("variables") if isinstance(item.get("variables"), dict) else None
        timeout_seconds = self._to_float(item.get("request_timeout_seconds"), default=30.0)

        try:
            result = self.gql.call(query, variables=variables, timeout_seconds=timeout_seconds)
            keys = list((result or {}).keys()) if isinstance(result, dict) else []
            self._log(
                f"graphql operation executed for config={item_id}; data keys={keys}"
            )
        except Exception as exc:
            self._log(f"graphql operation failed for config={item_id}: {exc}")

    def _load_config(self) -> Dict[str, Any]:
        if not self.config_path.exists():
            raise RuntimeError(f"watchdog config file not found: {self.config_path}")
        config = json.loads(self.config_path.read_text(encoding="utf-8"))
        if not isinstance(config, dict):
            raise RuntimeError("invalid watchdog config payload")

        required = ["server_url", "cookie_name", "cookie_value", "watch_items"]
        for key in required:
            if not config.get(key):
                raise RuntimeError(f"watchdog config missing required key: {key}")
        if not isinstance(config.get("watch_items"), list):
            raise RuntimeError("watch_items must be a list")
        return config

    def _write_status(self, status: str) -> None:
        payload = {
            "status": status,
            "pid": None if status == "stopped" else os_getpid(),
            "updated_at_epoch": int(time.time()),
        }
        self.status_path.write_text(
            json.dumps(payload, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    def _log(self, message: str) -> None:
        line = f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {message}\n"
        with self.log_path.open("a", encoding="utf-8") as handle:
            handle.write(line)

    @staticmethod
    def _to_float(value: Any, default: float) -> float:
        if value is None:
            return default
        try:
            parsed = float(value)
            if parsed <= 0:
                return default
            return parsed
        except Exception:
            return default


def os_getpid() -> int:
    import os

    return os.getpid()


def main() -> None:
    parser = argparse.ArgumentParser(description="Detached watchdog worker for stash_renamer")
    parser.add_argument("--runtime-dir", required=True)
    args = parser.parse_args()

    runtime_dir = Path(args.runtime_dir).expanduser().resolve()
    runtime_dir.mkdir(parents=True, exist_ok=True)

    worker = GraphQLWatchdogWorker(runtime_dir)

    def handle_signal(_signum, _frame):
        worker._stop_event.set()

    signal.signal(signal.SIGTERM, handle_signal)
    signal.signal(signal.SIGINT, handle_signal)

    try:
        worker.run()
    except Exception as exc:
        worker._log(f"worker fatal error: {exc}")
        worker._write_status("stopped")
        raise


if __name__ == "__main__":
    main()
