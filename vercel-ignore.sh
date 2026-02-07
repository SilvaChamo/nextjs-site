#!/bin/bash

# Vercel Ignored Build Step Script
# Purpose: Stop automatic deployments while keeping Git synchronization.

echo "--- Vercel Auto-Deploy Interrupted ---"
echo "Git push successful, but deployment skipped via vercel-ignore.sh."
echo "--------------------------------------"

# Exit code 0 tells Vercel to SKIP the build.
# Exit code 1 would tell Vercel to PROCEED with the build.
exit 0
