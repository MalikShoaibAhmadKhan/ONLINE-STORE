// server.js - Main entry point for the API server

// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Enable CORS with specific origin for development
app.use(cors({
  origin: '*', // In production, you would specify your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Define routes - Products
app.get('/api/products', (req, res) => {
  console.log('GET /api/products - Returning all products');
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  console.log(`GET /api/products/${req.params.id} - Returning product details`);
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/products', (req, res) => {
  console.log('POST /api/products - Creating a new product');
  const { name, price, description, category, stockQuantity, imageUrl } = req.body;
  
  // Validate required fields
  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  // Create new product
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
    description,
    category,
    stockQuantity: stockQuantity || 0,
    imageUrl: imageUrl || '/images/placeholder.jpg'
  };
  
  // Add to products array
  products.push(newProduct);
  
  res.status(201).json(newProduct);
});

// Define routes - Orders
app.post('/api/orders', (req, res) => {
  console.log('POST /api/orders - Creating a new order');
  
  const { items, customer, shippingAddress, paymentMethod } = req.body;
  
  // Validate required fields
  if (!items || !items.length || !customer || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: 'Missing required order information' });
  }
  
  // Calculate order total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Create new order
  const newOrder = {
    id: orders.length + 1,
    items,
    customer,
    shippingAddress,
    paymentMethod,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  // Add to orders array
  orders.push(newOrder);
  
  res.status(201).json({ 
    message: 'Order created successfully', 
    orderId: newOrder.id,
    order: newOrder
  });
});

app.get('/api/orders/:id', (req, res) => {
  console.log(`GET /api/orders/${req.params.id} - Returning order details`);
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

// Define routes - Categories
app.get('/api/categories', (req, res) => {
  console.log('GET /api/categories - Returning all categories');
  const categories = [
    { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
    { id: 2, name: 'Clothing', description: 'Apparel and fashion items' },
    { id: 3, name: 'Home', description: 'Household items and furniture' }
  ];
  res.json(categories);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Mock products data (in a real app, this would come from a database)
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 99.99,
    description: 'This is product 1 description',
    imageUrl: '/images/placeholder.jpg',
    category: 'Electronics',
    stockQuantity: 50
  },
  {
    id: 2,
    name: 'Product 2',
    price: 149.99,
    description: 'This is product 2 description',
    imageUrl: '/images/placeholder.jpg',
    category: 'Clothing',
    stockQuantity: 100
  },
  {
    id: 3,
    name: 'Product 3',
    price: 79.99,
    description: 'This is product 3 description',
    imageUrl: '/images/placeholder.jpg',
    category: 'Home',
    stockQuantity: 25
  }
];

// Mock orders data
const orders = []; 