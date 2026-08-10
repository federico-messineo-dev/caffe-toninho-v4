#!/usr/bin/env python3
"""
Caffe Toninho - Local Development Server
Avvia un server locale per il sito web.
"""

import http.server
import socketserver
import os
import sys

PORT = 3000
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "beano", "beano-wcopilot.webflow.io")

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom log format
        sys.stdout.write(f"[{self.log_date_time_string()}] {format % args}\n")
        sys.stdout.flush()

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
        print(f"Server Caffe Toninho in esecuzione su http://localhost:{PORT}")
        print(f"Serving: {DIRECTORY}")
        print("Premi Ctrl+C per fermare il server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer fermato.")
            httpd.shutdown()
