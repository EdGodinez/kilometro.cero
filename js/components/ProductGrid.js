/* ==========================================================
   ProductGrid.js
   Plantilla para mostrar productos en cuadrícula:
   título con el género, menú de categorías, filtros laterales,
   ordenar y las cards de producto.

   Género y categoría se leen de la URL:
       productos.html?genero=hombre&categoria=calzado

   Se usa desde main.js así:
       renderProductGrid('#product-grid');
   ========================================================== */

import { cargarProductos, renderCard, RUTA_PRODUCTOS } from './CardSlider.js';


/* ----------------------------------------------------------
   CONFIGURACIÓN
   ---------------------------------------------------------- */

// Géneros válidos. La clave debe coincidir con "genero" del JSON.
// Lo que escribas en la URL y no esté aquí se ignora.
const GENEROS = {
    hombre: 'Hombre',
    mujer: 'Mujer',
};

// Imagen de fondo de la cabecera. La clave coincide con el género de la URL.
// Si el género no está aquí (o no hay género), se usa la de "defecto".
const IMAGENES_CABECERA = {
    hombre: 'https://images.unsplash.com/photo-1766970096320-c62c49517226?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    mujer: 'https://images.unsplash.com/photo-1602174865963-9159ed37e8f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    defecto: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=1700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
};

// Menú de abajo del título. "id" debe coincidir con "categoria" del JSON.
const CATEGORIAS = [
    { id: 'ropa', nombre: 'Ropa' },
    { id: 'calzado', nombre: 'Calzado' },
    { id: 'accesorios', nombre: 'Accesorios' },
];

// Opciones del selector. La primera es el orden original del JSON.
const ORDENES = [
    { id: 'destacados', nombre: 'Ordenar' },
    { id: 'precio-asc', nombre: 'Precio: menor a mayor' },
    { id: 'precio-desc', nombre: 'Precio: mayor a menor' },
    { id: 'nombre', nombre: 'Nombre: A a Z' },
];

// Orden de las tallas con letras (las numéricas se ordenan solas)
const ORDEN_TALLAS = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];


/* ----------------------------------------------------------
   UTILIDADES
   ---------------------------------------------------------- */

// Lee género y categoría de la URL. Si el valor no es válido, devuelve null.
function leerUrl() {
    const params = new URLSearchParams(window.location.search);
    const genero = params.get('genero');
    const categoria = params.get('categoria');

    return {
        genero: Object.keys(GENEROS).includes(genero) ? genero : null,
        categoria: CATEGORIAS.some((c) => c.id === categoria) ? categoria : null,
    };
}

// Arma el enlace de una categoría conservando el género.
// Es un enlace relativo ("?genero=..."), así sirve en cualquier página.
function hrefCategoria(genero, categoria) {
    const params = new URLSearchParams();
    if (genero) params.set('genero', genero);
    if (categoria) params.set('categoria', categoria);
    return `?${params.toString()}`;
}

// Ordena tallas: primero las numéricas (26, 27.5), luego las de letras (S, M, L)
function compararTallas(a, b) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const aEsNumero = !Number.isNaN(numA);
    const bEsNumero = !Number.isNaN(numB);

    if (aEsNumero && bEsNumero) return numA - numB;
    if (aEsNumero) return -1;
    if (bEsNumero) return 1;
    return ORDEN_TALLAS.indexOf(a) - ORDEN_TALLAS.indexOf(b);
}

// Ordena una lista de productos según la opción elegida (modifica la lista)
function ordenar(lista, orden) {
    if (orden === 'precio-asc') lista.sort((a, b) => a.precio - b.precio);
    if (orden === 'precio-desc') lista.sort((a, b) => b.precio - a.precio);
    if (orden === 'nombre') lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return lista;
}

// Agrega o quita un valor de un Set según si el checkbox está marcado
function alternar(conjunto, valor, marcado) {
    if (marcado) conjunto.add(valor);
    else conjunto.delete(valor);
}

// Convierte el texto de un input numérico en número (o null si está vacío)
function numero(valor) {
    return valor === '' ? null : Number(valor);
}


/* ----------------------------------------------------------
   PLANTILLA HTML
   La cuadrícula empieza vacía: las cards se pintan después
   y se vuelven a pintar cada vez que cambia un filtro.
   Los filtros se pintan una sola vez para no cerrarse solos.
   ---------------------------------------------------------- */
