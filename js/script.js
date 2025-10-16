// Product Data
const productData = {
    images: [
        'assets/images/saree-main.jpg',
        'assets/images/saree-2.jpg',
        'assets/images/saree-3.jpg',
        'assets/images/saree-4.jpg',
        'assets/images/saree-5.jpg'
    ],
    colors: [
        { name: 'Royal Blue', hex: '#4169E1', image: 'assets/images/saree-main.jpg' },
        { name: 'Maroon', hex: '#800000', image: 'assets/images/saree-2.jpg' },
        { name: 'Emerald Green', hex: '#50C878', image: 'assets/images/saree-3.jpg' },
        { name: 'Magenta', hex: '#FF00FF', image: 'assets/images/saree-4.jpg' },
        { name: 'Golden Yellow', hex: '#FFD700', image: 'assets/images/saree-5.jpg' }
    ],
    sizes: ['S (34)', 'M (36)', 'L (38)', 'XL (40)', 'XXL (42)']
};

// Bundle Products Data
const bundleProducts = [
    {
        name: 'Banarasi Silk Saree',
        price: '₹4,299',
        image: 'assets/images/saree-main.jpg'
    },
    {
        name: 'Designer Earrings',
        price: '₹1,499',
        image: 'assets/images/earrings.jpg'
    },
    {
        name: 'Embroidered Clutch',
        price: '₹1,499',
        image: 'assets/images/clutch.jpg'
    }
];

// Pair Well With Products
const pairWellProducts = [
    {
        name: 'Kundan Necklace Set',
        price: '₹2,999',
        image: 'assets/images/necklace.jpg'
    },
    {
        name: 'Silk Dupatta',
        price: '₹899',
        image: 'assets/images/dupatta.jpg'
    },
    {
        name: 'Designer Bangles',
        price: '₹1,299',
        image: 'assets/images/bangles.jpg'
    },
    {
        name: 'Embroidered Potli Bag',
        price: '₹799',
        image: 'assets/images/potli.jpg'
    },
    {
        name: 'Ethnic Sandals',
        price: '₹1,499',
        image: 'assets/images/sandals.jpg'
    }
];

// Related Products
const relatedProducts = [
    {
        name: 'Kanjivaram Silk Saree',
        price: '₹5,999',
        image: 'assets/images/related-1.jpg',
        badge: 'New'
    },
    {
        name: 'Chanderi Cotton Saree',
        price: '₹2,499',
        image: 'assets/images/related-2.jpg',
        badge: 'Popular'
    },
    {
        name: 'Patola Silk Saree',
        price: '₹4,799',
        image: 'assets/images/related-3.jpg',
        badge: null
    },
    {
        name: 'Tussar Silk Saree',
        price: '₹3,299',
        image: 'assets/images/related-4.jpg',
        badge: 'New'
    }
];

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeColorSwatches();
    initializeSizeOptions();
    initializeTabs();
    loadBundleProducts();
    loadPairWellProducts();
    loadRelatedProducts();
    loadCompareColors();
    loadSelectedVariants();
});

// Gallery Functions
function initializeGallery() {
    const thumbnailsContainer = document.getElementById('thumbnails');
    
    productData.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}">`;
        thumbnail.addEventListener('click', () => updateMainImage(image, thumbnail));
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function updateMainImage(imageSrc, clickedThumbnail) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    clickedThumbnail.classList.add('active');
}

// Color Swatches
function initializeColorSwatches() {
    const swatchesContainer = document.getElementById('colorSwatches');
    
    productData.colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = `color-swatch ${index === 0 ? 'active' : ''}`;
        swatch.style.background = color.hex;
        swatch.dataset.color = color.name;
        swatch.dataset.image = color.image;
        swatch.addEventListener('click', () => selectColor(swatch, color));
        swatchesContainer.appendChild(swatch);
    });
}

function selectColor(swatch, color) {
    // Update active swatch
    document.querySelectorAll('.color-swatch').forEach(s => {
        s.classList.remove('active');
    });
    swatch.classList.add('active');
    
    // Update selected color text
    document.getElementById('selectedColor').textContent = color.name;
    
    // Update main image
    document.getElementById('mainImage').src = color.image;
    
    // Update first thumbnail to match
    const firstThumbnail = document.querySelector('.thumbnail');
    firstThumbnail.querySelector('img').src = color.image;
    
    // Save to memory storage
    saveSelectedVariants();
}

// Size Options
function initializeSizeOptions() {
    const sizeContainer = document.getElementById('sizeOptions');
    
    productData.sizes.forEach((size, index) => {
        const sizeOption = document.createElement('div');
        sizeOption.className = `size-option ${index === 1 ? 'active' : ''}`;
        sizeOption.textContent = size;
        sizeOption.addEventListener('click', () => selectSize(sizeOption, size));
        sizeContainer.appendChild(sizeOption);
    });
}

