# 📋 Where to Find Plugin Output

## ✅ Plugin is Working!

Your logs show the plugin is running successfully:

```
[Plugin / Scene Renamer] Scene Renamer plugin starting
[Plugin / Scene Renamer] Server URL: http://0.0.0.0:9999/graphql
[Plugin / Scene Renamer] Running in DRY RUN mode
[Plugin / Scene Renamer] Running stash_renamer with args: --dry-run --debug
[Plugin / Scene Renamer] Scene Renamer completed successfully
```

## 🔍 Where to See Dry Run Output

### 1. **Stash Logs** (NEW - After Latest Update)

All output now appears in Stash logs with the `[Plugin / Scene Renamer]` prefix:

**Go to:** Settings → Logs (in Stash UI)

**Or check the log file:**

- Docker/Linux: `/opt/stash/stash.log`
- macOS: `~/.stash/stash.log`

You'll now see messages like:

```
[Plugin / Scene Renamer] [Info] Scenes count: 42
[Plugin / Scene Renamer] [DRY] scene1.mp4 -> Studio - 2024-01-15 - Scene Title.mp4
[Plugin / Scene Renamer] [DRY] scene2.mp4 -> Another Studio - Scene 2.mp4
[Plugin / Scene Renamer] [Warn] Information missing for new filename, ID: 123
```

### 2. **Log Files in Plugin Directory**

The script also creates files in the plugin directory:

**Dry Run:**

- File: `renamer_dryrun.txt`
- Location: `/opt/stash/plugins/stash_renamer/renamer_dryrun.txt`
- Content: List of what would be renamed

**Actual Rename:**

- File: `rename_log.txt`
- Location: `/opt/stash/plugins/stash_renamer/rename_log.txt`
- Content: Record of what was renamed
- Format: `scene_id|old_path|new_path`

**Failures:**

- File: `renamer_fail.txt`
- Content: Files that failed to rename

**Duplicates:**

- File: `renamer_duplicate.txt`
- Content: Files that would create duplicates

### 3. **Task Output** (In Stash UI)

When running a task:

1. Go to **Settings → Tasks**
2. Find "Rename Scenes (Dry Run)"
3. Click **Run Task**
4. Click on the task in the running tasks list
5. You'll see live output in the task details panel

## 📊 What You Should See

### With the Latest Update:

#### Before Processing:

```
[Plugin / Scene Renamer] Scene Renamer plugin starting
[Plugin / Scene Renamer] Server URL: http://0.0.0.0:9999/graphql
[Plugin / Scene Renamer] Running in DRY RUN mode
[Plugin / Scene Renamer] Template: $studio - $date - $title
[Plugin / Scene Renamer] Processing page 1 of 5
```

#### During Processing:

```
[Plugin / Scene Renamer] Scenes count: 42
[Plugin / Scene Renamer] [DEBUG] Scene information: {...}
[Plugin / Scene Renamer] [DEBUG] Filename: old_name.mp4 -> new_name.mp4
[Plugin / Scene Renamer] [DRY] old_name.mp4 -> Studio - 2024-01-15 - Title.mp4
```

#### Completion:

```
[Plugin / Scene Renamer] Scene Renamer completed successfully
```

## 🎯 Quick Check

To verify it's working with your scenes:

1. **Set a template** in plugin settings:

   ```
   Settings → Plugins → Scene Renamer → Template
   Example: $studio - $date - $title
   ```

2. **Run dry run task:**

   ```
   Settings → Tasks → Rename Scenes (Dry Run) → Run Task
   ```

3. **Check Stash logs:**

   ```
   Settings → Logs
   Look for: [Plugin / Scene Renamer]
   ```

4. **Check output file:**

   ```bash
   # If using Docker:
   docker exec -it stash cat /opt/stash/plugins/stash_renamer/renamer_dryrun.txt

   # If local:
   cat ~/.stash/plugins/stash_renamer/renamer_dryrun.txt
   ```

## 🐛 If You Don't See Output

### Issue: Only see "completed successfully" but no file operations

