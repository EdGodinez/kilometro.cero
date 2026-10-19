/* ==========================================================
   TabsSlider.js
   Sección con pestañas (Hombre / Mujer), un enlace "Ver todo"
   y un carrusel de cards con flechas y barra de progreso.

   Se usa desde main.js así:
       renderTabsSlider('#tabs-slider');
   ========================================================== */

import { cargarProductos, renderCard, RUTA_PRODUCTOS } from './CardSlider.js';


/* ----------------------------------------------------------
   CONFIGURACIÓN
   ---------------------------------------------------------- */

// Pestañas. "id" debe coincidir con el campo "genero" del JSON.
// La primera de la lista es la que empieza activa.
const TABS = [
    { id: 'hombre', nombre: 'Hombre' },
    { id: 'mujer', nombre: 'Mujer' },
];


/* ----------------------------------------------------------
   PLANTILLA HTML
   El track empieza vacío: las cards se pintan después, y se
   vuelven a pintar cada vez que cambias de pestaña.
   ---------------------------------------------------------- */
function plantilla() {
    const tabs = TABS.map((tab, i) => `
        <button class="tabs-slider__tab ${i === 0 ? 'tabs-slider__tab--activa' : ''}"
                type="button"
                data-genero="${tab.id}"
                aria-pressed="${i === 0}">${tab.nombre}</button>
    `).join('');

    return `
    <section class="tabs-slider max-container">
        <!-- Encabezado: flecha + pestañas a la izquierda, "Ver todo" a la derecha -->
        <div class="tabs-slider__encabezado">
            <h2 class="tabs-slider__titulo">
                <span class="tabs-slider__icono">↗</span>
                ${tabs}
            </h2>
            <a class="tabs-slider__enlace" href="productos.html?genero=${TABS[0].id}">Ver todo</a>
        </div>

        <!-- Carrusel -->
        <div class="tabs-slider__slider">
            <button class="tabs-slider__flecha tabs-slider__flecha--prev" type="button" aria-label="Anterior">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>

            <div class="tabs-slider__track"></div>

            <button class="tabs-slider__flecha tabs-slider__flecha--next" type="button" aria-label="Siguiente">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
        </div>

        <!-- Barra de progreso: la parte oscura es lo que se ve del carrusel.
             Empieza oculta y se muestra solo si hay algo que desplazar. -->
        <div class="tabs-slider__progreso" hidden>
            <span class="tabs-slider__barra"></span>
        </div>
    </section>
    `;
}


/* ----------------------------------------------------------
   FUNCIÓN PÚBLICA
   ---------------------------------------------------------- */
export async function renderTabsSlider(selector) {
    // 1. Busca el contenedor del index.html
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;

    // 2. Descarga los productos y pinta la estructura (con el track vacío)
    const productos = await cargarProductos(RUTA_PRODUCTOS);
    contenedor.innerHTML = plantilla();
    

    // 3. Guarda los elementos que se van a usar
    const tabs = contenedor.querySelectorAll('.tabs-slider__tab');
    const track = contenedor.querySelector('.tabs-slider__track');
    const prev = contenedor.querySelector('.tabs-slider__flecha--prev');
    const next = contenedor.querySelector('.tabs-slider__flecha--next');
    const progreso = contenedor.querySelector('.tabs-slider__progreso');
    const barra = contenedor.querySelector('.tabs-slider__barra');

    // Actualiza flechas y barra de progreso según dónde esté el carrusel
    const actualizar = () => {
        const max = track.scrollWidth - track.clientWidth;

        // Flechas: se desactivan al llegar al inicio o al final
        prev.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft >= max - 1;

        // Barra: se oculta si todas las cards caben y no hay nada que desplazar
        progreso.hidden = max <= 1;

        // Ancho de la parte oscura = qué porción del carrusel se ve.
        // Posición = cuánto llevas desplazado.
        barra.style.width = `${(track.clientWidth / track.scrollWidth) * 100}%`;
        barra.style.left = `${(track.scrollLeft / track.scrollWidth) * 100}%`;
    };

    const enlace = contenedor.querySelector('.tabs-slider__enlace');

    // Pinta las cards de un género (los "unisex" salen en ambas pestañas)
    const pintar = (genero) => {
        const filtrados = productos.filter((p) => p.genero === genero || p.genero === 'unisex');

        // "Ver todo" lleva al listado del género activo
        enlace.setAttribute('href', `productos.html?genero=${genero}`);

        track.innerHTML = filtrados.map(renderCard).join('');
        track.scrollLeft = 0; // vuelve al inicio al cambiar de pestaña
        actualizar();
    };

    // Cuánto se desplaza cada clic: una card + el espacio entre cards
    const paso = () => {
        const card = track.querySelector('.card');
        if (!card) return 0;

        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return card.offsetWidth + gap;
    };

    // 4. Clic en una pestaña: la marca como activa y pinta sus productos
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => {
                const activa = t === tab;
                t.classList.toggle('tabs-slider__tab--activa', activa);
                t.setAttribute('aria-pressed', activa);
            });

            pintar(tab.dataset.genero);
        });
    });

    // 5. Flechas y eventos que mantienen todo sincronizado
    prev.addEventListener('click', () => track.scrollBy({ left: -paso(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: paso(), behavior: 'smooth' }));
    track.addEventListener('scroll', actualizar);
    window.addEventListener('resize', actualizar);

    // 6. Estado inicial: la primera pestaña
    pintar(TABS[0].id);
}