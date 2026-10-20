/* ==========================================================
   animaciones.js
   Animación de entrada para los textos <h2> y <p>: cada texto
   sube y aparece con un fundido cuando llega a la pantalla.

   Se usa desde main.js así (al final del archivo):
       initAnimaciones();

   Funciona también con el contenido que se pinta después con JS
   (sliders, categorías, etc.): vigila la página y anima lo nuevo.
   ========================================================== */


/* ----------------------------------------------------------
   CONFIGURACIÓN
   ---------------------------------------------------------- */

// Qué textos se animan
const SELECTOR = 'h2, p';

// Dónde NO se animan (por ser parte de algo que cambia seguido o está oculto):
// - las cards y la cuadrícula de productos (se repintan al filtrar)
// - el carrito y el menú de arriba
// - los avisos emergentes
// Para excluir cualquier otro texto, ponle la clase "sin-animacion".
const EXCLUIR = '.sin-animacion, #header, .card, .barra-carrito, .productos__grid, .modal-overlay';

// Segundos de espera entre un texto y el siguiente cuando entran juntos
const ESCALONADO = 0.1;
const ESCALONADO_MAX = 0.4;


/* ----------------------------------------------------------
   FUNCIÓN PÚBLICA
   ---------------------------------------------------------- */
export function initAnimaciones() {
    // Si el navegador no soporta el observador, o la persona pidió
    // menos movimiento en su sistema, los textos se quedan sin animar.
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Observador: avisa cuando un texto entra en la pantalla
    const observador = new IntersectionObserver((entradas) => {
        // Solo los que acaban de entrar, en orden de aparición en la página
        const nuevos = entradas
            .filter((entrada) => entrada.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        nuevos.forEach((entrada, i) => {
            const texto = entrada.target;

            // Si varios entran a la vez, cada uno espera un poco más que el anterior
            texto.style.setProperty('--retraso', `${Math.min(i * ESCALONADO, ESCALONADO_MAX)}s`);
            texto.classList.add('anim-texto--visible');

            // Ya se animó una vez: deja de vigilarlo
            observador.unobserve(texto);
        });
    }, {
        threshold: 0.15, // se anima cuando se ve el 15% del texto
    });

    // Prepara los textos que haya dentro de "raiz"
    const preparar = (raiz) => {
        const textos = [];

        if (raiz.matches?.(SELECTOR)) textos.push(raiz);
        raiz.querySelectorAll?.(SELECTOR).forEach((t) => textos.push(t));

        textos.forEach((texto) => {
            // Ya preparado o excluido: se salta
            if (texto.classList.contains('anim-texto')) return;
            if (texto.closest(EXCLUIR)) return;

            texto.classList.add('anim-texto');
            observador.observe(texto);
        });
    };

    // 1. Lo que ya está en la página
    preparar(document.body);

    // 2. Lo que se agregue después (contenido pintado con JS)
    new MutationObserver((cambios) => {
        cambios.forEach((cambio) => {
            cambio.addedNodes.forEach((nodo) => {
                if (nodo.nodeType === Node.ELEMENT_NODE) preparar(nodo);
            });
        });
    }).observe(document.body, { childList: true, subtree: true });
}