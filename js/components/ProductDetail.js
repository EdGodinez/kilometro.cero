/* ==========================================================
   ProductDetail.js
   Página interior de un producto: galería de fotos, nombre,
   precio, tallas, cantidad, botón de compra y detalles.

   El producto se elige por la URL:
       producto.html?id=12

   Se usa desde main.js así:
       renderProductDetail('#product-detail');
   ========================================================== */

import { cargarProductos, RUTA_PRODUCTOS, formatoPrecio } from './CardSlider.js';


/* ----------------------------------------------------------
   CONFIGURACIÓN
   ---------------------------------------------------------- */

// Nombres bonitos para mostrar. La clave coincide con el JSON.
const GENEROS = {
    hombre: 'Hombre',
    mujer: 'Mujer',
    unisex: 'Unisex',
};

const CATEGORIAS = {
    ropa: 'Ropa',
    calzado: 'Calzado',
    accesorios: 'Accesorios',
};

// Máximo de piezas que se pueden pedir de golpe
const CANTIDAD_MAX = 10;


/* ----------------------------------------------------------
   UTILIDADES
   ---------------------------------------------------------- */

// Lee el id de la URL (?id=12). Si no es un número válido, devuelve null.
function leerId() {
    const id = Number(new URLSearchParams(window.location.search).get('id'));
    return Number.isInteger(id) && id > 0 ? id : null;
}

// Las comillas dentro de un atributo HTML lo rompen (ej: SPLIT 3"),
// así que se cambian por su código antes de usarlas en alt="...".
function paraAtributo(texto) {
    return String(texto).replaceAll('"', '&quot;');
}

// Arma el enlace al listado conservando género y categoría.
// Los "unisex" no tienen página propia, así que solo filtran por categoría.
function hrefListado(producto) {
    const params = new URLSearchParams();
    if (producto.genero !== 'unisex') params.set('genero', producto.genero);
    params.set('categoria', producto.categoria);
    return `productos.html?${params.toString()}`;
}


/* ----------------------------------------------------------
   PLANTILLAS HTML
   ---------------------------------------------------------- */

// Cuando el id no existe o la URL no trae id
function plantillaVacia() {
    return `
    <section class="detalle max-container">
        <div class="detalle__vacio">
            <h1 class="detalle__vacio-titulo">No encontramos este producto</h1>
            <a class="detalle__vacio-enlace" href="productos.html">Ver todos los productos</a>
        </div>
    </section>
    `;
}

function plantilla(producto) {
    const imagenes = producto.imagenes ?? [];
    const tallas = producto.tallas ?? [];
    const nombre = paraAtributo(producto.nombre);

    // Insignia sobre la foto: "Agotado" tiene prioridad sobre "Nuevo"
    const insignia = producto.agotado
        ? '<span class="detalle__insignia detalle__insignia--agotado">Agotado</span>'
        : producto.nuevo
            ? '<span class="detalle__insignia">Nuevo</span>'
            : '';

    // Miniaturas: solo si hay más de una foto
    const miniaturas = imagenes.length > 1 ? `
        <div class="detalle__miniaturas">
            ${imagenes.map((src, i) => `
                <button class="detalle__miniatura ${i === 0 ? 'detalle__miniatura--activa' : ''}"
                        type="button"
                        data-src="${src}"
                        aria-label="Ver foto ${i + 1}"
                        aria-current="${i === 0}">
                    <img src="${src}" alt="" loading="lazy">
                </button>
            `).join('')}
        </div>
    ` : '';

    // Tallas: botones cuadrados. La primera empieza elegida.
    const bloqueTallas = tallas.length ? `
        <fieldset class="detalle__tallas">
            <legend class="detalle__etiqueta">
                Talla: <span class="detalle__talla-elegida">${tallas[0]}</span>
            </legend>
            <div class="detalle__tallas-lista">
                ${tallas.map((t, i) => `
                    <label class="detalle__talla">
                        <input type="radio" name="talla" value="${t}" ${i === 0 ? 'checked' : ''}>
                        <span>${t}</span>
                    </label>
                `).join('')}
            </div>
        </fieldset>
    ` : '';

    // Descripción: solo se muestra si el producto trae el campo "descripcion" en el JSON
    const descripcion = producto.descripcion ? `
        <details class="detalle__acordeon" open>
            <summary class="detalle__acordeon-titulo">Descripción</summary>
            <p class="detalle__acordeon-texto">${producto.descripcion}</p>
        </details>
    ` : '';

    return `
    <section class="detalle max-container">
        <!-- Migas de pan: Productos / Categoría -->
        <nav class="detalle__migas" aria-label="Ruta">
            <a href="productos.html">Productos</a>
            <span aria-hidden="true">/</span>
            <a href="${hrefListado(producto)}">${CATEGORIAS[producto.categoria] ?? producto.categoria}</a>
        </nav>

        <div class="detalle__layout">
            <!-- Galería: miniaturas + foto principal -->
            <div class="detalle__galeria">
                ${miniaturas}
                <div class="detalle__marco">
                    ${insignia}
                    <img class="detalle__imagen" src="${imagenes[0] ?? ''}" alt="${nombre}">
                </div>
            </div>

            <!-- Información y compra -->
            <div class="detalle__info">
                <p class="detalle__marca">${producto.marca}</p>
                <h1 class="detalle__titulo">${producto.nombre}</h1>
                <p class="detalle__precio">${formatoPrecio.format(producto.precio)}</p>

                ${bloqueTallas}

                <div class="detalle__cantidad-bloque">
                    <span class="detalle__etiqueta">Cantidad:</span>
                    <div class="detalle__cantidad">
                        <button class="detalle__cantidad-boton" type="button" data-accion="menos" aria-label="Disminuir cantidad">−</button>
                        <input class="detalle__cantidad-valor" type="number" value="1" min="1" max="${CANTIDAD_MAX}" inputmode="numeric" aria-label="Cantidad">
                        <button class="detalle__cantidad-boton" type="button" data-accion="mas" aria-label="Aumentar cantidad">+</button>
                    </div>
                </div>

                <div class="detalle__compra">
                    <button class="detalle__agregar" type="button" ${producto.agotado ? 'disabled' : ''}>
                        <span class="detalle__agregar-texto"></span>
                    </button>
                </div>

                ${descripcion}

                <details class="detalle__acordeon" ${producto.descripcion ? '' : 'open'}>
                    <summary class="detalle__acordeon-titulo">Detalles</summary>
                    <dl class="detalle__datos">
                        <dt>Marca</dt><dd>${producto.marca}</dd>
                        <dt>Categoría</dt><dd>${CATEGORIAS[producto.categoria] ?? producto.categoria}</dd>
                        <dt>Género</dt><dd>${GENEROS[producto.genero] ?? producto.genero}</dd>
                        ${tallas.length ? `<dt>Tallas</dt><dd>${tallas.join(', ')}</dd>` : ''}
                    </dl>
                </details>
            </div>
        </div>
    </section>
    `;
}


