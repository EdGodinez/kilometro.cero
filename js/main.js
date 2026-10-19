/* ==========================================
   KILÓMETRO CERO - MAIN JS
   ========================================== */

/* Importación de componentes */
import { renderCardSlider } from './components/CardSlider.js';
import { renderHero } from './components/hero.js';
import { renderFooter } from './components/footer.js';
import { renderContact, initContact } from './components/contact.js';

/* ==========================================
   HERO
   ========================================== */

const heroContainer = document.querySelector('#hero-container');

if (heroContainer) {
  heroContainer.innerHTML = renderHero();
}

/* ==========================================
   CARD SLIDER
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
>>>>>>> 81807130ae1ad7e3d05a4101cc87c5ecd1e8c8d6
