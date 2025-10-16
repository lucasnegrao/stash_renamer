# Stash Scene Renamer Plugin

Transform your scene renamer script into a fully-featured Stash plugin with UI and task integration.

## 🎯 Features

- **Web UI Interface**: Beautiful, dark-themed interface accessible from Stash
- **Task Integration**: Run from Stash's built-in task system
- **Dry Run Preview**: See what will be renamed before committing
- **Tag-based Filtering**: Rename scenes by specific tags
- **Template System**: Flexible filename templates with tokens
- **Path Filtering**: Include/exclude specific paths
- **Studio Folders**: Optionally organize by studio subfolders

## 📦 Installation

### Option 1: Stash Plugin System (Recommended)

1. **Copy plugin files to Stash plugins directory:**
   ```bash
   # macOS/Linux
   cp -r /Users/administrador/development/stash_renamer ~/.stash/plugins/stash_renamer
   
   # Or create a symlink
   ln -s /Users/administrador/development/stash_renamer ~/.stash/plugins/stash_renamer
   ```

2. **Ensure required files are present:**
   - `stash_renamer.yml` - Plugin configuration
   - `stash_renamer.py` - Main script
   - `ui.html` - Web interface (optional)

3. **Restart Stash** or reload plugins from Settings → Plugins

4. **Configure the plugin** in Stash Settings → Plugins → Scene Renamer:
   - **Server URL**: Your Stash GraphQL endpoint (e.g., `http://localhost:9999/graphql`)
   - **API Key**: Your Stash API key from Settings → Security → API Key
   - **Template**: Filename template with tokens
   - Other options as needed

> **Note**: When running as a plugin, Stash automatically provides connection info, so you typically don't need to manually set Server URL and API Key unless you want to connect to a different Stash instance.

### Option 2: Standalone with Task Integration

If you prefer to keep the script separate but still integrate with Stash tasks:

1. **Create a wrapper script** (`stash_renamer_task.py`):
   ```python
   #!/usr/bin/env python3
   import sys
   import json
   from stash_renamer import run, CONFIG, load_or_create_config
   
   def main():
       # Read task input from Stash
       input_data = json.loads(sys.stdin.read()) if not sys.stdin.isatty() else {}
       
       # Initialize config from Stash environment
       global CONFIG
       CONFIG = load_or_create_config(interactive_ok=False)
       
       # Run the renamer
       run()
       
       # Return success to Stash
       print(json.dumps({"output": "ok"}))
   
   if __name__ == "__main__":
       main()
   ```

2. **Add to Stash tasks** via Settings → Tasks → Add Custom Task

## 🎨 Using the Web UI

### Accessing the UI

Once installed as a plugin:
1. Go to Stash Settings → Plugins
2. Find "Scene Renamer" in the plugin list
3. Click "Open UI" or access via the plugin's configured route

### UI Features

**Filename Template**
- Design your naming convention using tokens
- Example: `$studio - $date - $title - $performer`
- Tokens: `$studio`, `$date`, `$title`, `$performer`, `$height`

**Tag-Based Renaming**
- Filter scenes by specific tags
- Autocomplete suggestions as you type
- Process multiple tags at once

**Options**
- ☑️ Female performers only
- ☑️ Skip scenes in groups/movies
- ☑️ Move files to studio subfolders
- ☑️ Enable debug output

**Path Filters**
- Include only specific paths
- Exclude certain directories
- Supports substring matching

**Actions**
- 🔍 **Preview Changes** - Dry run to see what would be renamed
- ✅ **Rename Files** - Execute the rename operation

## 🔧 Task Integration

The plugin provides three tasks:

### 1. Rename Scenes (Dry Run)
Preview what files would be renamed without making changes.
- **Safe to run** - no changes made
- Outputs preview to log
- Use this to test your template

### 2. Rename Scenes
Rename scene files based on the configured template.
- **Modifies files** on disk
- Uses settings from plugin configuration
- Creates rename log file

### 3. Rename Tagged Scenes
Rename only scenes with specific tags.
- More targeted than full rename
- Specify tags in task arguments
- Good for incremental organization

### Running Tasks

**From Stash UI:**
1. Go to Settings → Tasks
2. Find "Scene Renamer" tasks
3. Click "Run Task"
4. Monitor progress in task output

**From Command Line:**
```bash
# Dry run
python stash_renamer.py --dry-run --template '$studio - $date - $title'

# Actual rename
python stash_renamer.py --template '$studio - $date - $title'

# With tags
python stash_renamer.py --tag "needs-rename" --template '$studio - $title'

# With path filter
python stash_renamer.py --path-like '/mnt/media/scenes/' --template '$date - $title'
```

## ⚙️ Configuration

### Plugin Settings (stash_renamer.yml)

Edit these in Stash UI under Settings → Plugins → Scene Renamer:

