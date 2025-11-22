#!/bin/bash
# Methexis Friends Registration Form - Quick Deploy Script
# This script deploys the latest changes to the production server

echo "🚀 Deploying Methexis Friends Registration Form..."
echo ""

# Check if there are uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "⚠️  Warning: You have uncommitted changes!"
    git status -s
    read -p "Do you want to commit and push? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " commit_msg
        git add .
        git commit -m "$commit_msg"
        git push origin main
    else
        echo "❌ Deployment cancelled. Commit your changes first."
        exit 1
    fi
fi

# Push any committed changes
echo "📤 Pushing to GitHub..."
git push origin main

# Deploy to server via SSH
echo "🔄 Pulling changes on server..."
ssh reseller-methexi1 << 'ENDSSH'
    cd friends.methexis.eu
    git pull origin main
    echo "✅ Deployment complete!"
ENDSSH

echo ""
echo "✅ friends.methexis.eu has been updated!"
echo "🌐 Visit: https://friends.methexis.eu"
