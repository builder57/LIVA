// State Management
let cart = [];
let currentPage = 'home';

// DOM Elements
const pages = document.querySelectorAll('.page');
const cartCountEl = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
});

// Navigation Function (SPA Feel)
function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        // Small timeout to allow display:block to apply before opacity transition
        setTimeout(() => {
            targetPage.classList.add('active');
        }, 10);
    }

    // Close mobile menu if open
    navLinks.classList.remove('active');
    window.scrollTo(0, 0);
}

// Cart Functions
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }

    updateCartCount();
    renderCart();
    
    // Visual feedback
    alert(`${productName} added to cart!`);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is currently empty.</p>';
        cartTotalEl.textContent = '$0.00';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});