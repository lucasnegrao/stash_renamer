# Quick Plugin Setup Guide

## ✅ What's Been Added

Your scene renamer is now a full Stash plugin! Here's what was created:

### New Files
- `stash_renamer.yml` - Plugin configuration and metadata
- `ui.html` - Web interface for the plugin
- `stash_renamer_plugin.py` - Plugin wrapper for Stash integration
- `README_PLUGIN.md` - Complete documentation

### Modified Files
- `stash_renamer.py` - Added plugin settings support

## 🚀 Quick Start

### 1. Install the Plugin

Copy or symlink to your Stash plugins directory:

```bash
# On macOS/Linux - using symlink (recommended for development)
ln -s /Users/administrador/development/stash_renamer ~/.stash/plugins/stash_renamer

# Or copy the folder
cp -r /Users/administrador/development/stash_renamer ~/.stash/plugins/stash_renamer
```

### 2. Restart Stash

Completely restart Stash (not just reload page) to detect the new plugin.

### 3. Configure in Stash UI

Go to **Settings → Plugins → Scene Renamer**

**Important Settings:**
- **Server URL**: Usually auto-detected, but you can override (e.g., `http://localhost:9999/graphql`)
- **API Key**: Usually auto-detected from Stash, but you can set manually if needed
- **Template**: `$studio - $date - $title - $performer` (or customize)
- **Debug Mode**: Enable to see detailed logs

> 💡 **Pro Tip**: When running as a plugin, Stash automatically provides the server URL and API key, so you typically don't need to configure these unless connecting to a different Stash instance!

### 4. Run from Tasks

Go to **Settings → Tasks** and look for:
- **Rename Scenes (Dry Run)** - Preview changes safely
- **Rename Scenes** - Execute the rename
- **Rename Tagged Scenes** - Process specific tags

## 🔧 Configuration Priority

The plugin loads configuration in this order:

1. ✨ **Plugin Settings** (from Stash UI) ← **RECOMMENDED**
2. 🔌 **Stash Server Connection** (auto-provided by Stash)
3. 🌍 **Environment Variables** (STASH_SERVER_URL, STASH_API_KEY)
4. 📄 **config.py file** (legacy support)
5. 💬 **Interactive prompt** (with --interactive flag)

This means:
- **As a plugin**: Just configure in Stash UI, everything works automatically!
- **From command line**: Use environment variables or config.py

## 📝 Available Settings

### In Plugin Settings (Stash UI)

| Setting | Type | Description |
|---------|------|-------------|
| Server URL | String | Stash GraphQL endpoint (optional) |
| API Key | String | Your API key (optional) |
| Template | String | Filename pattern with tokens |
| Female Only | Boolean | Only include female performers |
| Skip Grouped | Boolean | Skip scenes in movies/groups |
| Move to Studio Folder | Boolean | Organize by studio subfolders |
| Path Filter (Include) | String | Only process matching paths |
| Path Filter (Exclude) | String | Skip matching paths |
| Debug Mode | Boolean | Detailed logging |

### Template Tokens

- `$studio` - Studio name
- `$date` - Scene date
- `$title` - Scene title
- `$performer` - Performer name(s)
- `$height` - Video resolution (1080p, 4k, etc.)

### Example Templates

```
$studio - $date - $title - $performer
→ "Brazzers - 2024-01-15 - Scene Title - Jane Doe"

$date - $title [$studio]
→ "2024-01-15 - Scene Title [Brazzers]"

[$studio] $title - $performer
→ "[Brazzers] Scene Title - Jane Doe"
```

## 🎯 Usage Scenarios

### Scenario 1: Test with Dry Run (RECOMMENDED)
1. Go to **Settings → Tasks**
2. Find **"Rename Scenes (Dry Run)"**
3. Click **Run Task**
4. Check the output and `renamer_dryrun.txt`
5. If happy, run **"Rename Scenes"** to execute

### Scenario 2: Rename by Tag
1. Configure template in plugin settings
2. Go to **Settings → Tasks**
3. Run **"Rename Tagged Scenes"**
4. Provide tag names in task arguments
5. Monitor progress in task output

### Scenario 3: Command Line (outside Stash)
```bash
# Dry run
python stash_renamer.py --dry-run --template '$studio - $date - $title'

# Execute
python stash_renamer.py --template '$studio - $date - $title'

# With tags
python stash_renamer.py --tag "needs-rename" --template '$studio - $title'
```

## 🐛 Troubleshooting

### Plugin doesn't show up in Stash
- Check file `stash_renamer.yml` exists in plugin folder
- Verify YAML syntax is valid
- Ensure Python is installed and in PATH
- Restart Stash completely (not just reload)
- Check Stash logs for errors

### "CONFIG not initialized" error
When running as plugin, this should auto-configure. If you see this error:
1. Make sure Stash is providing connection info
2. Or manually set **Server URL** and **API Key** in plugin settings
3. Or use environment variables for CLI usage

### No scenes found
- Enable **Debug Mode** in settings
- Check tag names are correct (case-sensitive)
- Verify path filters aren't too restrictive
- Try without filters first to see all scenes

### Files not renaming
- Run **Dry Run** first to preview
- Check file permissions
- Verify paths exist on disk
- Look in `renamer_fail.txt` for errors
- Enable **Debug Mode** for detailed logs

## 📂 Output Files

The plugin creates these log files:

- `renamer_dryrun.txt` - Preview of changes (dry run mode)
- `rename_log.txt` - Successfully renamed files
- `renamer_fail.txt` - Failed renames
- `renamer_duplicate.txt` - Duplicate filename conflicts

## 🎉 You're All Set!

Your scene renamer is now a fully functional Stash plugin with:
- ✅ Configuration via Stash UI (no more config.py!)
- ✅ Task integration
- ✅ Dry run preview
- ✅ Automatic server connection
- ✅ Detailed logging

Enjoy organizing your scenes! 🎬
