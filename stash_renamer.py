import os
import re
from types import SimpleNamespace
from typing import Any, Dict, List, Optional

import requests
from file_mover import FileMover
from tagger import GraphQLTagger

# Flags (programmatic overrides via run(options))
USING_LOG = True
DRY_RUN = False
DEBUG_MODE = True

IS_WINDOWS = os.name == "nt"

# Connection/config
CONFIG = None  # type: Optional[SimpleNamespace]

TAGGER: Optional[GraphQLTagger] = None
FILE_MOVER: Optional[FileMover] = None

# Try to import Stash logging if available (when running as plugin)
USING_STASH_LOG = False
stash_log = None
try:
    import log as stash_log  # type: ignore
    USING_STASH_LOG = True
except ImportError:
    pass


def logPrint(msg: str):
    if not msg:
        return
    
    # Skip debug messages if debug mode is off
    if "[DEBUG]" in msg and not DEBUG_MODE:
        return
    
    # Use Stash logging if available (running as plugin)
    if USING_STASH_LOG and stash_log:
        if "[ERROR]" in msg or "[Error]" in msg:
            stash_log.LogError(msg)
        elif "[WARN]" in msg or "[Warn]" in msg:
            stash_log.LogWarning(msg)
        elif "[DEBUG]" in msg:
            stash_log.LogDebug(msg)
        elif "[DRY]" in msg or "[DRY_RUN]" in msg:
            stash_log.LogTrace(msg)  # Dry run messages are important
        elif "[OS]" in msg:
            stash_log.LogInfo(msg)  # File operations
        else:
            stash_log.LogInfo(msg)
    else:
        # Fallback to regular print when not running as plugin
        print(msg)


def sanitize_filename(name: str) -> str:
    """
    Sanitize filename/folder name by removing characters that are problematic
    across different filesystems. Preserves spaces and hyphens.
    
    Removes:
    - Windows forbidden: < > : " / \ | ? *
    - Control characters (0-31, 127)
    - Quotes: ' " ` 
    - Hash and comma which can cause issues
    - Leading/trailing dots and spaces (Windows compatibility)
    """
    if not name:
        return ""
    
    # Remove control characters (ASCII 0-31 and 127)
    name = ''.join(char for char in name if ord(char) >= 32 and ord(char) != 127)
    
    # Remove problematic characters across all platforms
    # Windows forbidden: < > : " / \ | ? *
    # Additional: ' ` # , (can cause issues in some contexts)
    name = re.sub(r'[<>:/\\|?*`,]+', '', name)
    name = re.sub(r'&', 'and', name)
    name = re.sub(r'(?<=\w)\'(?=\w)|(?<=\w)\'(?=\s|$)', '', name)
    #name = re.sub(r'\'', '', name)


    # Collapse multiple spaces to single space
    name = re.sub(r'\s{2,}', ' ', name)
    name = re.sub(r'(?<!\.)\.{3}(?!\.)', '.', name)

    # Remove leading/trailing dots and spaces (Windows doesn't allow these)
    name = name.strip('. ')
    
    return name

def _sanitize_path_component(seg: str) -> str:
    """
    Sanitize a single path segment using the same rules as filenames.
    Does not allow path separators in the segment.
    """
    return sanitize_filename(seg or "")

def _build_target_directory(current_directory: str, tag_context: Dict[str, object], path_template: str) -> str:
    """
    Build a target directory from a template using the same tokens as filenames.
    Mode detection:
      - Starts with / or \\ => absolute path mode
      - Otherwise => relative path mode
    Special token:
      - $up is replaced by .. (parent traversal marker)
    Slashes (/) in the template denote subfolders.
    """
    # Replace tokens similarly to makeFilename, but allow separators
    raw = str(path_template or "")
    is_absolute = raw.startswith("/") or raw.startswith("\\")
    # Minimal token replacement, reuse makeFilename for consistency
    replaced = makeFilename(raw, tag_context)

    # Expand $up occurrences after token replacement to literal .. marker
    replaced = replaced.replace("$up", "..")

    # Normalize multiple slashes
    replaced = re.sub(r"[\\/]+", "/", replaced).strip()

    # Split into segments
    parts = [p.strip() for p in replaced.split("/")]

    if is_absolute:
        # Build a normalized absolute path from parts
        stack: List[str] = []
        for seg in parts:
            if not seg or seg == ".":
                continue
            if seg == "..":
                if stack:
                    stack.pop()
                continue
            stack.append(_sanitize_path_component(seg))
        # Prepend os.sep to make absolute (best-effort cross-platform)
        final_dir = os.sep + os.path.join(*stack) if stack else os.sep
        return final_dir
    else:
        # Relative to current_directory; support .. to go up
        base = current_directory
        for seg in parts:
            if not seg or seg == ".":
                continue
            if seg == "..":
                # ascend but don't go above filesystem root
                parent = os.path.dirname(base.rstrip(os.sep)) or base
                # Avoid empty path; keep root when already at root
                base = parent if parent else base
            else:
                base = os.path.join(base, _sanitize_path_component(seg))
        return base


