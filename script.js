// ============================================
// PREMIUM PASTRIES - WINE THEME
// FULLY FUNCTIONAL JAVASCRIPT
// ============================================

// ============================================
// PRODUCT DATABASE - NIGERIAN PASTRIES
// ============================================
const products = [
    {
        id: 1,
        name: "Classic Meat Pie",
        category: "snacks",
        price: 1500,
        description: "Flaky butter pastry filled with spiced minced meat, carrots & potatoes",
        image: "images/meatpie.jpeg",
        popular: true
    },
    {
        id: 2,
        name: "Butter Chin Chin (500g)",
        category: "snacks",
        price: 2500,
        description: "Crunchy, buttery Nigerian snack with hint of nutmeg",
        image: "images/chinchin.jpeg",
        popular: true
    },
    {
        id: 3,
        name: "Golden Puff Puff (10pcs)",
        category: "snacks",
        price: 1500,
        description: "Soft, fluffy dough balls, deep-fried to perfection",
        image: "images/puff.jpeg",
        popular: true
    },
    {
        id: 4,
        name: "Chicken Pie",
        category: "snacks",
        price: 2000,
        description: "Flaky pastry filled with tender chicken & vegetables",
        image: "images/chickenpie.jpeg",
        popular: false
    },
    {
        id: 5,
        name: "Sausage Roll (6pcs)",
        category: "snacks",
        price: 3000,
        description: "Premium sausage wrapped in buttery pastry",
        image: "images/sausageroll.jpeg",
        popular: true
    },
    {
        id: 6,
        name: "Scotch Egg",
        category: "snacks",
        price: 800,
        description: "Hard-boiled egg wrapped in spiced minced meat, breaded & fried",
        image: "images/scotchegg.jpeg",
        popular: false
    },
    {
        id: 7,
        name: "Vanilla Cake (6-inch)",
        category: "cakes",
        price: 8000,
        description: "Moist vanilla sponge with Swiss meringue buttercream",
        image: "images/vanilla.jpeg",
        popular: true
    },
    {
        id: 8,
        name: "Red Velvet Cake (8-inch)",
        category: "cakes",
        price: 15000,
        description: "Classic red velvet with cream cheese frosting",
        image: "images/redvelvet.jpeg",
        popular: true
    },
    {
        id: 9,
        name: "Chocolate Cake (6-inch)",
        category: "cakes",
        price: 10000,
        description: "Rich chocolate cake with Belgian chocolate ganache",
        image: "images/chocolate.jpeg",
        popular: false
    },
    {
        id: 10,
        name: "Banana Bread",
        category: "bread",
        price: 1200,
        description: "Soft, fluffy  Banana bread - baked fresh daily",
        image: "images/bananabread.jpeg",
        popular: true
    },
    {
        id: 11,
        name: "Coconut Bread",
        category: "bread",
        price: 1500,
        description: "Sweet bread with coconut flakes, perfect with tea",
        image: "images/coconutbread.jpeg",
        popular: false
    },
    {
        id: 12,
        name: "Doughnut (Milk Coated)",
        category: "snacks",
        price: 300,
        description: "Soft doughnut coated in fine milk powder - a Nigerian favorite",
        image: "images/doughnut.jpeg",
        popular: false
    },
    {
        id: 13,
        name: "Small Chops Platter",
        category: "special",
        price: 18000,
        description: "Assorted Nigerian snacks - serves 15 people",
        image: "images/smallchops.jpeg",
        popular: true
    },
    {
        id: 14,
        name: "Custom Birthday Cake",
        category: "special",
        price: 25000,
        description: "Custom designed cake - consultation required",
        image: "images/customcake.jpeg",
        popular: false
    },
    {
        id: 15,
        name: "Buns (10pcs)",
        category: "snacks",
        price: 2000,
        description: "Sweet, soft buns",
        image: "images/buns.jpeg",
        popular: false
    }
];

// ============================================
// CART STATE MANAGEMENT
// ============================================
let cart = [];
let currentFilter = 'all';

// ============================================
// DOM ELEMENTS
// ============================================
const cartCount = document.querySelector('.cart-count');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total-price');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartBtn = document.querySelector('.cart-btn');
const whatsappBtn = document.querySelector('.whatsapp-btn');
const menuGrid = document.getElementById('menu-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Premium Pastries - Wine Theme Loaded');
    
    // Load cart from localStorage
    loadCart();
    
    // Render menu
    renderMenu();
    
    // Render cart
    renderCart();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to Premium Pastries 🍷✨');
    }, 500);
});

