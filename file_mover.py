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
            CREATE TABLE IF NOT EXISTS operation_batches (
                id TEXT PRIMARY KEY,
                mode TEXT NOT NULL,
                started_at TEXT NOT NULL,
                completed_at TEXT,
                success INTEGER,
                error TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS file_operations (
                id TEXT PRIMARY KEY,
                operation_type TEXT NOT NULL,
                batch_id TEXT,
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
            """
            CREATE TABLE IF NOT EXISTS rename_templates (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                filename_template TEXT NOT NULL,
                path_template TEXT,
                created_at TEXT NOT NULL
            )
            """
        )
        try:
            conn.execute("ALTER TABLE file_operations ADD COLUMN batch_id TEXT")
        except sqlite3.OperationalError:
            pass
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_file_operations_related ON file_operations(related_operation_id)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_file_operations_batch ON file_operations(batch_id)"
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_file_operations_scene ON file_operations(scene_id)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_file_operations_type_created ON file_operations(operation_type, created_at)")
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_operation_batches_started ON operation_batches(started_at)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_rename_templates_created ON rename_templates(created_at)"
        )
        conn.commit()

    def start_batch(self, mode: str) -> str:
        batch_id = str(uuid.uuid4())
        ts = datetime.now(timezone.utc).isoformat()
        conn = self._get_conn()
        conn.execute(
            """
            INSERT INTO operation_batches (id, mode, started_at, completed_at, success, error)
            VALUES (?, ?, ?, NULL, NULL, NULL)
            """,
            (batch_id, str(mode or "rename"), ts),
        )
        self._writes_since_commit += 1
        if self._writes_since_commit >= self._commit_every:
            conn.commit()
            self._writes_since_commit = 0
        return batch_id

    def complete_batch(self, batch_id: str, success: bool, error: Optional[str] = None) -> None:
        ts = datetime.now(timezone.utc).isoformat()
        conn = self._get_conn()
        conn.execute(
            """
            UPDATE operation_batches
            SET completed_at = ?, success = ?, error = ?
            WHERE id = ?
            """,
            (ts, 1 if success else 0, error, batch_id),
        )
        self._writes_since_commit += 1
        if self._writes_since_commit >= self._commit_every:
            conn.commit()
            self._writes_since_commit = 0

    def log_operation(
        self,
        operation_type: str,
        scene_id: str,
        old_path: str,
        new_path: str,
        batch_id: Optional[str] = None,
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
                id, operation_type, batch_id, related_operation_id, created_at,
                scene_id, old_path, new_path, old_name, new_name,
                success, error
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                op_id,
                operation_type,
                batch_id,
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
            SELECT id, operation_type, batch_id, related_operation_id, created_at,
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
                r.batch_id,
                r.related_operation_id,
                r.created_at,
                r.scene_id,
                r.old_path,
                r.new_path,
                r.old_name,
                r.new_name,
                r.success,
                r.error,
                CASE
                    WHEN LOWER(COALESCE(r.error, '')) LIKE '%no change (same path and filename)%' THEN 'warn'
                    WHEN r.success = 1 THEN 'success'
                    ELSE 'error'
                END AS status,
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

    def list_operation_batches(self) -> List[Dict[str, Any]]:
        conn = self._get_conn()
        conn.commit()
        self._writes_since_commit = 0
        rows = conn.execute(
            """
            SELECT
              b.id,
              b.mode,
              b.started_at,
              b.completed_at,
              b.success,
              b.error,
              COUNT(o.id) AS operations_count,
              SUM(CASE WHEN o.success = 1 THEN 1 ELSE 0 END) AS success_count,
              SUM(
                CASE
                  WHEN o.success = 0 AND LOWER(COALESCE(o.error, '')) LIKE '%no change (same path and filename)%'
                  THEN 1
                  ELSE 0
                END
              ) AS warn_count,
              SUM(
                CASE
                  WHEN o.success = 0 AND LOWER(COALESCE(o.error, '')) NOT LIKE '%no change (same path and filename)%'
                  THEN 1
                  ELSE 0
                END
              ) AS error_count,
              SUM(CASE WHEN o.operation_type = 'rename' THEN 1 ELSE 0 END) AS rename_count,
              SUM(CASE WHEN o.operation_type = 'dry_run' THEN 1 ELSE 0 END) AS dry_run_count,
              SUM(CASE WHEN o.operation_type = 'undo' THEN 1 ELSE 0 END) AS undo_count
            FROM operation_batches b
            LEFT JOIN file_operations o ON o.batch_id = b.id
            GROUP BY b.id
            ORDER BY b.started_at DESC, b.id DESC
            """
        ).fetchall()
        return [dict(r) for r in rows]

    def list_batch_operations(self, batch_id: str) -> List[Dict[str, Any]]:
        conn = self._get_conn()
        conn.commit()
        self._writes_since_commit = 0
        rows = conn.execute(
            """
            SELECT
                r.id,
                r.batch_id,
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
                CASE
                    WHEN LOWER(COALESCE(r.error, '')) LIKE '%no change (same path and filename)%' THEN 'warn'
                    WHEN r.success = 1 THEN 'success'
                    ELSE 'error'
                END AS status,
                EXISTS (
                    SELECT 1
                    FROM file_operations u
                    WHERE
                        u.operation_type = 'undo'
                        AND u.related_operation_id = r.id
                        AND u.success = 1
                ) AS undone
            FROM file_operations r
            WHERE r.batch_id = ?
            ORDER BY r.created_at DESC, r.id DESC
            """,
            (batch_id,),
        ).fetchall()
        return [dict(r) for r in rows]

    def list_batch_undo_candidates(self, batch_id: str) -> List[Dict[str, Any]]:
        conn = self._get_conn()
        conn.commit()
        self._writes_since_commit = 0
        rows = conn.execute(
            """
            SELECT
                r.id,
                r.scene_id,
                r.old_path,
                r.new_path
            FROM file_operations r
            WHERE
                r.batch_id = ?
                AND r.operation_type = 'rename'
                AND r.success = 1
                AND NOT EXISTS (
                    SELECT 1 FROM file_operations u
                    WHERE u.operation_type = 'undo' AND u.related_operation_id = r.id AND u.success = 1
                )
            ORDER BY r.created_at DESC, r.id DESC
            """,
            (batch_id,),
        ).fetchall()
        return [dict(r) for r in rows]

    def flush(self) -> None:
        if self._conn is None:
            return
        self._conn.commit()
        self._writes_since_commit = 0

    def save_template(self, name: str, filename_template: str, path_template: Optional[str]) -> Dict[str, Any]:
        template_id = str(uuid.uuid4())
        ts = datetime.now(timezone.utc).isoformat()
        conn = self._get_conn()
        conn.execute(
            """
            INSERT INTO rename_templates (
                id, name, filename_template, path_template, created_at
            ) VALUES (?, ?, ?, ?, ?)
            """,
            (
                template_id,
                str(name or "").strip(),
                str(filename_template or ""),
                str(path_template or ""),
                ts,
            ),
        )
        self._writes_since_commit += 1
        if self._writes_since_commit >= self._commit_every:
            conn.commit()
            self._writes_since_commit = 0
        return {
            "id": template_id,
            "name": str(name or "").strip(),
            "filename_template": str(filename_template or ""),
            "path_template": str(path_template or ""),
            "created_at": ts,
        }

    def update_template(
        self,
        template_id: str,
        name: str,
        filename_template: str,
        path_template: Optional[str],
    ) -> Optional[Dict[str, Any]]:
        conn = self._get_conn()
        conn.execute(
            """
            UPDATE rename_templates
            SET name = ?, filename_template = ?, path_template = ?
            WHERE id = ?
            """,
            (
                str(name or "").strip(),
                str(filename_template or ""),
                str(path_template or ""),
                str(template_id or ""),
            ),
        )
        self._writes_since_commit += 1
        if self._writes_since_commit >= self._commit_every:
            conn.commit()
            self._writes_since_commit = 0
        row = conn.execute(
            """
            SELECT id, name, filename_template, path_template, created_at
            FROM rename_templates
            WHERE id = ?
            """,
            (str(template_id or ""),),
        ).fetchone()
        return dict(row) if row else None

    def delete_template(self, template_id: str) -> bool:
        conn = self._get_conn()
        cur = conn.execute(
            "DELETE FROM rename_templates WHERE id = ?",
            (str(template_id or ""),),
        )
        self._writes_since_commit += 1
        if self._writes_since_commit >= self._commit_every:
            conn.commit()
            self._writes_since_commit = 0
        return bool(cur.rowcount and cur.rowcount > 0)

    def list_templates(self) -> List[Dict[str, Any]]:
        conn = self._get_conn()
        conn.commit()
        self._writes_since_commit = 0
        rows = conn.execute(
            """
            SELECT id, name, filename_template, path_template, created_at
            FROM rename_templates
            ORDER BY created_at DESC, id DESC
            """
        ).fetchall()
        return [dict(r) for r in rows]

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

    def start_batch(self, mode: str) -> str:
        return self._store.start_batch(mode)

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

    def save_template(self, name: str, filename_template: str, path_template: Optional[str]) -> Dict[str, Any]:
        return self._store.save_template(
            name=name,
            filename_template=filename_template,
            path_template=path_template,
        )

    def update_template(
        self,
        template_id: str,
        name: str,
        filename_template: str,
        path_template: Optional[str],
    ) -> Optional[Dict[str, Any]]:
        return self._store.update_template(
            template_id=template_id,
            name=name,
            filename_template=filename_template,
            path_template=path_template,
        )

    def delete_template(self, template_id: str) -> bool:
        return self._store.delete_template(template_id=template_id)

    def list_templates(self) -> List[Dict[str, Any]]:
        return self._store.list_templates()

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

    def flush(self) -> None:
        self._store.flush()

    def close(self) -> None:
        self._store.close()
