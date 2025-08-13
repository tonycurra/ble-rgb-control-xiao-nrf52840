#!/bin/bash

# XIAO nRF52840 RGB BLE Controller Setup Script
# This script helps set up the development environment

echo "🎨 XIAO nRF52840 RGB BLE Controller Setup"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cat > .env.local << EOF
# XIAO RGB BLE Controller Environment Variables
NEXT_PUBLIC_APP_NAME="XIAO RGB Controller"
NEXT_PUBLIC_APP_VERSION="1.0.0"
EOF
    echo "✅ .env.local created"
fi

# Check if Arduino IDE is installed (optional check)
if command -v arduino &> /dev/null; then
    echo "✅ Arduino IDE detected"
else
    echo "⚠️  Arduino IDE not found in PATH"
    echo "   Please install Arduino IDE: https://www.arduino.cc/en/software"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Upload arduino/xiao_rgb_ble.ino to your XIAO nRF52840"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Connect to your XIAO_RGB device"
echo ""
echo "For detailed instructions, see docs/SETUP.md"
