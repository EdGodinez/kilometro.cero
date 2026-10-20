// js/components/header.js
import { getSession, logout } from "../auth.js";

export function renderNavbar() {
    return `
        <nav class="navbar">
            <!-- Logo -->
            <div class="nav-logo"><a href="./index.html">KM<span class="dot-neon">.</span>0</a></div>

            <!-- Enlaces Centrales -->
            <ul class="nav-links" id="nav-links">
                <li class="nav-item has-mega-menu">
                    <a href="./productos.html?genero=hombre" class="">HOMBRE</a>
                    <div class="mega-menu">
                            <ul class="mega-menu-list">
                                <li><a href="./productos.html?genero=hombre&categoria=calzado">Calzado</a></li>
                                <li><a href="./productos.html?genero=hombre&categoria=ropa">Ropa</a></li>
                                <li><a href="./productos.html?genero=hombre&categoria=accesorios">Accesorios</a></li>
                            </ul>
                    </div>
                </li>
                <li class="nav-item has-mega-menu">
                        <a href="./productos.html?genero=mujer" class="">MUJER</a>
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
            </ul>

            <!-- Iconos Búsqueda, Usuario y Menú Hamburguesa -->
            <div class="nav-icons">
                <div class="search-container">
                    <input type="text" id="search-input" class="search-input" placeholder="Buscar...">
                    <button id="search-btn" class="icon-btn" aria-label="Buscar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </div>

                <!-- Contenedor de autenticación -->
                <div id="auth-container">
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

               

                </button>
                
                <!-- NUEVO: Botón Hamburguesa (Solo se verá en celulares) -->
                <button id="mobile-menu-btn" class="icon-btn mobile-toggle" aria-label="Menú">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
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


/* ==========================================
   ESTADO DE AUTENTICACIÓN EN NAVBAR
   ========================================== */


export function renderAuth() {
    const container = document.getElementById("auth-container");

    if (!container) return;

    const session = getSession();

    // Limpiar contenido anterior
    container.replaceChildren();

    if (!session) {
        // Usuario visitante
        const loginLink = document.createElement("a");

        loginLink.href = "./login.html";
        loginLink.className = "icon-btn";
        loginLink.title = "Iniciar sesión";
        loginLink.setAttribute("aria-label", "Iniciar sesión");

        loginLink.innerHTML = `
            <i class="bx bx-user"></i>
        `;

        container.appendChild(loginLink);
        return;
    }

    // Usuario con sesión iniciada
    const userButton = document.createElement("button");
    userButton.type = "button";
    userButton.className = "icon-btn auth-user-btn";
    userButton.setAttribute("aria-expanded", "false");
    userButton.setAttribute("aria-controls", "auth-dropdown");

    const userIcon = document.createElement("i");
    userIcon.className = "bx bx-user-circle";

    const userName = document.createElement("span");
    userName.textContent = `Hola, ${session.nombre}`;

    const arrowIcon = document.createElement("i");
    arrowIcon.className = "bx bx-chevron-down";

    userButton.append(userIcon, userName, arrowIcon);

    // Menú desplegable
    const dropdown = document.createElement("div");
    dropdown.id = "auth-dropdown";
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
        userButton.setAttribute(
            "aria-expanded",
            String(!dropdown.hidden)
        );
    });

    container.append(userButton, dropdown);

    // Cerrar con Escape o clic fuera
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            dropdown.hidden = true;
            userButton.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("click", (event) => {
        if (!container.contains(event.target)) {
            dropdown.hidden = true;
            userButton.setAttribute("aria-expanded", "false");
        }
    });
}

