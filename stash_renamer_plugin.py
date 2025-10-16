#!/usr/bin/env python3
"""
Stash Plugin wrapper for stash_renamer
Handles plugin API communication and task execution
"""
import json
import sys
import os
from typing import Dict, Any, Optional

# Import the original renamer functionality
from stash_renamer import (
    run, edit_run, load_or_create_config,
    CONFIG, USING_LOG, DRY_RUN, FEMALE_ONLY, DEBUG_MODE, 
    SKIP_GROUPED, MOVE_TO_STUDIO_FOLDER
)


class StashPlugin:
    """Wrapper for Stash plugin system integration"""
    
    def __init__(self):
        self.input_data: Dict[str, Any] = {}
        self.output: Dict[str, Any] = {}
        
    def read_input(self) -> Dict[str, Any]:
        """Read input from Stash plugin system via stdin"""
        try:
            if not sys.stdin.isatty():
                input_str = sys.stdin.read()
                if input_str:
                    self.input_data = json.loads(input_str)
            return self.input_data
        except Exception as e:
            self.log(f"Error reading plugin input: {e}", level="error")
            return {}
    
    def write_output(self):
        """Write output to Stash plugin system via stdout"""
        print(json.dumps(self.output), flush=True)
    
    def log(self, message: str, level: str = "info"):
        """Log message that will appear in Stash logs"""
        log_entry = {
            "level": level,
            "message": message
        }
        if "logs" not in self.output:
            self.output["logs"] = []
        self.output["logs"].append(log_entry)
        
        # Also print for immediate feedback
        print(f"[{level.upper()}] {message}", file=sys.stderr, flush=True)
    
    def set_progress(self, progress: float, message: str = ""):
        """Update task progress (0.0 to 1.0)"""
        self.output["progress"] = progress
        if message:
            self.output["status"] = message
            self.log(message)
    
    def get_server_connection(self) -> Dict[str, str]:
        """Get Stash server connection info from plugin input"""
        server_conn = self.input_data.get("server_connection", {})
        return {
            "url": server_conn.get("Scheme", "http") + "://" + 
                   server_conn.get("Host", "localhost") + ":" + 
                   str(server_conn.get("Port", 9999)) + "/graphql",
            "api_key": server_conn.get("ApiKey", "")
        }
    
    def get_args(self) -> Dict[str, Any]:
        """Get task arguments from plugin input"""
        return self.input_data.get("args", {})
    
    def get_plugin_config(self) -> Dict[str, Any]:
        """Get plugin configuration from plugin input"""
        return self.input_data.get("plugin_config", {})


def handle_task(plugin: StashPlugin, task_name: str, args: Dict[str, Any], config: Dict[str, Any]):
    """Handle different task types"""
    
    # Import globals from stash_renamer
    global USING_LOG, DRY_RUN, FEMALE_ONLY, DEBUG_MODE, SKIP_GROUPED, MOVE_TO_STUDIO_FOLDER, CONFIG
    
    # Setup config - prioritize plugin settings, then server connection
    from types import SimpleNamespace
    
    # Check if serverUrl and apiKey are in plugin settings
    if config.get("serverUrl") and config.get("apiKey"):
        CONFIG = SimpleNamespace(
            server_url=config["serverUrl"],
            api_key=config["apiKey"]
        )
        plugin.log(f"Using server URL from plugin settings: {config['serverUrl']}")
    else:
        # Fall back to server connection from Stash
        server_conn = plugin.get_server_connection()
        if server_conn["url"] and server_conn["api_key"]:
            CONFIG = SimpleNamespace(
                server_url=server_conn["url"],
                api_key=server_conn["api_key"]
            )
            plugin.log(f"Using server URL from Stash connection: {server_conn['url']}")
        else:
            CONFIG = load_or_create_config(interactive_ok=False)
    
    # Apply plugin config
    template = config.get("template", "$studio - $date - $title - $performer")
    FEMALE_ONLY = config.get("femaleOnly", False)
    SKIP_GROUPED = config.get("skipGrouped", False)
    MOVE_TO_STUDIO_FOLDER = config.get("moveToStudioFolder", False)
    DEBUG_MODE = config.get("debugMode", True)
    path_like = config.get("pathLike", None) or None
    exclude_path_like = config.get("excludePathLike", None) or None
    
    # Override with task args
    if "template" in args:
        template = args["template"]
    if "dry_run" in args:
        DRY_RUN = args["dry_run"]
    if "female_only" in args:
        FEMALE_ONLY = args["female_only"]
    if "skip_grouped" in args:
        SKIP_GROUPED = args["skip_grouped"]
    if "move_to_studio" in args:
        MOVE_TO_STUDIO_FOLDER = args["move_to_studio"]
    if "debug" in args:
        DEBUG_MODE = args["debug"]
    if "path_like" in args:
        path_like = args["path_like"]
    if "exclude_path_like" in args:
        exclude_path_like = args["exclude_path_like"]
    
    # Get tags if provided
    tags = args.get("tags", [])
    if isinstance(tags, str):
        tags = [t.strip() for t in tags.split(",") if t.strip()]
    
    plugin.set_progress(0.0, "Starting rename operation...")
    
    try:
        if task_name == "dry_run":
            DRY_RUN = True
            plugin.log("Running in DRY RUN mode - no files will be modified")
        
        plugin.set_progress(0.1, f"Processing with template: {template}")
        
        # Run the rename operation
        edit_run(
            template=template,
            base_filter=None,
            tag_names=tags if tags else None,
            path_like=path_like,
            exclude_path_like=exclude_path_like
        )
        
        plugin.set_progress(1.0, "Rename operation completed")
        
        if DRY_RUN:
            plugin.log("Dry run completed. Check renamer_dryrun.txt for preview.")
            plugin.output["output"] = "Dry run completed successfully"
        else:
            plugin.log("Rename operation completed. Check rename_log.txt for details.")
            plugin.output["output"] = "Rename operation completed successfully"
            
    except Exception as e:
        plugin.log(f"Error during rename operation: {e}", level="error")
        plugin.output["error"] = str(e)


def main():
    """Main plugin entry point"""
    plugin = StashPlugin()
    
    # Read input from Stash
    plugin.read_input()
    
    # Determine what to do
    mode = plugin.input_data.get("mode")
    
    if mode == "task":
        # Running as a task
        task_name = plugin.input_data.get("task_name", "rename")
        args = plugin.get_args()
        config = plugin.get_plugin_config()
        
        handle_task(plugin, task_name, args, config)
        
    elif mode == "ui":
        # Serving UI
        ui_path = os.path.join(os.path.dirname(__file__), "ui.html")
        if os.path.exists(ui_path):
            with open(ui_path, 'r') as f:
                plugin.output["html"] = f.read()
        else:
            plugin.output["error"] = "UI file not found"
    
    else:
        # Default: run the original script
        try:
            run()
            plugin.output["output"] = "ok"
        except Exception as e:
            plugin.log(f"Error: {e}", level="error")
            plugin.output["error"] = str(e)
    
    # Write output to Stash
    plugin.write_output()


if __name__ == "__main__":
    main()
