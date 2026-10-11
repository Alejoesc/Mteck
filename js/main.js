// Base de Datos de Productos (Ahora con PRECIOS)
const products = [
    {
        id: 1,
        title: "Defensa Frontal Original Mteck",
        category: "bera",
        price: 45.00,
        desc: "Defensa Frontal para Bera GR250. Fabricada con tubería de acero de alta resistencia. Protege el motor y los plásticos laterales en caso de caídas. Acabado en pintura electrostática negra para mayor durabilidad. 100% Original Mteck.",
        tag: "EN STOCK",
        img_placeholder: "fa-shield-alt"
    },
    {
        id: 2,
        title: "Porta Alforjas Edición Especial",
        category: "bera",
        price: 65.00,
        desc: "Sistema completo de instalación de Porta Alforjas Edición especial para la versión Bera GR250 año 2027. Soporta hasta 15kg por lado. Fácil instalación sin necesidad de modificar el chasis original.",
        tag: "NUEVO",
        img_placeholder: "fa-suitcase-rolling"
    },
    {
        id: 3,
        title: "Protector de Faro Bera Gr250",
        category: "bera",
        price: 25.00,
        desc: "Malla metálica protectora para el faro principal de la Bera Gr250. Evita roturas por piedras en la vía o rutas off-road. Diseño aerodinámico que no afecta la proyección de la luz.",
        tag: "EN STOCK",
        img_placeholder: "fa-lightbulb"
    },
    {
        id: 4,
        title: "Porta Alforjas Toro R3X",
        category: "toro",
        price: 70.00,
        desc: "Porta Alforjas diseñado a medida para la Toro R3X 3ra generación. Fabricamos solución y comodidad para tu moto, ideal para viajes largos. Acero de carbono reforzado.",
        tag: "NUEVO",
        img_placeholder: "fa-suitcase"
    },
    {
        id: 5,
        title: "Defensa Frontal TORO R3X",
        category: "toro",
        price: 50.00,
        desc: "Defensa Frontal envolvente para la TORO R3X 2026. Incluye puntos de anclaje extra para luces exploradoras. Somos territorio Mteck.",
        tag: "EN STOCK",
        img_placeholder: "fa-shield-alt"
    },
    {
        id: 6,
        title: "Kit Aventura Vento GTS300",
        category: "vento",
        price: 120.00,
        desc: "Proyecto completo para la Moto Vento GTS300. Incluye defensa integral, base para top case y protector de cárter. Todo con la calidad Original Mteck.",
        tag: "PROYECTO",
        img_placeholder: "fa-motorcycle"
    },
    {
        id: 7,
        title: "Refuerzo de Cola Original",
        category: "bera",
        price: 35.00,
        desc: "Refuerzo de Cola para GR250, la perfección hecha Hierro. Soluciona el problema de vibración del porta placa y evita fisuras en el guardabarros trasero.",
        tag: "REPOSICIÓN",
        img_placeholder: "fa-hammer"
    },
    {
        id: 8,
        title: "Elevador de Visera Aerodinámico",
        category: "bera",
        price: 15.00,
        desc: "Elevador de visera 100% diseño original Mteck para GR250. Mejora el flujo de aire y reduce la fatiga del viento en el casco durante altas velocidades.",
        tag: "INNOVACIÓN",
        img_placeholder: "fa-arrow-up"
    },
    {
        id: 9,
        title: "Protector de Cárter Voge 525DSX",
        category: "otros",
        price: 85.00,
        desc: "Placa protectora inferior de aluminio de 4mm para VOGE 525DSX. Protege el motor y los colectores de escape contra impactos de rocas. Accesorios Original Mteck.",
        tag: "NUEVO",
        img_placeholder: "fa-tools"
    },
    {
        id: 10,
        title: "Base de Tank Bag Super DT",
        category: "bera",
        price: 20.00,
        desc: "Base de tanque metálica diseñada específicamente para acoplar cualquier Tank Bag en la Super DT de Bera. Instalación directa en la tapa del tanque.",
        tag: "EN STOCK",
        img_placeholder: "fa-gas-pump"
    }
];

let cart = []; // Memoria del carrito

