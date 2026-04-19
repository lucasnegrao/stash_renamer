# Backend Operations & Arguments

The Python backend for `stash_renamer` acts as a multi-modal plugin command center. Every operation is triggered by passing a specific `mode` string within the arguments payload.

## Global Options
These arguments apply to the application globally or dictate its runtime state and are passed alongside the mode.

* `mode` (string): The operation mode to execute.
* `server_url` (string): The Stash GraphQL URL.
* `cookie_name` (string): Authentication cookie name.
* `cookie_value` (string): Authentication cookie value.
* `using_log` (boolean): Whether to print logs to Stash (default: `True`).
* `dry_run` (boolean): If `True`, simulates operations without saving files (default: `False`).
* `debug_mode` (boolean): Whether to emit verbose debug logs (default: `True`).
* `operations_db_path` (string): Path to SQLite database for history/templates (default: `rename_operations.db`).

## Supported Modes

### Rename & Simulation
* **`rename`**: Executes the main renaming logic. Operates as a simulation if global `dry_run=True`.
* **`preview_dry_run`**: A lightweight variant of `rename` that quickly predicts new filenames without recording a batch.
  * **Arguments**:
    * `filename_template` (string, required): The Liquid template for the file name.
    * `path_template` (string, optional): The Liquid template for the directory path.
    * `ids` (list of strings): Specific scene IDs to restrict the operation to.
    * `excluded_scene_ids` (list of strings): Scene IDs to omit from the query results.
    * `criteria` (list of objects): Filter criteria payloads for standard Stash scenes filtering.
    * `find_filter` (object): Standard GraphQL pagination and sorting filter payload.
    * `include_warn_error` (boolean): *Used only during dry run.* If `False`, removes operations that result in warnings, errors, fails, or "no change" from the final response (default: `False`).

### Undo & History
* **`undo`**: Reverts a specific file rename.
  * **Arguments**: `undo_operation_id` (string, required).
* **`list_operations`**: Lists all individual historical rename operations.
* **`list_operation_batches`**: Lists high-level batches (groupings of rename operations).
* **`list_batch_operations`**: Lists all atomic rename operations that belong to a specific batch.
  * **Arguments**: `batch_id` (string, required).
* **`undo_batch_operation`**: Rolls back an entire batch of rename operations.
  * **Arguments**: `batch_id` (string, required).
* **`clear_history`**: Purges all history and batches from the operations database.

### Templates
* **`list_templates`**: Returns all saved rename templates.
* **`save_template`**: Creates a new saved template.
  * **Arguments**: `template_name` (required), `filename_template` (required), `path_template`, `criteria`.
* **`update_template`**: Modifies an existing saved template.
  * **Arguments**: `template_id` (required), `template_name` (required), `filename_template` (required), `path_template`, `criteria`.
* **`delete_template`**: Deletes a saved template.
  * **Arguments**: `template_id` (string, required).

### Hooks (Event Triggers)
* **`get_hook_settings`**: Retrieves settings for auto-running templates when Stash events occur.
  * **Arguments**: `hook_type` (string, default: `"Scene.Update.Post"`).
* **`save_hook_settings`**: Updates hook auto-run settings.
  * **Arguments**: `hook_type` (string, default: `"Scene.Update.Post"`), `enabled` (boolean), `template_ids` (list of strings).
* **`run_hook`**: The actual execution endpoint called by Stash when an event is triggered.
  * **Arguments**: 
    * `hookContext` (object, required): Contains `type` (hook type) and `id` (the ID of the modified Stash object).
    * `hook_type` (string, fallback if missing from hookContext).

### Misc
* **`list_selectors`**: Introspects the GraphQL schema and builds the autocomplete token tree (for the UI code editor).