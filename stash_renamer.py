import os
import re
import sys
import json
import math
import argparse
import importlib.util
from types import SimpleNamespace
from typing import Dict, List, Optional, Tuple

import requests

BATCH_SIZE = 100

# Flags (can be overridden by CLI/interactive)
USING_LOG = True
DRY_RUN = False
FEMALE_ONLY = False
DEBUG_MODE = True
SKIP_GROUPED = False
MOVE_TO_STUDIO_FOLDER = False

IS_WINDOWS = os.name == "nt"

# Will hold server_url and api_key
CONFIG = None  # type: Optional[SimpleNamespace]


def logPrint(msg: str):
    if msg and ("[DEBUG]" not in msg or DEBUG_MODE):
        print(msg)


def sanitize_filename(name: str) -> str:
    if IS_WINDOWS:
        return re.sub(r'[\/:"*?<>|#,]+', "", name)
    name = name.replace("/", "-")
    return re.sub(r"\s{2,}", " ", name).strip()


def normalize_height(v: Optional[int]) -> str:
    if v is None:
        return ""
    try:
        iv = int(v)
    except Exception:
        return ""
    if iv == 4320:
        return "8k"
    if iv == 2160:
        return "4k"
    return f"{iv}p"


def makeFilename(scene_info: Dict[str, str], query: str) -> str:
    # Trim template
    s = str(query or "").strip()

    # Replace tokens with values or empty strings
    tokens = {
        "$date": (scene_info.get("date") or "").strip(),
        "$performer": (scene_info.get("performer") or "").strip(),
        "$title": (scene_info.get("title") or "").strip(),
        "$studio": (scene_info.get("studio") or "").strip(),
        "$height": (scene_info.get("height") or "").strip(),
    }
    for token, value in tokens.items():
        s = s.replace(token, value if value else "")

    # Remove the global hyphen normalization to avoid spacing inside dates
    # s = re.sub(r"\s*-\s*", " - ", s)

    # Collapse duplicate separators created by empty tokens
    s = re.sub(r"(?:\s*-\s*){2,}", " - ", s)

    # Remove leading/trailing separators and common punctuation left behind
    s = re.sub(r"^\s*[-–—_:|,]+\s*", "", s)
    s = re.sub(r"\s*[-–—_:|,]+\s*$", "", s)

    # Remove empty bracket-like groups that might be left
    s = re.sub(r"\[\W*\]", "", s)
    s = re.sub(r"\(\W*\)", "", s)
    s = re.sub(r"\{\W*\}", "", s)

    # Final space normalization
    s = re.sub(r"\s{2,}", " ", s).strip()
    return s


def import_config_from_path(path: str) -> Optional[SimpleNamespace]:
    if not os.path.isfile(path):
        return None
    spec = importlib.util.spec_from_file_location("stash_renamer_config", path)
    if spec and spec.loader:
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)  # type: ignore[attr-defined]
        server_url = getattr(mod, "server_url", None)
        api_key = getattr(mod, "api_key", None)
        if server_url and api_key:
            return SimpleNamespace(server_url=server_url, api_key=api_key)
    return None


def load_config_from_plugin_settings() -> Optional[SimpleNamespace]:
    """
    Load configuration from plugin settings passed via stdin.
    This is used when running as a Stash plugin.
    """
    try:
        if not sys.stdin.isatty():
            stdin_content = sys.stdin.read()
            if not stdin_content.strip():
                return None
            
            input_data = json.loads(stdin_content)
            
            # Debug: log what we received
            if DEBUG_MODE:
                logPrint(f"[DEBUG] Plugin input keys: {list(input_data.keys())}")
            
            # Method 1: Check for server_connection (Stash auto-provides this)
            server_conn = input_data.get("server_connection", {})
            if server_conn:
                scheme = server_conn.get("Scheme", "http")
                host = server_conn.get("Host", "localhost")
                port = server_conn.get("Port", 9999)
                api_key = server_conn.get("ApiKey", "")
                server_url = f"{scheme}://{host}:{port}/graphql"
                if server_url and api_key:
                    if DEBUG_MODE:
                        logPrint(f"[DEBUG] Using server_connection: {server_url}")
                    return SimpleNamespace(server_url=server_url, api_key=api_key)
            
            # Method 2: Check plugin settings from args
            args = input_data.get("args", {})
            if isinstance(args, dict):
                # Settings might be directly in args
                server_url = args.get("serverUrl", "")
                api_key = args.get("apiKey", "")
                if server_url and api_key:
                    if DEBUG_MODE:
                        logPrint(f"[DEBUG] Using settings from args: {server_url}")
                    return SimpleNamespace(server_url=server_url, api_key=api_key)
            
            # Method 3: Check for pluginConfig or plugin_config
            for key in ["pluginConfig", "plugin_config", "pluginSettings"]:
                settings = input_data.get(key, {})
                if isinstance(settings, dict):
                    server_url = settings.get("serverUrl", "")
                    api_key = settings.get("apiKey", "")
                    if server_url and api_key:
                        if DEBUG_MODE:
                            logPrint(f"[DEBUG] Using settings from {key}: {server_url}")
                        return SimpleNamespace(server_url=server_url, api_key=api_key)
            
    except Exception as e:
        if DEBUG_MODE:
            logPrint(f"[DEBUG] Error reading plugin input: {e}")
    return None


