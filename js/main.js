
/* ==========================================
   KILÓMETRO CERO - MAIN JS
   ========================================== */

/* Importación de componentes */
import { renderCardSlider } from './components/cardSlider.js';
import { renderHero } from './components/hero.js';

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
