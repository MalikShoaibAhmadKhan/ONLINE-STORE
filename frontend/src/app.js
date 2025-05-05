// API endpoint configuration
const API_URL = 'http://localhost:3000';

// Check backend health
async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
            console.log('Backend is healthy');
        } else {
            console.error('Backend health check failed');
        }
    } catch (error) {
        console.error('Failed to connect to backend:', error);
    }
}

// Initialize the application
async function init() {
    await checkBackendHealth();
    // Add more initialization code here
}

// Start the application
document.addEventListener('DOMContentLoaded', init); 