#!/usr/bin/env python3
"""
Stash plugin wrapper for scene renamer
Reads JSON input from stdin and outputs JSON to stdout
"""
import json
import sys
import os
from types import SimpleNamespace

def read_json_input():
    """Read and parse JSON input from stdin"""
    stdin_data = sys.stdin.read()
    if stdin_data:
        return json.loads(stdin_data)
    return None

def main():
    # Read plugin input from Stash
    plugin_input = read_json_input()
    
    if not plugin_input:
        output = {"error": "No input received from Stash"}
        print(json.dumps(output))
        sys.exit(1)
    
    try:
        # Extract server connection info
        server_conn = plugin_input.get("server_connection", {})
        if server_conn:
            scheme = server_conn.get("Scheme", "http")
            host = server_conn.get("Host", "localhost")
            port = server_conn.get("Port", 9999)
            server_url = f"{scheme}://{host}:{port}/graphql"
            
            # Stash provides API key via SessionCookie
            session_cookie = server_conn.get("SessionCookie", {})
            api_key = session_cookie.get("Value", "") if session_cookie else ""
            
            # Set as environment variables for the main script
            os.environ["STASH_SERVER_URL"] = server_url
            if api_key:
                os.environ["STASH_API_KEY"] = api_key
            
            print(f"[INFO] Using Stash connection: {server_url}", file=sys.stderr)
        
        # Extract plugin arguments
        args = plugin_input.get("args", {})
        
        # Check for mode from task
        mode = args.get("mode", "")
        dry_run = args.get("dry_run", "false").lower() == "true" or mode == "dry_run"
        
        # Build command line args for the main script
        cmd_args = []
        
        # Dry run mode
        if dry_run:
            cmd_args.append("--dry-run")
        else:
            cmd_args.append("--no-dry-run")
        
        # Template
        template = args.get("template", "")
        if template:
            cmd_args.extend(["--template", template])
        
        # Boolean flags
        if args.get("femaleOnly"):
            cmd_args.append("--female-only")
        
        if args.get("skipGrouped"):
            cmd_args.append("--skip-grouped")
        
        if args.get("moveToStudioFolder"):
            cmd_args.append("--move-to-studio-folder")
        
        # Debug mode (default to true)
        if args.get("debugMode", True):
            cmd_args.append("--debug")
        else:
            cmd_args.append("--no-debug")
        
        # Path filters
        path_like = args.get("pathLike", "")
        if path_like:
            cmd_args.extend(["--path-like", path_like])
        
        exclude_path_like = args.get("excludePathLike", "")
        if exclude_path_like:
            cmd_args.extend(["--exclude-path-like", exclude_path_like])
        
        # Tags
        tags = args.get("tags", "")
        if tags:
            if isinstance(tags, str):
                tags = [t.strip() for t in tags.split(",") if t.strip()]
            for tag in tags:
                cmd_args.extend(["--tag", tag])
        
        # Override sys.argv with our constructed arguments
        sys.argv = [sys.argv[0]] + cmd_args
        
        print(f"[INFO] Running with args: {cmd_args}", file=sys.stderr)
        
        # Import and run the main script
        from stash_renamer import run
        run()
        
        # Output success
        output = {"output": "ok"}
        print(json.dumps(output))
        
    except Exception as e:
        import traceback
        error_msg = str(e)
        traceback_str = traceback.format_exc()
        print(f"[ERROR] {error_msg}", file=sys.stderr)
        print(traceback_str, file=sys.stderr)
        output = {"error": error_msg}
        print(json.dumps(output))
        sys.exit(1)

if __name__ == "__main__":
    main()
