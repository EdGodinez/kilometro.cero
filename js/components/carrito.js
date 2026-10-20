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
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/MercadoLibre_icono.svg" alt="Mercado Libre" title="Mercado Libre">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" title="PayPal">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" title="Mastercard">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/300px-Visa_Inc._logo.svg.png" alt="Visa" title="Visa">
                </div>
            </div>
        </div>
    `;
}

// Exportamos la función que maneja la lógica (abrir/cerrar)
export function initCarritoLogica() {
    const btnAbrir = document.getElementById('btn-abrir-carrito');
    const btnCerrar = document.getElementById('btn-cerrar-carrito');
    const barraCarrito = document.getElementById('barra-carrito');
    const overlay = document.getElementById('overlay-carrito');

    // Verificamos que los elementos existan antes de agregar eventos
    if (btnAbrir && btnCerrar && barraCarrito && overlay) {
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
    }
}