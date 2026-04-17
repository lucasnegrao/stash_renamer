from typing import Any, Dict, List, Optional


def extract_scenes_from_data(data: Dict[str, Any], path: Optional[str]) -> List[dict]:
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


def normalize_scenes(scenes: List[dict]) -> List[dict]:
    out: List[dict] = []
    for scene in scenes:
        if not isinstance(scene, dict):
            continue
        files = scene.get("files") or []
        if not scene.get("path") and isinstance(files, list) and files and isinstance(files[0], dict):
            scene["path"] = files[0].get("path")
        out.append(scene)
    return out


def exclude_scenes_by_ids(scenes: List[dict], excluded_ids: List[str]) -> List[dict]:
    excluded_set = {str(x).strip() for x in (excluded_ids or []) if str(x).strip()}
    if not excluded_set:
        return scenes
    return [s for s in scenes if str((s or {}).get("id") or "").strip() not in excluded_set]


def build_field_tree_from_templates(filename_template: str, path_template: Optional[str], tagger) -> Dict[str, Any]:
    def add_path(tree: Dict[str, Any], path: List[str]) -> None:
        if not path:
            return
        node = tree
        for key in path:
            if key not in node or not isinstance(node.get(key), dict):
                node[key] = {}
            node = node[key]

    tree: Dict[str, Any] = {}
    add_path(tree, ["id"])
    add_path(tree, ["title"])
    add_path(tree, ["files", "id"])
    add_path(tree, ["files", "path"])

    templates = [filename_template or "", path_template or ""]
    for tpl in templates:
        if not tagger:
            continue
        for expr in tagger.extract_expressions(tpl):
            root, segments = tagger.parse_expression(expr)
            attr_path = [str(v) for t, v in segments if t == "attr"]
            if root == "scene":
                if attr_path and attr_path[0] == "year":
                    add_path(tree, ["date"])
                    continue
                if attr_path and not tagger.has_root_field("scene", attr_path[0]):
                    continue
                add_path(tree, attr_path)
            elif root == "performer":
                if attr_path and not tagger.has_root_field("performer", attr_path[0]):
                    continue
                add_path(tree, ["performers"] + attr_path)
            elif root == "group":
                if attr_path and not tagger.has_root_field("group", attr_path[0]):
                    continue
                add_path(tree, ["groups", "group"] + attr_path)

    groups_node = tree.get("groups")
    if isinstance(groups_node, dict):
        groups_node.setdefault("scene_index", {})
        group_node = groups_node.get("group")
        if not isinstance(group_node, dict):
            groups_node["group"] = {"id": {}, "name": {}}
        else:
            group_node.setdefault("id", {})
            group_node.setdefault("name", {})

    if "performers" in tree and isinstance(tree["performers"], dict):
        tree["performers"].setdefault("name", {})

    return tree


def field_tree_to_selection(tree: Dict[str, Any]) -> str:
    def is_leaf(node: Any) -> bool:
        return not isinstance(node, dict) or len(node) == 0

    parts: List[str] = []
    for field in sorted(tree.keys()):
        node = tree[field]
        if is_leaf(node):
            parts.append(field)
        else:
            parts.append(f"{field} {{ {field_tree_to_selection(node)} }}")
    return " ".join(parts)


def build_find_scenes_query(filename_template: str, path_template: Optional[str], tagger) -> str:
    tree = build_field_tree_from_templates(filename_template, path_template, tagger)
    selection = field_tree_to_selection(tree)
    return (
        "query findScenes($filter: FindFilterType!, $scene_filter: SceneFilterType, $ids: [ID!]) { "
        "findScenes(filter: $filter, scene_filter: $scene_filter, ids: $ids) { "
        f"scenes {{ {selection} }} "
        "} }"
    )


def fetch_scenes_by_filters(
    gql_call,
    tagger,
    scene_filter: Optional[dict],
    ids: Optional[List[str]],
    find_filter: Optional[dict],
    filename_template: str,
    path_template: Optional[str],
) -> List[dict]:
    ff = (find_filter or {}).copy()
    per_page = int(ff.get("per_page") or 250)
    if per_page <= 0:
        per_page = 250
    page = int(ff.get("page") or 1)
    if page <= 0:
        page = 1

    find_scenes_query = build_find_scenes_query(filename_template, path_template, tagger)

    if ids:
        single_filter = ff.copy()
        single_filter["page"] = 1
        single_filter["per_page"] = max(per_page, len(ids))
        variables = {
            "filter": single_filter,
            "scene_filter": scene_filter,
            "ids": ids,
        }
        data = gql_call(find_scenes_query, variables)
        scenes = ((data or {}).get("findScenes") or {}).get("scenes") or []
        return [s for s in scenes if isinstance(s, dict)]

    all_scenes: List[dict] = []
    while True:
        page_filter = ff.copy()
        page_filter["per_page"] = per_page
        page_filter["page"] = page
        variables = {
            "filter": page_filter,
            "scene_filter": scene_filter,
            "ids": None,
        }
        data = gql_call(find_scenes_query, variables)
        scenes = ((data or {}).get("findScenes") or {}).get("scenes") or []
        page_scenes = [s for s in scenes if isinstance(s, dict)]
        all_scenes.extend(page_scenes)
        if len(page_scenes) < per_page:
            break
        page += 1
    return all_scenes


def scene_missing_fields(scene: Dict[str, Any], tree: Dict[str, Any]) -> bool:
    for key, child in tree.items():
        if key not in scene or scene.get(key) is None:
            return True
        if not isinstance(child, dict) or not child:
            continue
        value = scene.get(key)
        if isinstance(value, dict):
            if scene_missing_fields(value, child):
                return True
            continue
        if isinstance(value, list):
            if not value:
                continue
            first = value[0]
            if isinstance(first, dict) and scene_missing_fields(first, child):
                return True
            continue
        return True
    return False


def merge_scene_data(base: Any, extra: Any) -> Any:
    if isinstance(base, dict) and isinstance(extra, dict):
        out = dict(base)
        for key, extra_value in extra.items():
            base_value = out.get(key)
            if key not in out or base_value in (None, "", [], {}):
                out[key] = extra_value
            else:
                out[key] = merge_scene_data(base_value, extra_value)
        return out

    if isinstance(base, list) and isinstance(extra, list):
        if not base:
            return list(extra)
        merged: List[Any] = []
        max_len = max(len(base), len(extra))
        for i in range(max_len):
            if i < len(base) and i < len(extra):
                merged.append(merge_scene_data(base[i], extra[i]))
            elif i < len(base):
                merged.append(base[i])
            else:
                merged.append(extra[i])
        return merged

    return base


def fetch_scene_by_id_for_templates(
    gql_call,
    tagger,
    scene_id: str,
    filename_template: str,
    path_template: Optional[str],
) -> Optional[dict]:
    tree = build_field_tree_from_templates(filename_template, path_template, tagger)
    selection = field_tree_to_selection(tree)
    query = (
        "query previewSceneById($filter: FindFilterType!, $ids: [ID!]) { "
        "findScenes(filter: $filter, ids: $ids) { "
        f"scenes {{ {selection} }} "
        "} }"
    )
    variables = {
        "filter": {"page": 1, "per_page": 1},
        "ids": [scene_id],
    }
    data = gql_call(query, variables)
    scenes = ((data or {}).get("findScenes") or {}).get("scenes") or []
    if not scenes:
        return None
    first = scenes[0]
    return first if isinstance(first, dict) else None