#### Connection Settings
- **Server URL**: Stash GraphQL endpoint (optional, auto-detected when running as plugin)
- **API Key**: Your Stash API key (optional, auto-detected when running as plugin)

#### Renaming Settings
- **Template**: Default filename template
- **Female Only**: Include only female performers
- **Skip Grouped**: Skip scenes in groups/movies
- **Move to Studio Folder**: Organize by studio
- **Path Filter (Include)**: Only process matching paths
- **Path Filter (Exclude)**: Skip matching paths
- **Debug Mode**: Enable detailed logging

### Configuration Priority

The plugin checks for configuration in this order:

1. **Plugin Settings** (in Stash UI) - Recommended for plugin usage
2. **Stash Server Connection** - Auto-detected when running as plugin
3. **Environment Variables** - Good for command-line usage
4. **config.py file** - Legacy support
5. **Interactive Prompt** - Only with `--interactive` flag

#### Environment Variables (for CLI usage)
```bash
export STASH_SERVER_URL="http://localhost:9999/graphql"
export STASH_API_KEY="your-api-key-here"
```

#### Config File (for CLI usage)
Create `config.py` next to the script:
```python
server_url = "http://localhost:9999/graphql"
api_key = "your-api-key-here"
```

> **Tip**: When using as a Stash plugin, you don't need to manually configure Server URL and API Key - Stash provides this automatically!

## 📋 Template Tokens

| Token | Description | Example |
|-------|-------------|---------|
| `$studio` | Studio name | "Brazzers" |
| `$date` | Scene date | "2024-01-15" |
| `$title` | Scene title | "Scene Title" |
| `$performer` | Performer name(s) | "Jane Doe" |
| `$height` | Video resolution | "1080p", "4k" |

### Template Examples

```
$studio - $date - $title - $performer
→ "Brazzers - 2024-01-15 - Scene Title - Jane Doe"

$date - $title [$studio]
→ "2024-01-15 - Scene Title [Brazzers]"

$performer - $title ($date)
→ "Jane Doe - Scene Title (2024-01-15)"

[$studio] $title
→ "[Brazzers] Scene Title"
```

## 🔒 Safety Features

- **Dry Run Mode**: Always preview changes first
- **Duplicate Detection**: Won't overwrite existing files
- **Error Logging**: Failed renames logged to `renamer_fail.txt`
- **Rename Log**: Track all changes in `rename_log.txt`
- **Path Validation**: Checks file existence before renaming
- **Windows Path Support**: Handles long paths on Windows

## 📝 Output Files

The plugin creates these files in the script directory:

- `renamer_dryrun.txt` - Preview of changes (dry run)
- `rename_log.txt` - Log of successful renames
- `renamer_fail.txt` - Log of failed renames
- `renamer_duplicate.txt` - Log of duplicate conflicts

## 🐛 Troubleshooting

**Plugin not showing in Stash**
- Check `stash_renamer.yml` syntax
- Ensure Python is in PATH
- Restart Stash completely
- Check Stash logs for errors

**UI not loading**
- Verify `ui.html` is in plugin directory
- Check browser console for errors
- Ensure Stash API key is set

**Renames not working**
- Run in dry-run mode first
- Enable debug mode in settings
- Check file permissions
- Verify paths are correct

**No scenes found**
- Check tag names are correct
- Verify path filters aren't too restrictive
- Try without filters first
- Check scene filter in debug output

## 🚀 Advanced Usage

### Custom Scene Filters

Pass JSON filter for advanced queries:
```bash
python stash_renamer.py \
  --filter '{"organized": false, "resolution": "1080p"}' \
  --template '$studio - $title'
```

### Multiple Tag Templates

Use a config file for different templates per tag:
```json
[
  {"tag": "needs-rename", "template": "$studio - $date - $title"},
  {"tag": "4k-scenes", "template": "[$height] $studio - $title"},
  {"tag": "vintage", "template": "$date - $title [$studio]"}
]
```

```bash
python stash_renamer.py --config tag_templates.json
```

### Batch Processing

Process different paths with different templates:
```bash
# New scenes
python stash_renamer.py \
  --path-like '/mnt/new/' \
  --template '$studio - $date - $title - $performer'

# Archive scenes  
python stash_renamer.py \
  --path-like '/mnt/archive/' \
  --template '$date - $title'
```

## 📚 Additional Resources

- [Stash Plugin Development](https://github.com/stashapp/stash/blob/develop/ui/v2.5/docs/en/Plugins.md)
- [GraphQL API Documentation](https://github.com/stashapp/stash/blob/develop/graphql/schema/schema.graphql)
- [Plugin Examples](https://github.com/stashapp/CommunityScripts)

## 🤝 Contributing

Improvements welcome! Consider adding:
- More filename tokens (tags, ratings, etc.)
- Batch tag operations
- Scene metadata updates
- Integration with other plugins
- Additional UI features

## 📄 License

Use freely for your Stash setup!
