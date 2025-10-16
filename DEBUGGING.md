# 🔍 Debugging Guide - Scene Renamer Plugin

## What Changed

Added **proper Stash logging** following the official plugin examples:

### 1. **Added `log.py`** (from official Stash examples)
   - Special encoding for log levels (SOH + level + STX)
   - Proper functions: `LogInfo()`, `LogDebug()`, `LogWarning()`, `LogError()`, `LogProgress()`
   - Logs appear correctly in Stash logs with proper severity

### 2. **Updated `plugin_wrapper.py`**
   - Now uses `log.LogInfo()`, `log.LogDebug()`, etc.
   - Follows exact pattern from official `pyplugin.py`
   - Better error handling with full tracebacks
   - More verbose debugging output

### 3. **Updated `test_plugin.py`**
   - Decodes Stash's special log format
   - Shows you exactly what Stash sees
   - Pretty formatting for easier debugging

## How to Debug

### Step 1: Test Locally First

```bash
cd /Users/administrador/development/stash_renamer
python3 test_plugin.py
```

This will show you:
- ✅ What input the plugin receives
- ✅ All log messages (decoded)
- ✅ The JSON output
- ✅ Any errors with full tracebacks

### Step 2: Check What's Wrong

The test output will show you **exactly** where it fails:

```
[INFO] Scene Renamer plugin starting
[INFO] Server URL: http://localhost:9999/graphql
[DEBUG] Has API key: True
[DEBUG] Plugin args: {...}
[INFO] Template: $studio - $date - $title
[INFO] Running stash_renamer with args: --dry-run --template ...
[ERROR] Error in plugin: ...
[ERROR] Full traceback:
[ERROR]   File "...", line X, in ...
```

### Step 3: Common Issues

#### Issue: "No input received from Stash"
**Cause:** Plugin wrapper not receiving stdin
**Fix:** Check YAML file has correct exec path

#### Issue: "No server_connection in input"
**Cause:** Stash not sending proper input structure
**Fix:** Verify you're using `interface: raw` in YAML

#### Issue: "CONFIG not initialized"
**Cause:** Environment variables not set properly
**Fix:** Check plugin wrapper is setting STASH_SERVER_URL and STASH_API_KEY

#### Issue: "No SessionCookie found"
**Cause:** Stash not authenticated or test mode
**Fix:** Normal in local testing, but should work in Stash

#### Issue: Exit code 1 with no error
**Cause:** Exception somewhere in the code
**Fix:** Enable debug mode, check full traceback in logs

## Reading Stash Logs

Stash logs use special encoding. The wrapper now properly formats them:

```
\x01i\x02Starting plugin    →  [INFO] Starting plugin
\x01d\x02Debug message      →  [DEBUG] Debug message  
\x01w\x02Warning here       →  [WARN] Warning here
\x01e\x02Error occurred     →  [ERROR] Error occurred
\x01p\x010.5                →  [PROGRESS] 0.5
```

Log levels:
- `t` = TRACE
- `d` = DEBUG
- `i` = INFO
- `w` = WARN
- `e` = ERROR
- `p` = PROGRESS

## Testing Without Stash

You can test the plugin completely standalone:

```bash
# Create a test input file
cat > test_input.json <<EOF
{
  "server_connection": {
    "Scheme": "http",
    "Host": "localhost",
    "Port": 9999,
    "SessionCookie": {
      "Name": "session",
      "Value": "test-cookie"
    }
  },
  "args": {
    "mode": "dry_run",
    "template": "$studio - $title",
    "debugMode": true
  }
}
EOF

# Run the plugin
cat test_input.json | python3 plugin_wrapper.py
```

## Debugging in Stash

### Enable Debug Mode
1. Go to Settings → Plugins → Scene Renamer
2. Check "Debug Mode"
3. Save

### Check Stash Logs
Logs are in:
- Linux/Docker: `/root/.stash/stash.log`
- macOS: `~/.stash/stash.log`
- Or check Settings → Logs in Stash UI

### Look for:
```
[Plugin / Scene Renamer] [INFO] Scene Renamer plugin starting
[Plugin / Scene Renamer] [INFO] Server URL: http://...
[Plugin / Scene Renamer] [DEBUG] Plugin args: {...}
[Plugin / Scene Renamer] [INFO] Running stash_renamer with args: ...
```

### If you see errors:
```
[Plugin / Scene Renamer] [ERROR] Error in plugin: ...
[Plugin / Scene Renamer] [ERROR] Full traceback:
[Plugin / Scene Renamer] [ERROR]   File "...", line X
```

## Increasing Verbosity

### In plugin_wrapper.py:
Already has extensive logging at INFO and DEBUG levels

### In stash_renamer.py:
The `--debug` flag enables detailed output:
- Scene information
- Filename transformations
- Path operations
- Errors with context

### In Stash:
Set log level in Stash config:
```yaml
# config.yml
logLevel: debug
```

## Quick Reference

### Files:
- `stash_renamer.yml` - Plugin configuration
- `plugin_wrapper.py` - Entry point (what Stash calls)
- `stash_renamer.py` - Main logic
- `log.py` - Stash logging functions
- `test_plugin.py` - Local testing

### Testing Workflow:
1. **Local test**: `python3 test_plugin.py`
2. **Fix any errors** shown in traceback
3. **Install in Stash**: Restart Stash
4. **Check Stash logs** for actual errors
5. **Iterate** until working

### Log Levels to Use:
- `LogDebug()` - Detailed debugging info
- `LogInfo()` - Normal operation messages
- `LogWarning()` - Non-fatal issues
- `LogError()` - Errors that stop operation
- `LogProgress()` - Task progress (0.0 to 1.0)

## Example: Adding More Logging

In `plugin_wrapper.py`:

```python
log.LogInfo("Starting rename operation")
log.LogDebug(f"Processing {len(scenes)} scenes")
log.LogWarning("Template not specified, using default")
log.LogError(f"Failed to rename: {error}")
log.LogProgress(0.5)  # 50% complete
```

## Troubleshooting Checklist

- [ ] Run `python3 test_plugin.py` - does it work?
- [ ] Check plugin_wrapper.py line numbers in error
- [ ] Verify YAML has correct exec path
- [ ] Check Stash logs for full error message
- [ ] Enable debug mode in plugin settings
- [ ] Try with simple template first: `$title`
- [ ] Test dry-run task first (safer)
- [ ] Check file permissions on plugin files
- [ ] Verify python3 is in PATH
- [ ] Check requests module is installed

## Getting Help

When asking for help, provide:
1. Output of `python3 test_plugin.py`
2. Relevant lines from Stash logs
3. Your plugin settings (from Stash UI)
4. What task you're running
5. Any error messages

The logs now show **exactly** where things fail! 🎯