def load_or_create_config(interactive_ok: bool) -> SimpleNamespace:
    # 0) Plugin settings (if running as plugin)
    plugin_cfg = load_config_from_plugin_settings()
    if plugin_cfg:
        return plugin_cfg
    
    # 1) Environment overrides
    env_server = os.getenv("STASH_SERVER_URL")
    env_api = os.getenv("STASH_API_KEY")
    if env_server and env_api:
        return SimpleNamespace(server_url=env_server, api_key=env_api)

    # 2) Local config.py next to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    local_cfg_path = os.path.join(script_dir, "config.py")
    cfg = import_config_from_path(local_cfg_path)
    if cfg:
        return cfg

    # 3) Not found: interactively prompt if allowed
    if interactive_ok:
        print("Stash API config not found. Let's set it up.")
        default_url = "http://localhost:9999/graphql"
        server_url = input(f"Server URL [{default_url}]: ").strip() or default_url
        api_key = input("API Key: ").strip()
        # Persist to local config.py for next runs
        try:
            with open(local_cfg_path, "w", encoding="utf-8") as fh:
                fh.write(f'server_url = "{server_url}"\n')
                fh.write(f'api_key = "{api_key}"\n')
            logPrint(f"[Info] Wrote config to {local_cfg_path}")
        except Exception as e:
            logPrint(f"[Warn] Failed to write config.py: {e}")
        return SimpleNamespace(server_url=server_url, api_key=api_key)

    # 4) Otherwise, instruct the user
    raise RuntimeError(
        "Stash API config not found. Options:\n"
        "  1. Configure in plugin settings (serverUrl and apiKey)\n"
        "  2. Set STASH_SERVER_URL and STASH_API_KEY environment vars\n"
        "  3. Create config.py with server_url and api_key\n"
        "  4. Run with --interactive to set it up"
    )


def __callGraphQL(query: str, variables: Optional[dict] = None) -> dict:
    if CONFIG is None:
        raise RuntimeError("CONFIG not initialized")
    headers = {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Connection": "keep-alive",
        "DNT": "1",
        "ApiKey": CONFIG.api_key,
    }
    payload = {"query": query}
    if variables is not None:
        payload["variables"] = variables # type: ignore

    resp = requests.post(CONFIG.server_url, json=payload, headers=headers)
    if resp.status_code != 200:
        raise Exception(
            f"GraphQL query failed:{resp.status_code} - {resp.content}. Query: {query}. Variables: {variables}"
        )
    result = resp.json()
    if result.get("error"):
        for error in result["error"]["errors"]:
            raise Exception(f"GraphQL error: {error}")
    if result.get("data") is None:
        raise Exception("GraphQL response missing 'data'")
    return result["data"]


