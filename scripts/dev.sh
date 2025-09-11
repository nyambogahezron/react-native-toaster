#!/bin/bash

# Development script for live preview setup
echo "🚀 Starting Toaster development environment..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Available development commands:${NC}"
echo ""
echo -e "${GREEN}📦 Package Development:${NC}"
echo "  bun run package:dev     - Watch and rebuild toaster package on changes"
echo "  bun run package:build   - Build toaster package once"
echo "  bun run package:test    - Run toaster package tests"
echo ""
echo -e "${GREEN}🎯 Example App:${NC}"
echo "  bun run example         - Start example app (Expo)"
echo "  bun run example:web     - Start example app for web"
echo "  bun run example:android - Start example app for Android"
echo "  bun run example:ios     - Start example app for iOS"
echo ""
echo -e "${GREEN}🔄 Full Development:${NC}"
echo "  bun run dev             - Start all development servers"
echo "  bun run build           - Build all packages"
echo "  bun run test            - Run all tests"
echo "  bun run lint            - Lint all packages"
echo ""
echo -e "${YELLOW}💡 For live preview development:${NC}"
echo "  1. Run 'bun run package:dev' in one terminal"
echo "  2. Run 'bun run example' in another terminal"
echo "  3. Edit files in packages/toaster/ and see changes live!"
echo ""

# Check if user wants to start a specific mode
if [ "$1" = "full" ]; then
    echo -e "${BLUE}Starting full development mode...${NC}"
    bun run dev
elif [ "$1" = "package" ]; then
    echo -e "${BLUE}Starting package development mode...${NC}"
    bun run package:dev
elif [ "$1" = "example" ]; then
    echo -e "${BLUE}Starting example app...${NC}"
    bun run example
else
    echo -e "${YELLOW}Usage: ./scripts/dev.sh [full|package|example]${NC}"
    echo -e "Or run individual commands listed above"
fi
