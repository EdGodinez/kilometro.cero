

import { renderNavbar, initNavbarEvents } from './components/header.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const headerElement = document.querySelector('#header'); 

    if (headerElement) {
        headerElement.innerHTML = renderNavbar();
        initNavbarEvents();
    }
    
});