def find_tag_ids_by_names(names: List[str]) -> Dict[str, str]:
    """
    Resolve tag names to IDs via the GraphQL API.
    Returns a dict {name: id} for names that could be resolved.
    """
    out: Dict[str, str] = {}
    query = """
query findTags($filter: FindFilterType!, $tag_filter: TagFilterType!) {
  findTags(filter: $filter, tag_filter: $tag_filter) {
    tags { id name }
  }
}
"""
    for name in names:
        variables = {
            "filter": {"per_page": 1, "page": 1},
            "tag_filter": {"name": {"value": name, "modifier": "EQUALS"}},
        }
        try:
            data = __callGraphQL(query, variables)
            tags = data.get("findTags", {}).get("tags", [])
            if tags:
                match = next((t for t in tags if t.get("name") == name), tags[0])
                out[name] = match["id"]
            else:
                variables = {
                    "filter": {"per_page": 5, "page": 1},
                    "tag_filter": {"name": {"value": name, "modifier": "MATCHES"}},
                }
                data = __callGraphQL(query, variables)
                tags = data.get("findTags", {}).get("tags", [])
                match = next((t for t in tags if t.get("name") == name), None)
                if match:
                    out[name] = match["id"]
        except Exception as e:
            logPrint(f"[Warn] Failed to resolve tag '{name}': {e}")
    return out


def get_total_scenes(scene_filter: dict) -> int:
    query = """
query findScenes($filter: FindFilterType!, $scene_filter: SceneFilterType!) {
  findScenes(filter: $filter, scene_filter: $scene_filter) {
    count
  }
}
"""
    variables = {"filter": {"per_page": 0}, "scene_filter": scene_filter}
    data = __callGraphQL(query, variables)
    return int(data["findScenes"]["count"])


def get_scenes_page(page: int, scene_filter: dict) -> List[dict]:
    query = """
query findScenes($filter: FindFilterType!, $scene_filter: SceneFilterType!) {
  findScenes(filter: $filter, scene_filter: $scene_filter) {
    scenes {
      id
      title
      date
      files { path }
      studio { name }
      performers { name gender }
      tags { name }
      movies { movie { id name } }
    }
  }
}
"""
    variables = {
        "filter": {"per_page": BATCH_SIZE, "page": page},
        "scene_filter": scene_filter,
    }
    data = __callGraphQL(query, variables)
    return data["findScenes"]["scenes"]


def build_scene_filter(base_filter: Optional[dict], tag_ids: Optional[List[str]]) -> dict:
    scene_filter = base_filter.copy() if base_filter else {}
    if tag_ids:
        scene_filter["tags"] = {"value": tag_ids, "modifier": "INCLUDES"}
    return scene_filter


def path_like_match(path: str, pattern: Optional[str]) -> bool:
    if not pattern:
        return True
    sub = pattern.replace("%", "")
    return sub in path


def path_excluded(path: str, pattern: Optional[str]) -> bool:
    """
    Return True if the given path should be excluded based on the pattern.
    LIKE-style with % wildcards interpreted as substring.
    """
    if not pattern:
        return False
    sub = pattern.replace("%", "")
    return sub in path


def iterate_scenes(scene_filter: dict, path_like: Optional[str], exclude_path_like: Optional[str]) -> List[dict]:
    total = get_total_scenes(scene_filter)
    pages = math.ceil(total / BATCH_SIZE)
    results: List[dict] = []
    for i in range(1, pages + 1):
        logPrint(f"Processing page {i} of {pages}")
        scenes = get_scenes_page(i, scene_filter)
        for scene in scenes:
            if scene.get("files"):
                scene["path"] = scene["files"][0]["path"]
                if path_like_match(scene["path"], path_like) and not path_excluded(scene["path"], exclude_path_like):
                    results.append(scene)
    return results


