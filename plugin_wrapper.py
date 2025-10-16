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

    # Correct: declare $plugin_id and reference it (no quotes) + wrap 'plugins' under 'configuration'
    query = """
    query configuration($plugin_id: [ID!]) {
      configuration {
        plugins(include: $plugin_id)
      }
    }
    """

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": f"{cookie_name}={cookie_value}",
    }

    # Send a list for [String!]
    variables = {"plugin_id": [plugin_id]}

    try:
        response = requests.post(
            server_url,
            json={"query": query, "variables": variables},
            headers=headers,
        )

        # Helpful diagnostics when things go wrong
        if response.status_code != 200:
            try:
                body = response.json()
            except Exception:
                body = response.text
            log.LogWarning(f"Fetch plugin settings failed: {response.status_code} {body}")
            return fetch_plugin_settings_fallback(server_url, cookie_name, cookie_value)

        result = response.json()

        # GraphQL-level errors
        if result.get("errors"):
            log.LogDebug(f"GraphQL errors: {result['errors']}")
            return fetch_plugin_settings_fallback(server_url, cookie_name, cookie_value)

        data = result.get("data", {})
        # Path: data.configuration.plugins is a map keyed by plugin id
        plugins = data.get("configuration", {}).get("plugins", {})
        settings_json = plugins.get(plugin_id)

        if settings_json is None:
            log.LogDebug("Plugin not found in response, using fallback.")
            return fetch_plugin_settings_fallback(server_url, cookie_name, cookie_value)

        # Some Stash fields return JSON as a string; handle both
        settings = json.loads(settings_json) if isinstance(settings_json, str) else settings_json
        log.LogInfo(f"Found plugin settings: {json.dumps(settings)}")
        return settings

    except Exception as e:
        log.LogWarning(f"Error fetching plugin settings: {e}")
        return fetch_plugin_settings_fallback(server_url, cookie_name, cookie_value)


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
            cookie_name = ""
            cookie_value = ""
            log.LogWarning("No SessionCookie found - authentication may fail")
        
        log.LogInfo(f"Server URL: {server_url}")
        log.LogDebug(f"Has session cookie: {bool(cookie_value)}")
        
        # Fetch plugin settings from Stash
        settings = fetch_plugin_settings(server_url, cookie_name, cookie_value)
        
        # Extract plugin arguments (from task)
        args = input_data.get("args", {})
        log.LogDebug(f"Plugin args: {json.dumps(args)}")
        log.LogDebug(f"Plugin settings: {json.dumps(settings)}")

        # Merge settings with args (args take precedence)

        combined_args = {**settings}

        log.LogDebug(f"Combined args: {json.dumps(combined_args)}")
        
        # Helper to parse truthy values
        def is_true(v):
            if isinstance(v, bool):
                return v
            if v is None:
                return False
            return str(v).strip().lower() in ("true", "1", "yes", "on")
        
        # Mode and dry-run
        mode = combined_args.get("mode", "")
        dry_run = is_true(combined_args.get("dry_run")) or mode == "dry_run"
        if dry_run:
            log.LogInfo("Running in DRY RUN mode")
        
        # Template (default if not provided)
        template = combined_args.get("template") or "$studio - $date - $title"
        log.LogInfo(f"Template: {template}")
        
        # Path filters
        path_like = combined_args.get("pathLike") or ""
        if path_like:
            log.LogInfo(f"Path filter (include): {path_like}")
        
        exclude_path_like = combined_args.get("excludePathLike") or ""
        if exclude_path_like:
            log.LogInfo(f"Path filter (exclude): {exclude_path_like}")
        
        # Tags
        tags = combined_args.get("tags") or []
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(",") if t.strip()]
        if tags:
            log.LogInfo(f"Tags: {', '.join(tags)}")
        
        # Selected scenes (comma-separated list of scene IDs)
        selected_scenes = combined_args.get("selectedScenes", "")
        scene_ids = []
        if isinstance(selected_scenes, str) and selected_scenes.strip():
            scene_ids = [s.strip() for s in selected_scenes.split(",") if s.strip()]
            log.LogInfo(f"Processing only selected scenes: {len(scene_ids)} scenes")
        
        # Build options dict for renamer.run
        options = {
            "server_url": server_url,
            "cookie_name": cookie_name,
            "cookie_value": cookie_value,
            "template": template,
            "dry_run": dry_run,
            # Flags (UI only toggles when explicitly set)
            "female_only": is_true(args.get("femaleOnly")),
            "skip_grouped": is_true(args.get("skipGrouped")),
            "move_to_studio_folder": is_true(args.get("moveToStudio")) or is_true(args.get("moveToStudioFolder")),
            "debug_mode": is_true(args.get("debugMode")) or is_true(args.get("debug")),
            # Filters
            "path_like": path_like or None,
            "exclude_path_like": exclude_path_like or None,
        }
        if tags:
            options["tags"] = tags
        if scene_ids:
            options["scene_ids"] = scene_ids
        
        log.LogInfo("Invoking renamer...")
        from stash_renamer import run as renamer_run
        
        # Call with collect_operations=True to get the list of rename operations
        operations = renamer_run(options, collect_operations=True)
        
        log.LogInfo(f"Scene Renamer completed successfully - {len(operations) if operations else 0} operations")
        output["output"] = {"operations": operations if operations else []} #json_output

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

