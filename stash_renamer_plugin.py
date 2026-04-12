#!/usr/bin/env python3
"""Modern Stash plugin entrypoint for Scene Renamer tasks/operations."""

import json
import sys
from typing import Any, Dict, Optional

import log
import requests


def read_json_input() -> Optional[Dict[str, Any]]:
    raw = sys.stdin.read()
    if not raw:
        return None
    return json.loads(raw)


def is_true(v: Any) -> bool:
    if isinstance(v, bool):
        return v
    if v is None:
        return False
    return str(v).strip().lower() in ("true", "1", "yes", "on")


def parse_plugin_value_input(v: Any) -> Any:
    """
    Decode PluginValueInput-like payloads:
      {str|i|b|f|o|a}
    """
    if not isinstance(v, dict):
        return v
    if "str" in v:
        return v.get("str")
    if "i" in v:
        return v.get("i")
    if "b" in v:
        return v.get("b")
    if "f" in v:
        return v.get("f")
    if "o" in v:
        obj: Dict[str, Any] = {}
        for item in v.get("o") or []:
            if not isinstance(item, dict):
                continue
            key = item.get("key")
            if not key:
                continue
            obj[str(key)] = parse_plugin_value_input(item.get("value"))
        return obj
    if "a" in v:
        return [parse_plugin_value_input(item) for item in (v.get("a") or [])]
    return v


def normalize_input_args(raw_args: Any) -> Dict[str, Any]:
    """
    Accept either:
      - plain map/object
      - PluginArgInput list: [{key, value:{...}}]
    """
    if raw_args is None:
        return {}
    if isinstance(raw_args, dict):
        return raw_args
    if isinstance(raw_args, list):
        out: Dict[str, Any] = {}
        for item in raw_args:
            if not isinstance(item, dict):
                continue
            key = item.get("key")
            if not key:
                continue
            out[str(key)] = parse_plugin_value_input(item.get("value"))
        return out
    raise Exception("Expected input args to be a map/object or PluginArgInput list")


def fetch_plugin_settings(
    server_url: str,
    cookie_name: str,
    cookie_value: str,
    plugin_id: str = "stash_renamer",
) -> Dict[str, Any]:
    query = """
    query configuration($plugin_id: [ID!]) {
      configuration {
        plugins(include: $plugin_id)
      }
    }
    """
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": f"{cookie_name}={cookie_value}" if cookie_name and cookie_value else "",
    }
    try:
        resp = requests.post(
            server_url,
            json={"query": query, "variables": {"plugin_id": [plugin_id]}},
            headers=headers,
            timeout=30,
        )
        if resp.status_code != 200:
            log.LogWarning(f"Failed to load plugin settings: HTTP {resp.status_code}")
            return {}
        result = resp.json()
        if result.get("errors"):
            log.LogWarning(f"Failed to load plugin settings: {result['errors']}")
            return {}
        plugins = ((result.get("data") or {}).get("configuration") or {}).get("plugins") or {}
        cfg = plugins.get(plugin_id)
        if isinstance(cfg, str):
            try:
                cfg = json.loads(cfg)
            except Exception:
                cfg = {}
        return cfg or {}
    except Exception as e:
        log.LogWarning(f"Failed to load plugin settings: {e}")
        return {}