/* ----------------------------------------------------------
   COMPORTAMIENTO (se ejecuta DESPUÉS de pintar el HTML)
   ---------------------------------------------------------- */
function initDetalle(contenedor, producto) {
    const imagenPrincipal = contenedor.querySelector('.detalle__imagen');
    const miniaturas = contenedor.querySelectorAll('.detalle__miniatura');
    const tallaElegida = contenedor.querySelector('.detalle__talla-elegida');
    const cantidad = contenedor.querySelector('.detalle__cantidad-valor');
    const agregar = contenedor.querySelector('.detalle__agregar');
    const textoAgregar = contenedor.querySelector('.detalle__agregar-texto');

    // Cantidad válida: entero entre 1 y el máximo
    const leerCantidad = () => {
        const n = Math.floor(Number(cantidad.value));
        return Number.isFinite(n) ? Math.min(Math.max(n, 1), CANTIDAD_MAX) : 1;
    };

    // Texto del botón: "Añadir al carrito - $1,299.00" (precio × cantidad)
    const pintarBoton = () => {
        textoAgregar.textContent = producto.agotado
            ? 'Agotado'
            : `Añadir al carrito - ${formatoPrecio.format(producto.precio * leerCantidad())}`;
    };

    // Clic en una miniatura: cambia la foto principal
    miniaturas.forEach((mini) => {
        mini.addEventListener('click', () => {
            imagenPrincipal.src = mini.dataset.src;

            miniaturas.forEach((m) => {
                const activa = m === mini;
                m.classList.toggle('detalle__miniatura--activa', activa);
                m.setAttribute('aria-current', activa);
            });
        });
    });

    // Cambio de talla: actualiza el texto "Talla: 9"
    contenedor.addEventListener('change', (e) => {
        if (e.target.name === 'talla') tallaElegida.textContent = e.target.value;
    });

    // Botones − y +
    contenedor.querySelectorAll('.detalle__cantidad-boton').forEach((boton) => {
        boton.addEventListener('click', () => {
            const cambio = boton.dataset.accion === 'mas' ? 1 : -1;
            cantidad.value = Math.min(Math.max(leerCantidad() + cambio, 1), CANTIDAD_MAX);
            pintarBoton();
        });
    });

    // Si escribe a mano, se corrige al salir del campo
    cantidad.addEventListener('input', pintarBoton);
    cantidad.addEventListener('change', () => {
        cantidad.value = leerCantidad();
        pintarBoton();
    });

    // Añadir al carrito: avisa con un evento y el carrito (carrito.js) lo recibe.
    // Así este componente no necesita importar nada del carrito.
    agregar.addEventListener('click', () => {
        if (producto.agotado) return;

        document.dispatchEvent(new CustomEvent('carrito:agregar', {
            detail: {
                id: producto.id,
                marca: producto.marca,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagenes?.[0] ?? '',
                talla: contenedor.querySelector('input[name="talla"]:checked')?.value ?? null,
                cantidad: leerCantidad(),
            },
        }));

        agregar.classList.add('detalle__agregar--listo');
        textoAgregar.textContent = 'Agregado ✓';

        setTimeout(() => {
            agregar.classList.remove('detalle__agregar--listo');
            pintarBoton();
        }, 1500);
    });

    // Estado inicial
    pintarBoton();
}


/* ----------------------------------------------------------
   FUNCIÓN PÚBLICA
   ---------------------------------------------------------- */
export async function renderProductDetail(selector) {
    // 1. Busca el contenedor del HTML (si no existe, no hace nada)
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;

    // 2. Lee el id de la URL y busca ese producto en el JSON
    const id = leerId();
    const productos = await cargarProductos(RUTA_PRODUCTOS);
    const producto = id ? productos.find((p) => p.id === id) : null;

    // 3. Si no existe, muestra el aviso
    if (!producto) {
        contenedor.innerHTML = plantillaVacia();
        document.title = 'Producto no encontrado | Kilómetro Cero';
        return;
    }

    // 4. Pinta el producto, actualiza el título de la pestaña y activa el comportamiento
    contenedor.innerHTML = plantilla(producto);
    document.title = `${producto.nombre} | Kilómetro Cero`;
    initDetalle(contenedor, producto);
}