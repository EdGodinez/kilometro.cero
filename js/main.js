
/* ==========================================
   KILÓMETRO CERO - MAIN JS
   ========================================== */

/* Importaciones */
import { renderHero } from './components/hero.js';
import { renderAbout } from './components/about.js';

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

const aboutContainer = document.querySelector('#about-container');

if (aboutContainer) {
  aboutContainer.innerHTML = renderAbout();
}

/* ==========================================
   CARD SLIDER
   ========================================== */

const sliderContainer = document.querySelector('#slider');

if (sliderContainer) {
  import('./components/CardSlider.js').then(({ renderCardSlider }) => {
    sliderContainer.innerHTML = renderCardSlider();
  }).catch(error => {
    console.error('Error al cargar Card Slider:', error);
  });
}
