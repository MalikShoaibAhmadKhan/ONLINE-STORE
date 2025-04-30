#!/usr/bin/env python3
"""
Simple mock backend API server to simulate the Node.js backend.
"""

import json
import http.server
import socketserver
from urllib.parse import urlparse, parse_qs

# Mock data
PRODUCTS = [
    {
        "id": 1,
        "name": "Product 1",
        "price": 99.99,
        "description": "This is product 1 description",
        "imageUrl": "/images/placeholder.jpg",
        "category": "Electronics",
        "stockQuantity": 50
    },
    {
        "id": 2,
        "name": "Product 2",
        "price": 149.99,
        "description": "This is product 2 description",
        "imageUrl": "/images/placeholder.jpg",
        "category": "Clothing",
        "stockQuantity": 100
    },
    {
        "id": 3,
        "name": "Product 3",
        "price": 79.99,
        "description": "This is product 3 description",
        "imageUrl": "/images/placeholder.jpg",
        "category": "Home",
        "stockQuantity": 25
    }
]

CATEGORIES = [
    {"id": 1, "name": "Electronics", "description": "Electronic devices and accessories"},
    {"id": 2, "name": "Clothing", "description": "Apparel and fashion items"},
    {"id": 3, "name": "Home", "description": "Household items and furniture"}
]

# Orders will be stored here during runtime
ORDERS = []

class MockAPIHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests."""
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        
        # Enable CORS
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # Handle different endpoints
        if path == '/api/products':
            self.wfile.write(json.dumps(PRODUCTS).encode())
        elif path.startswith('/api/products/'):
            product_id = int(path.split('/')[-1])
            product = next((p for p in PRODUCTS if p["id"] == product_id), None)
            if product:
                self.wfile.write(json.dumps(product).encode())
            else:
                self.send_error(404, "Product not found")
        elif path == '/api/categories':
            self.wfile.write(json.dumps(CATEGORIES).encode())
        elif path.startswith('/api/orders/'):
            order_id = int(path.split('/')[-1])
            order = next((o for o in ORDERS if o["id"] == order_id), None)
            if order:
                self.wfile.write(json.dumps(order).encode())
            else:
                self.send_error(404, "Order not found")
        else:
            self.send_error(404, "Endpoint not found")
    
    def do_OPTIONS(self):
        """Handle OPTIONS requests for CORS preflight."""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        """Handle POST requests."""
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
        except json.JSONDecodeError:
            self.send_error(400, "Invalid JSON")
            return
        
        # Enable CORS
        self.send_response(201)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # Handle different endpoints
        if self.path == '/api/products':
            # Create a new product
            new_product = {
                "id": max(p["id"] for p in PRODUCTS) + 1,
                "name": data.get("name", "New Product"),
                "price": data.get("price", 0),
                "description": data.get("description", ""),
                "imageUrl": data.get("imageUrl", "/images/placeholder.jpg"),
                "category": data.get("category", "General"),
                "stockQuantity": data.get("stockQuantity", 0)
            }
            PRODUCTS.append(new_product)
            self.wfile.write(json.dumps(new_product).encode())
        elif self.path == '/api/orders':
            # Create a new order
            new_order = {
                "id": len(ORDERS) + 1,
                "items": data.get("items", []),
                "customer": data.get("customer", {}),
                "shippingAddress": data.get("shippingAddress", ""),
                "paymentMethod": data.get("paymentMethod", ""),
                "status": "pending",
                "createdAt": "2023-05-01T12:00:00Z"
            }
            ORDERS.append(new_order)
            response = {
                "message": "Order created successfully",
                "orderId": new_order["id"],
                "order": new_order
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_error(404, "Endpoint not found")

def run_server(port=3000):
    """Run the mock API server."""
    handler = MockAPIHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"Mock API server running at http://localhost:{port}")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server() 