import json
import os
import signal
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

from backend.handlers.utils import to_bool
from backend.services.db_service import DBService
from backend.services.graphql import GraphQLConfig


class WatchdogService:
    def __init__(self, db_path: str, gql_config: GraphQLConfig, log_print):
        self._store = DBService(db_path)
        self._gql_config = gql_config
        self._log_print = log_print

    def run(self, options: Dict[str, Any]) -> Dict[str, Any]:
        runtime_dir = self._runtime_dir(options)
        current = self._read_status(runtime_dir)
        if current.get("status") == "running":
            return {
                "status": "running",
                "pid": current.get("pid"),
                "message": "watchdog already running; use watchdog:restart",
            }

        worker_config = self._build_worker_config()
        self._write_json(self._config_path(runtime_dir), worker_config)
        self._spawn_worker(runtime_dir)
        status = self._read_status(runtime_dir)
        return {
            "status": status.get("status", "stopped"),
            "pid": status.get("pid"),
            "enabled_configs": len(worker_config.get("watch_items") or []),
        }

    def restart(self, options: Dict[str, Any]) -> Dict[str, Any]:
        self.stop(options)
        return self.run(options)

    def stop(self, options: Dict[str, Any]) -> Dict[str, Any]:
        runtime_dir = self._runtime_dir(options)
        status = self._read_status(runtime_dir)
        pid = status.get("pid")

        if status.get("status") != "running" or not pid:
            return {
                "status": "stopped",
                "stopped": False,
                "message": "watchdog not running",
            }

        self._terminate_process(int(pid))

        timeout = time.time() + 3.0
        while time.time() < timeout:
            current = self._read_status(runtime_dir)
            if current.get("status") != "running":
                break
            time.sleep(0.1)

        current = self._read_status(runtime_dir)
        return {
            "status": current.get("status", "stopped"),
            "stopped": current.get("status") != "running",
            "pid": current.get("pid"),
        }

    def status(self, options: Dict[str, Any]) -> Dict[str, Any]:
        runtime_dir = self._runtime_dir(options)
        status = self._read_status(runtime_dir)
        watch_items = (self._read_json(self._config_path(runtime_dir)) or {}).get("watch_items")
        enabled_count = len(self._store.list_enabled_watchdog_configs())
        return {
            "status": status.get("status", "stopped"),
            "pid": status.get("pid"),
            "enabled_configs": enabled_count,
            "active_items": len(watch_items or []),
        }

    def save_config(self, options: Dict[str, Any]) -> Dict[str, Any]:
        watch_path = str(options.get("path") or "").strip()
        operation = str(options.get("operation") or "").strip()
        if not watch_path:
            raise ValueError("path is required for watchdog:save_config")
        if not operation:
            raise ValueError("operation is required for watchdog:save_config")

        watch_dir = Path(watch_path).expanduser().resolve()
        if not watch_dir.exists() or not watch_dir.is_dir():
            raise ValueError(f"path does not exist or is not a directory: {watch_path}")

        options_payload = options.get("options")
        options_json = self._normalize_options_json(options_payload)
        self._validate_config_options(options_json)

        row = self._store.save_watchdog_config(
            config_id=str(options.get("id") or "").strip() or None,
            path=str(watch_dir),
            operation=operation,
            options=options_json,
            enabled=to_bool(options.get("enabled", True)),
        )

        restarted = False
        if self.status(options).get("status") == "running":
            self.restart(options)
            restarted = True

        return {
            "config": self._row_to_response(row),
            "restarted": restarted,
        }

    def list_configs(self, options: Dict[str, Any]) -> Dict[str, Any]:
        rows = self._store.list_watchdog_configs()
        return {"configs": [self._row_to_response(row) for row in rows]}

    def close(self) -> None:
        self._store.close()

    def _build_worker_config(self) -> Dict[str, Any]:
        rows = self._store.list_enabled_watchdog_configs()
        if not rows:
            raise ValueError(
                "No enabled watchdog configs found. Save and enable at least one config first"
            )

        watch_items: List[Dict[str, Any]] = []
        for row in rows:
            parsed_options = self._parse_options_dict(str(row.get("options") or ""))
            self._validate_config_options_dict(parsed_options)

            watch_path = str(row.get("path") or "").strip()
            watch_dir = Path(watch_path).expanduser().resolve()
            if not watch_dir.exists() or not watch_dir.is_dir():
                raise ValueError(
                    f"Enabled watchdog config has invalid path ({row.get('id')}): {watch_path}"
                )

            event_types = [
                str(item or "").strip().lower()
                for item in (parsed_options.get("event_types") or ["modified"])
                if str(item or "").strip()
            ]
            operation = str(row.get("operation") or "").strip()
            if not operation:
                raise ValueError(
                    f"Enabled watchdog config has empty operation ({row.get('id')})"
                )
            watch_items.append(
                {
                    "id": str(row.get("id") or ""),
                    "path": str(watch_dir),
                    "operation": operation,
                    "variables": parsed_options.get("variables")
                    if isinstance(parsed_options.get("variables"), dict)
                    else None,
                    "recursive": bool(parsed_options.get("recursive", True)),
                    "event_types": event_types,
                    "debounce_seconds": self._to_float(
                        parsed_options.get("debounce_seconds"), default=1.0
                    ),
                    "request_timeout_seconds": self._to_float(
                        parsed_options.get("request_timeout_seconds"), default=30.0
                    ),
                }
            )

        return {
            "server_url": self._gql_config.server_url,
            "cookie_name": self._gql_config.cookie_name,
            "cookie_value": self._gql_config.cookie_value,
            "watch_items": watch_items,
        }

    @staticmethod
    def _parse_options_dict(options_json: str) -> Dict[str, Any]:
        text = str(options_json or "").strip()
        if not text:
            return {}
        try:
            payload = json.loads(text)
        except Exception as exc:
            raise ValueError(f"Invalid watchdog config options JSON: {exc}")
        if not isinstance(payload, dict):
            raise ValueError("watchdog config options must be a JSON object")
        return payload

    def _validate_config_options(self, options_json: str) -> None:
        self._validate_config_options_dict(self._parse_options_dict(options_json))

    @staticmethod
    def _validate_config_options_dict(options: Dict[str, Any]) -> None:
        raw_event_types = options.get("event_types")
        if raw_event_types is not None:
            if not isinstance(raw_event_types, list):
                raise ValueError("options.event_types must be a list")
            for event_type in raw_event_types:
                if str(event_type or "").lower() not in {
                    "modified",
                    "created",
                    "deleted",
                    "moved",
                }:
                    raise ValueError(
                        "options.event_types supports: modified, created, deleted, moved"
                    )

    @staticmethod
    def _normalize_options_json(value: Any) -> str:
        if value is None:
            return "{}"
        if isinstance(value, str):
            text = value.strip()
            if not text:
                return "{}"
            payload = json.loads(text)
            if not isinstance(payload, dict):
                raise ValueError("options must be a JSON object")
            return json.dumps(payload, ensure_ascii=False)
        if isinstance(value, dict):
            return json.dumps(value, ensure_ascii=False)
        raise ValueError("options must be an object or JSON string")

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

    def _spawn_worker(self, runtime_dir: Path) -> None:
        log_path = runtime_dir / "watchdog.log"
        python_exe = sys.executable
        cmd = [
            python_exe,
            "-m",
            "backend.services.watchdog_worker",
            "--runtime-dir",
            str(runtime_dir),
        ]

        stdout_handle = open(log_path, "a", encoding="utf-8")
        stderr_handle = open(log_path, "a", encoding="utf-8")

        try:
            if os.name == "nt":
                creation_flags = (
                    subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP
                )
                subprocess.Popen(
                    cmd,
                    stdout=stdout_handle,
                    stderr=stderr_handle,
                    stdin=subprocess.DEVNULL,
                    creationflags=creation_flags,
                    close_fds=True,
                )
            else:
                subprocess.Popen(
                    cmd,
                    stdout=stdout_handle,
                    stderr=stderr_handle,
                    stdin=subprocess.DEVNULL,
                    start_new_session=True,
                    close_fds=True,
                )
        finally:
            stdout_handle.close()
            stderr_handle.close()

        timeout = time.time() + 3.0
        while time.time() < timeout:
            status = self._read_status(runtime_dir)
            if status.get("status") == "running":
                return
            time.sleep(0.1)

    def _read_status(self, runtime_dir: Path) -> Dict[str, Any]:
        status = self._read_json(self._status_path(runtime_dir)) or {}
        pid = status.get("pid")
        if not pid:
            return {"status": "stopped", "pid": None}

        try:
            pid_int = int(pid)
        except Exception:
            return {"status": "stopped", "pid": None}

        if self._is_process_alive(pid_int):
            return {"status": "running", "pid": pid_int}

        return {"status": "stopped", "pid": None}

    @staticmethod
    def _is_process_alive(pid: int) -> bool:
        if pid <= 0:
            return False
        try:
            os.kill(pid, 0)
        except ProcessLookupError:
            return False
        except PermissionError:
            return True
        except OSError:
            return False
        return True

    @staticmethod
    def _terminate_process(pid: int) -> None:
        if pid <= 0:
            return
        if os.name == "nt":
            subprocess.run(
                ["taskkill", "/PID", str(pid), "/T", "/F"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=False,
            )
            return

        try:
            os.kill(pid, signal.SIGTERM)
        except ProcessLookupError:
            return

    @staticmethod
    def _runtime_dir(options: Dict[str, Any]) -> Path:
        raw = str(options.get("watchdog_runtime_dir") or "").strip()
        if raw:
            runtime_dir = Path(raw).expanduser().resolve()
        else:
            runtime_dir = Path(tempfile.gettempdir()) / "stash_renamer_watchdog"

        runtime_dir.mkdir(parents=True, exist_ok=True)
        return runtime_dir

    @staticmethod
    def _status_path(runtime_dir: Path) -> Path:
        return runtime_dir / "status.json"

    @staticmethod
    def _config_path(runtime_dir: Path) -> Path:
        return runtime_dir / "config.json"

    @staticmethod
    def _read_json(path: Path) -> Optional[Dict[str, Any]]:
        if not path.exists():
            return None
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            return None

    @staticmethod
    def _write_json(path: Path, payload: Dict[str, Any]) -> None:
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    @staticmethod
    def _row_to_response(row: Dict[str, Any]) -> Dict[str, Any]:
        parsed_options = {}
        raw_options = str(row.get("options") or "")
        if raw_options:
            try:
                payload = json.loads(raw_options)
                if isinstance(payload, dict):
                    parsed_options = payload
            except Exception:
                parsed_options = {}
        return {
            "id": str(row.get("id") or ""),
            "path": str(row.get("path") or ""),
            "operation": str(row.get("operation") or ""),
            "enabled": bool(row.get("enabled")),
            "options": parsed_options,
        }
