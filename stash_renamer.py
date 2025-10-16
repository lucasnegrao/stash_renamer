import os
import re
import math
from types import SimpleNamespace
from typing import Dict, List, Optional, Tuple

import requests

BATCH_SIZE = 100

# Flags (programmatic overrides via run(options))
USING_LOG = True
DRY_RUN = False
DEBUG_MODE = True
SKIP_GROUPED = False
MOVE_TO_STUDIO_FOLDER = False  # ...existing code, no longer used by path builder...

IS_WINDOWS = os.name == "nt"

# Connection/config
CONFIG = None  # type: Optional[SimpleNamespace]

# New globals for filters
PERFORMER_GENDERS = None  # type: Optional[set]
FILTERS = {}              # type: Dict[str, object]

# New globals for path building
PATH_TEMPLATE: Optional[str] = None
PATH_IS_ABSOLUTE: bool = False

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
    name = re.sub(r'[<>:"/\\|?*\'`#,]+', '', name)
    
    # Collapse multiple spaces to single space
    name = re.sub(r'\s{2,}', ' ', name)
    
    # Remove leading/trailing dots and spaces (Windows doesn't allow these)
    name = name.strip('. ')
    
    return name

def _sanitize_path_component(seg: str) -> str:
    """
    Sanitize a single path segment using the same rules as filenames.
    Does not allow path separators in the segment.
    """
    return sanitize_filename(seg or "")

def _build_target_directory(current_directory: str, scene_info: Dict[str, str], path_template: str, is_absolute: bool) -> str:
    """
    Build a target directory from a template using the same tokens as filenames.
    Special token:
      - $up -> parent directory (only meaningful in relative mode)
    Slashes (/) in the template denote subfolders.
    """
    # Replace tokens similarly to makeFilename, but allow separators
    raw = str(path_template or "")
    # Minimal token replacement, reuse makeFilename for consistency
    replaced = makeFilename(scene_info, raw)

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


