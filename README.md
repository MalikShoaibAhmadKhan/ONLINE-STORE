# 🛒 Online Store - 3-Tier Architecture

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern e-commerce application built with a clean 3-tier architecture, designed as a foundation for learning DevOps practices. This project demonstrates the separation of concerns between presentation, business logic, and data storage layers.

![Online Store Architecture](https://via.placeholder.com/800x400?text=Online+Store+Architecture)

## 📋 Table of Contents
- [Architecture Overview](#-architecture-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Directory Structure](#-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#-api-documentation)
- [Frontend Pages](#-frontend-pages)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [DevOps Roadmap](#-devops-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

## 🏗 Architecture Overview

This application implements a classic 3-tier architecture:

1. **Presentation Layer (Frontend)** - HTML/CSS/JavaScript
   - User interface components
   - Client-side rendering
   - User input handling and validation

2. **Application Layer (Backend)** - Node.js/Express API
   - Business logic implementation
   - API endpoints
   - Request validation and processing
   - Authentication and authorization (future)

3. **Data Layer (Database)** - SQL Schema (PostgreSQL)
   - Data storage and retrieval
   - Data models and relationships
   - Data integrity enforcement

## ✨ Features

Current features include:

- **Product Browsing**
  - View all products
  - Filter products by category
  - Sort products by price or name

- **Shopping Cart**
  - Add products to cart
  - Update product quantities
  - Remove products from cart
  - View cart summary with tax and shipping

- **Checkout Process**
  - Enter shipping information
  - Choose payment method
  - Place orders (simulated)

Planned features:

- User authentication and registration
- User profiles
- Order history
- Product reviews
- Admin dashboard
- Payment processing integration

## 🛠 Technology Stack

### Frontend
- HTML5
- CSS3 with modern layout techniques
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- RESTful API design
- JSON for data interchange

### Database
- SQL Schema (designed for PostgreSQL)
- Relational data model

### Development Tools
- Python script for local development
- HTTP servers for serving static content
- API testing with curl

## 📁 Directory Structure

```
online-store/
├── frontend/             # Frontend layer
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   ├── images/           # Image assets
│   ├── index.html        # Homepage
│   ├── products.html     # Products listing page
│   └── cart.html         # Shopping cart page
├── backend/              # Application layer
│   ├── server.js         # Main server file
│   ├── controllers/      # Request handlers
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── config/           # Configuration files
├── database/             # Data layer
│   └── schema.sql        # Database schema
├── docs/                 # Documentation
├── infra/                # Infrastructure as Code (future use)
├── mock_backend.py       # Python mock API server
├── run.py                # Python script to run the application
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites

To run this application, you need:

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Either:
  - Node.js and npm (for running with Node.js backend)
  - Python 3.6+ (for running with the Python mock backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/online-store.git
   cd online-store
   ```

2. If you're using Node.js for the backend:
   ```bash
   cd backend
   npm install
   ```

### Running the Application

#### Option 1: Using the Python script (Recommended)

The simplest way to run the application is using the provided Python script:

```bash
# Make the script executable
chmod +x run.py

# Run the application
./run.py
```

This will:
- Start the backend server on http://localhost:3000
- Start the frontend server on http://localhost:8000
- Open your default web browser to the application

#### Option 2: Using the Python mock backend

If Node.js is not available, you can use the Python mock backend:

```bash
# In one terminal, start the mock backend
chmod +x mock_backend.py
./mock_backend.py

# In another terminal, start the frontend server
cd frontend
python3 -m http.server 8000
```

Then open your browser to http://localhost:8000

#### Option 3: Manual setup with Node.js

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```

2. In a separate terminal, start the frontend:
   ```bash
   cd frontend
   python3 -m http.server 8000
   ```

3. Open your browser to http://localhost:8000

## 📘 API Documentation

### Base URL
All API endpoints are relative to: `http://localhost:3000`

### Available Endpoints

#### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get a specific product by ID |
| POST | `/api/products` | Create a new product |

##### Example Response (GET /api/products)
```json
[
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
  }
]
```

#### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all product categories |

##### Example Response (GET /api/categories)
```json
[
  {
    "id": 1,
    "name": "Electronics",
    "description": "Electronic devices and accessories"
  },
  {
    "id": 2,
    "name": "Clothing",
    "description": "Apparel and fashion items"
  }
]
```

#### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders/:id` | Get order details by ID |

##### Example Request (POST /api/orders)
```json
{
  "items": [
    { "id": 1, "quantity": 2, "price": 99.99 },
    { "id": 3, "quantity": 1, "price": 79.99 }
  ],
  "customer": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "shippingAddress": "123 Main St, Anytown, USA",
  "paymentMethod": "credit_card"
}
```

## 🖥 Frontend Pages

### Home Page (index.html)
The landing page featuring:
- Navigation menu
- Hero section with call-to-action
- Featured products grid

### Products Page (products.html)
Product listing page with:
- Filtering by category
- Sorting options
- Product cards with images and pricing
- Add to cart functionality

### Cart Page (cart.html)
Shopping cart page with:
- List of cart items
- Quantity adjustment
- Price subtotals
- Order summary with tax and shipping
- Checkout button

## 🗄 Database Schema

The database design includes the following tables:

### Users
Stores user account information.

### Products
Stores product details including price, description, and stock quantity.

### Categories
Stores product categories.

### Orders
Stores order information including status and total amount.

### Order_Items
Stores the items associated with each order.

### Cart & Cart_Items
Stores the shopping cart state.

### Reviews
Stores product reviews and ratings.

## 💻 Development

### Adding New Products

To add new products to the mock backend, modify the `PRODUCTS` array in `mock_backend.py`:

```python
PRODUCTS.append({
    "id": len(PRODUCTS) + 1,
    "name": "New Product",
    "price": 129.99,
    "description": "Description of the new product",
    "imageUrl": "/images/placeholder.jpg",
    "category": "Electronics",
    "stockQuantity": 75
})
```

### Modifying API Endpoints

To add or modify API endpoints, update the handler methods in `mock_backend.py` or the routes in `backend/server.js` depending on which backend you're using.

### Styling Changes

The application uses a clean, responsive design with CSS. To modify styles:

1. Edit the CSS files in the `frontend/css` directory
2. The main stylesheet is `styles.css`
3. The layout uses CSS Grid and Flexbox for responsive design

## ❓ Troubleshooting

### Common Issues

**Issue**: Images not loading (404 errors)
**Solution**: Create the `frontend/images` directory and add placeholder images or update image paths in the code.

**Issue**: API connection errors
**Solution**: Ensure the backend server is running and check that the API_URL in `frontend/js/main.js` matches your backend server address.

**Issue**: CORS errors in browser console
**Solution**: The mock backend includes CORS headers. If using Node.js backend, ensure CORS middleware is properly configured.

## 🚢 DevOps Roadmap

This project is designed as a foundation for implementing DevOps practices:

1. **Containerization**
   - Dockerize frontend, backend, and database
   - Create Docker Compose setup

2. **CI/CD Pipeline**
   - Implement GitHub Actions or Jenkins
   - Automated testing
   - Deployment to staging/production

3. **Infrastructure as Code**
   - Terraform configurations
   - Kubernetes manifests

4. **Monitoring and Logging**
   - Prometheus and Grafana
   - ELK stack integration

5. **Security**
   - Dependency scanning
   - Container security
   - Secret management

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 