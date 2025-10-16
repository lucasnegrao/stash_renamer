# Scene Renamer UI Operations Display

## Overview
The Scene Renamer plugin now displays the list of rename operations directly in the UI instead of requiring users to check the logs.

## How It Works

### 1. Operation Collection
The main script (`stash_renamer.py`) has been enhanced to collect rename operations:

- **New Parameter**: `collect_operations` parameter added to `run()` and `edit_run()` functions
- **Operation Data**: Each operation includes:
  - `scene_id`: The Stash scene ID
  - `status`: `"pending"` (dry run), `"success"` (renamed), or `"error"` (failed)
  - `old_filename`: Original filename
  - `new_filename`: Target filename
  - `old_path`: Full original path
  - `new_path`: Full target path
  - `error`: Error message (if status is "error")

### 2. Plugin Wrapper Enhancement
The `plugin_wrapper.py` now:

- Calls `renamer_run(collect_operations=True)` to get the operation list
- Writes operations to `renamer_operations.json` for UI access
- Logs a formatted list of operations to Stash logs with visual markers:
  - ✓ = success
  - ○ = pending (dry run)
  - ✗ = error

### 3. UI Display
The JavaScript UI (`scene_renamer_ui.js`) now:

- Stores operations in React state
- Attempts to fetch `renamer_operations.json` after the plugin runs
- Displays operations in a responsive table with:
  - Status badges (color-coded)
  - Scene ID (for reference)
  - Old and new filenames (truncated with tooltips for full names)
  - Error messages (if any)

## Usage

### Viewing Operations in UI
1. Navigate to the Scene Renamer page (Tools menu or top nav icon)
2. Set your template and options
3. Click "Preview Renames" (dry run enabled)
4. **Operations will appear in a table below the status message**

### Operations Table Features
- **Status Column**: Color-coded badges
  - 🟢 Green = Success (file renamed)
  - ⚪ Gray = Pending (dry run, not executed)
  - 🔴 Red = Error (operation failed)
- **Filename Columns**: Hover to see full path
- **Error Column**: Shows failure reason if applicable

### Fallback: Log View
If the operations file isn't accessible (Stash configuration dependent), the operations are still visible in:
- **Settings → Logs → Plugins**
- Look for the formatted section between `==========` lines

## Operation Status Types

### Pending (Dry Run)
- Status: `"pending"`
- Badge: Gray "pending"
- Meaning: This is what would happen if you run without dry-run

### Success
- Status: `"success"`
- Badge: Green "success"
- Meaning: File was successfully renamed

### Error
- Status: `"error"`
- Badge: Red "error"
- Meaning: Operation failed (see error column for details)
- Common errors:
  - File doesn't exist on disk
  - Target file already exists
  - Permission denied
  - File system errors

## Example Output

### In UI Table:
```
Status    Scene ID    Old Filename                      New Filename                           Error
pending   12345       scene_2023_01_15.mp4             Studio - 2023-01-15 - Scene Title.mp4
error     67890       missing_file.mp4                 Studio - 2023-02-20 - Title.mp4        File doesn't exist on disk
```

### In Logs:
```
==================================================
RENAME OPERATIONS:
==================================================
1. [○] scene_2023_01_15.mp4 → Studio - 2023-01-15 - Scene Title.mp4
2. [✗] missing_file.mp4 → Studio - 2023-02-20 - Title.mp4
   Error: File doesn't exist on disk
==================================================
```

## Technical Details

### JSON File Location
- File: `renamer_operations.json`
- Location: Same directory as plugin files
- Format: Array of operation objects
- Access: Via `/plugin/stash_renamer/renamer_operations.json` (if Stash serves plugin assets)

### API Response Flow
1. UI calls `runPluginOperation` mutation
2. Plugin executes with `collect_operations=True`
3. Operations collected during execution
4. Plugin writes operations to JSON file
5. Plugin logs formatted operations list
6. UI fetches JSON file
7. UI displays operations in table

### Compatibility
- Works with both dry run and actual rename modes
- Handles errors gracefully
- Falls back to log view if JSON file unavailable
- No changes needed to existing Stash configuration

## Benefits

1. **Immediate Visibility**: See what will be renamed without checking logs
2. **Better Decision Making**: Review all operations before executing
3. **Error Identification**: Quickly spot problems with specific files
4. **Scene Linking**: Scene IDs allow easy lookup in Stash
5. **Export Capability**: Operations JSON can be used for record-keeping

## Future Enhancements

Potential improvements:
- Direct links to scene pages from Scene ID column
- Export operations table to CSV
- Filter/search within operations table
- Bulk undo capability using operation log
- Real-time progress updates during execution