def edit_run(template: str, base_filter: Optional[dict], tag_names: Optional[List[str]], path_like: Optional[str], exclude_path_like: Optional[str]):
    # Resolve tags if provided
    tag_ids: Optional[List[str]] = None
    if tag_names:
        mapping = find_tag_ids_by_names(tag_names)
        if not mapping:
            logPrint("[Warn] No tag IDs resolved; skipping tag-based selection.")
            return
        tag_ids = [mapping[name] for name in tag_names if name in mapping]
        if not tag_ids:
            logPrint("[Warn] No tag IDs resolved; skipping.")
            return

    scene_filter = build_scene_filter(base_filter, tag_ids)

    scenes = iterate_scenes(scene_filter, path_like, exclude_path_like)
    if not scenes:
        logPrint("[Warn] There are no scenes to change with this query")
        return

    logPrint(f"Scenes count: {len(scenes)}")

    for scene in scenes:
        current_path = scene.get("path")
        if not current_path:
            continue

        # Skip if scene is part of a group/movie (optional)
        if SKIP_GROUPED:
            movies = scene.get("movies") or []
            if movies:
                if DEBUG_MODE:
                    logPrint(f"[DEBUG] Skipping grouped scene (ID: {scene['id']}): {os.path.basename(current_path)}")
                continue

        current_directory = os.path.dirname(current_path)
        current_filename = os.path.basename(current_path)
        file_extension = os.path.splitext(current_filename)[1] or ""

        scene_title = scene.get("title") or ""
        scene_date = scene.get("date") or ""
        studio_name = (scene.get("studio") or {}).get("name") or ""

        performers = scene.get("performers") or []
        names: List[str] = []
        for p in performers:
            if FEMALE_ONLY:
                if str(p.get("gender") or "") == "FEMALE":
                    names.append(p.get("name") or "")
            else:
                names.append(p.get("name") or "")
        performer_name = " ".join([n for n in names if n]).strip()

        scene_info = {
            "title": scene_title,
            "date": scene_date,
            "performer": performer_name,
            "studio": studio_name,
            "height": "",  # Not fetched here
        }
        if DEBUG_MODE:
            logPrint(f"[DEBUG] Scene information: {scene_info}")

        new_filename_core = makeFilename(scene_info, template)
        if "None" in new_filename_core:
            logPrint(f"[Error] Information missing for new filename, ID: {scene['id']}")
            continue

        new_filename_core = sanitize_filename(new_filename_core)
        if not new_filename_core.strip():
            logPrint(f"[Error] New filename resolved empty for scene {scene['id']}, skipping.")
            continue
        new_filename = new_filename_core + file_extension

        # Determine target directory (studio subfolder if enabled and studio exists)
        target_directory = current_directory
        if MOVE_TO_STUDIO_FOLDER and studio_name:
            sanitized_studio = sanitize_filename(studio_name)
            target_directory = os.path.join(current_directory, sanitized_studio)
            if not os.path.exists(target_directory):
                if not DRY_RUN:
                    try:
                        os.makedirs(target_directory, exist_ok=True)
                        logPrint(f"[OS] Created studio folder: {target_directory}")
                    except Exception as e:
                        logPrint(f"[Error] Failed to create studio folder {target_directory}: {e}")
                        target_directory = current_directory
                else:
                    logPrint(f"[DRY] Would create studio folder: {target_directory}")

        new_path = os.path.join(target_directory, new_filename)

        if IS_WINDOWS and len(new_path) > 240:
            logPrint(f"[Warn] The Path is too long ({new_path})")
            if scene_info.get("date"):
                reduced_core = makeFilename(scene_info, "$date - $title")
            else:
                reduced_core = makeFilename(scene_info, "$title")
            reduced_core = sanitize_filename(reduced_core)
            if not reduced_core.strip():
                logPrint(f"[Error] Reduced filename empty, skipping scene {scene['id']}.")
                continue
            new_filename = reduced_core + file_extension
            new_path = os.path.join(current_directory, new_filename)
            if len(new_path) <= 240:
                logPrint(f"[Info] Reduced filename to: {new_filename}")
            else:
                logPrint(f"[Error] Can't manage to reduce the path, ID: {scene['id']}")
                continue

        # Filesystem duplicate check
        if new_path != current_path and os.path.exists(new_path):
            logPrint(f"[Error] Target already exists: {new_path}")
            with open("renamer_duplicate.txt", "a", encoding="utf-8") as fh:
                print(f"[{scene['id']}] - {new_filename}", file=fh)
            continue

        if DEBUG_MODE:
            logPrint(f"[DEBUG] Filename: {current_filename} -> {new_filename}")
            logPrint(f"[DEBUG] Path: {current_path} -> {new_path}")

        if new_path == current_path:
            if DEBUG_MODE:
                logPrint("[DEBUG] File already good.\n")
            continue

        if not DRY_RUN:
            if os.path.isfile(current_path):
                try:
                    os.rename(current_path, new_path)
                except Exception as e:
                    logPrint(f"[OS] File failed to rename ({current_filename}) due to: {e}")
                    with open("renamer_fail.txt", "a", encoding="utf-8") as fh:
                        print(f"{current_path} -> {new_path}", file=fh)
                    continue

                if os.path.isfile(new_path):
                    logPrint(f"[OS] File Renamed! ({current_filename})")
                    if USING_LOG:
                        with open("rename_log.txt", "a", encoding="utf-8") as fh:
                            print(f"{scene['id']}|{current_path}|{new_path}", file=fh)
                else:
                    logPrint(f"[OS] File failed to rename ? ({current_filename})")
                    with open("renamer_fail.txt", "a", encoding="utf-8") as fh:
                        print(f"{current_path} -> {new_path}", file=fh)
            else:
                logPrint(f"[OS] File doesn't exist on disk ({current_path})")
        else:
            logPrint(f"[DRY] {current_filename} -> {new_filename}")
            with open("renamer_dryrun.txt", "a", encoding="utf-8") as fh:
                print(f"{current_path} -> {new_path}", file=fh)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Stash API Renamer (Linux/Windows compatible) using GraphQL API (no SQLite).",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument("--dry-run", dest="dry_run", action="store_true", help="Do not rename files; write plan to renamer_dryrun.txt")
    parser.add_argument("--no-dry-run", dest="dry_run", action="store_false", help="Disable dry run (default).")
    parser.set_defaults(dry_run=DRY_RUN)

    parser.add_argument("--log", dest="using_log", action="store_true", help="Write rename log to rename_log.txt")
    parser.add_argument("--no-log", dest="using_log", action="store_false", help="Disable rename log.")
    parser.set_defaults(using_log=USING_LOG)

    parser.add_argument("--female-only", dest="female_only", action="store_true", help="Include only female performers in $performer.")
    parser.add_argument("--no-female-only", dest="female_only", action="store_false", help="Include all performers in $performer.")
    parser.set_defaults(female_only=FEMALE_ONLY)

    parser.add_argument("--debug", dest="debug_mode", action="store_true", help="Enable debug output.")
    parser.add_argument("--no-debug", dest="debug_mode", action="store_false", help="Disable debug output.")
    parser.set_defaults(debug_mode=DEBUG_MODE)

    parser.add_argument("--skip-grouped", dest="skip_grouped", action="store_true", help="Skip scenes that are part of a group/movie.")
    parser.add_argument("--no-skip-grouped", dest="skip_grouped", action="store_false", help="Do not skip grouped scenes (default).")
    parser.set_defaults(skip_grouped=SKIP_GROUPED)

    parser.add_argument("--move-to-studio-folder", dest="move_to_studio_folder", action="store_true", help="Move scenes to a studio-named subfolder if studio exists.")
    parser.add_argument("--no-move-to-studio-folder", dest="move_to_studio_folder", action="store_false", help="Do not move to studio folder (default).")
    parser.set_defaults(move_to_studio_folder=MOVE_TO_STUDIO_FOLDER)

    # Connection (for plugin use)
    parser.add_argument("--server-url", dest="server_url", help="Stash GraphQL server URL (e.g., http://localhost:9999/graphql)")
    parser.add_argument("--api-key", dest="api_key", help="Stash API key")
    
    # Selection
    parser.add_argument("--tag", action="append", dest="tags", help="Tag name to select scenes by. Repeatable.")
    parser.add_argument("--template", dest="template", help="Filename template. Required for no-tag mode or for --tag when no --config.")
    parser.add_argument("--config", dest="config_json", help="Path to JSON with [{\"tag\": \"...\", \"template\": \"...\"}, ...] mappings.")
    parser.add_argument("--path-like", dest="path_like", help="Optional substring to match in file path (LIKE-style with %% wildcards interpreted as substring).")
    parser.add_argument("--exclude-path-like", dest="exclude_path_like", help="Optional substring to exclude matching file paths (LIKE-style with %% wildcards interpreted as substring).")
    parser.add_argument("--filter", dest="scene_filter", help="JSON string for SceneFilterType. Merged with tag filter if provided.")
    parser.add_argument("--interactive", action="store_true", help="Run in interactive mode (also bootstraps API config if missing).")
    return parser


