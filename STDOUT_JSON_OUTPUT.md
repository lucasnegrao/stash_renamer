# Stdout JSON Output for UI Integration

## Overview
The Scene Renamer plugin now outputs JSON data directly to `stdout`, which Stash captures and returns via the GraphQL `runPluginOperation` mutation. This allows the JavaScript UI to display rename operations in real-time without needing to access files or parse logs.

## How It Works

### Pattern from DupFileManager
This implementation follows the proven pattern used by the DupFileManager plugin in the Stash CommunityScripts repository.

**Key Discovery:**
- Stash captures anything a plugin writes to `stdout`
- The GraphQL `runPluginOperation` mutation returns this captured output
- JavaScript can parse this JSON and display it in the UI

### Implementation Details

#### 1. Python Plugin (plugin_wrapper.py)
```python
# After collecting operations from the main script
operations = renamer_run(collect_operations=True)

# Output JSON to stdout - Stash will capture this!
json_output = json.dumps({"operations": operations if operations else []})
print(json_output, file=sys.stdout, flush=True)
```

**Key Points:**
- Use `json.dumps()` to serialize the data
- Print to `sys.stdout` with `flush=True` to ensure immediate output
- Stash captures this output and includes it in the mutation response

#### 2. JavaScript UI (scene_renamer_ui.js)
```javascript
const result = await response.json();

// Parse the JSON output from the plugin
const pluginOutput = JSON.parse(result.data.runPluginOperation);

if (pluginOutput.operations && Array.isArray(pluginOutput.operations)) {
  setOperations(pluginOutput.operations);
  setStatus(`Completed! Found ${pluginOutput.operations.length} operations.`);
}
```

**Key Points:**
- The output is available at `result.data.runPluginOperation`
- Parse it as JSON to get the structured data
- Display operations directly in the UI

## Data Flow

```
┌─────────────────┐
│  User clicks    │
│ "Preview Renames"│
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│  JavaScript UI      │
│  Calls GraphQL:     │
│  runPluginOperation │
└────────┬────────────┘
         │
         ▼
┌─────────────────────────┐
│  Stash executes         │
│  plugin_wrapper.py      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  stash_renamer.py       │
│  Collects operations    │
│  Returns to wrapper     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  plugin_wrapper.py      │
│  Outputs JSON to stdout │
│  print(json_output)     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Stash captures stdout  │
│  Returns in mutation    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  JavaScript UI receives │
│  Parses & displays      │
└─────────────────────────┘
```

## JSON Output Format

### Structure
```json
{
  "operations": [
    {
      "scene_id": "12345",
      "status": "pending",
      "old_filename": "scene_2023_01_15.mp4",
      "new_filename": "Studio - 2023-01-15 - Scene Title.mp4",
      "old_path": "/path/to/old/scene_2023_01_15.mp4",
      "new_path": "/path/to/new/Studio - 2023-01-15 - Scene Title.mp4"
    },
    {
      "scene_id": "67890",
      "status": "error",
      "error": "File doesn't exist on disk",
      "old_filename": "missing_file.mp4",
      "new_filename": "Studio - 2023-02-20 - Title.mp4",
      "old_path": "/path/to/missing_file.mp4",
      "new_path": "/path/to/Studio - 2023-02-20 - Title.mp4"
    }
  ]
}
```

### Operation Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `scene_id` | string | Stash scene ID |
| `status` | string | `"pending"` (dry run), `"success"` (renamed), or `"error"` (failed) |
| `old_filename` | string | Original filename |
| `new_filename` | string | Target filename |
| `old_path` | string | Full original path |
| `new_path` | string | Full target path |
| `error` | string | Error message (only if status is "error") |

## Benefits of This Approach

### 1. **No File System Dependencies**
- No need to write temporary files
- No need to serve static files
- No file path issues across different platforms

### 2. **Real-Time Results**
- Operations are available immediately in the mutation response
- No polling or waiting needed
- No race conditions

### 3. **Clean Architecture**
- Plugin does one thing: process and return data
- UI does one thing: display data
- Clear separation of concerns

### 4. **Proven Pattern**
- Used by existing Stash plugins (DupFileManager)
- Well-tested and reliable
- Follows Stash conventions

### 5. **Scalable**
- Can return any structured data
- Easy to add more fields
- Flexible for future enhancements

## Comparison with Previous Approaches

### ❌ File-Based Approach (Previous)
```python
# Write to file
with open("operations.json", "w") as f:
    json.dump(operations, f)

# UI fetches file
const response = await fetch("/plugin/stash_renamer/operations.json");
```

**Issues:**
- File system access required
- Timing issues (file not ready)
- Static file serving needed
- Cleanup required

### ✅ Stdout Approach (Current)
```python
# Output to stdout
print(json.dumps({"operations": operations}), flush=True)

# UI gets it directly
const data = JSON.parse(result.data.runPluginOperation);
```

**Benefits:**
- Direct data transfer
- No file system needed
- Immediate availability
- No cleanup needed

## Testing

### 1. Verify JSON Output
Check Stash logs for the JSON output:
```
Settings → Logs → Plugins
```

Look for:
```json
{"operations": [...]}
```

### 2. Verify UI Reception
Open browser console (F12) and check for:
```javascript
console.log(result.data.runPluginOperation);
```

Should show the JSON string.

### 3. Verify Parsing
Check operations state in React:
```javascript
console.log(operations);
```

Should show the parsed array of operation objects.

## Troubleshooting

### Issue: Empty Response
**Cause:** Plugin didn't output to stdout
**Fix:** Ensure `print()` statement exists and `flush=True` is set

### Issue: Parse Error
**Cause:** Invalid JSON format
**Fix:** Use `json.dumps()` to ensure valid JSON

### Issue: Operations Not Showing
**Cause:** UI parsing logic error
**Fix:** Check browser console for errors

### Issue: Old Data Showing
**Cause:** State not cleared
**Fix:** `setOperations([])` before each run

## Future Enhancements

Possible additions using this pattern:

1. **Progress Updates**
   - Stream operations as they're processed
   - Show real-time progress

2. **Warnings/Info**
   - Include additional metadata
   - Add user notifications

3. **Statistics**
   - Total scenes processed
   - Success/failure counts
   - Time taken

4. **Recommendations**
   - Suggest optimal templates
   - Flag potential issues

Example expanded format:
```json
{
  "operations": [...],
  "stats": {
    "total": 100,
    "pending": 80,
    "success": 15,
    "error": 5
  },
  "warnings": ["Template may be too long", "..."],
  "elapsed_time": 2.5
}
```

## References

- **DupFileManager Plugin**: [GitHub](https://github.com/stashapp/CommunityScripts/tree/main/plugins/DupFileManager)
  - `DupFileManager.py`: Python implementation with `sys.stdout.write()`
  - `DupFileManager.js`: JavaScript implementation with JSON parsing
- **Stash Plugin API**: Official documentation on plugin development
- **GraphQL Mutations**: `runPluginOperation` mutation reference

## Credits

This implementation pattern was discovered by examining the DupFileManager plugin, which demonstrated that Stash captures stdout from plugins and returns it via GraphQL mutations. Thank you to the DupFileManager developers for this elegant solution!