function selectSize(sizeOption, size) {
    // Update active size
    document.querySelectorAll('.size-option').forEach(s => {
        s.classList.remove('active');
    });
    sizeOption.classList.add('active');
    
    // Update selected size text
    document.getElementById('selectedSize').textContent = size;
    
    // Save to memory storage
    saveSelectedVariants();
}

// Quantity Functions
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    qtyInput.value = parseInt(qtyInput.value) + 1;
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

// Add to Cart
function addToCart() {
    const selectedColor = document.getElementById('selectedColor').textContent;
    const selectedSize = document.getElementById('selectedSize').textContent;
    const quantity = document.getElementById('quantity').value;
    
    alert(`Added to cart!\n\nProduct: Designer Banarasi Silk Saree\nColor: ${selectedColor}\nSize: ${selectedSize}\nQuantity: ${quantity}`);
}

// Bundle Functions
function loadBundleProducts() {
    const bundleContainer = document.getElementById('bundleItems');
    
    bundleProducts.forEach((product, index) => {
        const bundleItem = document.createElement('div');
        bundleItem.className = 'bundle-item';
        bundleItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <div class="price">${product.price}</div>
        `;
        bundleContainer.appendChild(bundleItem);
        
        // Add plus sign between items
        if (index < bundleProducts.length - 1) {
            const plus = document.createElement('div');
            plus.className = 'bundle-plus';
            plus.textContent = '+';
            bundleContainer.appendChild(plus);
        }
    });
}

function addBundleToCart() {
    alert('Bundle added to cart!\n\nTotal: ₹6,499\nYou saved ₹798!');
}

// Pair Well With Products
function loadPairWellProducts() {
    const container = document.getElementById('pairWellProducts');
    
    pairWellProducts.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// Related Products
function loadRelatedProducts() {
    const container = document.getElementById('relatedProducts');
    
    relatedProducts.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const badgeHTML = product.badge ? `<span class="badge ${product.badge.toLowerCase()}">${product.badge}</span>` : '';
    
    card.innerHTML = `
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}">
        <div class="product-card-info">
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
            <button class="btn btn-primary">Add to Cart</button>
        </div>
    `;
    
    return card;
}

// Tabs Functionality
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Modal Functions
function openSizeChart() {
    document.getElementById('sizeChartModal').classList.add('active');
}

function closeSizeChart() {
    document.getElementById('sizeChartModal').classList.remove('active');
}

function openCompareColors() {
    document.getElementById('compareColorsModal').classList.add('active');
}

function closeCompareColors() {
    document.getElementById('compareColorsModal').classList.remove('active');
}

// Load Compare Colors
function loadCompareColors() {
    const compareGrid = document.getElementById('compareGrid');
    
    productData.colors.forEach(color => {
        const compareItem = document.createElement('div');
        compareItem.className = 'compare-item';
        compareItem.innerHTML = `
            <div class="compare-color" style="background: ${color.hex}"></div>
            <label>
                <input type="checkbox" value="${color.name}">
                ${color.name}
            </label>
        `;
        compareGrid.appendChild(compareItem);
    });
}

// Close modals on ESC key or overlay click
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSizeChart();
        closeCompareColors();
    }
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSizeChart();
            closeCompareColors();
        }
    });
});

// Variant Storage (in-memory storage)
let selectedVariants = {
    color: 'Royal Blue',
    size: 'M (36)',
    quantity: 1
};

function saveSelectedVariants() {
    selectedVariants = {
        color: document.getElementById('selectedColor').textContent,
        size: document.getElementById('selectedSize').textContent,
        quantity: document.getElementById('quantity').value
    };
    console.log('Saved variants:', selectedVariants);
}

function loadSelectedVariants() {
    // Load from memory storage
    if (selectedVariants) {
        document.getElementById('selectedColor').textContent = selectedVariants.color;
        document.getElementById('selectedSize').textContent = selectedVariants.size;
        document.getElementById('quantity').value = selectedVariants.quantity;
    }
}

// Smooth scroll for product cards
const productScrolls = document.querySelectorAll('.product-scroll');
productScrolls.forEach(scroll => {
    let isDown = false;
    let startX;
    let scrollLeft;

    scroll.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scroll.offsetLeft;
        scrollLeft = scroll.scrollLeft;
    });

    scroll.addEventListener('mouseleave', () => {
        isDown = false;
    });

    scroll.addEventListener('mouseup', () => {
        isDown = false;
    });

    scroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scroll.offsetLeft;
        const walk = (x - startX) * 2;
        scroll.scrollLeft = scrollLeft - walk;
    });
});