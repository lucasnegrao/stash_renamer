import os
import sqlite3
import uuid
from datetime import datetime, timezone
from typing import Any, Callable, Dict, List, Optional

from graphql_queries import FIND_SCENE_FILES_BY_ID_QUERY, MOVE_FILES_MUTATION


class OperationLogStore:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self._conn: Optional[sqlite3.Connection] = None
        self._writes_since_commit = 0
        self._commit_every = 50
        self._init_db()

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA synchronous=NORMAL")
        return conn

    def _get_conn(self) -> sqlite3.Connection:
        if self._conn is None:
            self._conn = self._connect()
        return self._conn

    def _init_db(self) -> None:
        conn = self._get_conn()
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS file_operations (
                id TEXT PRIMARY KEY,
                operation_type TEXT NOT NULL,
                related_operation_id TEXT,
                created_at TEXT NOT NULL,
                scene_id TEXT NOT NULL,
                old_path TEXT NOT NULL,
                new_path TEXT NOT NULL,
                old_name TEXT NOT NULL,
                new_name TEXT NOT NULL,
                success INTEGER NOT NULL DEFAULT 1,
                error TEXT
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_file_operations_related ON file_operations(related_operation_id)"
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_file_operations_scene ON file_operations(scene_id)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_file_operations_type_created ON file_operations(operation_type, created_at)")
        conn.commit()

    def log_operation(
        self,
        operation_type: str,
        scene_id: str,
        old_path: str,
        new_path: str,
        related_operation_id: Optional[str] = None,
        success: bool = True,
        error: Optional[str] = None,
    ) -> str:
        op_id = str(uuid.uuid4())
        ts = datetime.now(timezone.utc).isoformat()
        old_name = os.path.basename(old_path or "")
        new_name = os.path.basename(new_path or "")
        conn = self._get_conn()
        conn.execute(
            """
            INSERT INTO file_operations (
                id, operation_type, related_operation_id, created_at,
                scene_id, old_path, new_path, old_name, new_name,
                success, error
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                op_id,
                operation_type,
                related_operation_id,
                ts,
                str(scene_id or ""),
                str(old_path or ""),
                str(new_path or ""),
                old_name,
                new_name,
                1 if success else 0,
                error,
            ),
        )
        self._writes_since_commit += 1
        if self._writes_since_commit >= self._commit_every:
            conn.commit()
            self._writes_since_commit = 0
        return op_id

    def get_operation(self, op_id: str) -> Optional[Dict[str, Any]]:
        conn = self._get_conn()
        conn.commit()
        self._writes_since_commit = 0
        row = conn.execute(
            """
            SELECT id, operation_type, related_operation_id, created_at,
                   scene_id, old_path, new_path, old_name, new_name, success, error
            FROM file_operations
            WHERE id = ?
            """,
            (op_id,),
        ).fetchone()
        if not row:
            return None
        return dict(row)

    def list_rename_operations(self) -> List[Dict[str, Any]]:
        conn = self._get_conn()
        conn.commit()
        self._writes_since_commit = 0
        rows = conn.execute(
            """
            SELECT
                r.id,
                r.operation_type,
                r.related_operation_id,
                r.created_at,
                r.scene_id,
                r.old_path,
                r.new_path,
                r.old_name,
                r.new_name,
                r.success,
                r.error,
                EXISTS (
                    SELECT 1
                    FROM file_operations u
                    WHERE
                        u.operation_type = 'undo'
                        AND u.related_operation_id = r.id
                        AND u.success = 1
                ) AS undone
            FROM file_operations r
            WHERE r.operation_type = 'rename'
            ORDER BY r.created_at DESC, r.id DESC
            """
        ).fetchall()
        return [dict(r) for r in rows]

    def flush(self) -> None:
        if self._conn is None:
            return
        self._conn.commit()
        self._writes_since_commit = 0

    def close(self) -> None:
        if self._conn is None:
            return
        try:
            self._conn.commit()
        finally:
            self._conn.close()
            self._conn = None
            self._writes_since_commit = 0


class FileMover:
    def __init__(self, gql_call: Callable[[str, Optional[dict]], dict], db_path: str, log_print: Callable[[str], None]):
        self._gql_call = gql_call
        self._store = OperationLogStore(db_path)
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

    def flush(self) -> None:
        self._store.flush()

    def close(self) -> None:
        self._store.close()