def parse_args(argv: Optional[List[str]] = None) -> argparse.Namespace:
    parser = build_parser()
    if argv is None:
        argv = sys.argv[1:]
    if len(argv) == 0:
        # Default to interactive mode when no arguments provided
        print("No arguments provided. Starting in interactive mode...")
        print("Use --help to see all available options.\n")
        return argparse.Namespace(interactive=True)
    return parser.parse_args(argv)


def interactive_prompt() -> argparse.Namespace:
    print("Interactive mode - leave blank to accept defaults shown in [] where applicable.")
    args = argparse.Namespace()

    yn = (input("Dry-run? [y/N]: ").strip().lower() or "n")
    args.dry_run = yn.startswith("y")

    yn = (input("Write rename log? [Y/n]: ").strip().lower() or "y")
    args.using_log = not yn.startswith("n")

    yn = (input("Female-only for $performer? [y/N]: ").strip().lower() or "n")
    args.female_only = yn.startswith("y")

    yn = (input("Enable debug output? [Y/n]: ").strip().lower() or "y")
    args.debug_mode = not yn.startswith("n")

    yn = (input("Skip scenes in groups/movies? [y/N]: ").strip().lower() or "n")
    args.skip_grouped = yn.startswith("y")

    yn = (input("Move scenes to studio subfolders? [y/N]: ").strip().lower() or "n")
    args.move_to_studio_folder = yn.startswith("y")

    args.path_like = input("Optional path substring (LIKE-style e.g., /mnt/media/%): ").strip() or None
    args.exclude_path_like = input("Optional EXCLUDE path substring (LIKE-style e.g., /mnt/media/tmp%): ").strip() or None

    tags_raw = input("Enter tag names (comma-separated). Leave blank for no-tag mode: ").strip()
    args.tags = [t.strip() for t in tags_raw.split(",") if t.strip()] or None

    default_template = "$studio - $date - $title - $performer"
    
    if args.tags:
        per_tag = (input("Use a single template for all tags? [Y/n]: ").strip().lower() or "y")
        if per_tag.startswith("y"):
            args.template = input(f"Template [{default_template}]: ").strip() or default_template
            args.config_inline = None
        else:
            mappings = []
            for t in args.tags:
                tt = input(f"Template for tag \"{t}\" [{default_template}]: ").strip() or default_template
                mappings.append({"tag": t, "template": tt})
            args.config_inline = mappings
            args.template = None
    else:
        args.template = input(f"Template for no-tag mode [{default_template}]: ").strip() or default_template
        args.config_inline = None

    filt = input("Optional raw SceneFilterType JSON (will be merged if tags provided): ").strip()
    args.scene_filter = filt or None
    return args


