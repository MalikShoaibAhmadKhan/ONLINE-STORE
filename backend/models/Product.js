// Product.js - Product model

// This is a mock model implementation
// In a real setup, you would use a database ORM like Mongoose or Sequelize

console.log('Loading Product model...');

// Product Schema (mock implementation)
const ProductSchema = {
  id: {
    type: 'Number',
    required: true,
    unique: true
  },
  name: {
    type: 'String',
    required: true
  },
  price: {
    type: 'Number',
    required: true,
    min: 0
  },
  description: {
    type: 'String',
    required: true
  },
  imageUrl: {
    type: 'String',
    required: true
  },
  category: {
    type: 'String',
    required: true
  },
  stockQuantity: {
    type: 'Number',
    required: true,
    min: 0
  },
  createdAt: {
    type: 'Date',
    default: 'Date.now'
  },
  updatedAt: {
    type: 'Date',
    default: 'Date.now'
  }
};

// Mock Product Model
const Product = {
  schema: ProductSchema,
  
  findAll: () => {
    console.log('Product.findAll() called');
    return Promise.resolve(productData);
  },
  
  findById: (id) => {
    console.log(`Product.findById(${id}) called`);
    const product = productData.find(p => p.id === id);
    return Promise.resolve(product);
  },
  
  create: (productData) => {
    console.log('Product.create() called');
    const newProduct = {
      id: productData.length + 1,
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    productData.push(newProduct);
    return Promise.resolve(newProduct);
  },
  
  update: (id, updateData) => {
    console.log(`Product.update(${id}) called`);
    const index = productData.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    
    const updatedProduct = {
      ...productData[index],
      ...updateData,
      updatedAt: new Date()
    };
    
    productData[index] = updatedProduct;
    return Promise.resolve(updatedProduct);
  },
  
  delete: (id) => {
    console.log(`Product.delete(${id}) called`);
    const index = productData.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.resolve(false);
    }
    
    productData.splice(index, 1);
    return Promise.resolve(true);
  }
};

// Mock product data
const productData = [
  {
    id: 1,
    name: 'Product 1',
    price: 99.99,
    description: 'This is product 1 description',
    imageUrl: '/images/placeholder.jpg',
    category: 'Electronics',
    stockQuantity: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Product 2',
    price: 149.99,
    description: 'This is product 2 description',
    imageUrl: '/images/placeholder.jpg',
    category: 'Clothing',
    stockQuantity: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: 'Product 3',
    price: 79.99,
    description: 'This is product 3 description',
    imageUrl: '/images/placeholder.jpg',
    category: 'Home',
    stockQuantity: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = Product; 