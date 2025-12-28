#!/bin/bash
set -e

# Build core package initially
echo "Building @vendi/core..."
npm run build --workspace=@vendi/core

# Start core package in watch mode in the background
echo "Starting @vendi/core in watch mode..."
npm run build:watch --workspace=@vendi/core &

# Wait a moment for initial build
sleep 2

# Start the identity service
echo "Starting identity service..."
cd /app/backend/identity-service
npm run start:dev
