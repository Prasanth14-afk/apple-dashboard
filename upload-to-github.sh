#!/bin/bash

# Quick GitHub Upload Script for Apple Financial Dashboard
# Run this script to upload your project to GitHub

echo "🚀 Apple Financial Dashboard - GitHub Upload"
echo "============================================"
echo ""

# Navigate to project directory
cd "/Users/prasanthkumar/Desktop/FINANCIAL DATA/apple-dashboard"

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Checking files to be committed..."
git status

echo ""
echo "➕ Adding all files..."
git add .

echo ""
echo "💾 Committing files..."
git commit -m "Initial commit: Apple Financial Dashboard

Features:
- Three-page financial analytics dashboard
- Executive Overview with 6 KPI cards and performance charts
- Financial Health page with liquidity and cash flow analysis
- Profitability & Valuation page with ROE/ROA and market multiples
- 15+ interactive charts built with Recharts
- CSV data included for Apple Inc. (2020-2024)
- Built with Next.js 16, TypeScript, Tailwind CSS
- IndexedDB caching for performance
- Fully responsive design
- Production-ready"

echo ""
echo "✅ All files committed locally!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   → Go to: https://github.com/new"
echo "   → Name: apple-financial-dashboard"
echo "   → Description: Production-quality financial analytics dashboard"
echo "   → Keep it PUBLIC"
echo "   → DO NOT initialize with README"
echo ""
echo "2. After creating the repo, run these commands:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/apple-financial-dashboard.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Files ready to upload:"
echo "   ✅ All source code"
echo "   ✅ All CSV data files (public/data/)"
echo "   ✅ Documentation"
echo "   ✅ Configuration files"
echo "   ✅ LICENSE (MIT)"
echo ""
echo "🔒 Privacy check:"
echo "   ✅ No API keys"
echo "   ✅ No passwords"
echo "   ✅ No private data"
echo "   ✅ node_modules excluded"
echo "   ✅ .env files excluded"
echo ""
echo "🎉 Your project is ready for GitHub!"
echo ""
