// productController.js - Controller for product-related operations

// This is a mock controller implementation
// In a real setup, you would interact with a database

console.log('Loading Product Controller...');

// In a real implementation, you would import the Product model
// const Product = require('../models/Product');

// Get all products
const getAllProducts = (req, res) => {
  console.log('Controller: getAllProducts called');
  try {
    // Mock data response
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
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get product by ID
const getProductById = (req, res) => {
  console.log(`Controller: getProductById called with id ${req.params.id}`);
  try {
    const productId = parseInt(req.params.id);
    
    // Mock product data
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
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new product
const createProduct = (req, res) => {
  console.log('Controller: createProduct called');
  try {
    const { name, price, description, imageUrl, category, stockQuantity } = req.body;
    
    // Validate required fields
    if (!name || !price || !description || !category || !stockQuantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Mock create operation
    const newProduct = {
      id: 4, // In a real app, this would be generated by the database
      name,
      price,
      description,
      imageUrl: imageUrl || '/images/placeholder.jpg',
      category,
      stockQuantity
    };
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a product
const updateProduct = (req, res) => {
  console.log(`Controller: updateProduct called with id ${req.params.id}`);
  try {
    const productId = parseInt(req.params.id);
    const updateData = req.body;
    
    // Mock update operation
    // In a real app, you would verify the product exists and update it in the database
    const updatedProduct = {
      id: productId,
      name: updateData.name || 'Updated Product',
      price: updateData.price || 99.99,
      description: updateData.description || 'Updated description',
      imageUrl: updateData.imageUrl || '/images/placeholder.jpg',
      category: updateData.category || 'General',
      stockQuantity: updateData.stockQuantity || 10
    };
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a product
const deleteProduct = (req, res) => {
  console.log(`Controller: deleteProduct called with id ${req.params.id}`);
  try {
    const productId = parseInt(req.params.id);
    
    // Mock delete operation
    // In a real app, you would verify the product exists and delete it from the database
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}; 