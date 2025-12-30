#!/bin/bash
set -e

# Build packages initially
echo "Building @vendi/core..."
npm run build --workspace=@vendi/core

# Start packages in watch mode in the background
echo "Starting @vendi/core in watch mode..."
npm run build:watch --workspace=@vendi/core &

# Wait a moment for initial build
sleep 2

# Start the product service
echo "Starting product service..."
cd /app/backend/product-service
npm run start:dev
