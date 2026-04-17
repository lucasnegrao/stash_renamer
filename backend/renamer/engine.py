import os
import re
from typing import Any, Dict, List, Optional

from backend.filter.scenes import (
    build_field_tree_from_templates,
    fetch_scene_by_id_for_templates,
    merge_scene_data,
    normalize_scenes,
    scene_missing_fields,
)
from backend.renamer.filename_utils import (
    apply_extension_if_missing,
    build_target_directory,
    make_filename,
    sanitize_filename,
)


class RenamerEngine:
    def __init__(self, gql_call, tagger, mover, logger, dry_run: bool, debug_mode: bool):
        self.gql_call = gql_call
        self.tagger = tagger
        self.mover = mover
        self.logger = logger
        self.dry_run = dry_run
        self.debug_mode = debug_mode
        self.is_windows = os.name == "nt"

    def _render_filename(self, template: str, tag_context: Dict[str, object]) -> str:
        return make_filename(
            query=template,
            tag_context=tag_context,
            tag_render=lambda tpl, ctx: self.tagger.render(tpl, ctx),
        )

    def _build_tag_context(self, scene: Dict[str, Any], performer_list: List[dict], group_list: List[dict]) -> Dict[str, object]:
        scene_ctx = dict(scene or {})
        date_val = scene_ctx.get("date")
        year = ""
        if date_val is not None:
            m = re.match(r"\s*(\d{4})", str(date_val))
            if m:
                year = m.group(1)
        scene_ctx["year"] = year
        return {
            "scene": scene_ctx,
            "performer": performer_list,
            "group": group_list,
        }

    def preview_run(self, filename_template: str, path_template: Optional[str], scene_rows: List[dict]) -> List[dict]:
        normalized = normalize_scenes(scene_rows)
        hydrated: List[dict] = []

        required_tree = build_field_tree_from_templates(filename_template, path_template, self.tagger)
        for scene in normalized:
            if not isinstance(scene, dict):
                continue
            work_scene = dict(scene)
            scene_id = str(work_scene.get("id") or "")
            if scene_id and scene_missing_fields(work_scene, required_tree):
                fetched = fetch_scene_by_id_for_templates(
                    gql_call=self.gql_call,
                    tagger=self.tagger,
                    scene_id=scene_id,
                    filename_template=filename_template,
                    path_template=path_template,
                )
                if fetched:
                    work_scene = merge_scene_data(work_scene, fetched)
            hydrated.append(work_scene)

        prev_dry = self.dry_run
        self.dry_run = True
        try:
            operations = self.edit_run(
                filename_template=filename_template,
                path_template=path_template,
                scenes=hydrated,
                collect_operations=True,
                batch_id=None,
            ) or []
        finally:
            self.dry_run = prev_dry

        for op in operations:
            if isinstance(op, dict) and str(op.get("status") or "").lower() == "pending":
                op["status"] = "success"

        return operations

    def edit_run(
        self,
        filename_template: str,
        path_template: Optional[str],
        scenes: List[dict],
        collect_operations: bool = False,
        batch_id: Optional[str] = None,
    ):
        operations = []

        if self.debug_mode:
            self.logger.log(
                f"[DEBUG] Starting edit_run with DRY_RUN={self.dry_run}, PATH_TEMPLATE={'set' if path_template else 'none'}"
            )

        scenes = normalize_scenes(scenes)
        if not scenes:
            self.logger.log("[Warn] There are no scenes to process")
            self.logger.emit_progress(1.0)
            return operations if collect_operations else None

        total_scenes = len(scenes)
        self.logger.log(f"Scenes count: {total_scenes}")
        processed = 0
        success_count = 0
        error_count = 0
        skipped_count = 0

        def _log_progress() -> None:
            if total_scenes <= 0:
                return
            self.logger.emit_progress(processed / total_scenes)
            if processed == 1 or processed == total_scenes or processed % 25 == 0:
                pct = int((processed / total_scenes) * 100)
                self.logger.log(
                    f"[PROGRESS] {processed}/{total_scenes} ({pct}%) "
                    f"success={success_count} skipped={skipped_count} errors={error_count}"
                )

        def _log_operation_to_db(
            scene_id: str,
            old_path: str,
            new_path: str,
            success: bool,
            error: Optional[str],
        ) -> Optional[str]:
            if self.mover is None or not batch_id:
                return None
            if self.dry_run:
                return None
            return self.mover.log_rename_result(
                scene_id=str(scene_id or ""),
                old_path=str(old_path or ""),
                new_path=str(new_path or ""),
                batch_id=batch_id,
                success=success,
                error=error,
            )

        for scene in scenes:
            processed += 1
            current_path = scene.get("path")
            if not current_path:
                op_id = _log_operation_to_db(
                    scene_id=str(scene.get("id") or ""),
                    old_path="",
                    new_path="",
                    success=False,
                    error="Scene has no primary file path",
                )
                if collect_operations:
                    operations.append(
                        {
                            "scene_id": scene.get("id"),
                            "title": scene.get("title") or "",
                            "status": "skipped",
                            "log": "Scene has no primary file path",
                            "operation_id": op_id,
                            "old_filename": "",
                            "new_filename": "",
                            "old_path": "",
                            "new_path": "",
                        }
                    )
                skipped_count += 1
                _log_progress()
                continue

            current_directory = os.path.dirname(current_path)
            current_filename = os.path.basename(current_path)
            file_extension = os.path.splitext(current_filename)[1] or ""
            scene_title = scene.get("title") or ""

            performer_list = [p for p in (scene.get("performers") or []) if isinstance(p, dict)]
            group_list = []
            for g in (scene.get("groups") or []):
                if isinstance(g, dict) and isinstance(g.get("group"), dict):
                    group_list.append(g.get("group"))
                elif isinstance(g, dict):
                    group_list.append(g)
            tag_context = self._build_tag_context(scene, performer_list, group_list)

            if self.debug_mode:
                self.logger.log(f"[DEBUG] Tag context roots: {list(tag_context.keys())}")
                self.logger.log(f"[DEBUG] Template: {filename_template}")

            new_filename_core = sanitize_filename(self._render_filename(filename_template, tag_context))
            if not new_filename_core.strip():
                op_id = _log_operation_to_db(
                    scene_id=str(scene.get("id") or ""),
                    old_path=current_path,
                    new_path=current_path,
                    success=False,
                    error="Rendered filename is empty",
                )
                if collect_operations:
                    operations.append(
                        {
                            "scene_id": scene.get("id"),
                            "title": scene_title,
                            "status": "error",
                            "error": "Rendered filename is empty",
                            "operation_id": op_id,
                            "old_filename": current_filename,
                            "new_filename": "",
                            "old_path": current_path,
                            "new_path": current_path,
                        }
                    )
                skipped_count += 1
                _log_progress()
                continue

            new_filename = apply_extension_if_missing(new_filename_core, file_extension)

            if path_template:
                try:
                    final_directory = build_target_directory(
                        current_directory=current_directory,
                        tag_context=tag_context,
                        path_template=path_template,
                        make_filename=lambda tpl, ctx: self._render_filename(tpl, ctx),
                    )
                    if self.debug_mode:
                        self.logger.log(
                            f"[DEBUG] Path builder: current='{current_directory}' -> target='{final_directory}'"
                        )
                    if not os.path.exists(final_directory):
                        if not self.dry_run:
                            os.makedirs(final_directory, exist_ok=True)
                            self.logger.log(f"[OS] Created target folder: {final_directory}")
                        else:
                            self.logger.log(f"[DRY] Would create target folder: {final_directory}")
                except Exception as e:
                    self.logger.log(
                        f"[Error] Failed to build/create target folder from template '{path_template}': {e}"
                    )
                    final_directory = current_directory
            else:
                final_directory = current_directory

            new_path = os.path.join(final_directory, new_filename)

            if self.is_windows and len(new_path) > 240:
                if scene.get("date"):
                    reduced_core = self._render_filename("{{ scene.date }} - {{ scene.title }}", tag_context)
                else:
                    reduced_core = self._render_filename("{{ scene.title }}", tag_context)
                reduced_core = sanitize_filename(reduced_core)
                if not reduced_core.strip():
                    op_id = _log_operation_to_db(
                        scene_id=str(scene.get("id") or ""),
                        old_path=current_path,
                        new_path=current_path,
                        success=False,
                        error="Reduced filename resolved empty",
                    )
                    if collect_operations:
                        operations.append(
                            {
                                "scene_id": scene.get("id"),
                                "title": scene_title,
                                "status": "error",
                                "error": "Reduced filename resolved empty",
                                "operation_id": op_id,
                                "old_filename": current_filename,
                                "new_filename": "",
                                "old_path": current_path,
                                "new_path": current_path,
                            }
                        )
                    skipped_count += 1
                    _log_progress()
                    continue
                new_filename = apply_extension_if_missing(reduced_core, file_extension)
                new_path = os.path.join(current_directory, new_filename)
                if len(new_path) > 240:
                    op_id = _log_operation_to_db(
                        scene_id=str(scene.get("id") or ""),
                        old_path=current_path,
                        new_path=new_path,
                        success=False,
                        error="Path exceeds Windows length limit",
                    )
                    if collect_operations:
                        operations.append(
                            {
                                "scene_id": scene.get("id"),
                                "title": scene_title,
                                "status": "error",
                                "error": "Path exceeds Windows length limit",
                                "operation_id": op_id,
                                "old_filename": current_filename,
                                "new_filename": new_filename,
                                "old_path": current_path,
                                "new_path": new_path,
                            }
                        )
                    skipped_count += 1
                    _log_progress()
                    continue

            if new_path != current_path and os.path.exists(new_path):
                op_id = _log_operation_to_db(
                    scene_id=str(scene.get("id") or ""),
                    old_path=current_path,
                    new_path=new_path,
                    success=False,
                    error="Target already exists",
                )
                if collect_operations:
                    operations.append(
                        {
                            "scene_id": scene.get("id"),
                            "title": scene_title,
                            "status": "error",
                            "error": "Target already exists",
                            "operation_id": op_id,
                            "old_filename": current_filename,
                            "new_filename": new_filename,
                            "old_path": current_path,
                            "new_path": new_path,
                        }
                    )
                error_count += 1
                _log_progress()
                continue

            if new_path == current_path:
                op_id = _log_operation_to_db(
                    scene_id=str(scene.get("id") or ""),
                    old_path=current_path,
                    new_path=new_path,
                    success=False,
                    error="No change (same path and filename)",
                )
                if collect_operations:
                    operations.append(
                        {
                            "scene_id": scene["id"],
                            "title": scene_title,
                            "status": "warn",
                            "log": "No change (same path and filename)",
                            "operation_id": op_id,
                            "old_filename": current_filename,
                            "new_filename": new_filename,
                            "old_path": current_path,
                            "new_path": new_path,
                        }
                    )
                skipped_count += 1
                _log_progress()
                continue

            if not self.dry_run:
                file_ids = []
                for file_info in (scene.get("files") or []):
                    if file_info.get("path") == current_path:
                        file_ids.append(file_info.get("id"))
                if not file_ids:
                    op_id = _log_operation_to_db(
                        scene_id=str(scene.get("id") or ""),
                        old_path=current_path,
                        new_path=new_path,
                        success=False,
                        error="No file ID found for path",
                    )
                    if collect_operations:
                        operations.append(
                            {
                                "scene_id": scene["id"],
                                "title": scene_title,
                                "status": "error",
                                "error": "No file ID found for path",
                                "operation_id": op_id,
                                "old_filename": current_filename,
                                "new_filename": new_filename,
                                "old_path": current_path,
                                "new_path": new_path,
                            }
                        )
                    error_count += 1
                    _log_progress()
                    continue

                try:
                    if self.mover is None:
                        raise RuntimeError("FILE_MOVER not initialized")
                    success = self.mover.move_files(
                        file_ids=file_ids,
                        destination_folder=final_directory,
                        destination_basename=new_filename,
                    )
                    if not success:
                        raise Exception("GraphQL moveFiles returned false")
                except Exception as e:
                    op_id = _log_operation_to_db(
                        scene_id=str(scene.get("id") or ""),
                        old_path=current_path,
                        new_path=new_path,
                        success=False,
                        error=str(e),
                    )
                    if collect_operations:
                        operations.append(
                            {
                                "scene_id": scene["id"],
                                "title": scene_title,
                                "status": "error",
                                "error": str(e),
                                "operation_id": op_id,
                                "old_filename": current_filename,
                                "new_filename": new_filename,
                                "old_path": current_path,
                                "new_path": new_path,
                            }
                        )
                    error_count += 1
                    _log_progress()
                    continue

                operation_id = _log_operation_to_db(
                    scene_id=str(scene.get("id") or ""),
                    old_path=current_path,
                    new_path=new_path,
                    success=True,
                    error=None,
                )
                if collect_operations:
                    operations.append(
                        {
                            "scene_id": scene["id"],
                            "title": scene_title,
                            "status": "success",
                            "operation_id": operation_id,
                            "old_filename": current_filename,
                            "new_filename": new_filename,
                            "old_path": current_path,
                            "new_path": new_path,
                        }
                    )
                success_count += 1
                _log_progress()
            else:
                operation_id = _log_operation_to_db(
                    scene_id=str(scene.get("id") or ""),
                    old_path=current_path,
                    new_path=new_path,
                    success=True,
                    error=None,
                )
                if collect_operations:
                    operations.append(
                        {
                            "scene_id": scene["id"],
                            "title": scene_title,
                            "status": "pending",
                            "operation_id": operation_id,
                            "old_filename": current_filename,
                            "new_filename": new_filename,
                            "old_path": current_path,
                            "new_path": new_path,
                        }
                    )
                success_count += 1
                _log_progress()

        self.logger.log(
            f"[PROGRESS] Completed {processed}/{total_scenes} "
            f"success={success_count} skipped={skipped_count} errors={error_count}"
        )
        self.logger.emit_progress(1.0)
        return operations if collect_operations else None
