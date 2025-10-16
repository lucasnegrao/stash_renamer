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

def read_json_input():
    """Read and parse JSON input from stdin"""
    stdin_data = sys.stdin.read()
    if stdin_data:
        return json.loads(stdin_data)
    return None

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
        
        # Stash provides API key via SessionCookie
        session_cookie = server_conn.get("SessionCookie")
        if session_cookie:
            api_key = session_cookie.get("Value", "")
        else:
            # No session cookie - maybe running in test mode
            api_key = ""
            log.LogWarning("No SessionCookie found - authentication may fail")
        
        log.LogInfo(f"Server URL: {server_url}")
        log.LogDebug(f"Has API key: {bool(api_key)}")
        
        # Set as environment variables for the main script
        os.environ["STASH_SERVER_URL"] = server_url
        if api_key:
            os.environ["STASH_API_KEY"] = api_key
        
        # Extract plugin arguments
        args = input_data.get("args", {})
        log.LogDebug(f"Plugin args: {json.dumps(args)}")
        
        # Check for mode from task
        mode = args.get("mode", "")
        dry_run = args.get("dry_run", "false").lower() == "true" or mode == "dry_run"
        
        # Build command line args for the main script
        cmd_args = []
        
        # Dry run mode
        if dry_run:
            cmd_args.append("--dry-run")
            log.LogInfo("Running in DRY RUN mode")
        else:
            cmd_args.append("--no-dry-run")
        
        # Template
        template = args.get("template", "")
        if template:
            cmd_args.extend(["--template", template])
            log.LogInfo(f"Template: {template}")
        else:
            log.LogWarning("No template specified - using default")
        
        # Boolean flags
        if args.get("femaleOnly"):
            cmd_args.append("--female-only")
            log.LogDebug("Female performers only: enabled")
        
        if args.get("skipGrouped"):
            cmd_args.append("--skip-grouped")
            log.LogDebug("Skip grouped scenes: enabled")
        
        if args.get("moveToStudioFolder"):
            cmd_args.append("--move-to-studio-folder")
            log.LogDebug("Move to studio folder: enabled")
        
        # Debug mode (default to true)
        if args.get("debugMode", True):
            cmd_args.append("--debug")
        else:
            cmd_args.append("--no-debug")
        
        # Path filters
        path_like = args.get("pathLike", "")
        if path_like:
            cmd_args.extend(["--path-like", path_like])
            log.LogInfo(f"Path filter (include): {path_like}")
        
        exclude_path_like = args.get("excludePathLike", "")
        if exclude_path_like:
            cmd_args.extend(["--exclude-path-like", exclude_path_like])
            log.LogInfo(f"Path filter (exclude): {exclude_path_like}")
        
        # Tags
        tags = args.get("tags", "")
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
        renamer_run()
        
        # Output success
        log.LogInfo("Scene Renamer completed successfully")
        output["output"] = "ok"
        
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

