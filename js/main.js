
/* ==========================================
   KILÓMETRO CERO - MAIN JS
   ========================================== */

/* ==========================================
   IMPORTACIÓN DE COMPONENTES
   ========================================== */

// Componentes propios
import { renderHero } from './components/hero.js';
import { renderFooter } from './components/footer.js';
import { renderContact, initContact } from './components/contact.js';
import { renderAbout } from './components/about.js';

// Componentes de productos
import { renderCardSlider } from './components/CardSlider.js';
import { renderCategorias } from './components/Categorias.js';
import { renderTabsSlider } from './components/TabsSlider.js';
import { renderProductGrid } from './components/ProductGrid.js';

/* ==========================================
   HERO - INDEX
   ========================================== */

const heroContainer = document.querySelector('#hero-container');

if (heroContainer) {
  heroContainer.innerHTML = renderHero();
}

/* ==========================================
   ABOUT - ABOUT.HTML
   ========================================== */

const sliderContainer = document.querySelector('#slider');

if (sliderContainer) {
  sliderContainer.innerHTML = renderCardSlider();
}

/* ==========================================
   FOOTER
   ========================================== */
const footerElement = document.querySelector('#footer');
footerElement.innerHTML = renderFooter();

/* ==========================================
   CONTACT
   ========================================== */
const app = document.querySelector('#app');
app.innerHTML = renderContact();
initContact();
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
renderProductGrid('#product-grid');


// Cuadrícula de productos
renderProductGrid('#product-grid');
