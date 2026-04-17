import json
from typing import Any, Dict, List, Optional

from backend.filter.criteria import build_scene_filter, combine_scene_filters
from backend.filter.scenes import exclude_scenes_by_ids, fetch_scenes_by_filters
from backend.renamer.engine import RenamerEngine
from backend.services.file_mover import FileMover
from backend.services.graphql import GraphQLConfig, GraphQLService
from backend.services.logger import LoggerService
from backend.stores.template_store import TemplateStoreService
from backend.template_system.tagger import GraphQLTagger
from backend.services.undo_service import UndoService

HOOK_BATCH_ID = "stash_renamer_hook_batch"


def _ensure_list_of_strings(value: Any, field_name: str) -> List[str]:
    if value is None:
        return []
    if not isinstance(value, list):
        raise ValueError(f"'{field_name}' must be a list")
    return [str(x).strip() for x in value if str(x).strip()]


def _ensure_list_of_dicts(value: Any, field_name: str) -> List[dict]:
    if value is None:
        return []
    if not isinstance(value, list):
        raise ValueError(f"'{field_name}' must be a list")
    out: List[dict] = []
    for item in value:
        if not isinstance(item, dict):
            raise ValueError(f"'{field_name}' entries must be objects")
        out.append(item)
    return out


def _to_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    if value is None:
        return False
    return str(value).strip().lower() in ("true", "1", "yes", "on")


def _criteria_from_filter_object(filter_obj: Any) -> List[dict]:
    if not isinstance(filter_obj, dict):
        return []
    criteria = filter_obj.get("criteria")
    return _ensure_list_of_dicts(criteria, "filter.criteria")


