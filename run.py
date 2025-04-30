#!/usr/bin/env python3

import os
import sys
import subprocess
import time
import threading
import webbrowser

def run_backend():
    """Run the backend server."""
    print("\n=== Starting backend server ===")
    
    # Change to backend directory
    os.chdir("backend")
    
    # Install dependencies
    print("Installing backend dependencies...")
    try:
        subprocess.run(["npm", "install"], check=True)
    except Exception as e:
        print(f"Error installing dependencies: {e}")
        return False
    
    # Start the server
    print("Starting backend server at http://localhost:3000")
    subprocess.Popen(["node", "server.js"])
    os.chdir("..")
    return True

def run_frontend():
    """Run the frontend server using Python HTTP server."""
    print("\n=== Starting frontend server ===")
    
    # Change to frontend directory
    os.chdir("frontend")
    
    # Start the server
    print("Starting frontend server at http://localhost:8000")
    
    try:
        from http.server import HTTPServer, SimpleHTTPRequestHandler
        server_address = ("", 8000)
        httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
        print("Open your browser to http://localhost:8000")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping frontend server")

if __name__ == "__main__":
    print("=== Online Store Application ===")
    
    if run_backend():
        # Wait for backend to start
        time.sleep(2)
        
        # Try to open browser
        try:
            webbrowser.open("http://localhost:8000")
        except:
            pass
        
        # Run frontend
        try:
            run_frontend()
        except KeyboardInterrupt:
            print("\nApplication stopped")
            # Kill node process
            try:
                if sys.platform == "win32":
                    subprocess.run(["taskkill", "/F", "/IM", "node.exe"])
                else:
                    subprocess.run(["pkill", "-f", "node server.js"])
            except:
                pass
    else:
        print("Failed to start backend") 