**Cause:** No scenes match the criteria

**Solutions:**

1. Check you have scenes in Stash
2. Remove any path filters (pathLike, excludePathLike)
3. Don't use tags initially (process all scenes)
4. Check scene filter in plugin settings

### Issue: See "No template specified" warning

**Cause:** Template not set in plugin settings

**Fix:**

1. Go to Settings → Plugins → Scene Renamer
2. Set "Filename Template" field
3. Example: `$studio - $date - $title`
4. Click Save
5. Run task again

### Issue: No scenes found message

**Possible causes:**

- Path filters excluding all scenes
- Tag filters with no matching scenes
- Scene filter too restrictive

**Check in logs:**

```
[Plugin / Scene Renamer] [Warn] There are no scenes to change with this query
```

### Issue: Can't find log files

**Docker container:**

```bash
# Enter container
docker exec -it stash bash

# Go to plugin directory
cd /opt/stash/plugins/stash_renamer

# List files
ls -la

# Check for output files
cat renamer_dryrun.txt
```

**Local installation:**

```bash
cd ~/.stash/plugins/stash_renamer
ls -la *.txt
cat renamer_dryrun.txt
```

## 📈 Progress Tracking

The plugin now supports progress reporting for long operations:

```
[Plugin / Scene Renamer] Processing page 1 of 10
[Plugin / Scene Renamer] Processing page 2 of 10
...
```

You'll see this in the Stash task progress bar!

## 💡 Pro Tips

### 1. **Always test with dry run first**

```
Use: Rename Scenes (Dry Run)
Check: renamer_dryrun.txt
Then: Rename Scenes (actual)
```

### 2. **Enable debug mode for detailed output**

```
Settings → Plugins → Scene Renamer → Debug Mode: ✓
```

### 3. **Watch logs in real-time** (Docker)

```bash
docker logs -f stash | grep "Scene Renamer"
```

### 4. **Check for errors specifically**

```bash
cat stash.log | grep -i "Scene Renamer.*error"
```

## 📝 Example Dry Run Output

With debug mode enabled, you should see:

```log
[Plugin / Scene Renamer] Scene Renamer plugin starting
[Plugin / Scene Renamer] Server URL: http://0.0.0.0:9999/graphql
[Plugin / Scene Renamer] Running in DRY RUN mode
[Plugin / Scene Renamer] Template: $studio - $date - $title - $performer
[Plugin / Scene Renamer] [DRY_RUN] DRY-RUN Enabled
[Plugin / Scene Renamer] Processing page 1 of 1
[Plugin / Scene Renamer] Scenes count: 3
[Plugin / Scene Renamer] [DEBUG] Scene information: {'title': 'Hot Scene', 'date': '2024-01-15', ...}
[Plugin / Scene Renamer] [DEBUG] Filename: old_scene.mp4 -> Brazzers - 2024-01-15 - Hot Scene - Jane Doe.mp4
[Plugin / Scene Renamer] [DRY] old_scene.mp4 -> Brazzers - 2024-01-15 - Hot Scene - Jane Doe.mp4
[Plugin / Scene Renamer] [DEBUG] Scene information: {'title': 'Another Scene', ...}
[Plugin / Scene Renamer] [DEBUG] Filename: scene2.mp4 -> Studio2 - 2024-02-20 - Another Scene.mp4
[Plugin / Scene Renamer] [DRY] scene2.mp4 -> Studio2 - 2024-02-20 - Another Scene.mp4
[Plugin / Scene Renamer] ====================
[Plugin / Scene Renamer] [DRY_RUN] To execute this rename operation, run: ...
[Plugin / Scene Renamer] Scene Renamer completed successfully
```

## 🎉 Summary

**After the latest update, all output goes to:**

1. ✅ **Stash Logs** - Real-time, searchable, with severity levels
2. ✅ **renamer_dryrun.txt** - Permanent record of what would change
3. ✅ **Task Output Panel** - Live updates in Stash UI

You should now see exactly what the plugin is doing! 🚀
