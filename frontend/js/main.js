// Main JavaScript file for the Online Store

// API base URL - change this to match your backend server
const API_URL = 'http://localhost:3000';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Online Store Frontend Initialized');
    
    // Fetch products from the API
    fetchProducts();
    
    // Add event listeners to "Add to Cart" buttons
    setupAddToCartButtons();
    
    // Setup "Shop Now" button
    setupShopNowButton();
});

// Fetch products from the backend API
function fetchProducts() {
    console.log('Fetching products from API...');
    
    // If the API is not available, we'll use the mock data
    // In a real app, you would handle errors more gracefully
    fetch(`${API_URL}/api/products`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Products fetched successfully:', data);
            // Update the UI with the fetched products
            updateProductsUI(data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            console.log('Using local mock data instead');
            // If API is not available, use local data
            updateProductsUI(products);
        });
}

// Update the UI with the products
function updateProductsUI(productsData) {
    const productGrid = document.querySelector('.product-grid');
    
    // If we have a product grid and products data
    if (productGrid && productsData && productsData.length > 0) {
        // Clear existing content
        productGrid.innerHTML = '';
        
        // Add each product to the grid
        productsData.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.imageUrl || 'images/placeholder.jpg'}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button data-product-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
        
        // Re-setup the event listeners
        setupAddToCartButtons();
    }
}

// Add event listeners to all "Add to Cart" buttons
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.product-card button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent;
            
            // In a real application, we would send this to the backend
            console.log(`Added to cart: ${productName} - ${productPrice}`);
            
            // Show a confirmation message
            alert(`${productName} added to cart!`);
        });
    });
}

// Setup the "Shop Now" button in the hero section
function setupShopNowButton() {
    const shopNowButton = document.querySelector('.hero button');
    
    if (shopNowButton) {
        shopNowButton.addEventListener('click', function() {
            // In a real application, we would navigate to the products page
            console.log('Shop Now button clicked');
            window.location.href = 'products.html';
        });
    }
}

// Simulated product data (in a real app, this would come from the backend)
const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 99.99,
        image: 'images/placeholder.jpg',
        description: 'This is product 1 description.'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 149.99,
        image: 'images/placeholder.jpg',
        description: 'This is product 2 description.'
    },
    {
        id: 3,
        name: 'Product 3',
        price: 79.99,
        image: 'images/placeholder.jpg',
        description: 'This is product 3 description.'
    }
];

// Simulated cart functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        console.log('Cart updated:', cart);
    }
} 