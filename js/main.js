import { renderCardSlider } from './components/cardSlider.js';
import { renderFooter } from './components/footer.js';

const contenedor = document.querySelector('#slider');
contenedor.innerHTML = renderCardSlider();

const footerElement = document.querySelector('#footer');
    footerElement.innerHTML = renderFooter();