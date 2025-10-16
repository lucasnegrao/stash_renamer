#!/usr/bin/env python3
"""
Test the plugin wrapper with sample input
This simulates how Stash calls the plugin
"""
import json
import subprocess
import sys
import re

# Sample plugin input that Stash would send
sample_input = {
    "server_connection": {
        "Scheme": "http",
        "Host": "localhost",
        "Port": 9999,
        "SessionCookie": {
            "Name": "session",
            "Value": "test-session-cookie-value",
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

def decode_stash_log(line):
    """Decode Stash's special log format"""
    # Stash uses SOH (0x01) + level char + STX (0x02) as prefix
    if '\x01' in line and '\x02' in line:
        # Extract log level
        match = re.search(r'\x01(.)\x02(.*)', line)
        if match:
            level_char = match.group(1)
            message = match.group(2)
            levels = {
                't': 'TRACE',
                'd': 'DEBUG',
                'i': 'INFO',
                'w': 'WARN',
                'e': 'ERROR',
                'p': 'PROGRESS'
            }
            level = levels.get(level_char, 'UNKNOWN')
            return f"[{level}] {message}"
    return line

# Convert to JSON
input_json = json.dumps(sample_input, indent=2)

print("="*60)
print("Testing Stash Plugin - Scene Renamer")
print("="*60)
print("\nSample Input (what Stash sends):")
print(input_json)
print("\n" + "="*60)
print("Running plugin...")
print("="*60 + "\n")

# Run the plugin wrapper
process = subprocess.Popen(
    ['python3', 'plugin_wrapper.py'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

stdout, stderr = process.communicate(input=input_json)

print("STDERR (decoded logs):")
print("-"*60)
for line in stderr.split('\n'):
    if line.strip():
        decoded = decode_stash_log(line)
        print(decoded)

print("\n" + "="*60)
print("STDOUT (JSON output to Stash):")
print("-"*60)
print(stdout)

print("="*60)
if process.returncode == 0:
    print("✅ Plugin completed successfully")
else:
    print(f"❌ Plugin failed with exit code: {process.returncode}")
print("="*60)

# Try to parse the output
try:
    output_data = json.loads(stdout)
    print("\nParsed output:")
    print(json.dumps(output_data, indent=2))
    
    if "error" in output_data:
        print(f"\n⚠️  Error reported: {output_data['error']}")
    elif "output" in output_data:
        print(f"\n✅ Success: {output_data['output']}")
except:
    print("\n⚠️  Could not parse JSON output")
