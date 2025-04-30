// productRoutes.js - Routes for product-related endpoints

// This is a mock routes implementation
// In a real setup, you would use Express Router

console.log('Loading Product Routes...');

// In a real implementation, you would import the product controller
// const productController = require('../controllers/productController');

// Mock Express Router implementation
const router = {
  routes: [],
  
  get: function(path, handler) {
    console.log(`Registered GET route: ${path}`);
    this.routes.push({ method: 'GET', path, handler });
    return this;
  },
  
  post: function(path, handler) {
    console.log(`Registered POST route: ${path}`);
    this.routes.push({ method: 'POST', path, handler });
    return this;
  },
  
  put: function(path, handler) {
    console.log(`Registered PUT route: ${path}`);
    this.routes.push({ method: 'PUT', path, handler });
    return this;
  },
  
  delete: function(path, handler) {
    console.log(`Registered DELETE route: ${path}`);
    this.routes.push({ method: 'DELETE', path, handler });
    return this;
  }
};

// Mock handlers (in a real app, these would be imported from the controller)
const getAllProducts = (req, res) => {
  console.log('Handler: getAllProducts called');
};

const getProductById = (req, res) => {
  console.log(`Handler: getProductById called with id ${req.params.id}`);
};

const createProduct = (req, res) => {
  console.log('Handler: createProduct called');
};

const updateProduct = (req, res) => {
  console.log(`Handler: updateProduct called with id ${req.params.id}`);
};

const deleteProduct = (req, res) => {
  console.log(`Handler: deleteProduct called with id ${req.params.id}`);
};

// Define routes
router.get('/api/products', getAllProducts);
router.get('/api/products/:id', getProductById);
router.post('/api/products', createProduct);
router.put('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);

// Print registered routes
console.log('Registered Product Routes:');
router.routes.forEach(route => {
  console.log(`${route.method} ${route.path}`);
});

module.exports = router; 