#!/bin/bash

# Navigate to the project root
cd "$(dirname "$0")/.."

echo "🚀 Starting Nightly Build Process..."
echo "Date: $(date)"

# Ensure dependencies are up to date
echo "📦 Installing dependencies..."
npm install

# Build all sites automatically
echo "🔄 Detected Apps in /apps:"
ls apps/

for app_dir in apps/*; do
    if [ -d "$app_dir" ]; then
        app_name=$(basename "$app_dir")
        echo "------------------------------------------------"
        echo "🏗️  Building Site: $app_name"
        echo "------------------------------------------------"
        
        cd "$app_dir"
        
        # Check if package.json exists to avoid processing non-app folders
        if [ -f "package.json" ]; then
            npm run build
            if [ $? -eq 0 ]; then
                echo "✅ $app_name built successfully!"
            else
                echo "❌ Failed to build $app_name"
                exit 1
            fi
        else
            echo "⚠️  No package.json found in $app_name, skipping..."
        fi
        
        cd ../..
    fi
done

echo "------------------------------------------------"
echo "🎉 Nightly Build Complete for ALL sites!"
