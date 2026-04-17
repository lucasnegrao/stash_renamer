import re
from typing import Any, Callable, Dict, List, Optional, Set, Tuple

from backend.services.graphql_queries import INTROSPECTION_TYPE_QUERY


class GraphQLTagger:
    """Resolves template tags from introspected GraphQL roots."""

    _TOKEN_RE = re.compile(r"\$([A-Za-z_]\w*(?:\[[^\]]+\]|\.[A-Za-z_]\w*|\.\[[^\]]+\])*)")

    def __init__(self, gql_call: Callable[[str, Optional[dict]], dict], root_types: Dict[str, str]):
        self._gql_call = gql_call
        self._root_types = root_types
        self._fields_by_root: Dict[str, Set[str]] = {}

    def introspect(self) -> None:
        fields_by_root: Dict[str, Set[str]] = {}
        for root_name, gql_type_name in self._root_types.items():
            data = self._gql_call(INTROSPECTION_TYPE_QUERY, {"typeName": gql_type_name})
            type_info = (data or {}).get("__type") or {}
            fields = type_info.get("fields") or []
            fields_by_root[root_name] = {
                (f.get("name") or "").strip()
                for f in fields
                if (f.get("name") or "").strip()
            }
        self._fields_by_root = fields_by_root

    def is_ready(self) -> bool:
        return bool(self._fields_by_root)

    def available_roots(self) -> List[str]:
        return sorted(self._root_types.keys())

    def available_fields(self, root: str) -> List[str]:
        return sorted(list(self._fields_by_root.get(root, set())))

    def has_root_field(self, root: str, field: str) -> bool:
        if not self.is_ready():
            return True
        known = self._fields_by_root.get(root)
        if known is None:
            return False
        return field in known

    def render(self, template: str, context: Dict[str, Any]) -> str:
        def repl(match: re.Match) -> str:
            expr = match.group(1)
            value = self._resolve_expr(expr, context)
            return self._stringify(value)

        return self._TOKEN_RE.sub(repl, template or "")

    def extract_expressions(self, template: str) -> List[str]:
        return [m.group(1) for m in self._TOKEN_RE.finditer(template or "")]

    def parse_expression(self, expr: str) -> Tuple[str, List[Tuple[str, Any]]]:
        return self._parse_expr(expr)

    def resolve_expression(self, expr: str, context: Dict[str, Any]) -> Any:
        return self._resolve_expr(expr, context)

    def _resolve_expr(self, expr: str, context: Dict[str, Any]) -> Any:
        root, segments = self._parse_expr(expr)
        if not root:
            return ""

        # Special virtual tag: $scene.year -> first 4 digits from $scene.date
        if root == "scene" and len(segments) == 1 and segments[0][0] == "attr" and segments[0][1] == "year":
            scene_obj = context.get("scene")
            if isinstance(scene_obj, dict):
                date_val = scene_obj.get("date")
                if date_val is None:
                    return ""
                m = re.match(r"\s*(\d{4})", str(date_val))
                return m.group(1) if m else ""
            return ""

        value = context.get(root)
        if value is None:
            return ""

        # If introspection is loaded and first access is a property, enforce known root fields.
        if segments and segments[0][0] == "attr" and self.is_ready():
            known = self._fields_by_root.get(root)
            if known is not None and segments[0][1] not in known:
                return ""

        for seg_type, seg_value in segments:
            if value is None:
                return ""
            if seg_type == "attr":
                value = self._access_attr(value, seg_value)
            else:
                value = self._access_index(value, seg_value)
        return value

    def _parse_expr(self, expr: str) -> Tuple[str, List[Tuple[str, Any]]]:
        i = 0
        n = len(expr)
        root_chars: List[str] = []
        while i < n and (expr[i].isalnum() or expr[i] == "_"):
            root_chars.append(expr[i])
            i += 1
        root = "".join(root_chars)
        segments: List[Tuple[str, Any]] = []
        while i < n:
            ch = expr[i]
            if ch == ".":
                i += 1
                if i < n and expr[i] == "[":
                    key, i = self._parse_bracket(expr, i)
                    segments.append(("index", key))
                    continue
                start = i
                while i < n and (expr[i].isalnum() or expr[i] == "_"):
                    i += 1
                if i > start:
                    segments.append(("attr", expr[start:i]))
                continue
            if ch == "[":
                key, i = self._parse_bracket(expr, i)
                segments.append(("index", key))
                continue
            i += 1
        return root, segments

    def _parse_bracket(self, expr: str, i: int) -> Tuple[Any, int]:
        # expr[i] == '['
        i += 1
        start = i
        depth = 1
        while i < len(expr) and depth > 0:
            if expr[i] == "[":
                depth += 1
            elif expr[i] == "]":
                depth -= 1
                if depth == 0:
                    break
            i += 1
        raw = expr[start:i].strip()
        i += 1  # skip closing ]
        if (raw.startswith('"') and raw.endswith('"')) or (raw.startswith("'") and raw.endswith("'")):
            return raw[1:-1], i
        if raw.isdigit():
            return int(raw), i
        return raw, i

    def _access_attr(self, value: Any, key: str) -> Any:
        if isinstance(value, list):
            out = []
            for item in value:
                item_u = self._unwrap_single_nested(item) if isinstance(item, dict) else item
                if isinstance(item_u, dict) and key in item_u:
                    out.append(item_u.get(key))
                elif hasattr(item_u, key):
                    out.append(getattr(item_u, key))
            return out
        if isinstance(value, dict):
            value_u = self._unwrap_single_nested(value)
            if isinstance(value_u, dict):
                return value_u.get(key)
            return None
        if hasattr(value, key):
            return getattr(value, key)
        return None

    def _access_index(self, value: Any, key: Any) -> Any:
        if isinstance(value, list):
            if isinstance(key, int):
                if 0 <= key < len(value):
                    return value[key]
                return None
            if isinstance(key, str):
                out = []
                for item in value:
                    v = self._access_index(item, key)
                    if v is None:
                        v = self._access_attr(item, key)
                    if v is not None:
                        out.append(v)
                return out
            return None
        if isinstance(value, dict):
            value_u = self._unwrap_single_nested(value)
            if isinstance(value_u, dict):
                return value_u.get(key)
            if isinstance(value_u, list) and isinstance(key, int):
                if 0 <= key < len(value_u):
                    return value_u[key]
                return None
            return None
        return None

    def _stringify(self, value: Any) -> str:
        parts = self._flatten(value)
        return " ".join([p for p in parts if p]).strip()

    def _flatten(self, value: Any) -> List[str]:
        if value is None:
            return []
        if isinstance(value, (str, int, float, bool)):
            return [str(value)]
        if isinstance(value, list):
            out: List[str] = []
            for item in value:
                out.extend(self._flatten(item))
            return out
        if isinstance(value, dict):
            if isinstance(value.get("name"), (str, int, float, bool)):
                return [str(value.get("name"))]
            out: List[str] = []
            for v in value.values():
                out.extend(self._flatten(v))
            return out
        return [str(value)]

    def _unwrap_single_nested(self, value: Dict[str, Any]) -> Any:
        """
        Some GraphQL relations are wrapped like {"group": {...}}.
        If there is a single nested dict/list value, expose it for attribute access.
        """
        current: Any = value
        while isinstance(current, dict) and len(current) == 1:
            only_val = next(iter(current.values()))
            if isinstance(only_val, (dict, list)):
                current = only_val
                continue
            break
        return current

    def _unwrap_gql_type(self, type_info: Optional[dict]) -> Dict[str, Any]:
        cur = type_info or {}
        is_list = False
        guard = 0
        while isinstance(cur, dict) and guard < 24:
            guard += 1
            kind = cur.get("kind")
            if kind == "NON_NULL":
                cur = cur.get("ofType") or {}
                continue
            if kind == "LIST":
                is_list = True
                cur = cur.get("ofType") or {}
                continue
            break
        kind = (cur or {}).get("kind")
        name = (cur or {}).get("name")
        return {
            "kind": kind,
            "name": name,
            "is_list": is_list,
            "is_object_like": kind in ("OBJECT", "INTERFACE", "UNION"),
        }

    def _introspect_type_fields(self, type_name: str) -> List[dict]:
        try:
            data = self._gql_call(INTROSPECTION_TYPE_QUERY, {"typeName": type_name})
            type_info = (data or {}).get("__type") or {}
            fields = type_info.get("fields") or []
            return [f for f in fields if isinstance(f, dict) and f.get("name")]
        except Exception:
            return []

    def _build_scene_selector_node(
        self,
        field_name: str,
        field_meta: Dict[str, Any],
        prefix: str,
        nested_type_cache: Dict[str, List[dict]],
        visited_types: List[str],
        depth: int,
        max_depth: int = 3,
    ) -> Dict[str, Any]:
        node: Dict[str, Any] = {
            "name": field_name,
            "token": prefix,
            "kind": field_meta.get("kind"),
            "is_list": bool(field_meta.get("is_list")),
            "children": [],
        }

        # For list fields (including scalar lists like [String]),
        # expose an explicit index token so UI doesn't treat them as single values only.
        if node["is_list"]:
            node["children"].append(
                {
                    "name": "[0]",
                    "token": f"{prefix}[0]",
                    "kind": field_meta.get("kind"),
                    "is_list": False,
                    "children": [],
                }
            )

        if depth >= max_depth:
            return node

        nested_type_name = str(field_meta.get("name") or "")
        is_object_like = bool(field_meta.get("is_object_like"))
        if not (is_object_like and nested_type_name):
            return node
        if nested_type_name in visited_types:
            return node

        if nested_type_name not in nested_type_cache:
            nested_type_cache[nested_type_name] = self._introspect_type_fields(
                nested_type_name
            )

        next_visited = [*visited_types, nested_type_name]
        for sub in nested_type_cache[nested_type_name]:
            sub_name = str(sub.get("name") or "")
            if not sub_name:
                continue
            sub_meta = self._unwrap_gql_type(sub.get("type"))
            token = (
                f"{prefix}[0].{sub_name}"
                if node["is_list"]
                else f"{prefix}.{sub_name}"
            )
            child = self._build_scene_selector_node(
                sub_name,
                sub_meta,
                token,
                nested_type_cache,
                next_visited,
                depth + 1,
                max_depth=max_depth,
            )
            node["children"].append(child)

        return node

    def build_selectors_catalog(self) -> Dict[str, Any]:
        roots: List[Dict[str, Any]] = []
        fields_by_root: Dict[str, List[str]] = {}
        scene_tree: List[Dict[str, Any]] = []

        if self.is_ready():
            for root in self.available_roots():
                root_fields = self.available_fields(root)
                fields_by_root[root] = root_fields
                roots.append(
                    {
                        "root": root,
                        "token": f"${root}",
                        "fields": root_fields,
                        "examples": [
                            f"${root}.{root_fields[0]}" if root_fields else f"${root}.id",
                            f"${root}[0].{root_fields[0]}"
                            if root_fields
                            else f"${root}[0].id",
                        ],
                    }
                )

            scene_fields = self._introspect_type_fields("Scene")
            nested_type_cache: Dict[str, List[dict]] = {}
            seen_scene_tokens = set()

            for field in scene_fields:
                field_name = str(field.get("name") or "")
                if not field_name:
                    continue
                type_meta = self._unwrap_gql_type(field.get("type"))
                node = self._build_scene_selector_node(
                    field_name=field_name,
                    field_meta=type_meta,
                    prefix=f"$scene.{field_name}",
                    nested_type_cache=nested_type_cache,
                    visited_types=["Scene"],
                    depth=0,
                )
                scene_tree.append(node)
                seen_scene_tokens.add(node.get("token"))

            for root_field in fields_by_root.get("scene", []):
                token = f"$scene.{root_field}"
                if token in seen_scene_tokens:
                    continue
                scene_tree.append(
                    {
                        "name": root_field,
                        "token": token,
                        "kind": None,
                        "is_list": False,
                        "children": [],
                    }
                )
                seen_scene_tokens.add(token)

            scene_tree.sort(key=lambda n: str(n.get("token") or ""))
        else:
            for root in ["scene", "performer", "group"]:
                roots.append(
                    {
                        "root": root,
                        "token": f"${root}",
                        "fields": [],
                        "examples": [f"${root}.id", f"${root}[0].id"],
                    }
                )

        return {
            "roots": roots,
            "fields_by_root": fields_by_root,
            "scene_tree": scene_tree,
            "virtual_selectors": [
                {
                    "selector": "$scene.year",
                    "description": "Derived from $scene.date (first 4 digits)",
                }
            ],
            "syntax": {
                "dot": "$scene.title",
                "index": "$performer[0].name",
                "nested": "$scene.studio.name",
                "conditional": "{ $scene.date } - $scene.title",
            },
        }