def load_config_mappings(path: str) -> List[Dict[str, str]]:
    with open(path, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    if isinstance(data, dict):
        data = [data]
    out = []
    for item in data:
        if not isinstance(item, dict):
            continue
        tag = (item.get("tag") or "").strip()
        template = (item.get("template") or "").strip()
        if tag and template:
            out.append({"tag": tag, "template": template})
    return out


def run():
    global USING_LOG, DRY_RUN, FEMALE_ONLY, DEBUG_MODE, SKIP_GROUPED, MOVE_TO_STUDIO_FOLDER, CONFIG

    args = parse_args()
    
    # Check if server URL and API key were provided via command line (for plugin use)
    if hasattr(args, 'server_url') and args.server_url and hasattr(args, 'api_key') and args.api_key:
        CONFIG = SimpleNamespace(server_url=args.server_url, api_key=args.api_key)
        if DEBUG_MODE:
            logPrint(f"[DEBUG] Using config from command-line args: {args.server_url}")
    else:
        # Initialize config early, before interactive prompt if needed
        is_interactive = getattr(args, "interactive", False)
        CONFIG = load_or_create_config(interactive_ok=is_interactive)
    
    if getattr(args, "interactive", False):
        args = interactive_prompt()

    USING_LOG = getattr(args, "using_log", USING_LOG)
    DRY_RUN = getattr(args, "dry_run", DRY_RUN)
    FEMALE_ONLY = getattr(args, "female_only", FEMALE_ONLY)
    DEBUG_MODE = getattr(args, "debug_mode", DEBUG_MODE)
    SKIP_GROUPED = getattr(args, "skip_grouped", SKIP_GROUPED)
    MOVE_TO_STUDIO_FOLDER = getattr(args, "move_to_studio_folder", MOVE_TO_STUDIO_FOLDER)

    if DRY_RUN:
        try:
            os.remove("renamer_dryrun.txt")
        except FileNotFoundError:
            pass
        logPrint("[DRY_RUN] DRY-RUN Enabled")

    # Load optional base scene_filter
    base_filter: Optional[dict] = None
    if getattr(args, "scene_filter", None):
        try:
            base_filter = json.loads(args.scene_filter)
        except Exception as e:
            logPrint(f"[Warn] Could not parse --filter JSON: {e}")

    # Collect tag-template pairs if any
    tag_template_pairs: List[Tuple[str, str]] = []
    if getattr(args, "config_json", None):
        for m in load_config_mappings(args.config_json):
            tag_template_pairs.append((m["tag"], m["template"]))
    if getattr(args, "config_inline", None):
        for m in args.config_inline:
            tag = (m.get("tag") or "").strip()
            template = (m.get("template") or "").strip()
            if tag and template:
                tag_template_pairs.append((tag, template))
    if getattr(args, "tags", None) and getattr(args, "template", None):
        for t in args.tags:
            tag_template_pairs.append((t, args.template))

    executed_any = False

    if tag_template_pairs:
        # Per-tag runs
        for tag_name, template in tag_template_pairs:
            if not template or not template.strip():
                logPrint(f"[Warn] Empty template for tag '{tag_name}', skipping.")
                continue
            edit_run(
                template=template,
                base_filter=base_filter,
                tag_names=[tag_name],
                path_like=getattr(args, "path_like", None),
                exclude_path_like=getattr(args, "exclude_path_like", None),
            )
            logPrint("====================")
            executed_any = True
    else:
        # No-tag mode: run for all scenes matching base_filter
        template = getattr(args, "template", None)
        if template and template.strip():
            edit_run(
                template=template,
                base_filter=base_filter,
                tag_names=None,
                path_like=getattr(args, "path_like", None),
                exclude_path_like=getattr(args, "exclude_path_like", None),
            )
            executed_any = True
        else:
            logPrint("[Info] No tags and no template provided. Nothing to do.")

    # If dry-run, show command to execute for real
    if DRY_RUN and executed_any:
        cmd_parts = [sys.executable, os.path.abspath(__file__)]
        
        # Add flags based on current settings
        cmd_parts.append("--no-dry-run")
        
        if USING_LOG:
            cmd_parts.append("--log")
        else:
            cmd_parts.append("--no-log")
            
        if FEMALE_ONLY:
            cmd_parts.append("--female-only")
            
        if DEBUG_MODE:
            cmd_parts.append("--debug")
        else:
            cmd_parts.append("--no-debug")
            
        if SKIP_GROUPED:
            cmd_parts.append("--skip-grouped")
            
        if MOVE_TO_STUDIO_FOLDER:
            cmd_parts.append("--move-to-studio-folder")
        
        # Add tags if any
        if getattr(args, "tags", None):
            for tag in args.tags:
                cmd_parts.append("--tag")
                cmd_parts.append(f'"{tag}"')
        
        # Add template if single template mode
        if getattr(args, "template", None):
            cmd_parts.append("--template")
            cmd_parts.append(f'"{args.template}"')
        
        # Add config JSON if provided
        if getattr(args, "config_json", None):
            cmd_parts.append("--config")
            cmd_parts.append(f'"{args.config_json}"')
        
        # Add path filters
        if getattr(args, "path_like", None):
            cmd_parts.append("--path-like")
            cmd_parts.append(f'"{args.path_like}"')
            
        if getattr(args, "exclude_path_like", None):
            cmd_parts.append("--exclude-path-like")
            cmd_parts.append(f'"{args.exclude_path_like}"')
        
        # Add scene filter if provided
        if getattr(args, "scene_filter", None):
            cmd_parts.append("--filter")
            cmd_parts.append(f"'{args.scene_filter}'")
        
        logPrint("\n" + "="*60)
        logPrint("[DRY_RUN] To execute this rename operation, run:")
        logPrint(" ".join(cmd_parts))
        logPrint("="*60)

    if getattr(args, "interactive", False):
        try:
            input("Press Enter to continue...")
        except EOFError:
            pass


if __name__ == "__main__":
    run()