def run(options: dict, collect_operations: bool = False):
    server_url = options.get("server_url")
    cookie_name = options.get("cookie_name")
    cookie_value = options.get("cookie_value")
    if not server_url or not cookie_name or not cookie_value:
        raise ValueError("server_url, cookie_name, and cookie_value are required in options")

    mode = str(options.get("mode") or "").strip().lower()
    if not mode:
        raise ValueError("mode is required")
    if mode == "dry_run":
        raise ValueError("mode='dry_run' is not supported; use mode='rename' with dry_run=true")

    using_log = _to_bool(options.get("using_log", True))
    dry_run = _to_bool(options.get("dry_run", False))
    debug_mode = _to_bool(options.get("debug_mode", True))

    gql = GraphQLService(
        GraphQLConfig(
            server_url=str(server_url),
            cookie_name=str(cookie_name),
            cookie_value=str(cookie_value),
        )
    )
    logger = LoggerService(debug_mode=debug_mode)

    mover = FileMover(
        gql_call=gql.call,
        db_path=str(options.get("operations_db_path") or "rename_operations.db"),
        log_print=logger.log if using_log else (lambda _msg: None),
    )

    tagger = GraphQLTagger(
        gql_call=gql.call,
        root_types={"scene": "Scene", "group": "Group", "performer": "Performer"},
    )
    try:
        tagger.introspect()
        if debug_mode:
            logger.log(f"[DEBUG] Tagger ready with roots: {', '.join(tagger.available_roots())}")
    except Exception as e:
        logger.log(f"[Warn] GraphQL introspection failed, template tags may be incomplete: {e}")

    templates = TemplateStoreService(mover)
    undo = UndoService(mover)
    engine = RenamerEngine(
        gql_call=gql.call,
        tagger=tagger,
        mover=mover,
        logger=logger,
        dry_run=dry_run,
        debug_mode=debug_mode,
    )

    try:
        logger.emit_progress(0.0)

        if mode == "undo":
            undo_operation_id = str(options.get("undo_operation_id") or "").strip()
            if not undo_operation_id:
                raise ValueError("undo_operation_id is required for mode=undo")
            undo_result = undo.undo_rename(undo_operation_id)
            return [undo_result] if collect_operations else None

        if mode == "list_operations":
            ops = undo.list_operations()
            return ops if collect_operations else None

        if mode == "list_operation_batches":
            return {"batches": undo.list_batches()}

        if mode == "list_batch_operations":
            batch_id = str(options.get("batch_id") or "")
            if not batch_id:
                raise ValueError("batch_id is required for list_batch_operations")
            return {"operations": undo.list_batch_operations(batch_id=batch_id)}

        if mode == "undo_batch_operation":
            batch_id = str(options.get("batch_id") or "")
            if not batch_id:
                raise ValueError("batch_id is required for undo_batch_operation")
            return undo.undo_batch(batch_id=batch_id)

        if mode == "clear_history":
            return undo.clear_history()

        if mode == "list_selectors":
            return tagger.build_selectors_catalog()

        if mode == "list_templates":
            return {"templates": templates.list_templates()}

        if mode == "save_template":
            template_name = str(options.get("template_name") or "").strip()
            filename_tpl = str(options.get("filename_template") or "").strip()
            path_tpl = str(options.get("path_template") or "")
            filter_json = ""
            if options.get("filter") is not None:
                try:
                    filter_json = json.dumps(options.get("filter"), ensure_ascii=False)
                except Exception as e:
                    raise ValueError(f"Invalid filter payload: {e}")
            if not template_name:
                raise ValueError("template_name is required for save_template")
            if not filename_tpl:
                raise ValueError("filename_template is required for save_template")
            return {
                "template": templates.save_template(
                    name=template_name,
                    filename_template=filename_tpl,
                    path_template=path_tpl,
                    filter_json=filter_json,
                )
            }

        if mode == "update_template":
            template_id = str(options.get("template_id") or "").strip()
            template_name = str(options.get("template_name") or "").strip()
            filename_tpl = str(options.get("filename_template") or "").strip()
            path_tpl = str(options.get("path_template") or "")
            filter_json = ""
            if options.get("filter") is not None:
                try:
                    filter_json = json.dumps(options.get("filter"), ensure_ascii=False)
                except Exception as e:
                    raise ValueError(f"Invalid filter payload: {e}")
            if not template_id:
                raise ValueError("template_id is required for update_template")
            if not template_name:
                raise ValueError("template_name is required for update_template")
            if not filename_tpl:
                raise ValueError("filename_template is required for update_template")
            updated = templates.update_template(
                template_id=template_id,
                name=template_name,
                filename_template=filename_tpl,
                path_template=path_tpl,
                filter_json=filter_json,
            )
            if not updated:
                raise ValueError(f"Template not found: {template_id}")
            return {"template": updated}

        if mode == "get_hook_settings":
            hook_type = str(options.get("hook_type") or "Scene.Update.Post")
            return {"hook_settings": templates.get_hook_settings(hook_type=hook_type)}

        if mode == "save_hook_settings":
            hook_type = str(options.get("hook_type") or "Scene.Update.Post")
            enabled = _to_bool(options.get("enabled", False))
            template_ids = _ensure_list_of_strings(options.get("template_ids"), "template_ids")
            saved = templates.save_hook_settings(
                hook_type=hook_type,
                enabled=enabled,
                template_ids=template_ids,
            )
            return {"hook_settings": saved}

        if mode == "run_hook":
            hook_context = options.get("hookContext")
            if not isinstance(hook_context, dict):
                raise ValueError("hookContext is required for run_hook")

            hook_type = str(hook_context.get("type") or options.get("hook_type") or "").strip()
            if not hook_type:
                raise ValueError("hookContext.type is required for run_hook")
            object_id = str(hook_context.get("id") or "").strip()
            if not object_id:
                raise ValueError("hookContext.id is required for run_hook")

            hook_settings = templates.get_hook_settings(hook_type=hook_type)
            if not hook_settings.get("enabled"):
                return {
                    "hook_type": hook_type,
                    "scene_id": object_id,
                    "enabled": False,
                    "executed": [],
                }

            template_ids = _ensure_list_of_strings(
                hook_settings.get("template_ids"),
                "hook_settings.template_ids",
            )
            configured_templates = templates.list_templates_by_ids(template_ids=template_ids)
            if not configured_templates:
                return {
                    "hook_type": hook_type,
                    "scene_id": object_id,
                    "enabled": True,
                    "executed": [],
                }

            executed: List[Dict[str, Any]] = []
            for row in configured_templates:
                template_id = str(row.get("id") or "")
                template_name = str(row.get("name") or "")
                filename_template = str(row.get("filename_template") or "").strip()
                path_template = row.get("path_template") or None
                if not template_id or not filename_template:
                    continue

                parsed_filter: Dict[str, Any] = {}
                raw_filter_json = str(row.get("filter_json") or "").strip()
                if debug_mode:
                    logger.log(
                        f"[DEBUG] Hook template '{template_name}' ({template_id}) raw filter_json: {raw_filter_json}"
                    )
                if raw_filter_json:
                    try:
                        parsed_filter = json.loads(raw_filter_json)
                    except Exception:
                        parsed_filter = {}
                criteria_opt = _criteria_from_filter_object(parsed_filter)
                if debug_mode:
                    logger.log(
                        "[DEBUG] Hook template "
                        f"'{template_name}' ({template_id}) criteria from DB: "
                        f"{json.dumps(criteria_opt, ensure_ascii=False)}"
                    )
                scene_filter = build_scene_filter(
                    None,
                    criteria_opt,
                    debug_log=logger.log if debug_mode else None,
                )
                scene_filter_for_object = scene_filter
                object_id_int: Optional[int] = None
                try:
                    object_id_int = int(object_id)
                except Exception:
                    object_id_int = None

                if object_id_int is not None:
                    id_filter = {"id": {"modifier": "EQUALS", "value": object_id_int}}
                    scene_filter_for_object = combine_scene_filters(
                        scene_filter_for_object,
                        id_filter,
                    )
                    if debug_mode:
                        logger.log(
                            "[DEBUG] Hook template "
                            f"'{template_name}' ({template_id}) combined scene_filter+id: "
                            f"{json.dumps(scene_filter_for_object, ensure_ascii=False)}"
                        )
                elif debug_mode:
                    logger.log(
                        f"[Warn] Hook object_id '{object_id}' is not numeric; falling back to ids argument matching"
                    )

                scenes = fetch_scenes_by_filters(
                    gql_call=gql.call,
                    tagger=tagger,
                    scene_filter=scene_filter_for_object,
                    ids=None if object_id_int is not None else [object_id],
                    find_filter=None,
                    filename_template=filename_template,
                    path_template=path_template,
                )
                if len(scenes) == 0:
                    executed.append(
                        {
                            "template_id": template_id,
                            "template_name": str(row.get("name") or ""),
                            "matched": False,
                            "operations": [],
                        }
                    )
                    continue

                batch_id = mover.start_batch(
                    mode="hook",
                    fixed_batch_id=HOOK_BATCH_ID,
                )
                try:
                    ops = engine.edit_run(
                        filename_template=filename_template,
                        path_template=path_template,
                        scenes=scenes,
                        collect_operations=collect_operations,
                        batch_id=batch_id,
                    )
                    mover.complete_batch(batch_id=batch_id, success=True, error=None)
                    executed.append(
                        {
                            "template_id": template_id,
                            "template_name": str(row.get("name") or ""),
                            "matched": True,
                            "batch_id": batch_id,
                            "operations": ops or [],
                        }
                    )
                except Exception as e:
                    mover.complete_batch(batch_id=batch_id, success=False, error=str(e))
                    raise

            return {
                "hook_type": hook_type,
                "scene_id": object_id,
                "enabled": True,
                "executed": executed,
            }

        if mode == "delete_template":
            template_id = str(options.get("template_id") or "").strip()
            if not template_id:
                raise ValueError("template_id is required for delete_template")
            return {"deleted": bool(templates.delete_template(template_id)), "template_id": template_id}

        if mode in ("rename", "preview_dry_run"):
            filename_template = str(options.get("filename_template") or "").strip()
            if not filename_template:
                raise ValueError("filename_template is required")
            path_template = options.get("path_template") or None

            ids = _ensure_list_of_strings(options.get("ids"), "ids")
            criteria_opt = _ensure_list_of_dicts(options.get("criteria"), "criteria")
            if not ids and len(criteria_opt) == 0:
                raise ValueError("Provide at least one scene selector: 'criteria' or 'ids'")

            excluded_scene_ids = _ensure_list_of_strings(
                options.get("excluded_scene_ids"),
                "excluded_scene_ids",
            )

            find_filter = options.get("find_filter")
            if find_filter is not None and not isinstance(find_filter, dict):
                raise ValueError("'find_filter' must be an object/dict")

            scene_filter = build_scene_filter(
                None,
                criteria_opt,
                debug_log=logger.log if debug_mode else None,
            )

            scenes = fetch_scenes_by_filters(
                gql_call=gql.call,
                tagger=tagger,
                scene_filter=scene_filter,
                ids=ids or None,
                find_filter=find_filter,
                filename_template=filename_template,
                path_template=path_template,
            )

            if excluded_scene_ids:
                before = len(scenes)
                scenes = exclude_scenes_by_ids(scenes, excluded_scene_ids)
                removed = before - len(scenes)
                if debug_mode:
                    logger.log(
                        f"[DEBUG] Excluded {removed} scene(s) by selected IDs; remaining {len(scenes)}"
                    )

            if mode == "preview_dry_run":
                operations = engine.preview_run(
                    filename_template=filename_template,
                    path_template=path_template,
                    scene_rows=scenes,
                )
                return {"operations": operations}

            if dry_run:
                ops = engine.edit_run(
                    filename_template=filename_template,
                    path_template=path_template,
                    scenes=scenes,
                    collect_operations=collect_operations,
                    batch_id=None,
                )
                all_operations: List[dict] = ops or []
                if collect_operations:
                    return {"operations": all_operations}
                return None

            batch_id = mover.start_batch(mode="rename")
            try:
                ops = engine.edit_run(
                    filename_template=filename_template,
                    path_template=path_template,
                    scenes=scenes,
                    collect_operations=collect_operations,
                    batch_id=batch_id,
                )
                mover.complete_batch(batch_id=batch_id, success=True, error=None)
                all_operations: List[dict] = ops or []
                if collect_operations:
                    return {"batch_id": batch_id, "operations": all_operations}
                return None
            except Exception as e:
                mover.complete_batch(batch_id=batch_id, success=False, error=str(e))
                raise

        raise ValueError(f"Unsupported mode: {mode}")
    finally:
        mover.flush()
        mover.close()
