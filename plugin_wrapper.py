#!/usr/bin/env python3
"""
Stash plugin wrapper for scene renamer
Follows the official Stash plugin pattern from:
https://github.com/stashapp/stash/tree/develop/pkg/plugin/examples/python
"""
import json
import sys
import os

import log
import requests

def read_json_input():
    """Read and parse JSON input from stdin"""
    stdin_data = sys.stdin.read()
    if stdin_data:
        return json.loads(stdin_data)
    return None

def fetch_plugin_settings_fallback(server_url, cookie_name, cookie_value):
    """Fetch settings using configuration query"""
    log.LogDebug("Fetching plugin settings from configuration")
    
    # The correct query format for Stash - configuration is a Query type, not nested
    query = """
    query {
      configuration {
        general {
          databasePath
        }
        plugins
      }
    }
    """
    
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    
    cookies = {cookie_name: cookie_value} if cookie_name and cookie_value else {}
    
    try:
        response = requests.post(
            server_url,
            json={"query": query},
            headers=headers,
            cookies=cookies
        )
        
        log.LogDebug(f"Configuration query status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            
            # Check for GraphQL errors
            if "errors" in result:
                log.LogWarning(f"GraphQL errors: {result['errors']}")
                return {}
            
            data = result.get("data", {})
            if not data:
                log.LogWarning("No data in configuration response")
                return {}
            
            config = data.get("configuration", {})
            if not config:
                log.LogWarning("No configuration in response")
                return {}
            
            plugins_config = config.get("plugins")
            
            if plugins_config:
                # Parse if it's a JSON string
                if isinstance(plugins_config, str):
                    try:
                        plugins_config = json.loads(plugins_config)
                    except json.JSONDecodeError as e:
                        log.LogWarning(f"Failed to parse plugins JSON: {e}")
                        return {}
                
                # plugins_config is a dict with plugin_id as keys
                log.LogDebug(f"Found {len(plugins_config)} plugins in config")
                log.LogDebug(f"Available plugin IDs: {list(plugins_config.keys())}")
                
                # Our plugin ID is "stash_renamer" (from the YAML filename)
                plugin_id = "stash_renamer"
                if plugin_id in plugins_config:
                    plugin_data = plugins_config[plugin_id]
                    log.LogDebug(f"Plugin data type: {type(plugin_data)}, keys: {list(plugin_data.keys()) if isinstance(plugin_data, dict) else 'N/A'}")
                    
                    # Settings are directly in the plugin data
                    settings = plugin_data
                    log.LogInfo(f"Found settings for '{plugin_id}': {json.dumps(settings)}")
                    return settings
                else:
                    log.LogWarning(f"Plugin '{plugin_id}' not found in configuration. Available: {list(plugins_config.keys())}")
            else:
                log.LogWarning("No plugins in configuration")
        else:
            log.LogWarning(f"Configuration query failed: {response.status_code}")
            log.LogDebug(f"Response: {response.text[:500]}")
    except Exception as e:
        log.LogWarning(f"Fallback error: {e}")
        import traceback
        log.LogDebug(traceback.format_exc())
    
    return {}

def fetch_plugin_settings(server_url, cookie_name, cookie_value, plugin_id="stash_renamer"):
    """Fetch plugin settings from Stash via GraphQL"""
    # Try to get plugin settings directly
    query = """
    query GetPluginSettings($plugin_id: ID!) {
      pluginSettings(plugin_id: $plugin_id)
    }
    """
    
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    
    cookies = {cookie_name: cookie_value} if cookie_name and cookie_value else {}
    variables = {"plugin_id": plugin_id}
    
    try:
        response = requests.post(
            server_url,
            json={"query": query, "variables": variables},
            headers=headers,
            cookies=cookies
        )
        
        if response.status_code == 200:
            result = response.json()
            
            # Check for errors
            if result.get("errors"):
                log.LogDebug(f"GraphQL errors: {result['errors']}")
                # Fall back to configuration query
                return fetch_plugin_settings_fallback(server_url, cookie_name, cookie_value)
            
            data = result.get("data", {})
            settings_json = data.get("pluginSettings")
            
            if settings_json:
                if isinstance(settings_json, str):
                    settings = json.loads(settings_json)
                else:
                    settings = settings_json
                log.LogInfo(f"Found plugin settings: {json.dumps(settings)}")
                return settings
            else:
                log.LogDebug("No pluginSettings in response, trying fallback")
                return fetch_plugin_settings_fallback(server_url, cookie_name, cookie_value)
        else:
            log.LogWarning(f"Failed to fetch plugin settings: {response.status_code}")
            # Try fallback on failure
            return fetch_plugin_settings_fallback(server_url, cookie_name, cookie_value)
    except Exception as e:
        log.LogWarning(f"Error fetching plugin settings: {e}")
    
    return {}

def main():
    input_data = None
    
    # Read plugin input from Stash
    if len(sys.argv) < 2:
        input_data = read_json_input()
        log.LogDebug("Raw input: %s" % json.dumps(input_data))
    else:
        # Command line mode (for testing)
        log.LogDebug("Using command line inputs")
        mode = sys.argv[1]
        log.LogDebug("Command line inputs: {}".format(sys.argv[1:]))
        
        input_data = {}
        input_data['args'] = {
            "mode": mode
        }
        # Hard-coded values for testing
        input_data['server_connection'] = {
            "Scheme": "http",
            "Port": 9999,
        }
    
    output = {}
    run(input_data, output)
    
    # Output JSON response
    out = json.dumps(output)
    print(out + "\n")

def run(input_data, output):
    """Main plugin logic"""
    try:
        log.LogInfo("Scene Renamer plugin starting")
        
        if not input_data:
            raise Exception("No input received from Stash")
        
        # Extract server connection info
        server_conn = input_data.get("server_connection", {})
        if not server_conn:
            raise Exception("No server_connection in input")
        
        scheme = server_conn.get("Scheme", "http")
        host = server_conn.get("Host", "localhost")
        port = server_conn.get("Port", 9999)
        server_url = f"{scheme}://{host}:{port}/graphql"
        
        # Stash provides authentication via SessionCookie
        session_cookie = server_conn.get("SessionCookie")
        if session_cookie:
            cookie_name = session_cookie.get("Name", "session")
            cookie_value = session_cookie.get("Value", "")
        else:
            # No session cookie - maybe running in test mode
            cookie_name = ""
            cookie_value = ""
            log.LogWarning("No SessionCookie found - authentication may fail")
        
        log.LogInfo(f"Server URL: {server_url}")
        log.LogDebug(f"Has session cookie: {bool(cookie_value)}")
        
        # Set as environment variables for the main script
        os.environ["STASH_SERVER_URL"] = server_url
        if cookie_value:
            os.environ["STASH_COOKIE_NAME"] = cookie_name
            os.environ["STASH_COOKIE_VALUE"] = cookie_value
        
        # Fetch plugin settings from Stash
        settings = fetch_plugin_settings(server_url, cookie_name, cookie_value)
        
        # Extract plugin arguments (from task)
        args = input_data.get("args", {})
        log.LogDebug(f"Plugin args: {json.dumps(args)}")
        
        # Merge settings with args (args take precedence for overrides)
        combined_args = {**settings, **args}
        
        # Check for mode from task
        mode = combined_args.get("mode", "")
        dry_run = combined_args.get("dry_run", "false").lower() == "true" or mode == "dry_run"
        
        # Build command line args for the main script
        cmd_args = []
        
        # Dry run mode
        if dry_run:
            cmd_args.append("--dry-run")
            log.LogInfo("Running in DRY RUN mode")
        else:
            cmd_args.append("--no-dry-run")
        
        # Template
        template = combined_args.get("template", "")
        if not template:
            # Use a sensible default template
            template = "$studio - $date - $title"
            log.LogInfo(f"No template specified - using default: {template}")
        
        cmd_args.extend(["--template", template])
        log.LogInfo(f"Template: {template}")
        
        # Boolean flags
        if combined_args.get("femaleOnly"):
            cmd_args.append("--female-only")
            log.LogDebug("Female performers only: enabled")
        
        if combined_args.get("skipGrouped"):
            cmd_args.append("--skip-grouped")
            log.LogDebug("Skip grouped scenes: enabled")
        
        if combined_args.get("moveToStudioFolder"):
            cmd_args.append("--move-to-studio-folder")
            log.LogDebug("Move to studio folder: enabled")
        
        # Debug mode (default to true)
        if combined_args.get("debugMode", True):
            cmd_args.append("--debug")
        else:
            cmd_args.append("--no-debug")
        
        # Path filters
        path_like = combined_args.get("pathLike", "")
        if path_like:
            cmd_args.extend(["--path-like", path_like])
            log.LogInfo(f"Path filter (include): {path_like}")
        
        exclude_path_like = combined_args.get("excludePathLike", "")
        if exclude_path_like:
            cmd_args.extend(["--exclude-path-like", exclude_path_like])
            log.LogInfo(f"Path filter (exclude): {exclude_path_like}")
        
        # Tags
        tags = combined_args.get("tags", "")
        if tags:
            if isinstance(tags, str):
                tags = [t.strip() for t in tags.split(",") if t.strip()]
            for tag in tags:
                cmd_args.extend(["--tag", tag])
            log.LogInfo(f"Tags: {', '.join(tags)}")
        
        # Override sys.argv with our constructed arguments
        sys.argv = [sys.argv[0]] + cmd_args
        
        log.LogInfo(f"Running stash_renamer with args: {' '.join(cmd_args)}")
        
        # Import and run the main script
        from stash_renamer import run as renamer_run
        
        # Call with collect_operations=True to get the list of rename operations
        operations = renamer_run(collect_operations=True)
        
        # Output success with operations list
        log.LogInfo(f"Scene Renamer completed successfully - {len(operations) if operations else 0} operations")
        
        # Write operations to a temporary JSON file for UI access
        operations_file = os.path.join(os.path.dirname(__file__), "renamer_operations.json")
        try:
            with open(operations_file, "w", encoding="utf-8") as f:
                json.dump(operations if operations else [], f, indent=2)
            log.LogInfo(f"Operations written to {operations_file}")
        except Exception as e:
            log.LogWarning(f"Could not write operations file: {e}")
        
        # Include a summary in the output
        output["output"] = f"Completed {len(operations) if operations else 0} operations"
        
        # Log each operation for visibility
        if operations:
            log.LogInfo("="*50)
            log.LogInfo("RENAME OPERATIONS:")
            log.LogInfo("="*50)
            for i, op in enumerate(operations, 1):
                status_marker = "✓" if op["status"] == "success" else "○" if op["status"] == "pending" else "✗"
                log.LogInfo(f"{i}. [{status_marker}] {op['old_filename']} → {op['new_filename']}")
                if op.get("error"):
                    log.LogWarning(f"   Error: {op['error']}")
            log.LogInfo("="*50)
        
    except Exception as e:
        import traceback
        error_msg = str(e)
        traceback_str = traceback.format_exc()
        
        log.LogError(f"Error in plugin: {error_msg}")
        log.LogError("Full traceback:")
        
        # Log each line of traceback
        for line in traceback_str.split('\n'):
            if line.strip():
                log.LogError(line)
        
        output["error"] = error_msg

if __name__ == "__main__":
    main()

