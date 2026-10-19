/* ==========================================================
   Categorias.js
   Sección con un título y tres imágenes de orilla a orilla.
   Cada imagen es un enlace a su categoría.

   Se usa desde main.js así:
       renderCategorias('#categorias');
   ========================================================== */


/* ----------------------------------------------------------
   DATOS
   Para cambiar una categoría, edita su imagen o su enlace aquí.
   "nombre" se usa para el texto alternativo de la imagen y para
   lectores de pantalla (la imagen no muestra texto encima).
   ---------------------------------------------------------- */
const CATEGORIAS = [
    {
        nombre: 'Ropa',
        imagen: '//mettarunninghouse.com/cdn/shop/files/fw26-In1-pr-product_still-apparel-4x5-rgb-11_1.jpg?v=1790280133&width=1080',
        enlace: 'productos.html?categoria=ropa',
    },
    {
        nombre: 'Calzado',
        imagen: '//mettarunninghouse.com/cdn/shop/files/1080x1920-01.jpg?v=1790280223&width=1080',
        enlace: 'productos.html?categoria=calzado',
    },
    {
        nombre: 'Accesorios',
        imagen: '//mettarunninghouse.com/cdn/shop/files/Zghertner_District-Vision_31820016_v2_LR.webp?v=1790280226&width=1100',
        enlace: 'productos.html?categoria=accesorios',
    },
];


/* ----------------------------------------------------------
   PLANTILLAS HTML
   ---------------------------------------------------------- */

// Recibe UNA categoría y devuelve el HTML de su imagen con el texto encima
function renderItem(categoria) {
    return `
        <a class="categorias__item" href="${categoria.enlace}">
            <img class="categorias__imagen" src="${categoria.imagen}" alt="" loading="lazy">
            <span class="categorias__nombre">${categoria.nombre}</span>
        </a>
    `;
}

// Devuelve el HTML de toda la sección: título + las imágenes
function plantilla() {
    return `
    <section class="categorias">
        <!-- El título va dentro del max-container, las imágenes no -->
        <div class="max-container">
            <h2 class="categorias__titulo">
                <span class="categorias__icono">↗</span>
                Categorías
            </h2>
        </div>

        <div class="categorias__grid">
            ${CATEGORIAS.map(renderItem).join('')}
        </div>
    </section>
    `;
}


/* ----------------------------------------------------------
   FUNCIÓN PÚBLICA
   Busca el contenedor del index.html y pinta la sección dentro.
   ---------------------------------------------------------- */
export function renderCategorias(selector) {
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;

    contenedor.innerHTML = plantilla();
}