function plantilla({ genero, categoria, marcas, tallas }) {
    const titulo = GENEROS[genero] ?? 'Productos';
    const imagen = IMAGENES_CABECERA[genero] ?? IMAGENES_CABECERA.defecto;

    // Menú de categorías. Clic en la activa la quita y vuelve a ver todo.
    const menu = CATEGORIAS.map((c) => {
        const activa = c.id === categoria;
        const href = hrefCategoria(genero, activa ? null : c.id);

        return `<a class="productos__enlace ${activa ? 'productos__enlace--activo' : ''}"
                   href="${href}" ${activa ? 'aria-current="page"' : ''}>${c.nombre}</a>`;
    }).join('');

    // Selector de orden
    const opcionesOrden = ORDENES.map((o) => `<option value="${o.id}">${o.nombre}</option>`).join('');

    // Filtro de marca: checkboxes con las marcas que sí hay en esta vista
    const filtroMarca = marcas.length ? `
        <details class="filtro">
            <summary class="filtro__titulo">Marca</summary>
            <div class="filtro__contenido">
                ${marcas.map((m) => `
                    <label class="filtro__opcion">
                        <input type="checkbox" data-filtro="marca" value="${m}">
                        <span>${m}</span>
                    </label>
                `).join('')}
            </div>
        </details>
    ` : '';

    // Filtro de talla: botones con las tallas que sí hay en esta vista
    const filtroTalla = tallas.length ? `
        <details class="filtro">
            <summary class="filtro__titulo">Talla</summary>
            <div class="filtro__contenido filtro__contenido--fila">
                ${tallas.map((t) => `
                    <label class="filtro__talla">
                        <input type="checkbox" data-filtro="talla" value="${t}">
                        <span>${t}</span>
                    </label>
                `).join('')}
            </div>
        </details>
    ` : '';

    return `
    <section class="productos">
        <!-- Cabecera: título del género y menú de categorías.
             La imagen va directo en el style (no en una variable CSS),
             así la ruta se cuenta desde el HTML y no desde el archivo CSS. -->
        <div class="productos__cabecera" style="background-image: url('${imagen}')">
            <h1 class="productos__titulo">${titulo}</h1>
            <nav class="productos__menu" aria-label="Categorías">${menu}</nav>
        </div>

        <div class="productos__cuerpo max-container">
            <!-- Barra: cantidad de productos, botón de filtros (solo móvil) y orden -->
            <div class="productos__barra">
                <p class="productos__conteo" aria-live="polite"></p>

                <div class="productos__acciones">
                    <button class="productos__boton-filtros" type="button" aria-expanded="false" aria-controls="filtros">Filtros</button>

                    <select class="productos__orden" data-filtro="orden" aria-label="Ordenar productos">
                        ${opcionesOrden}
                    </select>
                </div>
            </div>

            <div class="productos__layout">
                <!-- Filtros laterales -->
                <aside class="productos__filtros" id="filtros">
                    <h2 class="productos__filtros-titulo">Filtros</h2>

                    ${filtroMarca}
                    ${filtroTalla}

                    <details class="filtro">
                        <summary class="filtro__titulo">Precio</summary>
                        <div class="filtro__contenido filtro__contenido--fila">
                            <input class="filtro__precio" type="number" min="0" inputmode="numeric"
                                   data-filtro="min" placeholder="Mín" aria-label="Precio mínimo">
                            <input class="filtro__precio" type="number" min="0" inputmode="numeric"
                                   data-filtro="max" placeholder="Máx" aria-label="Precio máximo">
                        </div>
                    </details>
                </aside>

                <!-- Aquí se pintan las cards -->
                <div class="productos__grid"></div>
            </div>
        </div>
    </section>
    `;
}


/* ----------------------------------------------------------
   FUNCIÓN PÚBLICA
   Es la que llama main.js.
   ---------------------------------------------------------- */
export async function renderProductGrid(selector) {
    // 1. Busca el contenedor del HTML (si no existe, no hace nada)
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;

    // 2. Lee género y categoría de la URL y descarga los productos
    const { genero, categoria } = leerUrl();
    const todos = await cargarProductos(RUTA_PRODUCTOS);

    // 3. Productos de esta vista. Los "unisex" salen en hombre y en mujer.
    const base = todos.filter((p) =>
        (!genero || p.genero === genero || p.genero === 'unisex') &&
        (!categoria || p.categoria === categoria)
    );

    // 4. Opciones de los filtros, sacadas de los productos de esta vista
    const marcas = [...new Set(base.map((p) => p.marca))].sort((a, b) => a.localeCompare(b));
    const tallas = [...new Set(base.flatMap((p) => p.tallas ?? []))].sort(compararTallas);

    // 5. Pinta la estructura y actualiza el título de la pestaña
    contenedor.innerHTML = plantilla({ genero, categoria, marcas, tallas });
    document.title = `${GENEROS[genero] ?? 'Productos'} | Kilómetro Cero`;

    const seccion = contenedor.querySelector('.productos');
    const grid = contenedor.querySelector('.productos__grid');
    const conteo = contenedor.querySelector('.productos__conteo');
    const botonFiltros = contenedor.querySelector('.productos__boton-filtros');

    // Estado actual de los filtros
    const estado = {
        marcas: new Set(),
        tallas: new Set(),
        min: null,
        max: null,
        orden: 'destacados',
    };

    // 6. Aplica los filtros y pinta el resultado.
    //    Un filtro vacío no filtra nada.
    const pintar = () => {
        const lista = base.filter((p) =>
            (estado.marcas.size === 0 || estado.marcas.has(p.marca)) &&
            (estado.tallas.size === 0 || p.tallas?.some((t) => estado.tallas.has(t))) &&
            (estado.min === null || p.precio >= estado.min) &&
            (estado.max === null || p.precio <= estado.max)
        );

        ordenar(lista, estado.orden);

        conteo.textContent = `${lista.length} ${lista.length === 1 ? 'producto' : 'productos'}`;
        grid.innerHTML = lista.length
            ? lista.map(renderCard).join('')
            : '<p class="productos__vacio">No encontramos productos con esos filtros.</p>';
    };

    // 7. Un solo escuchador para todos los filtros y el orden.
    //    "data-filtro" dice cuál cambió.
    contenedor.addEventListener('input', (e) => {
        const el = e.target;

        switch (el.dataset.filtro) {
            case 'marca': alternar(estado.marcas, el.value, el.checked); break;
            case 'talla': alternar(estado.tallas, el.value, el.checked); break;
            case 'min': estado.min = numero(el.value); break;
            case 'max': estado.max = numero(el.value); break;
            case 'orden': estado.orden = el.value; break;
            default: return;
        }

        pintar();
    });

    // 8. Botón "Filtros" (solo se ve en tablet y móvil): abre y cierra el panel
    botonFiltros.addEventListener('click', () => {
        const abierto = seccion.classList.toggle('productos--filtros-abiertos');
        botonFiltros.setAttribute('aria-expanded', abierto);
    });

    // 9. Estado inicial
    pintar();
}