def makeFilename(query: str, tag_context: Dict[str, object]) -> str:
    def _is_empty_value(value: Any) -> bool:
        if value is None:
            return True
        if isinstance(value, str):
            return value.strip() == ""
        if isinstance(value, (int, float, bool)):
            return False
        if isinstance(value, list):
            return all(_is_empty_value(v) for v in value)
        if isinstance(value, dict):
            return all(_is_empty_value(v) for v in value.values())
        return str(value).strip() == ""

    def _render_conditionals(template: str) -> str:
        s = template or ""
        pattern = re.compile(r"\{([^{}]*)\}")
        while True:
            changed = False

            def repl(match: re.Match) -> str:
                nonlocal changed
                changed = True
                inner_raw = match.group(1) or ""
                inner_processed = _render_conditionals(inner_raw)
                if not TAGGER:
                    return inner_processed
                exprs = TAGGER.extract_expressions(inner_raw)
                if not exprs:
                    return inner_processed if inner_processed.strip() else ""
                all_have_value = all(
                    not _is_empty_value(TAGGER.resolve_expression(expr, tag_context))
                    for expr in exprs
                )
                if not all_have_value:
                    return ""
                return TAGGER.render(inner_processed, tag_context)

            new_s = pattern.sub(repl, s)
            if not changed:
                return s
            s = new_s

    # Trim template
    s = str(query or "").strip()
    s = _render_conditionals(s)
    if TAGGER:
        s = TAGGER.render(s, tag_context)

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

def __callGraphQL(query: str, variables: Optional[dict] = None) -> dict:
    if CONFIG is None:
        raise RuntimeError("CONFIG not initialized")
    if not getattr(CONFIG, "server_url", None):
        raise RuntimeError("CONFIG.server_url missing")
    if not (hasattr(CONFIG, 'cookie_name') and hasattr(CONFIG, 'cookie_value') and CONFIG.cookie_name and CONFIG.cookie_value):
        raise RuntimeError("Cookie auth required: cookie_name and cookie_value must be set in CONFIG")

    headers = {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Connection": "keep-alive",
        "DNT": "1",
        # Cookie-based authentication only
        "Cookie": f"{CONFIG.cookie_name}={CONFIG.cookie_value}",
    }

    payload = {"query": query}
    if variables is not None:
        payload["variables"] = variables  # type: ignore

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


def _extract_scenes_from_data(data: Dict[str, Any], path: Optional[str]) -> List[dict]:
    """
    Extract scenes list from GraphQL data.

    Supported:
      - explicit dot path, e.g. "findScenes.scenes"
      - auto-detect common forms:
          data["findScenes"]["scenes"]
          data["scenes"]
    """
    if path:
        node: Any = data
        for part in [p for p in path.split(".") if p]:
            if isinstance(node, dict):
                node = node.get(part)
            else:
                node = None
                break
        if isinstance(node, list):
            return [s for s in node if isinstance(s, dict)]
        raise ValueError(f"scenes_query_path '{path}' did not resolve to a list")

    find_scenes = data.get("findScenes")
    if isinstance(find_scenes, dict) and isinstance(find_scenes.get("scenes"), list):
        return [s for s in find_scenes["scenes"] if isinstance(s, dict)]
    if isinstance(data.get("scenes"), list):
        return [s for s in data["scenes"] if isinstance(s, dict)]
    raise ValueError("Could not extract scene list from query result; provide scenes_query_path")


