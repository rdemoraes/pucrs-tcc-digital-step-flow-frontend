#!/usr/bin/env python3
import json
import urllib.request
import sys

actions = [
    ("oxsecurity/megalinter", "v7"),
    ("aquasecurity/trivy-action", "v0.33.1"),
    ("docker/setup-buildx-action", "v3"),
    ("docker/bake-action", "v5"),
    ("codecov/codecov-action", "v4"),
    ("actions/checkout", "v4"),
    ("actions/setup-node", "v4"),
    ("actions/upload-artifact", "v4"),
]

print("Fetching commit SHAs for GitHub Actions...\n")
results = {}

for repo, tag in actions:
    try:
        # Try to get the tag reference
        url = f"https://api.github.com/repos/{repo}/git/ref/tags/{tag}"
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read())
            sha = data.get('object', {}).get('sha', '')
            if sha:
                results[f"{repo}@{tag}"] = sha
                print(f"{repo}@{tag}: {sha}")
            else:
                # Try releases endpoint
                url = f"https://api.github.com/repos/{repo}/releases/tags/{tag}"
                with urllib.request.urlopen(url) as response:
                    data = json.loads(response.read())
                    sha = data.get('target_commitish', '')
                    if sha:
                        results[f"{repo}@{tag}"] = sha
                        print(f"{repo}@{tag}: {sha}")
                    else:
                        print(f"{repo}@{tag}: NOT_FOUND")
    except Exception as e:
        print(f"{repo}@{tag}: ERROR - {e}")

print("\n" + "="*60)
print("Results:")
for key, value in results.items():
    print(f"{key} = {value}")
