// js/components/header.js

export function renderNavbar() {
    return `
        <nav class="navbar">
            <!-- Logo -->
            <div class="nav-logo">KM<span class="dot-neon">.</span>0</div>

            <!-- Enlaces Centrales -->
            <ul class="nav-links" id="nav-links">
                <li class="nav-item has-mega-menu">
                    <a href="#" class="active-link">Productos</a>
                    <div class="mega-menu">
                        <div class="mega-menu-column">
                            <h3 class="mega-menu-title">Para Hombre:</h3>
                            <ul class="mega-menu-list">
                                <li><a href="#">Calzado</a></li>
                                <li><a href="#">Ropa</a></li>
                                <li><a href="#">Accesorios</a></li>
                            </ul>
                        </div>
                        <div class="mega-menu-divider"></div>
                        <div class="mega-menu-column">
                            <h3 class="mega-menu-title">Para Mujer:</h3>
                            <ul class="mega-menu-list">
                                <li><a href="#">Calzado</a></li>
                                <li><a href="#">Ropa</a></li>
                                <li><a href="#">Accesorios</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="#" id="link-nosotros">SOBRE NOSOTROS</a>
                </li>
                <li class="nav-item">
                    <a href="#" id="link-contacto">CONTACTO</a>
                </li>
            </ul>

            <!-- Iconos Búsqueda, Usuario, Carrito y Menú Hamburguesa -->
            <div class="nav-icons">
                <div class="search-container">
                    <input type="text" id="search-input" class="search-input" placeholder="Buscar...">
                    <button id="search-btn" class="icon-btn" aria-label="Buscar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </div>
                <button class="icon-btn" aria-label="Usuario">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </button>
                <button class="icon-btn" aria-label="Carrito">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                </button>
                
                <!-- NUEVO: Botón Hamburguesa (Solo se verá en celulares) -->
                <button id="mobile-menu-btn" class="icon-btn mobile-toggle" aria-label="Menú">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>

            <!-- Modales Ocultos -->
            <div id="modal-nosotros" class="modal-overlay">
                <div class="modal-content">
                    <button class="close-btn">&times;</button>
                    <h2>SOBRE NOSOTROS</h2>
                    <p>Toda gran carrera comienza en el KM.0. Somos el punto de partida para tu camino, ofreciendo equipamiento de alto rendimiento para alcanzar tus metas.</p>
                </div>
            </div>

            <div id="modal-contacto" class="modal-overlay">
                <div class="modal-content">
                    <button class="close-btn">&times;</button>
                    <h2>CONTACTO</h2>
                    <p><strong>Email:</strong> soporte@km0.com</p>
                    <p><strong>Teléfono:</strong> +52 555 123 4567</p>
                    <p><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
                </div>
            </div>
        </nav>
    `;
}

export function initNavbarEvents() {
    // 1. Lógica Búsqueda
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) searchInput.focus();
        });
    }

    // 2. Lógica Menú Hamburguesa (Móvil)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Lógica Modales
    const linkNosotros = document.getElementById('link-nosotros');
    const linkContacto = document.getElementById('link-contacto');
    const modalNosotros = document.getElementById('modal-nosotros');
    const modalContacto = document.getElementById('modal-contacto');
    const closeBtns = document.querySelectorAll('.close-btn');

    if (linkNosotros) linkNosotros.addEventListener('click', (e) => { e.preventDefault(); modalNosotros.classList.add('active'); });
    if (linkContacto) linkContacto.addEventListener('click', (e) => { e.preventDefault(); modalContacto.classList.add('active'); });

    closeBtns.forEach(btn => btn.addEventListener('click', () => {
        modalNosotros.classList.remove('active');
        modalContacto.classList.remove('active');
    }));

    window.addEventListener('click', (e) => {
        if (e.target === modalNosotros) modalNosotros.classList.remove('active');
        if (e.target === modalContacto) modalContacto.classList.remove('active');
    });
}