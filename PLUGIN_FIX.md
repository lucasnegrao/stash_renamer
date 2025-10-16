# ✅ Plugin Fixed - Following Stash Standards

## What Was Wrong

The plugin wasn't following Stash's standard plugin interface. Stash plugins receive input via **stdin as JSON** with a specific structure, and Stash **automatically provides** the server URL and API key through the `server_connection` object.

## What Was Fixed

### 1. **Proper Plugin Wrapper (`plugin_wrapper.py`)**
   - Reads JSON from stdin (Stash's standard input method)
   - Extracts `server_connection` with server URL and session cookie
   - Converts plugin args to command-line arguments for the main script  
   - Outputs JSON to stdout (required by Stash)
   - Proper error handling with JSON error responses

### 2. **Updated YAML Configuration (`stash_renamer.yml`)**
   - Removed `serverUrl` and `apiKey` settings (Stash provides these automatically!)
   - Simplified settings to only user-configurable options
   - Uses `interface: raw` (correct for Python plugins)
   - Tasks pass settings through `defaultArgs`

### 3. **Environment Variable Fallback**
   - Plugin wrapper sets `STASH_SERVER_URL` and `STASH_API_KEY` as environment variables
   - Main script (`stash_renamer.py`) checks env vars if plugin input fails
   - Backward compatible with CLI usage

## How Stash Plugin Input Works

When Stash runs a plugin task, it sends JSON via stdin:

```json
{
  "server_connection": {
    "Scheme": "http",
    "Host": "localhost",
    "Port": 9999,
    "SessionCookie": {
      "Name": "session",
      "Value": "your-auth-cookie",
      ...
    },
    "Dir": "/path/to/config",
    "PluginDir": "/path/to/plugin"
  },
  "args": {
    "template": "$studio - $date - $title",
    "femaleOnly": false,
    "debugMode": true,
    ...
  }
}
```

**Key Points:**
- `server_connection` is **automatically provided** by Stash
- Authentication is via `SessionCookie`, not a separate API key field
- Plugin settings are passed in `args`
- Task `defaultArgs` are merged with plugin settings

## Files Structure

```
stash_renamer/
├── stash_renamer.yml          # Plugin configuration (fixed)
├── plugin_wrapper.py          # NEW - Stash plugin interface
├── stash_renamer.py           # Main script (unchanged logic)
├── test_plugin.py             # NEW - Test the plugin locally
├── README_PLUGIN.md           # Documentation
└── PLUGIN_SETUP.md            # Quick start guide
```

## Testing Locally

You can test the plugin without Stash:

```bash
python3 test_plugin.py
```

This simulates Stash's input and shows you the output.

## Installation

1. **Copy or symlink to Stash plugins directory:**
   ```bash
   ln -s /Users/administrador/development/stash_renamer ~/.stash/plugins/stash_renamer
   ```

2. **Restart Stash completely**

3. **Check plugin loaded:**
   - Go to Settings → Plugins
   - You should see "Scene Renamer"
   - No configuration needed - Stash provides connection automatically!

4. **Configure settings:**
   - Template: `$studio - $date - $title - $performer`
   - Female Only: off
   - Debug Mode: on
   - etc.

5. **Run a task:**
   - Go to Settings → Tasks
   - Find "Rename Scenes (Dry Run)"
   - Click Run
   - Check output

## What You Can Configure

In Stash UI under Settings → Plugins → Scene Renamer:

| Setting | Description | Example |
|---------|-------------|---------|
| Filename Template | Pattern for new filenames | `$studio - $date - $title` |
| Female Performers Only | Only include female performers | ☐ |
| Skip Grouped Scenes | Skip scenes in groups/movies | ☐ |
| Move to Studio Folder | Organize by studio subfolders | ☐ |
| Path Filter (Include) | Only process matching paths | `/mnt/media/` |
| Path Filter (Exclude) | Skip matching paths | `/tmp/` |
| Debug Mode | Detailed logging | ☑ |

## Available Tasks

1. **Rename Scenes (Dry Run)**
   - Safe preview mode
   - Shows what would be renamed
   - Creates `renamer_dryrun.txt`

2. **Rename Scenes**
   - Actually renames files
   - Uses template from settings
   - Creates `rename_log.txt`

3. **Rename Tagged Scenes**
   - Process scenes with specific tags
   - Add tag names in task arguments
   - More targeted operation

## Troubleshooting

### Plugin shows up but tasks fail

Check Stash logs for:
- Python path issues (needs `python3`)
- Permission issues
- File not found errors

### "CONFIG not initialized" error

This should be **fixed now**! The plugin wrapper properly extracts the server connection from Stash's input.

If you still see this:
1. Check Stash logs for the actual error
2. Verify `plugin_wrapper.py` is being called (not `stash_renamer.py` directly)
3. Make sure YAML has `exec: ["python3", "{pluginDir}/plugin_wrapper.py"]`

### Test locally first

```bash
cd /Users/administrador/development/stash_renamer
python3 test_plugin.py
```

This will show if the wrapper is working correctly.

## Key Differences from Before

| Before | After |
|--------|-------|
| ❌ Called `stash_renamer.py` directly | ✅ Calls `plugin_wrapper.py` |
| ❌ Tried to read stdin in main script | ✅ Wrapper handles stdin properly |
| ❌ Required manual serverUrl/apiKey config | ✅ Auto-detected from Stash |
| ❌ Complex stdin parsing logic | ✅ Standard Stash plugin pattern |
| ❌ Didn't output JSON | ✅ Outputs proper JSON response |

## Reference

Based on official Stash plugin examples:
- https://github.com/stashapp/stash/tree/develop/pkg/plugin/examples/python

The plugin now follows the exact same pattern as Stash's official Python plugin examples!

## Next Steps

1. Restart Stash
2. Check Settings → Plugins
3. Configure Scene Renamer settings
4. Run "Rename Scenes (Dry Run)" task
5. Check output and logs
6. If successful, run actual rename task

🎉 Your plugin is now properly integrated with Stash!
