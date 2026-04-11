import re
from typing import Any, Callable, Dict, List, Optional, Set, Tuple

from graphql_queries import INTROSPECTION_TYPE_QUERY


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

    def render(self, template: str, context: Dict[str, Any]) -> str:
        def repl(match: re.Match) -> str:
            expr = match.group(1)
            value = self._resolve_expr(expr, context)
            return self._stringify(value)

        return self._TOKEN_RE.sub(repl, template or "")

    def _resolve_expr(self, expr: str, context: Dict[str, Any]) -> Any:
        root, segments = self._parse_expr(expr)
        if not root:
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
                if isinstance(item, dict) and key in item:
                    out.append(item.get(key))
                elif hasattr(item, key):
                    out.append(getattr(item, key))
            return out
        if isinstance(value, dict):
            return value.get(key)
        if hasattr(value, key):
            return getattr(value, key)
        return None

    def _access_index(self, value: Any, key: Any) -> Any:
        if isinstance(value, list):
            if isinstance(key, int):
                if 0 <= key < len(value):
                    return value[key]
                return None
            return None
        if isinstance(value, dict):
            return value.get(key)
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