def makeFilename(scene_info: Dict[str, str], query: str) -> str:
    # Trim template
    s = str(query or "").strip()

    # Replace tokens with values or empty strings
    tokens = {
        # Core
        "$id": (scene_info.get("id") or "").strip(),
        "$title": (scene_info.get("title") or "").strip(),
        "$code": (scene_info.get("code") or "").strip(),
        "$details": (scene_info.get("details") or "").strip(),
        "$director": (scene_info.get("director") or "").strip(),
        "$urls": (scene_info.get("urls") or "").strip(),
        "$date": (scene_info.get("date") or "").strip(),
        "$rating100": (scene_info.get("rating100") or "").strip(),
        "$organized": (scene_info.get("organized") or "").strip(),
        "$o_counter": (scene_info.get("o_counter") or "").strip(),
        "$interactive": (scene_info.get("interactive") or "").strip(),
        "$interactive_speed": (scene_info.get("interactive_speed") or "").strip(),
        "$created_at": (scene_info.get("created_at") or "").strip(),
        "$updated_at": (scene_info.get("updated_at") or "").strip(),
        "$last_played_at": (scene_info.get("last_played_at") or "").strip(),
        "$resume_time": (scene_info.get("resume_time") or "").strip(),
        "$play_duration": (scene_info.get("play_duration") or "").strip(),
        "$play_count": (scene_info.get("play_count") or "").strip(),
        # Collections
        "$tags": (scene_info.get("tags") or "").strip(),
        "$groups": (scene_info.get("groups") or "").strip(),
        "$scene_markers_count": (scene_info.get("scene_markers_count") or "").strip(),
        "$performers": (scene_info.get("performers") or "").strip(),
        # Back-compat
        "$performer": (scene_info.get("performer") or "").strip(),
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


def move_files_via_graphql(file_ids: List[str], destination_folder: str, destination_basename: Optional[str] = None) -> bool:
    """
    Move files using the GraphQL moveFiles mutation.
    
    Args:
        file_ids: List of file IDs to move
        destination_folder: Target directory path
        destination_basename: New filename (optional, if None uses existing basename)
    
    Returns:
        True if successful, False otherwise
    """
    mutation = """
mutation moveFiles($input: MoveFilesInput!) {
  moveFiles(input: $input)
}
"""
    
    variables = {
        "input": {
            "ids": file_ids,
            "destination_folder": destination_folder
        }
    }
    
    # Add destination_basename only if provided
    if destination_basename:
        variables["input"]["destination_basename"] = destination_basename
    
    try:
        data = __callGraphQL(mutation, variables)
        result = data.get("moveFiles", False)
        if not result:
            logPrint(f"[Error] GraphQL moveFiles returned false for files {file_ids}")
        return result
    except Exception as e:
        logPrint(f"[Error] GraphQL moveFiles failed for files {file_ids}: {e}")
        return False


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
      code
      details
      director
      urls
      date
      rating100
      organized
      o_counter
      interactive
      interactive_speed
      created_at
      updated_at
      last_played_at
      resume_time
      play_duration
      play_count
      files { id path }
      studio { name }
      performers { name gender }
      tags { name }
      groups { group { id name } }
      scene_markers { id }
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
                    # Apply client-side filters (* and **)
                    if scene_passes_filters(scene):
                        results.append(scene)
    return results

def scene_passes_filters(scene: dict) -> bool:
    """
    Apply client-side filters for fields marked with * and **:
      * scene_markers, studio, groups, tags, performers
      ** organized, interactive
    Additional: performer gender filtering for scene inclusion.
    """
    # organized / interactive (booleans)
    if "organized" in FILTERS and FILTERS.get("organized") is not None:
        if bool(scene.get("organized")) != bool(FILTERS.get("organized")):
            return False
    if "interactive" in FILTERS and FILTERS.get("interactive") is not None:
        if bool(scene.get("interactive")) != bool(FILTERS.get("interactive")):
            return False

    # scene_markers minimum
    min_markers = FILTERS.get("min_scene_markers")
    if isinstance(min_markers, int):
        markers = scene.get("scene_markers") or []
        if len(markers) < min_markers:
            return False

    # studio name set
    studio_names = FILTERS.get("studio_names")
    if studio_names:
        studio_name = ((scene.get("studio") or {}).get("name") or "").strip()
        if isinstance(studio_names, (set, list)) and studio_name not in studio_names:
            return False

    # group names set
    group_names = FILTERS.get("group_names")
    if group_names and isinstance(group_names, (set, list)):
        groups = scene.get("groups") or []
        names = [((g.get("group") or {}).get("name") or "").strip() for g in groups]
        if not any(n in group_names for n in names if n):
            return False

    # tags names set (client-side fallback if tag_ids weren't used)
    tag_names = FILTERS.get("tag_names")
    if tag_names and isinstance(tag_names, set):
        tags = scene.get("tags") or []
        names = [(t.get("name") or "").strip() for t in tags]
        if not any(n in tag_names for n in names if n):
            return False

    # performer genders filter (scene must have at least one matching)
    filter_perf_genders = FILTERS.get("performer_genders")
    if filter_perf_genders and isinstance(filter_perf_genders, set):
        performers = scene.get("performers") or []
        def _matches_gender(p):
            g = (p.get("gender") or "").upper()
            if not g:
                return "UNKNOWN" in filter_perf_genders
            return g in filter_perf_genders
        if not any(_matches_gender(p) for p in performers):
            return False

    return True


def edit_run(template: str, base_filter: Optional[dict], tag_names: Optional[List[str]], path_like: Optional[str], exclude_path_like: Optional[str], scene_ids: Optional[List[str]] = None, collect_operations: bool = False):
    """
    Run the rename operation.
    
    Args:
        collect_operations: If True, return list of operations instead of just logging them
        
    Returns:
        List of dicts with rename operations if collect_operations=True, otherwise None
    """
    operations = []
    
    if DEBUG_MODE:
        logPrint(f"[DEBUG] Starting edit_run with DRY_RUN={DRY_RUN}, PATH_TEMPLATE={'set' if PATH_TEMPLATE else 'none'}, PATH_IS_ABSOLUTE={PATH_IS_ABSOLUTE}")
    
    # Resolve tags if provided
    tag_ids: Optional[List[str]] = None
    if tag_names:
        mapping = find_tag_ids_by_names(tag_names)
        if not mapping:
            logPrint("[Warn] No tag IDs resolved; skipping tag-based selection.")
            return operations if collect_operations else None
        tag_ids = [mapping[name] for name in tag_names if name in mapping]
        if not tag_ids:
            logPrint("[Warn] No tag IDs resolved; skipping.")
            return operations if collect_operations else None

    scene_filter = build_scene_filter(base_filter, tag_ids)

    scenes = iterate_scenes(scene_filter, path_like, exclude_path_like)
    if not scenes:
        logPrint("[Warn] There are no scenes to change with this query")
        return operations if collect_operations else None

    # Filter by scene IDs if provided
    if scene_ids:
        scene_id_set = set(scene_ids)
        original_count = len(scenes)
        scenes = [scene for scene in scenes if scene.get("id") in scene_id_set]
        if DEBUG_MODE:
            logPrint(f"[DEBUG] Filtered scenes by IDs: {original_count} -> {len(scenes)} scenes")
        if not scenes:
            logPrint("[Warn] No scenes found matching the provided scene IDs")
            return operations if collect_operations else None

    logPrint(f"Scenes count: {len(scenes)}")

    for scene in scenes:
        current_path = scene.get("path")
        if not current_path:
            continue

        # Skip if scene is part of a group/movie (optional)
        if SKIP_GROUPED:
            groups = scene.get("groups") or []
            if groups:
                if DEBUG_MODE:
                    logPrint(f"[DEBUG] Skipping grouped scene (ID: {scene['id']}): {os.path.basename(current_path)}")
                continue

        current_directory = os.path.dirname(current_path)
        current_filename = os.path.basename(current_path)
        file_extension = os.path.splitext(current_filename)[1] or ""

        performers = scene.get("performers") or []
        names: List[str] = []
        for p in performers:
            # Include only selected genders for token composition if configured (supports UNKNOWN)
            if PERFORMER_GENDERS:
                g = (p.get("gender") or "").upper()
                if g in PERFORMER_GENDERS or (not g and "UNKNOWN" in PERFORMER_GENDERS):
                    names.append(p.get("name") or "")
            else:
                names.append(p.get("name") or "")
        performer_name = " ".join([n for n in names if n]).strip()

        # Derived collections for tokens
        tag_names_join = " ".join([(t.get("name") or "").strip() for t in (scene.get("tags") or []) if (t.get("name") or "").strip()])
        group_names_join = " ".join([((g.get("group") or {}).get("name") or "").strip() for g in (scene.get("groups") or []) if ((g.get("group") or {}).get("name") or "").strip()])
        urls_join = " ".join(scene.get("urls") or [])
        scene_markers_count = str(len(scene.get("scene_markers") or []))

        scene_title = scene.get("title") or ""
        scene_date = scene.get("date") or ""
        studio_name = (scene.get("studio") or {}).get("name") or ""

        scene_info = {
            # Scalars
            "id": scene.get("id") or "",
            "title": scene_title,
            "code": scene.get("code") or "",
            "details": scene.get("details") or "",
            "director": scene.get("director") or "",
            "urls": urls_join,
            "date": scene_date,
            "rating100": str(scene.get("rating100") or "") if scene.get("rating100") is not None else "",
            "organized": "true" if scene.get("organized") else "false" if scene.get("organized") is not None else "",
            "o_counter": str(scene.get("o_counter") or "") if scene.get("o_counter") is not None else "",
            "interactive": "true" if scene.get("interactive") else "false" if scene.get("interactive") is not None else "",
            "interactive_speed": str(scene.get("interactive_speed") or "") if scene.get("interactive_speed") is not None else "",
            "created_at": scene.get("created_at") or "",
            "updated_at": scene.get("updated_at") or "",
            "last_played_at": scene.get("last_played_at") or "",
            "resume_time": str(scene.get("resume_time") or "") if scene.get("resume_time") is not None else "",
            "play_duration": str(scene.get("play_duration") or "") if scene.get("play_duration") is not None else "",
            "play_count": str(scene.get("play_count") or "") if scene.get("play_count") is not None else "",
            # Collections (stringified)
            "tags": tag_names_join,
            "groups": group_names_join,
            "scene_markers_count": scene_markers_count,
            "performers": performer_name,
            # Existing
            "studio": studio_name,
            "height": "",  # Not fetched here
            "performer": performer_name,  # alias
        }
        if DEBUG_MODE:
            logPrint(f"[DEBUG] Scene information: {scene_info}")
            logPrint(f"[DEBUG] Template: {template}")

        new_filename_core = makeFilename(scene_info, template)
        if "None" in new_filename_core:
            logPrint(f"[Error] Information missing for new filename, ID: {scene['id']}")
            continue

        new_filename_core = sanitize_filename(new_filename_core)
        if not new_filename_core.strip():
            logPrint(f"[Error] New filename resolved empty for scene {scene['id']}, skipping.")
            continue
        new_filename = new_filename_core + file_extension

        # Determine target directory via path builder (absolute or relative)
        current_directory = os.path.dirname(current_path)
        if PATH_TEMPLATE:
            try:
                final_directory = _build_target_directory(
                    current_directory=current_directory,
                    scene_info=scene_info,
                    path_template=PATH_TEMPLATE,
                    is_absolute=PATH_IS_ABSOLUTE,
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
                logPrint(f"[Error] Failed to build/create target folder from template '{PATH_TEMPLATE}': {e}")
                final_directory = current_directory
        else:
            final_directory = current_directory

        new_path = os.path.join(final_directory, new_filename)

        if DEBUG_MODE:
            logPrint(f"[DEBUG] Directory check: current='{current_directory}' final='{final_directory}'")

        # Handle Windows path length limitation (try to reduce path length if too long)
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
                
                success = move_files_via_graphql(
                    file_ids=file_ids,
                    destination_folder=final_directory,
                    destination_basename=new_filename
                )
                
                if not success:
                    raise Exception("GraphQL moveFiles returned false")
                    
            except Exception as e:
                logPrint(f"[OS] File failed to rename ({current_filename}) due to: {e}")
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
            logPrint(f"[OS] File Renamed! ({current_filename})")
            if USING_LOG:
                with open("rename_log.txt", "a", encoding="utf-8") as fh:
                    print(f"{scene['id']}|{current_path}|{new_path}", file=fh)
            if collect_operations:
                operations.append({
                    "scene_id": scene['id'],
                    "title": scene_title,
                    "status": "success",
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
      - template: str, or tags + template, or config_inline [{tag, template}]
      - scene_filter: dict (GraphQL SceneFilterType), optional
      - path_like, exclude_path_like: str, optional
      - scene_ids: List[str] or comma-separated str, optional
      - performer_genders: str|List[str] for filename token composition
      - filter_performer_genders: str|List[str] for inclusion filtering
      - filter_organized: bool
      - filter_interactive: bool
      - filter_min_scene_markers: int
      - filter_studio: str|List[str]
      - filter_groups: List[str]
      - filter_tags: List[str]
      - path_template: str (optional) Directory template using same tokens as filenames.
          Special token: $up for parent (only in relative mode).
      - path_is_absolute: bool (optional) If true, build absolute path; otherwise relative to current file directory.
      - Flags: using_log, dry_run, debug_mode, skip_grouped
    """
    global USING_LOG, DRY_RUN, DEBUG_MODE, SKIP_GROUPED, CONFIG, PERFORMER_GENDERS, FILTERS, PATH_TEMPLATE, PATH_IS_ABSOLUTE

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

    # Update flags from options
    USING_LOG = options.get("using_log", USING_LOG)
    DRY_RUN = options.get("dry_run", DRY_RUN)
    DEBUG_MODE = options.get("debug_mode", DEBUG_MODE)
    SKIP_GROUPED = options.get("skip_grouped", SKIP_GROUPED)

    # Configure path builder
    PATH_TEMPLATE = options.get("path_template") or None
    PATH_IS_ABSOLUTE = bool(options.get("path_is_absolute", False))

    # Parse genders and build FILTERS
    def parse_genders(val):
        if not val:
            return None
        vals = val if isinstance(val, list) else [val]
        out = {str(v).strip().upper() for v in vals if str(v).strip()}
        # constrain to known enum values (+ UNKNOWN pseudo-gender)
        allowed = {"MALE", "FEMALE", "TRANSGENDER_MALE", "TRANSGENDER_FEMALE", "INTERSEX", "NON_BINARY", "UNKNOWN"}
        out = {g for g in out if g in allowed}
        return out or None

    PERFORMER_GENDERS = parse_genders(options.get("performer_genders"))

    # Build client-side FILTERS
    FILTERS = {}
    f_perf = parse_genders(options.get("filter_performer_genders"))
    if f_perf:
        FILTERS["performer_genders"] = f_perf
    if "filter_organized" in options:
        FILTERS["organized"] = bool(options.get("filter_organized"))
    if "filter_interactive" in options:
        FILTERS["interactive"] = bool(options.get("filter_interactive"))
    if "filter_min_scene_markers" in options:
        try:
            value = options.get("filter_min_scene_markers")
            if value is not None:
                FILTERS["min_scene_markers"] = int(value)
        except Exception:
            pass
    if "filter_studio" in options:
        v = options.get("filter_studio")
        names = v if isinstance(v, list) else [v]
        FILTERS["studio_names"] = {str(n).strip() for n in names if str(n).strip()}
    if "filter_groups" in options:
        v = options.get("filter_groups") or []
        FILTERS["group_names"] = {str(n).strip() for n in (v if isinstance(v, list) else [v]) if str(n).strip()}
    if "filter_tags" in options:
        v = options.get("filter_tags") or []
        FILTERS["tag_names"] = {str(n).strip() for n in (v if isinstance(v, list) else [v]) if str(n).strip()}

    if DRY_RUN:
        try:
            os.remove("renamer_dryrun.txt")
        except FileNotFoundError:
            pass
        logPrint("[DRY_RUN] DRY-RUN Enabled")

    # Base scene filter (GraphQL)
    base_filter: Optional[dict] = options.get("scene_filter")

    # Accept scene IDs as list or comma-separated string
    scene_ids = options.get("scene_ids")
    if isinstance(scene_ids, str):
        scene_ids = [s.strip() for s in scene_ids.split(",") if s.strip()]
    if DEBUG_MODE and scene_ids:
        logPrint(f"[DEBUG] Processing specific scene IDs: {scene_ids}")

    # Collect tag-template pairs (existing behavior)
    tag_template_pairs: List[Tuple[str, str]] = []
    config_inline = options.get("config_inline") or []
    if isinstance(config_inline, list):
        for m in config_inline:
            tag = (m.get("tag") or "").strip()
            template = (m.get("template") or "").strip()
            if tag and template:
                tag_template_pairs.append((tag, template))

    tags = options.get("tags") or []
    template = options.get("template")
    if tags and template:
        for t in tags:
            tag_template_pairs.append((t, template))

    all_operations: List[dict] = []

    if tag_template_pairs:
        # Per-tag runs
        for tag_name, tpl in tag_template_pairs:
            if not tpl or not tpl.strip():
                logPrint(f"[Warn] Empty template for tag '{tag_name}', skipping.")
                continue
            ops = edit_run(
                template=tpl,
                base_filter=base_filter,
                tag_names=[tag_name],
                path_like=options.get("path_like"),
                exclude_path_like=options.get("exclude_path_like"),
                scene_ids=scene_ids,
                collect_operations=collect_operations,
            )
            if ops:
                all_operations.extend(ops)
            logPrint("====================")
    else:
        # No-tag mode
        if template and template.strip():
            ops = edit_run(
                template=template,
                base_filter=base_filter,
                tag_names=None,
                path_like=options.get("path_like"),
                exclude_path_like=options.get("exclude_path_like"),
                scene_ids=scene_ids,
                collect_operations=collect_operations,
            )
            if ops:
                all_operations.extend(ops)
        else:
            logPrint("[Info] No tags and no template provided. Nothing to do.")

    return all_operations if collect_operations else None
