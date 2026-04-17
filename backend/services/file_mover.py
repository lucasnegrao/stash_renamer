import os
from typing import Any, Callable, Dict, List, Optional

from backend.services.db_service import DBService
from backend.services.graphql_queries import FIND_SCENE_FILES_BY_ID_QUERY, MOVE_FILES_MUTATION


class FileMover:
    def __init__(self, gql_call: Callable[[str, Optional[dict]], dict], db_path: str, log_print: Callable[[str], None]):
        self._gql_call = gql_call
        self._store = DBService(db_path)
        self._log_print = log_print

    def move_files(self, file_ids: List[str], destination_folder: str, destination_basename: Optional[str] = None) -> bool:
        variables: Dict[str, Any] = {
            "input": {
                "ids": file_ids,
                "destination_folder": destination_folder,
            }
        }
        if destination_basename:
            variables["input"]["destination_basename"] = destination_basename
        data = self._gql_call(MOVE_FILES_MUTATION, variables)
        return bool((data or {}).get("moveFiles"))

    def log_rename(self, scene_id: str, old_path: str, new_path: str) -> str:
        return self._store.log_operation(
            operation_type="rename",
            scene_id=scene_id,
            old_path=old_path,
            new_path=new_path,
            success=True,
        )

    def start_batch(
        self,
        mode: str,
        reuse_latest_for_mode: bool = False,
        fixed_batch_id: Optional[str] = None,
    ) -> str:
        return self._store.start_batch(
            mode,
            reuse_latest_for_mode=reuse_latest_for_mode,
            fixed_batch_id=fixed_batch_id,
        )

    def complete_batch(self, batch_id: str, success: bool, error: Optional[str] = None) -> None:
        self._store.complete_batch(batch_id=batch_id, success=success, error=error)

    def log_rename_result(
        self,
        scene_id: str,
        old_path: str,
        new_path: str,
        batch_id: Optional[str],
        success: bool,
        error: Optional[str] = None,
    ) -> str:
        return self._store.log_operation(
            operation_type="rename",
            batch_id=batch_id,
            scene_id=scene_id,
            old_path=old_path,
            new_path=new_path,
            success=success,
            error=error,
        )

    def log_dry_run_result(
        self,
        scene_id: str,
        old_path: str,
        new_path: str,
        batch_id: Optional[str],
        success: bool,
        error: Optional[str] = None,
    ) -> str:
        return self._store.log_operation(
            operation_type="dry_run",
            batch_id=batch_id,
            scene_id=scene_id,
            old_path=old_path,
            new_path=new_path,
            success=success,
            error=error,
        )

    def undo_rename(self, rename_operation_id: str) -> Dict[str, Any]:
        op = self._store.get_operation(rename_operation_id)
        if not op:
            raise ValueError(f"Rename operation not found: {rename_operation_id}")
        if op.get("operation_type") != "rename":
            raise ValueError(f"Operation {rename_operation_id} is not a rename operation")
        if not op.get("success"):
            raise ValueError(f"Operation {rename_operation_id} was not successful, cannot undo")

        scene_id = str(op.get("scene_id") or "")
        old_path = str(op.get("old_path") or "")
        new_path = str(op.get("new_path") or "")
        if not scene_id or not old_path or not new_path:
            raise ValueError(f"Operation {rename_operation_id} has incomplete path/scene data")

        data = self._gql_call(FIND_SCENE_FILES_BY_ID_QUERY, {"id": scene_id})
        scene = (data or {}).get("findScene") or {}
        files = scene.get("files") or []

        file_id = None
        current_path = None
        for f in files:
            p = (f or {}).get("path")
            if p == new_path:
                file_id = (f or {}).get("id")
                current_path = p
                break

        if not file_id:
            raise ValueError(
                f"Scene {scene_id} no longer has file at expected path for undo: {new_path}"
            )

        dest_folder = os.path.dirname(old_path)
        dest_basename = os.path.basename(old_path)
        success = self.move_files([file_id], dest_folder, dest_basename)
        if not success:
            raise RuntimeError("GraphQL moveFiles returned false during undo")

        undo_id = self._store.log_operation(
            operation_type="undo",
            batch_id=None,
            related_operation_id=rename_operation_id,
            scene_id=scene_id,
            old_path=current_path or new_path,
            new_path=old_path,
            success=True,
        )

        self._log_print(
            f"[GQL] Undo completed for rename operation {rename_operation_id} (undo id: {undo_id})"
        )
        return {
            "undo_operation_id": undo_id,
            "original_operation_id": rename_operation_id,
            "scene_id": scene_id,
            "old_path": current_path or new_path,
            "new_path": old_path,
            "old_name": os.path.basename(current_path or new_path),
            "new_name": os.path.basename(old_path),
        }

    def list_rename_operations(self) -> List[Dict[str, Any]]:
        return self._store.list_rename_operations()

    def list_operation_batches(self) -> List[Dict[str, Any]]:
        return self._store.list_operation_batches()

    def list_batch_operations(self, batch_id: str) -> List[Dict[str, Any]]:
        return self._store.list_batch_operations(batch_id=batch_id)

    def save_template(
        self,
        name: str,
        filename_template: str,
        path_template: Optional[str],
        criteria_json: Optional[str] = None,
    ) -> Dict[str, Any]:
        return self._store.save_template(
            name=name,
            filename_template=filename_template,
            path_template=path_template,
            criteria_json=criteria_json,
        )

    def update_template(
        self,
        template_id: str,
        name: str,
        filename_template: str,
        path_template: Optional[str],
        criteria_json: Optional[str] = None,
    ) -> Optional[Dict[str, Any]]:
        return self._store.update_template(
            template_id=template_id,
            name=name,
            filename_template=filename_template,
            path_template=path_template,
            criteria_json=criteria_json,
        )

    def delete_template(self, template_id: str) -> bool:
        return self._store.delete_template(template_id=template_id)

    def list_templates(self) -> List[Dict[str, Any]]:
        return self._store.list_templates()

    def list_templates_by_ids(self, template_ids: List[str]) -> List[Dict[str, Any]]:
        return self._store.list_templates_by_ids(template_ids=template_ids)

    def get_hook_settings(self, hook_type: str) -> Dict[str, Any]:
        return self._store.get_hook_settings(hook_type=hook_type)

    def save_hook_settings(
        self,
        hook_type: str,
        enabled: bool,
        template_ids: List[str],
    ) -> Dict[str, Any]:
        return self._store.save_hook_settings(
            hook_type=hook_type,
            enabled=enabled,
            template_ids=template_ids,
        )

    def undo_batch_operation(self, batch_id: str) -> Dict[str, Any]:
        candidates = self._store.list_batch_undo_candidates(batch_id=batch_id)
        if not candidates:
            return {
                "batch_id": batch_id,
                "total": 0,
                "success": 0,
                "errors": [],
            }
        success = 0
        errors: List[str] = []
        for row in candidates:
            op_id = str(row.get("id") or "")
            if not op_id:
                continue
            try:
                self.undo_rename(op_id)
                success += 1
            except Exception as e:
                errors.append(f"{op_id}: {e}")
        return {
            "batch_id": batch_id,
            "total": len(candidates),
            "success": success,
            "errors": errors,
        }

    def clear_history(self) -> Dict[str, Any]:
        return self._store.clear_history()

    def flush(self) -> None:
        self._store.flush()

    def close(self) -> None:
        self._store.close()