// Formatear moneda
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// 1. GENERAR TARJETAS (Al hacer clic en la tarjeta, abre el Modal)
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}" onclick="openProductModal(${product.id})">
            ${product.tag ? `<div class="product-badge">${product.tag}</div>` : ''}
            <div class="product-img">
                <i class="fas ${product.img_placeholder}"></i>
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.title}</h4>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <!-- event.stopPropagation() evita que se abra el modal si damos directo al botón -->
                    <button class="btn-add" onclick="event.stopPropagation(); addToCart(${product.id}, event)">AÑADIR AL CARRITO</button>
                </div>
            </div>
        </div>
    `;
}

// 2. RENDERIZADO Y BÚSQUEDA
function renderNovedades() {
    const container = document.getElementById('novedades-grid');
    container.innerHTML = products.slice(0, 4).map(createProductCard).join('');
}

function renderCatalogo(filter = 'all', searchQuery = '') {
    const container = document.getElementById('catalogo-grid');
    const messageContainer = document.getElementById('search-results-message');
    let filteredProducts = products;
    
    if (filter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === filter);
    }
    
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.desc.toLowerCase().includes(query)
        );
        messageContainer.style.display = 'block';
        messageContainer.innerHTML = `Resultados para: <strong>"${searchQuery}"</strong>`;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    } else {
        messageContainer.style.display = 'none';
    }
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 1.2rem; padding: 40px 0;">No encontramos productos que coincidan con tu búsqueda.</p>';
        return;
    }
    
    container.innerHTML = filteredProducts.map(createProductCard).join('');
}

// 3. FUNCIONALIDAD DEL MODAL (POP-UP)
function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Llenar datos en el modal
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalPrice').textContent = formatPrice(product.price);
    document.getElementById('modalDesc').textContent = product.desc;
    
    const tagEl = document.getElementById('modalTag');
    if (product.tag) {
        tagEl.textContent = product.tag;
        tagEl.style.display = 'inline-block';
    } else {
        tagEl.style.display = 'none';
    }

    // Actualizar icono
    document.getElementById('modalImgIcon').className = `fas ${product.img_placeholder}`;

    // Configurar botón del modal
    const addBtn = document.getElementById('modalAddBtn');
    addBtn.onclick = (e) => addToCart(product.id, e);
    addBtn.textContent = "AÑADIR AL CARRITO";
    addBtn.style.backgroundColor = ""; 
    addBtn.style.color = "";

    // Mostrar modal
    document.getElementById('productModal').classList.add('show');
    document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
}

function closeProductModal(event) {
    // Si se pasa un evento y el clic no fue en el fondo oscuro, ignorar
    if (event && event.target.id !== 'productModal') return;
    
    document.getElementById('productModal').classList.remove('show');
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// 4. FUNCIONALIDAD DEL CARRITO
function addToCart(productId, event) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    updateCartUI();
    
    // Efecto visual en el botón que se presionó (tarjeta o modal)
    if (event && event.target) {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = "¡AGREGADO!";
        btn.style.backgroundColor = "var(--primary-color)";
        btn.style.color = "#0f1014";
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = "";
            btn.style.color = "";
        }, 1500);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    // Actualizar conteo burbuja superior
    document.querySelector('.cart-count').textContent = cart.length;
    
    const container = document.getElementById('cartItemsContainer');
    const priceDisplay = document.getElementById('cartTotalPrice');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío.</div>';
        priceDisplay.textContent = "$0.00";
        return;
    }
    
    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item">
                <div class="cart-item-icon"><i class="fas ${item.img_placeholder}"></i></div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    priceDisplay.textContent = formatPrice(total);
}

function toggleCartPanel() {
    const panel = document.getElementById('cartPanel');
    const overlay = document.getElementById('cartOverlay');
    
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    } else {
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let message = "Hola Mteck, quiero comprar lo siguiente:%0A%0A";
    
    cart.forEach(item => {
        message += `- ${item.title} (${formatPrice(item.price)})%0A`;
    });
    
    message += `%0A*Total Estimado: ${formatPrice(total)}*`;
    
    // Abrir WhatsApp con el pedido generado
    window.open(`https://wa.me/584245289254?text=${message}`, '_blank');
}

// 5. INICIALIZACIÓN
function toggleChat() {
    document.getElementById('chatWindow').classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    renderNovedades();
    renderCatalogo(); 
    updateCartUI(); 
    
    // Filtros
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.getElementById('searchInput').value = '';
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderCatalogo(e.target.dataset.filter);
        });
    });
    
    // Buscador en tiempo real
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        renderCatalogo('all', query);
        
        // Hacer scroll automático al catálogo si el usuario empieza a escribir
        if (query.length > 2) {
            document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
        }
    });
});