#!/bin/bash

# Simple script to run the online store locally

echo "==== Starting Online Store Application ===="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install it first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install it first."
    exit 1
fi

# Install backend dependencies
echo "==== Installing backend dependencies ===="
cd backend
npm install

# Start the backend server
echo "==== Starting backend server ===="
echo "The backend server will be available at http://localhost:3000"
node server.js &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Go to frontend directory
cd ../frontend

# Check if serve is installed
if ! command -v serve &> /dev/null; then
    echo "==== Installing 'serve' to host the frontend ===="
    npm install -g serve
fi

# Start the frontend
echo "==== Starting frontend server ===="
echo "The frontend will be available at http://localhost:5000"
serve -s . &
FRONTEND_PID=$!

echo "==== Application is running ===="
echo "Frontend: http://localhost:5000"
echo "Backend API: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the application"

# Function to clean up on exit
cleanup() {
    echo "==== Stopping application ===="
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit 0
}

# Set up trap to catch exit signals
trap cleanup SIGINT SIGTERM

# Keep script running
wait 