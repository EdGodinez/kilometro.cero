// Esta función regresa el HTML de la sección de beneficios (pre-footer)
export function renderBenefits() {
  return `
    <section class="benefits-section">
      <div class="benefits-container">
        <div class="benefits-grid">
          
          <!-- Beneficio 1: Envíos -->
          <article class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px; max-width: 28px; max-height: 28px;">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h3 class="benefit-title">ENVÍO RÁPIDO Y SEGURO</h3>
            <p class="benefit-description">Recibe tu pedido sin complicaciones.</p>
          </article>

          <!-- Beneficio 2: Confianza -->
          <article class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px; max-width: 28px; max-height: 28px;">
                <path d="M21.5 2v6h-6"></path>
                <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
              </svg>
            </div>
            <h3 class="benefit-title">COMPRA CON CONFIANZA</h3>
            <p class="benefit-description">Si necesitas otra talla o ajuste, te ayudamos a resolverlo.</p>
          </article>

          <!-- Beneficio 3: Comunidad -->
          <article class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px; max-width: 28px; max-height: 28px;">
                <path d="M4 16v-2.38C4 11.5 2.97 8.98 3 6c0-.55.45-1 1-1h2.5c1.24 0 2.36.64 3 1.7L12 11l2.5-4.3A3.5 3.5 0 0 1 17.5 5H20c.55 0 1 .45 1 1 .03 2.98-1 5.5-1 7.62V16"></path>
                <path d="M2 20h20"></path>
              </svg>
            </div>
            <h3 class="benefit-title">MÁS QUE UNA TIENDA</h3>
            <p class="benefit-description">Productos seleccionados por corredores para corredores.</p>
          </article>

          <!-- Beneficio 4: Curaduría -->
          <article class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px; max-width: 28px; max-height: 28px;">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
              </svg>
            </div>
            <h3 class="benefit-title">SELECCIÓN CURADA</h3>
            <p class="benefit-description">Marcas reconocidas por su calidad y rendimiento.</p>
          </article>

        </div>
      </div>
    </section>
  `;
}