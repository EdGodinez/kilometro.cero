// js/components/header.js
import { getSession, logout } from "../auth.js";

export function renderNavbar() {
    return `
        <!-- Overlay para el menú lateral en móvil -->
        <div id="mobile-nav-overlay" class="mobile-nav-overlay"></div>

        <nav class="navbar">
            <!-- Logo -->
            <div class="nav-logo"><a href="./index.html">KM<span class="dot-neon">.</span>0</a></div>

            <!-- Botón Hamburguesa a la izquierda del logo en móvil (Opcional, si lo quieres ahí) 
                 Si prefieres que el botón esté a la derecha, mantenlo donde estaba -->

            <!-- Enlaces Centrales (Este es el que se convertirá en menú lateral en móvil) -->
            <ul class="nav-links" id="nav-links">
                <!-- Cabecera del menú lateral (solo visible en móvil) -->
                <li class="mobile-nav-header">
                    <span>Menú</span>
                    <button id="close-mobile-menu" class="icon-btn close-menu-btn" aria-label="Cerrar menú">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </li>
                
                <li class="nav-item has-mega-menu">
                    <a href="./productos.html?genero=hombre" class="">HOMBRE <span class="mobile-arrow">›</span></a>
                    <div class="mega-menu">
                            <ul class="mega-menu-list">
                                <li><a href="./productos.html?genero=hombre&categoria=calzado">Calzado</a></li>
                                <li><a href="./productos.html?genero=hombre&categoria=ropa">Ropa</a></li>
                                <li><a href="./productos.html?genero=hombre&categoria=accesorios">Accesorios</a></li>
                            </ul>
                    </div>
                </li>
                <li class="nav-item has-mega-menu">
                        <a href="./productos.html?genero=mujer" class="">MUJER <span class="mobile-arrow">›</span></a>
                        <div class="mega-menu">
                                <ul class="mega-menu-list">
                                    <li><a href="./productos.html?genero=mujer&categoria=calzado">Calzado</a></li>
                                    <li><a href="./productos.html?genero=mujer&categoria=ropa">Ropa</a></li>
                                    <li><a href="./productos.html?genero=mujer&categoria=accesorios">Accesorios</a></li>
                                </ul>
                        </div>
                    </li>
                <li class="nav-item">
                    <a href="./about.html">NOSOTROS</a>
                </li>
                <li class="nav-item">
                    <a href="./contact.html">CONTACTO</a>
                </li>
                
                <!-- Enlaces extras para móvil (opcionales, imitando tu referencia) -->
                <li class="mobile-only-link separator-top">
                    <a href="./login.html" id="mobile-login-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Iniciar sesión
                    </a>
                </li>
            </ul>

            <!-- Iconos Búsqueda, Usuario y Menú Hamburguesa -->
            

                <!-- Contenedor de autenticación (Escritorio) -->
                <div id="auth-container" class="desktop-auth">
                    <a href="./login.html"
                    class="icon-btn"
                    aria-label="Iniciar sesión"
                    title="Iniciar sesión">
                        <svg width="20" height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </a>
                </div>

                <!-- Botón Hamburguesa (Solo se verá en celulares) -->
                <button id="mobile-menu-btn" class="icon-btn mobile-toggle" aria-label="Menú">
                    <!-- Icono de 3 rayitas[cite: 7] -->
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>
        </nav>
    `;
}

export function initNavbarEvents() {
    // Actualizar el navbar según la sesión
    renderAuth();
    
    // 1. Lógica Búsqueda
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) searchInput.focus();
        });
    }

    // 2. Lógica Menú Hamburguesa Lateral (Móvil)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('mobile-nav-overlay');

    const openMenu = () => {
        navLinks.classList.add('active-sidebar');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquea el scroll
    };

    const closeMenu = () => {
        navLinks.classList.remove('active-sidebar');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura el scroll
    };

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', openMenu);
    }

    if (closeMobileMenuBtn) {
        closeMobileMenuBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // 3. Lógica Menús Desplegables en Móvil (Submenús)
    const navItems = document.querySelectorAll('.has-mega-menu > a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Solo actuar como acordeón en móvil
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parentLi = this.parentElement;
                parentLi.classList.toggle('submenu-active');
            }
        });
    });

    // 4. Lógica Modales (Mantenida de tu código original)
    const linkNosotros = document.getElementById('link-nosotros');
    const linkContacto = document.getElementById('link-contacto');
    const modalNosotros = document.getElementById('modal-nosotros');
    const modalContacto = document.getElementById('modal-contacto');
    const closeBtns = document.querySelectorAll('.close-btn');

    if (linkNosotros) linkNosotros.addEventListener('click', (e) => { e.preventDefault(); modalNosotros.classList.add('active'); });
    if (linkContacto) linkContacto.addEventListener('click', (e) => { e.preventDefault(); modalContacto.classList.add('active'); });

    closeBtns.forEach(btn => btn.addEventListener('click', () => {
        if(modalNosotros) modalNosotros.classList.remove('active');
        if(modalContacto) modalContacto.classList.remove('active');
    }));

    window.addEventListener('click', (e) => {
        if (e.target === modalNosotros) modalNosotros.classList.remove('active');
        if (e.target === modalContacto) modalContacto.classList.remove('active');
    });
}

/* ==========================================
   ESTADO DE AUTENTICACIÓN EN NAVBAR
   ========================================== */

export function renderAuth() {
    const container = document.getElementById("auth-container");
    const mobileLoginLink = document.getElementById("mobile-login-link");
    const session = getSession();

    // -- Actualizar sesión en móvil --
    if (mobileLoginLink) {
        if (session) {
            mobileLoginLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> Cerrar sesión`;
            mobileLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        } else {
            mobileLoginLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Iniciar sesión`;
            mobileLoginLink.href = "./login.html";
        }
    }

    // -- Actualizar sesión en escritorio --
    if (!container) return;
    container.replaceChildren();

    if (!session) {
        const loginLink = document.createElement("a");
        loginLink.href = "./login.html";
        loginLink.className = "icon-btn";
        loginLink.title = "Iniciar sesión";
        loginLink.setAttribute("aria-label", "Iniciar sesión");
        loginLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        container.appendChild(loginLink);
        return;
    }

    const userButton = document.createElement("button");
    userButton.type = "button";
    userButton.className = "icon-btn auth-user-btn";
    userButton.setAttribute("aria-expanded", "false");
    
    // Contenido del botón de usuario (Escritorio)
    userButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>Hola, ${session.nombre}</span>
    `;

    const dropdown = document.createElement("div");
    dropdown.className = "auth-dropdown";
    dropdown.hidden = true;

    const logoutButton = document.createElement("button");
    logoutButton.type = "button";
    logoutButton.className = "auth-logout-btn";
    logoutButton.textContent = "Cerrar sesión";
    logoutButton.addEventListener("click", logout);

    dropdown.appendChild(logoutButton);
    
    userButton.addEventListener("click", () => {
        dropdown.hidden = !dropdown.hidden;
        userButton.setAttribute("aria-expanded", String(!dropdown.hidden));
    });

    container.append(userButton, dropdown);

    document.addEventListener("click", (event) => {
        if (!container.contains(event.target)) {
            dropdown.hidden = true;
            userButton.setAttribute("aria-expanded", "false");
        }
    });
}