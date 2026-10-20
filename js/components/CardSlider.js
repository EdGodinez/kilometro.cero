/* ==========================================================
   CardSlider.js
   Componente que pinta la sección "New Arrivals":
   un anuncio fijo a la izquierda y un carrusel de cards a la
   derecha, con los productos que vienen de un JSON.

   Este archivo también comparte piezas con otros componentes:
   - cargarProductos -> descarga el JSON
   - renderCard      -> HTML de una card de producto
   TabsSlider.js las importa para no duplicar código.

   Se usa desde main.js así:
       renderCardSlider('#card-slider', 'new-arrivals');
   (primer dato: dónde se pinta, segundo: qué tag se muestra)
   ========================================================== */


/* ----------------------------------------------------------
   CONFIGURACIÓN
   ---------------------------------------------------------- */

// Ruta del JSON con los productos (se cuenta desde el index.html)
export const RUTA_PRODUCTOS = 'assets/data/productos.json';

// Convierte un número (5999) en texto de dinero ($5,999.00).
// Se crea una sola vez aquí arriba y se reutiliza en cada card.
export const formatoPrecio = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
});


/* ----------------------------------------------------------
   CARGA DE DATOS
   ---------------------------------------------------------- */

// COMPARTIDA: la usa también TabsSlider.js.
// Descarga el JSON y lo devuelve como un arreglo de productos.
// Es "async" porque descargar toma tiempo y hay que esperar.
export async function cargarProductos(url) {
    const respuesta = await fetch(url);

    // Si el archivo no existe o la ruta está mal, avisa con un error claro
    if (!respuesta.ok) throw new Error(`No se pudo cargar ${url}`);

    return respuesta.json();
}


/* ----------------------------------------------------------
   PLANTILLAS HTML
   ---------------------------------------------------------- */

// COMPARTIDA: la usa también TabsSlider.js.
// Recibe UN producto y devuelve el HTML de su card.
// Si cambias algo aquí, cambia en todos los sliders a la vez.
export function renderCard(producto) {
    const imagenes = producto.imagenes ?? (producto.imagen ? [producto.imagen] : []);
    const [principal, hover] = imagenes;
    const nombre = producto.nombre.replaceAll('"', '&quot;');

    return `
        <article class="card">
            <a class="card__enlace" href="producto.html?id=${producto.id}">
                <div class="card__media">
                    ${producto.agotado
                        ? '<span class="card__etiqueta card__etiqueta--agotado">Agotado</span>'
                        : producto.nuevo ? '<span class="card__etiqueta">Nuevo</span>' : ''}

                    <img class="card__imagen" src="${principal ?? ''}" alt="${nombre}">
                    ${hover ? `<img class="card__imagen card__imagen--hover" src="${hover}" alt="" aria-hidden="true">` : ''}
                </div>
                <div class="card__info">
                    <p class="card__marca">${producto.marca}</p>
                    <h3 class="card__nombre">${producto.nombre}</h3>
                    <p class="card__precio">${formatoPrecio.format(producto.precio)}</p>
                </div>
            </a>
        </article>
    `;
}
// Recibe la lista de productos y devuelve el HTML de toda la sección:
// anuncio + flechas + carrusel con todas las cards.
function plantilla(productos) {
    return `
    <section class="new-arrivals max-container">
        <!-- Anuncio: fuera del carrusel, por eso no se mueve -->
        <div class="new-arrivals__banner">
            <span class="new-arrivals__marca">KM.0</span>
            <h2 class="new-arrivals__titulo">Novedades</h2>
            <a class="new-arrivals__boton" href="productos.html?categoria=ropa">Ver todo ↗</a>
        </div>

        <!-- Carrusel: solo esto se desplaza -->
        <div class="new-arrivals__slider">
            <!-- Flecha izquierda (el dibujo es un SVG) -->
            <button class="new-arrivals__flecha new-arrivals__flecha--prev" type="button" aria-label="Anterior">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>

            <!-- Aquí se pintan las cards: .map() crea una card por producto
                 y .join('') las une en un solo texto de HTML -->
            <div class="new-arrivals__track">
                ${productos.map(renderCard).join('')}
            </div>

            <!-- Flecha derecha -->
            <button class="new-arrivals__flecha new-arrivals__flecha--next" type="button" aria-label="Siguiente">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
        </div>
    </section>
    `;
}


/* ----------------------------------------------------------
   COMPORTAMIENTO DEL CARRUSEL (flechas)
   Se ejecuta DESPUÉS de pintar el HTML, porque los botones
   no existen hasta ese momento.
   ---------------------------------------------------------- */
function initCardSlider(contenedor) {
    // Buscamos los elementos dentro de este componente
    const track = contenedor.querySelector('.new-arrivals__track');
    const prev = contenedor.querySelector('.new-arrivals__flecha--prev');
    const next = contenedor.querySelector('.new-arrivals__flecha--next');
    const primeraCard = track.querySelector('.card');

    // Si no hay productos con ese tag, no hay nada que mover
    if (!primeraCard) return;

    // Cuánto se desplaza el carrusel en cada clic:
    // el ancho de una card + el espacio (gap) entre cards.
    // Se calcula en cada clic porque el ancho cambia con el tamaño de pantalla.
    const paso = () => {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return primeraCard.offsetWidth + gap;
    };

    // Activa o desactiva las flechas según dónde esté el carrusel:
    // - Flecha izquierda desactivada si estamos al inicio
    // - Flecha derecha desactivada si llegamos al final
    // El "1" y "- 1" son un margen por si el navegador redondea decimales.
    const actualizarFlechas = () => {
        const max = track.scrollWidth - track.clientWidth;
        prev.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft >= max - 1;
    };

    // Clic en las flechas: desplaza una card, con animación suave
    prev.addEventListener('click', () => track.scrollBy({ left: -paso(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: paso(), behavior: 'smooth' }));

    // Actualiza las flechas al deslizar (con flechas, mouse, dedo o rueda)
    track.addEventListener('scroll', actualizarFlechas);

    // Y también al cambiar el tamaño de la ventana
    window.addEventListener('resize', actualizarFlechas);

    // Estado inicial al cargar (la izquierda empieza desactivada)
    actualizarFlechas();
}


/* ----------------------------------------------------------
   FUNCIÓN PÚBLICA
   Es la que llama main.js. Une todos los pasos anteriores
   en orden. (Las otras dos funciones exportadas, cargarProductos
   y renderCard, son piezas compartidas para otros componentes.)
   ---------------------------------------------------------- */
export async function renderCardSlider(selector, tag) {
    // 1. Busca el contenedor del index.html (ej: #card-slider)
    const contenedor = document.querySelector(selector);
    if (!contenedor) return; // si no existe, no hace nada

    // 2. Descarga todos los productos del JSON
    const productos = await cargarProductos(RUTA_PRODUCTOS);

    // 3. Se queda solo con los que traen el tag en "colecciones".
    //    El "?." evita errores si un producto no tiene ese campo.
    const filtrados = productos.filter((p) => p.colecciones?.includes(tag));

    // 4. Pinta el HTML de la sección dentro del contenedor
    contenedor.innerHTML = plantilla(filtrados);

    // 5. Activa las flechas del carrusel
    initCardSlider(contenedor);
}