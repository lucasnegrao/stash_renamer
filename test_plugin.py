#!/usr/bin/env python3
"""
Test the plugin wrapper with sample input
"""
import json
import subprocess
import sys

# Sample plugin input that Stash would send
sample_input = {
    "server_connection": {
        "Scheme": "http",
        "Host": "localhost",
        "Port": 9999,
        "SessionCookie": {
            "Name": "session",
            "Value": "your-session-cookie-value-here",
            "Path": "",
            "Domain": "",
            "Expires": "0001-01-01T00:00:00Z"
        },
        "Dir": "/root/.stash",
        "PluginDir": "/opt/stash/plugins/stash_renamer"
    },
    "args": {
        "mode": "dry_run",
        "dry_run": "true",
        "template": "$studio - $date - $title",
        "debugMode": True,
        "femaleOnly": False,
        "skipGrouped": False,
        "moveToStudioFolder": False,
        "pathLike": "",
        "excludePathLike": "",
        "tags": ""
    }
}

# Convert to JSON
input_json = json.dumps(sample_input)

print("Testing plugin wrapper with sample input...")
print(f"Input: {input_json}\n")

# Run the plugin wrapper
process = subprocess.Popen(
    ['python3', 'plugin_wrapper.py'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

stdout, stderr = process.communicate(input=input_json)

print("STDERR (logs):")
print(stderr)
print("\nSTDOUT (output):")
print(stdout)
print(f"\nExit code: {process.returncode}")