def _normalize_scenes(scenes: List[dict]) -> List[dict]:
    out: List[dict] = []
    for scene in scenes:
        if not isinstance(scene, dict):
            continue
        files = scene.get("files") or []
        if not scene.get("path") and isinstance(files, list) and files and isinstance(files[0], dict):
            scene["path"] = files[0].get("path")
        out.append(scene)
    return out


def _build_field_tree_from_templates(filename_template: str, path_template: Optional[str]) -> Dict[str, Any]:
    """
    Build a GraphQL field tree for findScenes based on template expressions.
    Keeps mandatory fields required for renaming operations.
    """
    def add_path(tree: Dict[str, Any], path: List[str]) -> None:
        if not path:
            return
        node = tree
        for key in path:
            if key not in node or not isinstance(node.get(key), dict):
                node[key] = {}
            node = node[key]

    tree: Dict[str, Any] = {}
    # Mandatory for rename operations and output.
    add_path(tree, ["id"])
    add_path(tree, ["title"])
    add_path(tree, ["files", "id"])
    add_path(tree, ["files", "path"])

    templates = [filename_template or "", path_template or ""]
    for tpl in templates:
        if not TAGGER:
            continue
        for expr in TAGGER.extract_expressions(tpl):
            root, segments = TAGGER.parse_expression(expr)
            attr_path = [str(v) for t, v in segments if t == "attr"]
            if root == "scene":
                if attr_path and attr_path[0] == "year":
                    add_path(tree, ["date"])
                    continue
                if attr_path and not TAGGER.has_root_field("scene", attr_path[0]):
                    continue
                add_path(tree, attr_path)
            elif root == "performer":
                if attr_path and not TAGGER.has_root_field("performer", attr_path[0]):
                    continue
                add_path(tree, ["performers"] + attr_path)
            elif root == "group":
                if attr_path and not TAGGER.has_root_field("group", attr_path[0]):
                    continue
                add_path(tree, ["groups", "group"] + attr_path)

    # Ensure grouped wrappers have usable identity/name when group fields requested.
    groups_node = tree.get("groups")
    if isinstance(groups_node, dict):
        groups_node.setdefault("scene_index", {})
        group_node = groups_node.get("group")
        if not isinstance(group_node, dict):
            groups_node["group"] = {"id": {}, "name": {}}
        else:
            group_node.setdefault("id", {})
            group_node.setdefault("name", {})

    # Ensure performer name is present when performer root is used.
    if "performers" in tree and isinstance(tree["performers"], dict):
        tree["performers"].setdefault("name", {})

    return tree


def _field_tree_to_selection(tree: Dict[str, Any]) -> str:
    def is_leaf(node: Any) -> bool:
        return not isinstance(node, dict) or len(node) == 0

    parts: List[str] = []
    for field in sorted(tree.keys()):
        node = tree[field]
        if is_leaf(node):
            parts.append(field)
        else:
            parts.append(f"{field} {{ {_field_tree_to_selection(node)} }}")
    return " ".join(parts)


def _build_find_scenes_query(filename_template: str, path_template: Optional[str]) -> str:
    tree = _build_field_tree_from_templates(filename_template, path_template)
    selection = _field_tree_to_selection(tree)
    return (
        "query findScenes($filter: FindFilterType!, $scene_filter: SceneFilterType, $ids: [ID!]) { "
        "findScenes(filter: $filter, scene_filter: $scene_filter, ids: $ids) { "
        f"scenes {{ {selection} }} "
        "} }"
    )


def _fetch_scenes_from_filter(
    scene_filter: Optional[dict],
    ids: Optional[List[str]],
    find_filter: Optional[dict],
    filename_template: str,
    path_template: Optional[str],
) -> List[dict]:
    """
    Fetch scenes using backend-managed canonical query and pagination.
    """
    ff = (find_filter or {}).copy()
    per_page = int(ff.get("per_page") or 250)
    if per_page <= 0:
        per_page = 250
    page = int(ff.get("page") or 1)
    if page <= 0:
        page = 1

    all_scenes: List[dict] = []
    find_scenes_query = _build_find_scenes_query(filename_template, path_template)
    while True:
        page_filter = ff.copy()
        page_filter["per_page"] = per_page
        page_filter["page"] = page
        variables = {
            "filter": page_filter,
            "scene_filter": scene_filter,
            "ids": ids if ids else None,
        }
        data = __callGraphQL(find_scenes_query, variables)
        scenes = ((data or {}).get("findScenes") or {}).get("scenes") or []
        page_scenes = [s for s in scenes if isinstance(s, dict)]
        all_scenes.extend(page_scenes)
        if len(page_scenes) < per_page:
            break
        page += 1
    return all_scenes


