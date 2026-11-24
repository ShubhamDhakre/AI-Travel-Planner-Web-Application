#!/usr/bin/env bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PATH="$DIR/.tools/node/bin:$PATH"

echo "=============================================="
echo "🚀 Starting TripAI Full-Stack Travel Platform"
echo "=============================================="

# Start Backend on Port 5000
(cd "$DIR/server" && node server.js) &
BACKEND_PID=$!

# Start Frontend on Port 5173
(cd "$DIR" && npx vite --port 5173 --host) &
FRONTEND_PID=$!

trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

echo "✅ Backend API running at: http://localhost:5000"
echo "✅ Frontend Web App running at: http://localhost:5173"
echo "Press Ctrl+C to stop both servers."

wait
