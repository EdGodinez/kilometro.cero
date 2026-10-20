/* ==========================================================
   carrito.js
   Barra lateral del carrito: botón, pedido y lógica.

   Lo que hay dentro:
   - renderCarrito()      -> el HTML del carrito
   - initCarritoLogica()  -> abrir/cerrar, productos, cantidades y total

   Cómo recibe productos:
   cualquier página avisa con un evento y el carrito lo escucha,
   así no hay que importar este archivo desde otros componentes:

       document.dispatchEvent(new CustomEvent('carrito:agregar', {
           detail: { id, marca, nombre, precio, imagen, talla, cantidad }
       }));

   Los productos se guardan en localStorage, así que el carrito
   se conserva al cambiar de página o recargar.

   Cada usuario con sesión tiene su propio carrito. Si alguien agrega
   productos sin haber iniciado sesión, al entrar se pasan a su carrito.
   La sesión se lee con getSession() de auth.js.
   ========================================================== */

import { getSession } from '../auth.js';


/* ----------------------------------------------------------
   CONFIGURACIÓN
   ---------------------------------------------------------- */

// Cada persona tiene su propio carrito en localStorage:
//   - Sin sesión (invitado):  "kmcero-carrito"
//   - Con sesión:             "kmcero-carrito:<id del usuario>"
const CLAVE_INVITADO = 'kmcero-carrito';
const CLAVE_SESION = 'kilometroCero_session'; // la guarda auth.js
const CANTIDAD_MAX = 10;

const formatoPrecio = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
});


/* ----------------------------------------------------------
   ESTADO (los productos del pedido)
   ---------------------------------------------------------- */

// Un producto en otra talla es otra línea del pedido, por eso la clave lleva la talla
const claveDe = (id, talla) => `${id}|${talla ?? ''}`;

// Los textos de localStorage pueden faltar o estar dañados: todo va con try/catch.
function leer(clave) {
    try {
        const datos = JSON.parse(localStorage.getItem(clave));
        return Array.isArray(datos) ? datos : [];
    } catch {
        return [];
    }
}

function escribir(clave, lista) {
    try {
        localStorage.setItem(clave, JSON.stringify(lista));
    } catch {
        // sin almacenamiento: el carrito funciona, pero no se conserva
    }
}

// Clave del carrito de quien tiene la sesión abierta ahora mismo
function claveActual() {
    const sesion = getSession();
    return sesion ? `${CLAVE_INVITADO}:${sesion.id}` : CLAVE_INVITADO;
}

// Junta dos listas: si el mismo producto (misma talla) está en ambas, suma cantidades
function fusionar(base, extra) {
    const resultado = base.map((i) => ({ ...i }));

    extra.forEach((nuevo) => {
        const existente = resultado.find((i) => claveDe(i.id, i.talla) === claveDe(nuevo.id, nuevo.talla));

        if (existente) existente.cantidad = limitar(existente.cantidad + nuevo.cantidad);
        else resultado.push({ ...nuevo });
    });

    return resultado;
}

// Carga el pedido de quien está en la página.
// Si acaba de iniciar sesión y traía productos como invitado, se pasan a su carrito.
function cargarItems() {
    const sesion = getSession();
    if (!sesion) return leer(CLAVE_INVITADO);

    const clave = claveActual();
    const delInvitado = leer(CLAVE_INVITADO);
    let propios = leer(clave);

    if (delInvitado.length) {
        propios = fusionar(propios, delInvitado);
        escribir(clave, propios);
        try {
            localStorage.removeItem(CLAVE_INVITADO);
        } catch {
            // ignorar
        }
    }

    return propios;
}

function guardar() {
    escribir(claveActual(), items);
}

// Los productos del pedido. Se cargan en initCarritoLogica().
let items = [];


/* ----------------------------------------------------------
   UTILIDADES
   ---------------------------------------------------------- */