def edit_run(filename_template: str, path_template: Optional[str], scenes: List[dict], collect_operations: bool = False):
    """
    Run the rename operation.
    
    Args:
        collect_operations: If True, return list of operations instead of just logging them
        
    Returns:
        List of dicts with rename operations if collect_operations=True, otherwise None
    """
    operations = []
    
    if DEBUG_MODE:
        logPrint(f"[DEBUG] Starting edit_run with DRY_RUN={DRY_RUN}, PATH_TEMPLATE={'set' if path_template else 'none'}")
    
    scenes = _normalize_scenes(scenes)
    if not scenes:
        logPrint("[Warn] There are no scenes to process")
        return operations if collect_operations else None

    logPrint(f"Scenes count: {len(scenes)}")

    for scene in scenes:
        current_path = scene.get("path")
        if not current_path:
            continue

        current_directory = os.path.dirname(current_path)
        current_filename = os.path.basename(current_path)
        file_extension = os.path.splitext(current_filename)[1] or ""

        performers = scene.get("performers") or []
        performer_list: List[dict] = []
        for p in performers:
            if not isinstance(p, dict):
                continue
            performer_list.append(p)

        scene_title = scene.get("title") or ""
        group_list = []
        for g in (scene.get("groups") or []):
            if isinstance(g, dict) and isinstance(g.get("group"), dict):
                group_list.append(g.get("group"))
            elif isinstance(g, dict):
                group_list.append(g)
        # Roots used by the new tag syntax:
        #   $scene.title
        #   $performer.name (all performer names joined)
        #   $performer[0].name
        #   $group.name (all group names joined)
        #   $group[0].name
        tag_context: Dict[str, object] = {
            "scene": scene,
            "performer": performer_list,
            "group": group_list,
        }
        if DEBUG_MODE:
            logPrint(f"[DEBUG] Tag context roots: {list(tag_context.keys())}")
            logPrint(f"[DEBUG] Template: {filename_template}")

        new_filename_core = makeFilename(filename_template, tag_context)

        new_filename_core = sanitize_filename(new_filename_core)
        if not new_filename_core.strip():
            logPrint(f"[Error] New filename resolved empty for scene {scene['id']}, skipping.")
            continue
        new_filename = new_filename_core + file_extension

        # Determine target directory via path builder (absolute or relative)
        current_directory = os.path.dirname(current_path)
        if path_template:
            try:
                final_directory = _build_target_directory(
                    current_directory=current_directory,
                    tag_context=tag_context,
                    path_template=path_template,
                )
                if DEBUG_MODE:
                    logPrint(f"[DEBUG] Path builder: current='{current_directory}' -> target='{final_directory}'")
                if not os.path.exists(final_directory):
                    if not DRY_RUN:
                        os.makedirs(final_directory, exist_ok=True)
                        logPrint(f"[OS] Created target folder: {final_directory}")
                    else:
                        logPrint(f"[DRY] Would create target folder: {final_directory}")
            except Exception as e:
                logPrint(f"[Error] Failed to build/create target folder from template '{path_template}': {e}")
                final_directory = current_directory
        else:
            final_directory = current_directory

        new_path = os.path.join(final_directory, new_filename)

        if DEBUG_MODE:
            logPrint(f"[DEBUG] Directory check: current='{current_directory}' final='{final_directory}'")

        # Handle Windows path length limitation (try to reduce path length if too long)
        if IS_WINDOWS and len(new_path) > 240:
            logPrint(f"[Warn] The Path is too long ({new_path})")
            if scene.get("date"):
                reduced_core = makeFilename("$scene.date - $scene.title", tag_context)
            else:
                reduced_core = makeFilename("$scene.title", tag_context)
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
            # Extract file IDs from scene data
            file_ids = []
            scene_files = scene.get("files") or []
            for file_info in scene_files:
                if file_info.get("path") == current_path:
                    file_ids.append(file_info.get("id"))
            
            if not file_ids:
                logPrint(f"[Error] No file ID found for path: {current_path}")
                if collect_operations:
                    operations.append({
                        "scene_id": scene['id'],
                        "title": scene_title,
                        "status": "error",
                        "error": "No file ID found for path",
                        "old_filename": current_filename,
                        "new_filename": new_filename,
                        "old_path": current_path,
                        "new_path": new_path
                    })
                continue
            
            # Use GraphQL moveFiles mutation instead of os.rename
            try:
                if DEBUG_MODE:
                    logPrint(f"[DEBUG] GraphQL call: destination_folder='{final_directory}', destination_basename='{new_filename}'")
                
                if FILE_MOVER is None:
                    raise RuntimeError("FILE_MOVER not initialized")
                success = FILE_MOVER.move_files(
                    file_ids=file_ids,
                    destination_folder=final_directory,
                    destination_basename=new_filename,
                )
                
                if not success:
                    raise Exception("GraphQL moveFiles returned false")
                    
            except Exception as e:
                logPrint(f"[GQL] File failed to rename ({current_filename}) due to: {e}")
                with open("renamer_fail.txt", "a", encoding="utf-8") as fh:
                    print(f"{current_path} -> {new_path}", file=fh)
                if collect_operations:
                    operations.append({
                        "scene_id": scene['id'],
                        "title": scene_title,
                        "status": "error",
                        "error": str(e),
                        "old_filename": current_filename,
                        "new_filename": new_filename,
                        "old_path": current_path,
                        "new_path": new_path
                    })
                continue

            # Success - the GraphQL mutation handles the actual file move
            logPrint(f"[GQL] File Renamed! ({current_filename})")
            operation_id = None
            if FILE_MOVER is not None:
                operation_id = FILE_MOVER.log_rename(
                    scene_id=str(scene.get("id") or ""),
                    old_path=current_path,
                    new_path=new_path,
                )
                logPrint(f"[GQL] Rename operation logged: {operation_id}")
            if USING_LOG:
                with open("rename_log.txt", "a", encoding="utf-8") as fh:
                    print(f"{scene['id']}|{current_path}|{new_path}", file=fh)
            if collect_operations:
                operations.append({
                    "scene_id": scene['id'],
                    "title": scene_title,
                    "status": "success",
                    "operation_id": operation_id,
                    "old_filename": current_filename,
                    "new_filename": new_filename,
                    "old_path": current_path,
                    "new_path": new_path
                })
        else:
            # Show dry run with clearer indication if file is moving to a different directory
            if os.path.dirname(current_path) != os.path.dirname(new_path):
                logPrint(f"[DRY] MOVE & RENAME: {current_filename} -> {new_path}")
            else:
                logPrint(f"[DRY] RENAME: {current_filename} -> {new_filename}")
            with open("renamer_dryrun.txt", "a", encoding="utf-8") as fh:
                print(f"{current_path} -> {new_path}", file=fh)
            if collect_operations:
                operations.append({
                    "scene_id": scene['id'],
                    "title": scene_title,
                    "status": "pending",
                    "old_filename": current_filename,
                    "new_filename": new_filename,
                    "old_path": current_path,
                    "new_path": new_path
                })
    
    return operations if collect_operations else None