// ============================================
// CART FUNCTIONS - LOCAL STORAGE
// ============================================
function loadCart() {
    const savedCart = localStorage.getItem('premiumPastriesCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartCount();
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
}

function saveCart() {
    localStorage.setItem('premiumPastriesCart', JSON.stringify(cart));
    updateCartCount();
    updateWhatsAppButton();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// ============================================
// ============================================
// RENDER MENU WITH IMAGES
// ============================================
function renderMenu() {
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    const filtered = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    if (filtered.length === 0) {
        menuGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-cookie-bite" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                <h3 style="color: #722F37;">No items found</h3>
                <p style="color: #666;">Try another category</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(product => {
        const card = createProductCard(product);
        menuGrid.appendChild(card);
    });
    
    // Add event listeners to all add buttons
    document.querySelectorAll('.menu-grid .btn-add').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.dataset.id);
            addToCart(id);
        });
    });
}

// ============================================
// CREATE PRODUCT CARD WITH IMAGE
// ============================================
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'featured-card menu-item';
    card.dataset.id = product.id;
    
    const priceFormatted = `₦${product.price.toLocaleString()}`;
    
    // Use product.image - MAKE SURE THIS EXISTS IN YOUR PRODUCTS ARRAY!
    const imageSrc = product.image || 'images/placeholder.jpg';
    
    card.innerHTML = `
        ${product.popular ? '<div class="card-badge">✨ Popular</div>' : ''}
        <div class="card-image">
            <img src="${imageSrc}" alt="${product.name}" 
                 onerror="this.src='images/placeholder.jpg'; this.style.background='linear-gradient(145deg, #F4E9EA, #E5D4B3)';">
        </div>
        <div class="card-content">
            <h3>${product.name}</h3>
            <p class="card-desc">${product.description}</p>
            <div class="card-footer">
                <span class="price">${priceFormatted}</span>
                <button class="btn-add" data-id="${product.id}">
                    <i class="fas fa-plus"></i>
                    Add
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Helper function for image classes
function getImageClass(name) {
    if (name.includes('Meat Pie')) return 'meat-pie';
    if (name.includes('Chin Chin')) return 'chin-chin';
    if (name.includes('Puff Puff')) return 'puff-puff';
    if (name.includes('Chicken Pie')) return 'chicken-pie';
    if (name.includes('Sausage Roll')) return 'sausage-roll';
    if (name.includes('Scotch Egg')) return 'scotch-egg';
    if (name.includes('Vanilla Cake')) return 'vanilla-cake';
    if (name.includes('Red Velvet')) return 'red-velvet';
    if (name.includes('Chocolate Cake')) return 'chocolate-cake';
    if (name.includes('Agege Bread')) return 'agege-bread';
    if (name.includes('Coconut Bread')) return 'coconut-bread';
    if (name.includes('Doughnut')) return 'doughnut';
    if (name.includes('Small Chops')) return 'small-chops';
    if (name.includes('Custom')) return 'custom-cake';
    if (name.includes('Buns')) return 'buns';
    return 'default';
}

// ============================================
// CART OPERATIONS
// ============================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    saveCart();
    renderCart();
    showNotification(`${product.name} added to cart`);
    
    // Auto-open cart on mobile
    if (window.innerWidth <= 768) {
        openCart();
    }
}

function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    if (product) {
        showNotification(`${product.name} removed from cart`);
    }
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    if (newQuantity < 1) {
        removeFromCart(productId);
    } else if (newQuantity > 50) {
        showNotification('Maximum quantity is 50', 'error');
    } else {
        item.quantity = newQuantity;
        saveCart();
        renderCart();
    }
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Clear all items from your cart?')) {
        cart = [];
        saveCart();
        renderCart();
        showNotification('Cart cleared');
        updateWhatsAppButton();
    }
}

// ============================================
// CART RENDERING
// ============================================
function renderCart() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
                <span class="empty-sub">Add some delicious pastries to begin</span>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '₦0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-header">
                <span class="item-name">${item.name}</span>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cart-item-body">
                <div class="quantity-controls">
                    <button class="qty-btn minus" data-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="item-qty">${item.quantity}</span>
                    <button class="qty-btn plus" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <span class="item-price">₦${itemTotal.toLocaleString()}</span>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add clear cart button
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-cart-btn';
    clearBtn.innerHTML = '<i class="fas fa-trash"></i> Clear Cart';
    clearBtn.style.cssText = `
        width: 100%;
        padding: 12px;
        background: transparent;
        border: 1px solid #722F37;
        color: #722F37;
        border-radius: 8px;
        margin-top: 20px;
        cursor: pointer;
        transition: all 0.3s;
    `;
    clearBtn.addEventListener('mouseenter', () => {
        clearBtn.style.background = '#722F37';
        clearBtn.style.color = 'white';
    });
    clearBtn.addEventListener('mouseleave', () => {
        clearBtn.style.background = 'transparent';
        clearBtn.style.color = '#722F37';
    });
    clearBtn.addEventListener('click', clearCart);
    
    cartItemsContainer.appendChild(clearBtn);
    
    if (cartTotal) cartTotal.textContent = `₦${total.toLocaleString()}`;
    
    // Add event listeners to cart controls
    addCartEventListeners();
}

function addCartEventListeners() {
    // Remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            removeFromCart(id);
        });
    });
    
    // Minus buttons
    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            const item = cart.find(item => item.id === id);
            if (item) updateQuantity(id, item.quantity - 1);
        });
    });
    
    // Plus buttons
    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            const item = cart.find(item => item.id === id);
            if (item) updateQuantity(id, item.quantity + 1);
        });
    });
}

// ============================================
// CONTACT FORM - SEND TO WHATSAPP
// ============================================
function sendContactToWhatsApp() {
    // Get form values
    const name = document.getElementById('contactName')?.value || 'Not provided';
    const email = document.getElementById('contactEmail')?.value || 'Not provided';
    const phone = document.getElementById('contactPhone')?.value || 'Not provided';
    const subject = document.getElementById('contactSubject')?.value || 'General Inquiry';
    const message = document.getElementById('contactMessage')?.value || 'No message';
    
    // Validate required fields
    if (!name || !phone || !message) {
        showNotification('Please fill in your name, phone number and message', 'error');
        return;
    }
    
    // Format subject for display
    const subjectMap = {
        'catering': '🍽️ Catering Inquiry',
        'custom': '🎂 Custom Cake Order',
        'feedback': '💬 Feedback',
        'delivery': '🚚 Delivery Question',
        'other': '📝 General Inquiry'
    };
    
    const displaySubject = subjectMap[subject] || '📝 General Inquiry';
    
    // Build WhatsApp message
    let whatsappMessage = `*PREMIUM PASTRIES - CONTACT FORM*%0A%0A`;
    whatsappMessage += `*From:* ${name}%0A`;
    whatsappMessage += `*Phone:* ${phone}%0A`;
    whatsappMessage += `*Email:* ${email}%0A`;
    whatsappMessage += `*Subject:* ${displaySubject}%0A%0A`;
    whatsappMessage += `*Message:*%0A${message}%0A%0A`;
    whatsappMessage += `_Sent from Premium Pastries website_`;
    
    // YOUR WHATSAPP NUMBER - CHANGE THIS!
    const whatsappNumber = "2348123456789"; // Your business WhatsApp
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    
    // Show confirmation
    showNotification('Message opened in WhatsApp. Please send to complete.');
    
    // Optional: Clear form
    // document.getElementById('contactForm').reset();
}

// ============================================
// WHATSAPP ORDER SYSTEM
// ============================================
function updateWhatsAppButton() {
    if (!whatsappBtn) return;
    
    const name = document.querySelector('.customer-name')?.value;
    const phone = document.querySelector('.customer-phone')?.value;
    const delivery = document.querySelector('.delivery-option')?.value;
    
    const cartHasItems = cart.length > 0;
    const formComplete = name && phone && delivery && name.trim() !== '' && phone.trim() !== '' && delivery !== '';
    
    whatsappBtn.disabled = !(cartHasItems && formComplete);
}

function generateWhatsAppMessage() {
    const name = document.querySelector('.customer-name')?.value || 'Customer';
    const phone = document.querySelector('.customer-phone')?.value || 'Not provided';
    const delivery = document.querySelector('.delivery-option')?.value || 'pickup';
    const address = document.querySelector('.delivery-address')?.value || '';
    const notes = document.querySelector('.special-notes')?.value || 'None';
    
    const deliveryType = delivery === 'pickup' ? 'Store Pickup (Ikeja)' : 'Lagos Delivery';
    const deliveryFee = (delivery === 'delivery' && getCartTotal() < 15000) ? 1500 : 0;
    
    let message = `*PREMIUM PASTRIES - NEW ORDER* 🍷\n\n`;
    message += `*CUSTOMER DETAILS*\n`;
    message += `─────────────────\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Phone:* ${phone}\n`;
    message += `📍 *Service:* ${deliveryType}\n`;
    
    if (delivery === 'delivery' && address) {
        message += `🏠 *Address:* ${address}\n`;
    }
    
    message += `📅 *Date:* ${new Date().toLocaleDateString('en-NG')}\n`;
    message += `⏰ *Time:* ${new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}\n\n`;
    
    message += `*ORDER SUMMARY*\n`;
    message += `─────────────────\n`;
    
    let subtotal = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        message += `${index + 1}. *${item.name}*\n`;
        message += `   ${item.quantity} x ₦${item.price.toLocaleString()} = ₦${itemTotal.toLocaleString()}\n`;
    });
    
    message += `─────────────────\n`;
    message += `*Subtotal:* ₦${subtotal.toLocaleString()}\n`;
    
    if (deliveryFee > 0) {
        message += `*Delivery:* ₦${deliveryFee.toLocaleString()}\n`;
    } else if (delivery === 'delivery' && subtotal >= 15000) {
        message += `*Delivery:* FREE 🎉\n`;
    }
    
    const total = subtotal + deliveryFee;
    message += `*TOTAL:* ₦${total.toLocaleString()}\n\n`;
    
    message += `*SPECIAL INSTRUCTIONS*\n`;
    message += `─────────────────\n`;
    message += `${notes}\n\n`;
    
    message += `_Thank you for choosing Premium Pastries!_\n`;
    message += `_We will confirm your order within 30 minutes._\n\n`;
    message += `Order ID: PP${Date.now().toString().slice(-8)}`;
    
    return encodeURIComponent(message);
}

function sendWhatsAppOrder() {
    // VALIDATION
    const name = document.querySelector('.customer-name')?.value;
    const phone = document.querySelector('.customer-phone')?.value;
    const delivery = document.querySelector('.delivery-option')?.value;
    
    if (!name || !name.trim()) {
        showNotification('Please enter your name', 'error');
        return;
    }
    
    if (!phone || !phone.trim()) {
        showNotification('Please enter your phone number', 'error');
        return;
    }
    
    // Nigerian phone validation
    const phoneClean = phone.replace(/\D/g, '');
    if (!phoneClean.match(/^(0|234)[789]\d{9}$/)) {
        showNotification('Please enter a valid Nigerian phone number', 'error');
        return;
    }
    
    if (!delivery) {
        showNotification('Please select pickup or delivery', 'error');
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // YOUR WHATSAPP NUMBER - CHANGE THIS!
    const whatsappNumber = "2348123456789"; // Format: 2348012345678
    
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(url, '_blank');
    
    showNotification('WhatsApp opened! Send the message to complete your order.');
    
    // OPTIONAL: Clear cart after order
    // cart = [];
    // saveCart();
    // renderCart();
    // closeCart();
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ============================================
// CART UI CONTROLS
// ============================================
function openCart() {
    if (cartSidebar) {
        cartSidebar.classList.add('open');
        cartOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
        cartOverlay?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#f44336' : '#722F37'};
        color: white;
        padding: 16px 24px;
        border-radius: 50px;
        box-shadow: 0 8px 20px rgba(114, 47, 55, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// EVENT LISTENERS SETUP
// ============================================
function setupEventListeners() {
    // ========== CART ==========
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // ========== WHATSAPP BUTTON ==========
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', sendWhatsAppOrder);
    }
    
    // ========== CUSTOMER FORM VALIDATION ==========
    const customerFields = ['.customer-name', '.customer-phone', '.delivery-option'];
    customerFields.forEach(selector => {
        const field = document.querySelector(selector);
        if (field) {
            field.addEventListener('input', updateWhatsAppButton);
            field.addEventListener('change', updateWhatsAppButton);
        }
    });
    
    // Phone number formatting
    const phoneInput = document.querySelector('.customer-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('234')) {
                value = value.substring(0, 13);
            } else {
                value = value.substring(0, 11);
            }
            e.target.value = value;
            updateWhatsAppButton();
        });
    }
    
    // ========== MENU FILTERS ==========
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                renderMenu();
                
                // Scroll to menu on mobile
                if (window.innerWidth <= 768) {
                    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
    
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#cart') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you! Your message has been sent.');
            this.reset();
        });
    }
    
    // ========== FEATURED ADD TO CART BUTTONS ==========
    document.querySelectorAll('.featured-card .btn-add').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.dataset.id);
            addToCart(id);
        });
    });
    
    // ========== ESCAPE KEY TO CLOSE CART ==========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartSidebar?.classList.contains('open')) {
            closeCart();
        }
    });
    
    // ========== SAVE CART BEFORE UNLOAD ==========
    window.addEventListener('beforeunload', function() {
        saveCart();
    });
}

// ============================================
// EXPOSE FUNCTIONS TO BROWSER CONSOLE (DEBUGGING)
// ============================================
window.premiumPastries = {
    products: products,
    cart: cart,
    addToCart: addToCart,
    clearCart: clearCart,
    getCartTotal: getCartTotal,
    openCart: openCart,
    closeCart: closeCart
};

console.log('Premium Pastries JS Loaded ✅');
console.log('Use window.premiumPastries to debug');