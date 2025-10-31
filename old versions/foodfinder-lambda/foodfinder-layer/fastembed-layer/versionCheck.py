import sys
import subprocess
import platform

# Add a path from the /tmp/ directory
sys.path.insert(1, '/tmp/')

# Install your packages synchronously with .run at the /tmp/ directory
r = subprocess.run('pip install fastembed -t /tmp/ --no-cache-dir'.split(), capture_output=True, text=True)
t = subprocess.run('pip install --upgrade urllib3==1.26.15 -t /tmp/ --no-cache-dir'.split(), capture_output=True, text=True)

# Print the stdout
print(r.stdout, r.stderr)
print()
print(t.stdout, t.stderr)

def lambda_handler(event, context):
    # Find out the package versions that were installed
    s = subprocess.run('pip freeze --path /tmp/'.split(), capture_output=True, text=True)
    print(s.stdout, s.stderr)
    
