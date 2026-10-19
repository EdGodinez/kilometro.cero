/* ==========================================
   KILÓMETRO CERO - MAIN JS
   ========================================== */

/* Importación de componentes */
import { renderHero } from './components/hero.js';
import { renderFooter } from './components/footer.js';
import { renderContact, initContact } from './components/contact.js';
import { renderCardSlider } from './components/CardSlider.js';
import { renderCategorias } from './components/Categorias.js';
import { renderTabsSlider } from './components/TabsSlider.js';
import { renderProductGrid } from './components/ProductGrid.js';

/* ==========================================
   HERO
   ========================================== */

const heroContainer = document.querySelector('#hero-container');

if (heroContainer) {
  heroContainer.innerHTML = renderHero();
}

/* ==========================================
   PRODUCTOS
   Cada función se sale sola si su contenedor
   no existe en la página (index.html o productos.html).
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
renderCardSlider('#card-slider', 'new-arrivals');
renderCategorias('#categorias');
renderTabsSlider('#tabs-slider');
renderProductGrid('#product-grid');

