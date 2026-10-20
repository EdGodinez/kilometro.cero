/* ==========================================
   KILÓMETRO CERO - MAIN JS
   ========================================== */

/* ==========================================
   IMPORTACIÓN DE COMPONENTES
   ========================================== */

// Componentes propios
import { renderNavbar, initNavbarEvents } from './components/header.js';
import { renderBanner } from './components/banner.js';
import { renderHero } from './components/hero.js';
import { renderFooter } from './components/footer.js';
import { renderContact, initContact } from './components/contact.js';
import { renderBenefits } from './components/benefits.js';
import { renderAbout } from './components/about.js';
// Importación del Carrito
import { renderCarrito, initCarritoLogica } from './components/carrito.js';

// Componentes de productos
import { renderCardSlider } from './components/CardSlider.js';
import { renderCategorias } from './components/Categorias.js';
import { renderTabsSlider } from './components/TabsSlider.js';
import { renderProductGrid } from './components/ProductGrid.js';
import { renderProductDetail } from './components/ProductDetail.js';
import { initAnimaciones } from './components/animaciones.js';
/* ==========================================
   HEADER
   ========================================== */

const headerElement = document.querySelector('#header');

if (headerElement) {
  headerElement.innerHTML = renderNavbar();
  initNavbarEvents();
}

/* ==========================================
   BANNER
   ========================================== */

const bannerContainer = document.querySelector('#banner-container');

if (bannerContainer) {
  bannerContainer.innerHTML = renderBanner();
}

/* ==========================================
   HERO - INDEX
   ========================================== */

const heroContainer = document.querySelector('#hero-container');

if (heroContainer) {
  heroContainer.innerHTML = renderHero();
}

/* ==========================================
   BENEFITS
   ========================================== */

const benefitsContainer = document.querySelector('#benefits-container');

if (benefitsContainer) {
  benefitsContainer.innerHTML = renderBenefits();
}

/* ==========================================
   FOOTER
   ========================================== */

const footerElement = document.querySelector('#footer');

if (footerElement) {
  footerElement.innerHTML = renderFooter();
}

/* ==========================================
   CONTACT
   ========================================== */

const app = document.querySelector('#app');

if (app) {
  app.innerHTML = renderContact();
  initContact();
}

/* ==========================================
   ABOUT - ABOUT.HTML
   ========================================== */

const aboutContainer = document.querySelector('#about-container');

if (aboutContainer) {
  aboutContainer.innerHTML = renderAbout();

  // Inicializar los iconos del About
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.7
      }
    });
  }
}

/* ==========================================
   PRODUCTOS
   ========================================== */

// Carrusel de productos
renderCardSlider('#card-slider', 'new-arrivals');

// Categorías
renderCategorias('#categorias');

// Slider de pestañas
renderTabsSlider('#tabs-slider');

// Cuadrícula de productos
renderProductGrid('#product-grid');

renderProductDetail('#product-detail');
initAnimaciones();

/* ==========================================
   CARRITO DE COMPRAS
   ========================================== */

// 1. Crear un contenedor para el carrito
const carritoContainer = document.createElement('div');
carritoContainer.id = 'carrito-container';

// 2. Inyectar el HTML del carrito dentro de ese contenedor
carritoContainer.innerHTML = renderCarrito();

// 3. Agregar el contenedor al final del body
document.body.appendChild(carritoContainer);

// 4. Inicializar la lógica de los clics (después de agregar el HTML)
initCarritoLogica();