from typing import Any, Dict
from backend.handlers.context import AppContext


def handle_list_selectors(options: Dict[str, Any], ctx: AppContext):
    return ctx.tagger.build_selectors_catalog()