def normalize_options(input_data: Dict[str, Any], settings: Dict[str, Any]) -> Dict[str, Any]:
    args = normalize_input_args(input_data.get("args"))

    combined = {**settings, **args}
    mode = combined.get("mode", "")
    dry_run = is_true(combined.get("dry_run")) or str(mode).strip().lower() == "dry_run"

    filename_template = (
        combined.get("filename_template")
        or combined.get("filenameTemplate")
        or combined.get("template")
        or "$scene.studio.name - $scene.date - $scene.title"
    )
    path_template = combined.get("path_template") or combined.get("pathTemplate") or ""

    scene_filter = combined.get("scene_filter") or combined.get("sceneFilter")
    find_filter = combined.get("find_filter") or combined.get("findFilter")
    criteria = combined.get("criteria")

    if isinstance(scene_filter, str):
        try:
            scene_filter = json.loads(scene_filter)
        except Exception:
            raise Exception("scene_filter must be a JSON object")
    if isinstance(find_filter, str):
        try:
            find_filter = json.loads(find_filter)
        except Exception:
            raise Exception("find_filter must be a JSON object")
    if isinstance(criteria, str):
        try:
            criteria = json.loads(criteria)
        except Exception:
            raise Exception("criteria must be a JSON array")

    if criteria is not None:
        if not isinstance(criteria, list):
            raise Exception("criteria must be an array/list")
        criteria = [c for c in criteria if isinstance(c, dict)]
    ids = combined.get("ids")
    if isinstance(ids, str):
        ids = [s.strip() for s in ids.split(",") if s.strip()]

    scenes = combined.get("scenes")
    scenes_query = combined.get("scenes_query") or combined.get("scenesQuery")
    scenes_query_variables = combined.get("scenes_query_variables") or combined.get("scenesQueryVariables")
    scenes_query_path = combined.get("scenes_query_path") or combined.get("scenesQueryPath") or "findScenes.scenes"
    if isinstance(scenes_query_variables, str):
        try:
            scenes_query_variables = json.loads(scenes_query_variables)
        except Exception:
            raise Exception("scenes_query_variables must be a JSON object")

    undo_operation_id = combined.get("undo_operation_id") or combined.get("undoOperationId")
    list_operations = (
        str(mode).strip().lower() == "list_operations"
        or is_true(combined.get("list_operations"))
        or is_true(combined.get("listOperations"))
    )
    operations_db_path = combined.get("operations_db_path") or combined.get("operationsDbPath")

    server_conn = input_data.get("server_connection") or {}
    scheme = server_conn.get("Scheme", "http")
    host = server_conn.get("Host", "localhost")
    port = server_conn.get("Port", 9999)
    server_url = f"{scheme}://{host}:{port}/graphql"

    session_cookie = server_conn.get("SessionCookie") or {}
    cookie_name = session_cookie.get("Name", "")
    cookie_value = session_cookie.get("Value", "")

    options: Dict[str, Any] = {
        "server_url": server_url,
        "cookie_name": cookie_name,
        "cookie_value": cookie_value,
        "filename_template": filename_template,
        "dry_run": dry_run,
        "debug_mode": is_true(args.get("debugMode")) or is_true(args.get("debug")),
    }

    if path_template:
        options["path_template"] = path_template
    if operations_db_path:
        options["operations_db_path"] = operations_db_path

    if undo_operation_id:
        options["undo_operation_id"] = undo_operation_id
        return options

    if list_operations:
        options["list_operations"] = True
        return options

    if scene_filter is not None or find_filter is not None or ids is not None or criteria is not None:
        if scene_filter is not None:
            options["scene_filter"] = scene_filter
        if find_filter is not None:
            options["find_filter"] = find_filter
        if ids is not None:
            options["ids"] = ids
        if criteria is not None:
            options["criteria"] = criteria
        return options

    if scenes_query:
        options["scenes_query"] = scenes_query
        if scenes_query_variables is not None:
            options["scenes_query_variables"] = scenes_query_variables
        if scenes_query_path:
            options["scenes_query_path"] = scenes_query_path
        return options

    if scenes is not None:
        options["scenes"] = scenes
        return options

    raise Exception("Either scene filter inputs, scenes_query, or scenes must be provided")


def main() -> None:
    output: Dict[str, Any] = {}
    try:
        input_data = read_json_input()
        if not input_data:
            raise Exception("No input received from Stash")

        server_conn = input_data.get("server_connection") or {}
        scheme = server_conn.get("Scheme", "http")
        host = server_conn.get("Host", "localhost")
        port = server_conn.get("Port", 9999)
        server_url = f"{scheme}://{host}:{port}/graphql"

        session_cookie = server_conn.get("SessionCookie") or {}
        cookie_name = session_cookie.get("Name", "")
        cookie_value = session_cookie.get("Value", "")

        settings = fetch_plugin_settings(server_url, cookie_name, cookie_value)
        options = normalize_options(input_data, settings)

        from stash_renamer import run as renamer_run

        operations = renamer_run(options, collect_operations=True) or []
        output["output"] = {"operations": operations}

    except Exception as e:
        import traceback

        log.LogError(f"Error in stash_renamer_plugin: {e}")
        log.LogError(traceback.format_exc())
        output["error"] = str(e)

    print(json.dumps(output), flush=True)


if __name__ == "__main__":
    main()