def run(options: dict, collect_operations: bool = False):
    """
    Entry point when called programmatically.

    Expected options keys:
      - server_url: str, cookie_name: str, cookie_value: str
      - filename_template: str
      - path_template: str (optional)
      - scenes: List[Scene-like dict] OR
      - scene_filter: SceneFilterType-like dict (optional)
      - ids: [ID] list (optional)
      - find_filter: FindFilterType-like dict (optional, defaults per_page=250,page=1)
      - scenes_query: GraphQL query string returning scenes list (optional advanced mode)
      - scenes_query_variables: dict (optional)
      - scenes_query_path: dot path to list in GraphQL data (optional), e.g. findScenes.scenes
      - undo_operation_id: str (optional) if present, performs undo and ignores template/scenes input
      - operations_db_path: str (optional) SQLite path, default: rename_operations.db
      - Flags: using_log, dry_run, debug_mode
    """
    global USING_LOG, DRY_RUN, DEBUG_MODE, CONFIG, TAGGER, FILE_MOVER

    # Configure connection (cookie-only auth)
    server_url = options.get("server_url")
    cookie_name = options.get("cookie_name")
    cookie_value = options.get("cookie_value")
    if not server_url or not cookie_name or not cookie_value:
        raise ValueError("server_url, cookie_name, and cookie_value are required in options")

    CONFIG = SimpleNamespace(
        server_url=server_url,
        cookie_name=cookie_name,
        cookie_value=cookie_value,
    )
    FILE_MOVER = FileMover(
        gql_call=__callGraphQL,
        db_path=str(options.get("operations_db_path") or "rename_operations.db"),
        log_print=logPrint,
    )

    # Update flags from options
    USING_LOG = options.get("using_log", USING_LOG)
    DRY_RUN = options.get("dry_run", DRY_RUN)
    DEBUG_MODE = options.get("debug_mode", DEBUG_MODE)

    # Build the introspection-driven tagger.
    TAGGER = GraphQLTagger(
        gql_call=__callGraphQL,
        root_types={"scene": "Scene", "group": "Group", "performer": "Performer"},
    )
    try:
        TAGGER.introspect()
        if DEBUG_MODE:
            logPrint(f"[DEBUG] Tagger ready with roots: {', '.join(TAGGER.available_roots())}")
    except Exception as e:
        logPrint(f"[Warn] GraphQL introspection failed, template tags may be incomplete: {e}")


    if DRY_RUN:
        try:
            os.remove("renamer_dryrun.txt")
        except FileNotFoundError:
            pass
        logPrint("[DRY_RUN] DRY-RUN Enabled")

    undo_operation_id = options.get("undo_operation_id")
    if undo_operation_id:
        if FILE_MOVER is None:
            raise RuntimeError("FILE_MOVER not initialized")
        undo_result = FILE_MOVER.undo_rename(str(undo_operation_id))
        if collect_operations:
            return [undo_result]
        return None

    filename_template = options.get("filename_template")
    if not filename_template or not str(filename_template).strip():
        raise ValueError("filename_template is required")
    path_template = options.get("path_template") or None

    scenes_opt = options.get("scenes")
    scenes_query = options.get("scenes_query")
    scene_filter = options.get("scene_filter")
    ids_opt = options.get("ids")
    find_filter = options.get("find_filter")
    has_filter_mode = scene_filter is not None or ids_opt is not None or find_filter is not None

    if scenes_opt is not None and (scenes_query or has_filter_mode):
        raise ValueError("Provide only one scene source: 'scenes', query mode, or filter mode")
    if scenes_query and has_filter_mode:
        raise ValueError("Provide either query mode or filter mode, not both")
    if scenes_opt is None and not scenes_query and not has_filter_mode:
        raise ValueError("Provide scenes, query mode, or filter mode")

    if scenes_opt is not None:
        if not isinstance(scenes_opt, list):
            raise ValueError("'scenes' must be a list of scene objects")
        scenes = [s for s in scenes_opt if isinstance(s, dict)]
    elif scenes_query:
        variables = options.get("scenes_query_variables")
        if variables is not None and not isinstance(variables, dict):
            raise ValueError("'scenes_query_variables' must be an object/dict")
        query_data = __callGraphQL(str(scenes_query), variables)
        scenes = _extract_scenes_from_data(query_data, options.get("scenes_query_path"))
        if DEBUG_MODE:
            logPrint(f"[DEBUG] Loaded {len(scenes)} scenes from custom GraphQL query")
    else:
        ids: Optional[List[str]] = None
        if ids_opt is not None:
            if not isinstance(ids_opt, list):
                raise ValueError("'ids' must be a list")
            ids = [str(x) for x in ids_opt if str(x).strip()]
        if scene_filter is not None and not isinstance(scene_filter, dict):
            raise ValueError("'scene_filter' must be an object/dict")
        if find_filter is not None and not isinstance(find_filter, dict):
            raise ValueError("'find_filter' must be an object/dict")
        scenes = _fetch_scenes_from_filter(
            scene_filter,
            ids,
            find_filter,
            filename_template=str(filename_template),
            path_template=path_template,
        )
        if DEBUG_MODE:
            logPrint(f"[DEBUG] Loaded {len(scenes)} scenes from backend filter mode")

    ops = edit_run(
        filename_template=str(filename_template),
        path_template=path_template,
        scenes=scenes,
        collect_operations=collect_operations,
    )
    all_operations: List[dict] = ops or []
    return all_operations if collect_operations else None
