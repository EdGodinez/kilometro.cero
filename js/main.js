import { renderCardSlider } from './components/cardSlider.js';
import { renderFooter } from './components/footer.js';
import { renderContact, initContact } from './components/contact.js';

const contenedor = document.querySelector('#slider');
contenedor.innerHTML = renderCardSlider();

const footerElement = document.querySelector('#footer');
footerElement.innerHTML = renderFooter();

const app = document.querySelector('#app');
app.innerHTML = renderContact();
initContact();