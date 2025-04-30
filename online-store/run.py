#!/usr/bin/env python3

import os
import sys
import subprocess
import time
import signal
import http.server
import socketserver
import webbrowser
from concurrent.futures import ThreadPoolExecutor

# ANSI color codes
GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
RESET = '\033[0m'
BOLD = '\033[1m'

def print_colored(text, color):
    """Print colored text."""
    print(f"{color}{text}{RESET}")

def check_requirements():
    """Check if Node.js is installed."""
    try:
        node_version = subprocess.check_output(["node", "--version"]).decode().strip()
        print_colored(f"✓ Node.js {node_version} is installed", GREEN)
        return True
    except (subprocess.SubprocessError, FileNotFoundError):
        print_colored("✗ Node.js is not installed. Please install it first.", RED)
        return False

def install_backend_dependencies():
    """Install backend dependencies."""
    print_colored("\n==== Installing backend dependencies ====", YELLOW)
    os.chdir("backend")
    subprocess.run(["npm", "install"], check=True)

def start_backend_server():
    """Start the backend server."""
    print_colored("\n==== Starting backend server ====", YELLOW)
    print_colored("Backend API: http://localhost:3000", GREEN)
    return subprocess.Popen(["node", "server.js"], 
                           stdout=subprocess.PIPE, 
                           stderr=subprocess.PIPE)

def serve_frontend():
    """Serve the frontend using Python's built-in HTTP server."""
    os.chdir("../frontend")
    
    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=".", **kwargs)
            
        def log_message(self, format, *args):
            # Suppress log messages
            pass
    
    print_colored("\n==== Starting frontend server ====", YELLOW)
    print_colored("Frontend: http://localhost:5000", GREEN)
    
    # Try to open the frontend in a browser
    try:
        webbrowser.open('http://localhost:5000')
    except:
        pass
    
    with socketserver.TCPServer(("", 5000), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            httpd.shutdown()

def monitor_logs(process):
    """Monitor logs from the backend process."""
    while True:
        line = process.stdout.readline().decode().strip()
        if not line and process.poll() is not None:
            break
        if line:
            print(f"[Backend] {line}")

def main():
    print_colored("==== Starting Online Store Application ====", BOLD + GREEN)
    
    # Check requirements
    if not check_requirements():
        return
    
    try:
        # Install backend dependencies
        install_backend_dependencies()
        
        # Start backend server
        backend_process = start_backend_server()
        
        # Give the backend a moment to start
        time.sleep(2)
        
        # Use ThreadPoolExecutor to run backend log monitoring and frontend server in parallel
        with ThreadPoolExecutor(max_workers=2) as executor:
            frontend_future = executor.submit(serve_frontend)
            logs_future = executor.submit(monitor_logs, backend_process)
            
            try:
                # Wait for the frontend server to complete (will run until interrupted)
                frontend_future.result()
            except KeyboardInterrupt:
                print_colored("\n==== Stopping application ====", YELLOW)
            finally:
                # Terminate the backend process
                if backend_process.poll() is None:
                    backend_process.terminate()
                
    except Exception as e:
        print_colored(f"Error: {str(e)}", RED)
    finally:
        print_colored("Application stopped.", YELLOW)

if __name__ == "__main__":
    # Handle Ctrl+C gracefully
    try:
        main()
    except KeyboardInterrupt:
        print_colored("\n==== Application stopped by user ====", YELLOW)
        sys.exit(0) 