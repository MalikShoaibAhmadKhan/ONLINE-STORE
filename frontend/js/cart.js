// Cart page JavaScript file

// API base URL - change this to match your backend server
const API_URL = 'http://localhost:3000';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart Page Initialized');
    
    // Load cart items from localStorage
    loadCartItems();
    
    // Setup event listeners
    setupEventListeners();
});

// Load cart items from localStorage
function loadCartItems() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    console.log('Cart loaded:', cart);
    
    // Get DOM elements
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button');
    
    // If cart is empty, show message and return
    if (cart.length === 0) {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'block';
        }
        if (checkoutButton) {
            checkoutButton.disabled = true;
        }
        updateOrderSummary(0, 0, 0, 0);
        return;
    }
    
    // Hide empty cart message
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }
    
    // Enable checkout button
    if (checkoutButton) {
        checkoutButton.disabled = false;
    }
    
    // Clear cart items container
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        
        // Group items by product ID to handle quantities
        const groupedCart = {};
        
        cart.forEach(item => {
            if (groupedCart[item.id]) {
                groupedCart[item.id].quantity += 1;
            } else {
                groupedCart[item.id] = {
                    ...item,
                    quantity: 1
                };
            }
        });
        
        // Add each cart item to the DOM
        Object.values(groupedCart).forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.imageUrl || 'images/placeholder.jpg'}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${item.price}</p>
                    <p class="cart-item-category">${item.category || ''}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-product-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-product-id="${item.id}">+</button>
                </div>
                <div class="cart-item-subtotal">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <div class="cart-item-remove">
                    <button class="remove-btn" data-product-id="${item.id}">Remove</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Setup quantity and remove buttons
        setupCartItemButtons();
        
        // Calculate and update order summary
        updateCartTotals();
    }
}

// Setup quantity and remove buttons for cart items
function setupCartItemButtons() {
    // Decrease quantity buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            updateCartItemQuantity(productId, -1);
        });
    });
    
    // Increase quantity buttons
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            updateCartItemQuantity(productId, 1);
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            removeCartItem(productId);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find item index
    const index = cart.findIndex(item => item.id === productId);
    
    if (index !== -1) {
        // If decreasing and only one item, remove it
        if (change < 0 && getItemQuantity(cart, productId) === 1) {
            removeCartItem(productId);
            return;
        }
        
        // Otherwise, update quantity by adding or removing an item
        if (change > 0) {
            // Add another item
            cart.push(cart[index]);
        } else {
            // Remove one item (find the first one)
            cart.splice(index, 1);
        }
        
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Reload cart items
        loadCartItems();
    }
}

// Get the quantity of a specific item in the cart
function getItemQuantity(cart, productId) {
    return cart.filter(item => item.id === productId).length;
}

// Remove all instances of an item from the cart
function removeCartItem(productId) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove all instances of the item
    cart = cart.filter(item => item.id !== productId);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart items
    loadCartItems();
}

// Calculate and update order summary
function updateCartTotals() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    
    // Calculate shipping (free over $100, otherwise $10)
    const shipping = subtotal > 100 ? 0 : 10;
    
    // Calculate tax (8%)
    const tax = subtotal * 0.08;
    
    // Calculate total
    const total = subtotal + shipping + tax;
    
    // Update order summary
    updateOrderSummary(subtotal, shipping, tax, total);
}

// Update the order summary in the DOM
function updateOrderSummary(subtotal, shipping, tax, total) {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

// Setup event listeners for cart page
function setupEventListeners() {
    // Checkout button
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }
    
    // Clear cart button
    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }
}

// Handle checkout process
function handleCheckout() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    
    // In a real app, we would send an API request to create an order
    // For now, just simulate success
    alert('Thank you for your order! This is a demo, so no actual order has been placed.');
    
    // Clear cart after successful checkout
    clearCart();
}

// Clear the cart
function clearCart() {
    // Clear localStorage
    localStorage.removeItem('cart');
    
    // Reload cart items
    loadCartItems();
    
    alert('Cart has been cleared.');
} 