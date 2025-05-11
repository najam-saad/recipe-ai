#!/bin/bash
# This is a custom build script for Cloudflare Pages

echo "Running custom build script..."

# Run our Node.js build script 
node cloudflare-build.js

echo "Custom build script completed" 