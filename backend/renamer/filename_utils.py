import os
import re
from typing import Any, Callable, Dict, List


def sanitize_filename(name: str) -> str:
    if not name:
        return ""
    name = "".join(char for char in name if ord(char) >= 32 and ord(char) != 127)
    name = re.sub(r'[<>:/\\|?*`,]+', '', name)
    name = re.sub(r'&', 'and', name)
    name = re.sub(r"(?<=\\w)'(?=\\w)|(?<=\\w)'(?=\\s|$)", '', name)
    name = re.sub(r'\s{2,}', ' ', name)
    name = re.sub(r'(?<!\.)\.{3}(?!\.)', '.', name)
    return name.strip('. ')


def sanitize_path_component(seg: str) -> str:
    return sanitize_filename(seg or "")


def apply_extension_if_missing(filename_core: str, file_extension: str) -> str:
    core = str(filename_core or "")
    ext = str(file_extension or "")
    if not ext:
        return core
    if core.lower().endswith(ext.lower()):
        return core
    return core + ext


def build_target_directory(
    current_directory: str,
    tag_context: Dict[str, object],
    path_template: str,
    make_filename: Callable[[str, Dict[str, object]], str],
) -> str:
    raw = str(path_template or "")
    is_absolute = raw.startswith("/") or raw.startswith("\\")
    replaced = make_filename(raw, tag_context)
    replaced = replaced.replace("$up", "..")
    replaced = re.sub(r"[\\/]+", "/", replaced).strip()
    parts = [p.strip() for p in replaced.split("/")]

    if is_absolute:
        stack: List[str] = []
        for seg in parts:
            if not seg or seg == ".":
                continue
            if seg == "..":
                if stack:
                    stack.pop()
                continue
            stack.append(sanitize_path_component(seg))
        return os.sep + os.path.join(*stack) if stack else os.sep

    base = current_directory
    for seg in parts:
        if not seg or seg == ".":
            continue
        if seg == "..":
            parent = os.path.dirname(base.rstrip(os.sep)) or base
            base = parent if parent else base
        else:
            base = os.path.join(base, sanitize_path_component(seg))
    return base


def make_filename(query: str, tag_context: Dict[str, object], tag_render: Callable[[str, Dict[str, object]], str], extract_exprs: Callable[[str], List[str]], resolve_expr: Callable[[str, Dict[str, object]], Any]) -> str:
    token_re = re.compile(
        r"\$[A-Za-z_]\w*(?:\[[^\]]+\]|\.[A-Za-z_]\w*|\.\[[^\]]+\])*"
    )

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
                exprs = extract_exprs(inner_raw)
                if not exprs:
                    return inner_processed if inner_processed.strip() else ""
                all_have_value = all(
                    not _is_empty_value(resolve_expr(expr, tag_context))
                    for expr in exprs
                )
                if not all_have_value:
                    return ""
                return tag_render(inner_processed, tag_context)

            new_s = pattern.sub(repl, s)
            if not changed:
                return s
            s = new_s

    def _find_top_level_chooser(expr: str) -> int:
        depth_curly = 0
        depth_bracket = 0
        depth_paren = 0
        for i, ch in enumerate(expr or ""):
            if ch == "{":
                depth_curly += 1
                continue
            if ch == "}":
                depth_curly = max(0, depth_curly - 1)
                continue
            if ch == "[":
                depth_bracket += 1
                continue
            if ch == "]":
                depth_bracket = max(0, depth_bracket - 1)
                continue
            if ch == "(":
                depth_paren += 1
                continue
            if ch == ")":
                depth_paren = max(0, depth_paren - 1)
                continue
            if ch != ":":
                continue
            if depth_curly or depth_bracket or depth_paren:
                continue
            nxt = expr[i + 1] if i + 1 < len(expr) else ""
            if i == 1 and expr[0].isalpha() and nxt in ("/", "\\"):
                continue
            return i
        return -1

    def _is_effectively_empty_rendered(text: Any) -> bool:
        s = str(text or "").strip()
        if not s:
            return True
        compact = re.sub(r"[-–—_:|,.\s]+", "", s)
        return compact == ""

    def _find_braced_left_operand(expr: str, end_idx: int) -> Any:
        depth = 1
        i = end_idx - 1
        while i >= 0:
            ch = expr[i]
            if ch == "}":
                depth += 1
            elif ch == "{":
                depth -= 1
                if depth == 0:
                    return i, end_idx + 1
            i -= 1
        return None

    def _find_braced_right_operand(expr: str, start_idx: int) -> Any:
        depth = 1
        i = start_idx + 1
        while i < len(expr):
            ch = expr[i]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return start_idx, i + 1
            i += 1
        return None

    def _find_left_operand_bounds(expr: str, colon_idx: int) -> Any:
        i = colon_idx - 1
        while i >= 0 and expr[i].isspace():
            i -= 1
        if i < 0:
            return None
        if expr[i] == "}":
            return _find_braced_left_operand(expr, i)
        prefix = expr[: i + 1]
        matches = list(token_re.finditer(prefix))
        if not matches:
            return None
        last = matches[-1]
        if last.end() == i + 1:
            return last.start(), last.end()
        return None

    def _find_right_operand_bounds(expr: str, colon_idx: int) -> Any:
        i = colon_idx + 1
        while i < len(expr) and expr[i].isspace():
            i += 1
        if i >= len(expr):
            return None
        if expr[i] == "{":
            return _find_braced_right_operand(expr, i)
        match = token_re.match(expr, i)
        if match:
            return match.start(), match.end()
        return None

    def _eval_inline_chooser(expr: str) -> Any:
        split_idx = _find_top_level_chooser(expr)
        if split_idx < 0:
            return None

        left_bounds = _find_left_operand_bounds(expr, split_idx)
        right_bounds = _find_right_operand_bounds(expr, split_idx)
        if left_bounds is None or right_bounds is None:
            return None

        l_start, l_end = left_bounds
        r_start, r_end = right_bounds
        left_raw = expr[l_start:l_end]
        right_raw = expr[r_start:r_end]

        left_val = _eval_template_expr(left_raw)
        chosen = left_val
        if _is_effectively_empty_rendered(left_val):
            chosen = _eval_template_expr(right_raw)

        return expr[:l_start] + chosen + expr[r_end:]

    def _eval_template_expr(expr: str) -> str:
        raw = str(expr or "").strip()
        if not raw:
            return ""

        inline = _eval_inline_chooser(raw)
        if inline is not None:
            return _eval_template_expr(inline)

        split_idx = _find_top_level_chooser(raw)
        if split_idx >= 0:
            left_raw = raw[:split_idx]
            right_raw = raw[split_idx + 1 :]
            left_val = _eval_template_expr(left_raw)
            if not _is_effectively_empty_rendered(left_val):
                return left_val
            return _eval_template_expr(right_raw)

        processed = _render_conditionals(raw)
        return tag_render(processed, tag_context)

    s = _eval_template_expr(str(query or "").strip())
    s = re.sub(r"(?:\s*-\s*){2,}", " - ", s)
    s = re.sub(r"^\s*[-–—_:|,]+\s*", "", s)
    s = re.sub(r"\s*[-–—_:|,]+\s*$", "", s)
    s = re.sub(r"\[\W*\]", "", s)
    s = re.sub(r"\(\W*\)", "", s)
    s = re.sub(r"\{\W*\}", "", s)
    return re.sub(r"\s{2,}", " ", s).strip()
