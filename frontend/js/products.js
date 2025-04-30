// Products page JavaScript file

// API base URL - change this to match your backend server
const API_URL = 'http://localhost:3000';

// Global products array to store fetched products
let allProducts = [];
let filteredProducts = [];

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Products Page Initialized');
    
    // Fetch products from the API
    fetchProducts();
    
    // Setup filter event listeners
    setupFilters();
});

// Fetch products from the backend API
function fetchProducts() {
    console.log('Fetching products from API...');
    
    fetch(`${API_URL}/api/products`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Products fetched successfully:', data);
            // Store all products
            allProducts = data;
            filteredProducts = [...allProducts];
            
            // Display the products
            updateProductsUI(filteredProducts);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            console.log('Using mock data instead');
            
            // Use mock data if API is not available
            allProducts = mockProducts;
            filteredProducts = [...allProducts];
            updateProductsUI(filteredProducts);
        });
}

// Update the UI with the products
function updateProductsUI(products) {
    const productGrid = document.querySelector('.product-grid');
    
    if (!productGrid) return;
    
    // Clear previous products
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
        productGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
        return;
    }
    
    // Add each product to the grid
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.imageUrl || 'images/placeholder.jpg'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <p class="category">${product.category}</p>
            <button data-product-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Setup "Add to Cart" buttons
    setupAddToCartButtons();
}

// Setup filter event listeners
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

// Apply filters and sorting to products
function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const selectedSort = sortFilter ? sortFilter.value : '';
    
    // Apply category filter
    if (selectedCategory) {
        filteredProducts = allProducts.filter(product => 
            product.category === selectedCategory
        );
    } else {
        filteredProducts = [...allProducts];
    }
    
    // Apply sorting
    if (selectedSort) {
        switch (selectedSort) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
    }
    
    // Update the UI with filtered and sorted products
    updateProductsUI(filteredProducts);
}

// Add event listeners to all "Add to Cart" buttons
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.product-card button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productId = parseInt(event.target.dataset.productId);
            const product = allProducts.find(p => p.id === productId);
            
            if (product) {
                // In a real app, we would update the cart in the backend
                console.log(`Added to cart: ${product.name} - $${product.price}`);
                
                // Add to local cart
                addToCart(product);
                
                // Show confirmation
                alert(`${product.name} added to cart!`);
            }
        });
    });
}

// Add a product to the cart
function addToCart(product) {
    // Get current cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add product to cart
    cart.push(product);
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    console.log('Cart updated:', cart);
}

// Mock products data for fallback
const mockProducts = [
    {
        id: 1,
        name: 'Product 1',
        price: 99.99,
        imageUrl: 'images/placeholder.jpg',
        description: 'This is product 1 description',
        category: 'Electronics',
        stockQuantity: 50
    },
    {
        id: 2,
        name: 'Product 2',
        price: 149.99,
        imageUrl: 'images/placeholder.jpg',
        description: 'This is product 2 description',
        category: 'Clothing',
        stockQuantity: 100
    },
    {
        id: 3,
        name: 'Product 3',
        price: 79.99,
        imageUrl: 'images/placeholder.jpg',
        description: 'This is product 3 description',
        category: 'Home',
        stockQuantity: 25
    }
]; 