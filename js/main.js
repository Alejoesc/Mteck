// JavaScript for MteckGroup Store functionality

// Product Data extracted from Instagram
const products = [
    {
        id: 1,
        title: "Defensa Frontal Original Mteck",
        category: "bera",
        desc: "Defensa Frontal para Bera GR250. La mejor calidad en nuestros artículos. Original Mteck.",
        tag: "EN STOCK",
        img_placeholder: "fa-shield-alt"
    },
    {
        id: 2,
        title: "Porta Alforjas Edición Especial",
        category: "bera",
        desc: "Instalación de Porta Alforjas Edición especial, para la versión Bera GR250 año 2027.",
        tag: "NUEVO",
        img_placeholder: "fa-suitcase-rolling"
    },
    {
        id: 3,
        title: "Protector de Faro Bera Gr250",
        category: "bera",
        desc: "Protector de Faro para nuestra Bera Gr250. Modelo original Mteck.",
        tag: "EN STOCK",
        img_placeholder: "fa-lightbulb"
    },
    {
        id: 4,
        title: "Porta Alforjas Toro R3X",
        category: "toro",
        desc: "Porta Alforjas R3X 3ra generación. Fabricamos Solución y Comodidad para tu Moto.",
        tag: "NUEVO",
        img_placeholder: "fa-suitcase"
    },
    {
        id: 5,
        title: "Defensa Frontal TORO R3X",
        category: "toro",
        desc: "Defensa Frontal para la TORO R3X 2026. Somos territorio Mteck.",
        tag: "EN STOCK",
        img_placeholder: "fa-shield-alt"
    },
    {
        id: 6,
        title: "Proyecto Vento GTS300 Full",
        category: "vento",
        desc: "Proyecto para la Moto Vento GTS300 full Accesorios Original Mteck.",
        tag: "PROYECTO",
        img_placeholder: "fa-motorcycle"
    },
    {
        id: 7,
        title: "Refuerzo de Cola Original",
        category: "bera",
        desc: "Refuerzo de Cola para GR250, la perfección hecha Hierro.",
        tag: "REPOSICIÓN",
        img_placeholder: "fa-hammer"
    },
    {
        id: 8,
        title: "Elevador de Visera",
        category: "bera",
        desc: "Elevador de visera 100% diseño original Mteck para GR250.",
        tag: "INNOVACIÓN",
        img_placeholder: "fa-arrow-up"
    },
    {
        id: 9,
        title: "Accesorios Voge 525DSX",
        category: "otros",
        desc: "Proyecto VOGE 525DSX Accesorios Original Mteck.",
        tag: "NUEVO",
        img_placeholder: "fa-tools"
    },
    {
        id: 10,
        title: "Base de Tank Bag",
        category: "bera",
        desc: "Base de tanque para el tack Bag Super DT.",
        tag: "EN STOCK",
        img_placeholder: "fa-gas-pump"
    }
];

// Function to generate HTML for a product card
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            ${product.tag ? `<div class="product-badge">${product.tag}</div>` : ''}
            <div class="product-img">
                <i class="fas ${product.img_placeholder}"></i>
                <!-- In production, replace with: <img src="assets/images/product-${product.id}.jpg" alt="${product.title}"> -->
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.title}</h4>
                <p class="product-desc">${product.desc}</p>
                <div class="product-actions">
                    <button class="btn-add" onclick="addToCart()">AÑADIR AL CARRITO</button>
                </div>
            </div>
        </div>
    `;
}

// Render Novedades (First 4 products)
function renderNovedades() {
    const container = document.getElementById('novedades-grid');
    const novedadesHTML = products.slice(0, 4).map(createProductCard).join('');
    container.innerHTML = novedadesHTML;
}

// Render Catalogo based on filter
function renderCatalogo(filter = 'all') {
    const container = document.getElementById('catalogo-grid');
    let filteredProducts = products;
    
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No hay productos en esta categoría aún.</p>';
        return;
    }
    
    container.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Cart Functionality (Simulation)
let cartCount = 0;
function addToCart() {
    cartCount++;
    document.querySelector('.cart-count').textContent = cartCount;
    
    // Simple visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "¡AGREGADO!";
    btn.style.backgroundColor = "var(--primary-color)";
    btn.style.color = "white";
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = "transparent";
        btn.style.color = "var(--text-light)";
    }, 1500);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderNovedades();
    renderCatalogo();
    
    // Setup Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            // Render filtered products
            renderCatalogo(e.target.dataset.filter);
        });
    });
});