// Evita que un texto con comillas o < > rompa el HTML
function escapar(texto) {
    return String(texto ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

const limitar = (n) => Math.min(Math.max(Math.floor(Number(n)) || 1, 1), CANTIDAD_MAX);


/* ----------------------------------------------------------
   PLANTILLAS HTML
   ---------------------------------------------------------- */

// Exportamos la función que renderiza el HTML del carrito
export function renderCarrito() {
    return `
        <!-- Botón que activa el carrito -->
        <button id="btn-abrir-carrito" class="btn-carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icono-bolsa">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
        </button>

        <!-- Overlay (fondo oscuro semi-transparente) -->
        <div id="overlay-carrito" class="overlay-carrito"></div>

        <!-- Barra Lateral del Carrito -->
        <div id="barra-carrito" class="barra-carrito">
            <div class="carrito-header">
                <button id="btn-cerrar-carrito" class="btn-cerrar">
                    &#10094; Continuar la compra
                </button>
            </div>

            <div class="carrito-body">
                <h3>PEDIDO</h3>
                <div id="contenedor-items" class="contenedor-items">
                    <p class="mensaje-vacio">Su carrito actualmente está vacío.</p>
                </div>
            </div>

            <div class="carrito-footer">
                <button id="btn-finalizar" class="btn-finalizar">Finalizar pedido</button>
                <div class="metodos-pago">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" title="PayPal">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" title="Mastercard">
                </div>
            </div>
        </div>
    `;
}

// HTML de un producto dentro del pedido
function plantillaItem(item) {
    const clave = escapar(claveDe(item.id, item.talla));

    return `
        <article class="carrito-item" data-clave="${clave}">
            <img class="carrito-item__imagen" src="${escapar(item.imagen)}" alt="${escapar(item.nombre)}">

            <div class="carrito-item__info">
                <p class="carrito-item__marca">${escapar(item.marca)}</p>
                <a class="carrito-item__nombre" href="producto.html?id=${encodeURIComponent(item.id)}">${escapar(item.nombre)}</a>
                ${item.talla ? `<p class="carrito-item__talla">Talla: ${escapar(item.talla)}</p>` : ''}

                <div class="carrito-item__cantidad">
                    <button type="button" data-accion="menos" data-clave="${clave}" aria-label="Disminuir cantidad">−</button>
                    <span aria-live="polite">${item.cantidad}</span>
                    <button type="button" data-accion="mas" data-clave="${clave}" aria-label="Aumentar cantidad">+</button>
                </div>
            </div>

            <div class="carrito-item__derecha">
                <p class="carrito-item__precio">${formatoPrecio.format(item.precio * item.cantidad)}</p>
                <button class="carrito-item__quitar" type="button" data-accion="quitar" data-clave="${clave}" aria-label="Quitar del pedido">✕</button>
            </div>
        </article>
    `;
}


/* ----------------------------------------------------------
   LÓGICA
   Se ejecuta DESPUÉS de pintar el HTML del carrito.
   ---------------------------------------------------------- */

// Guarda el escuchador de "carrito:agregar" para quitarlo si esta función
// se vuelve a llamar (así el producto nunca se agrega dos veces)
let alAgregar = null;

// Exportamos la función que maneja la lógica
export function initCarritoLogica() {
    const btnAbrir = document.getElementById('btn-abrir-carrito');
    const btnCerrar = document.getElementById('btn-cerrar-carrito');
    const barraCarrito = document.getElementById('barra-carrito');
    const overlay = document.getElementById('overlay-carrito');
    const contenedor = document.getElementById('contenedor-items');
    const btnFinalizar = document.getElementById('btn-finalizar');

    // Verificamos que los elementos existan antes de agregar eventos
    if (!(btnAbrir && btnCerrar && barraCarrito && overlay && contenedor)) return;

    /* ---------- Abrir y cerrar ---------- */
    const abrirCarrito = () => {
        barraCarrito.classList.add('abierto');
        overlay.classList.add('activo');
        document.body.style.overflow = 'hidden';
    };

    const cerrarCarrito = () => {
        barraCarrito.classList.remove('abierto');
        overlay.classList.remove('activo');
        document.body.style.overflow = '';
    };

    btnAbrir.addEventListener('click', abrirCarrito);
    btnCerrar.addEventListener('click', cerrarCarrito);
    overlay.addEventListener('click', cerrarCarrito);

    /* ---------- Elementos que se crean aquí ---------- */

    // Número de piezas sobre el ícono de la bolsa
    const contador = document.createElement('span');
    contador.className = 'btn-carrito__contador';
    contador.hidden = true;
    btnAbrir.appendChild(contador);

    // Línea "Total" justo arriba del botón "Finalizar pedido"
    const total = document.createElement('div');
    total.className = 'carrito-total';
    total.hidden = true;
    total.innerHTML = '<span>Total</span><strong class="carrito-total__valor"></strong>';
    btnFinalizar?.before(total);
    const totalValor = total.querySelector('.carrito-total__valor');

    /* ---------- Pintar el pedido ---------- */
    const pintar = () => {
        const piezas = items.reduce((suma, i) => suma + i.cantidad, 0);
        const importe = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0);

        contenedor.innerHTML = items.length
            ? items.map(plantillaItem).join('')
            : '<p class="mensaje-vacio">Su carrito actualmente está vacío.</p>';

        contador.textContent = piezas;
        contador.hidden = piezas === 0;
        btnAbrir.setAttribute('aria-label', `Carrito, ${piezas} ${piezas === 1 ? 'producto' : 'productos'}`);

        total.hidden = items.length === 0;
        totalValor.textContent = formatoPrecio.format(importe);

        if (btnFinalizar) btnFinalizar.disabled = items.length === 0;
    };

    /* ---------- Botones de cada producto (− + ✕) ---------- */
    contenedor.addEventListener('click', (e) => {
        const boton = e.target.closest('[data-accion]');
        if (!boton) return;

        const indice = items.findIndex((i) => claveDe(i.id, i.talla) === boton.dataset.clave);
        if (indice === -1) return;

        const { accion } = boton.dataset;

        if (accion === 'quitar') items.splice(indice, 1);
        if (accion === 'mas') items[indice].cantidad = limitar(items[indice].cantidad + 1);
        if (accion === 'menos') {
            // Con 1 pieza, el "−" quita el producto
            if (items[indice].cantidad <= 1) items.splice(indice, 1);
            else items[indice].cantidad -= 1;
        }

        guardar();
        pintar();
    });

    /* ---------- Producto nuevo (viene de la página de producto) ---------- */
    if (alAgregar) document.removeEventListener('carrito:agregar', alAgregar);

    alAgregar = (e) => {
        const { id, marca, nombre, precio, imagen, talla = null, cantidad = 1 } = e.detail ?? {};
        if (id === undefined || !Number.isFinite(Number(precio))) return;

        const existente = items.find((i) => claveDe(i.id, i.talla) === claveDe(id, talla));

        if (existente) {
            existente.cantidad = limitar(existente.cantidad + cantidad);
        } else {
            items.push({ id, marca, nombre, precio: Number(precio), imagen, talla, cantidad: limitar(cantidad) });
        }

        guardar();
        pintar();
        abrirCarrito(); // enseña el pedido al instante
    };

    document.addEventListener('carrito:agregar', alAgregar);

    // Cambios hechos en OTRA pestaña del navegador:
    // - Iniciar o cerrar sesión: recarga esta pestaña para mostrar el carrito correcto.
    // - Cambió el carrito de esta misma persona: se vuelve a leer y a pintar.
    window.addEventListener('storage', (e) => {
        if (e.key === CLAVE_SESION) {
            window.location.reload();
        } else if (e.key === claveActual()) {
            items = leer(claveActual());
            pintar();
        }
    });

    // Estado inicial: el carrito de quien está en la página
    items = cargarItems();
    pintar();
}