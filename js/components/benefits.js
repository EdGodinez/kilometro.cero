// =================================================================
// COMPONENTE: SECCIÓN DE BENEFICIOS (PRE-FOOTER)
// Este archivo genera el bloque que muestra las ventajas de la tienda
// (envíos, cambios, comunidad y calidad) antes del pie de página.
// =================================================================

// 'export function' nos permite exportar esta función para usarla en main.js
export function renderBenefits() {
  
  // La función 'return' devuelve un bloque de texto HTML delimitado por comillas invertidas (```)
  return `
    <!-- 'section' delimita la sección completa de beneficios en la página -->
    <section class="benefits-section">
      
      <!-- 'benefits-container' sirve para centrar la sección y darle un ancho máximo proporcional -->
      <div class="benefits-container">
        
        <!-- 'benefits-grid' crea la cuadrícula CSS para acomodar las 4 tarjetas en filas/columnas -->
        <div class="benefits-grid">
          
          <!-- ==========================================
               BENEFICIO 1: ENVÍO RÁPIDO Y SEGURO
               ========================================== -->
          <article class="benefit-card">
            
            <!-- Contenedor del icono SVG -->
            <div class="benefit-icon">
              <!-- 'svg' es un gráfico vectorial que no pierde calidad al cambiar de tamaño -->
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px; max-width: 28px; max-height: 28px;">
                <!-- Dibuja la caja/cabina del camión de entregas -->
                <rect x="1" y="3" width="15" height="13"></rect>
                <!-- Dibuja el frente del camión -->
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <!-- Dibuja las dos ruedas del camión -->
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            
            <!-- Título corto del primer beneficio -->
            <h3 class="benefit-title">ENVÍO RÁPIDO Y SEGURO</h3>
            <!-- Texto explicativo -->
            <p class="benefit-description">Recibe tu pedido sin complicaciones.</p>
          </article>

          <!-- ==========================================
               BENEFICIO 2: COMPRA CON CONFIANZA
               ========================================== -->
          <article class="benefit-card">
            
            <div class="benefit-icon">
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px; max-width: 28px; max-height: 28px;">
                <!-- Dibuja una flecha circular representando cambios y devoluciones -->
                <path d="M21.5 2v6h-6"></path>
                <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
              </svg>
            </div>
            
            <h3 class="benefit-title">COMPRA CON CONFIANZA</h3>
            <p class="benefit-description">Si necesitas otra talla o ajuste, te ayudamos a resolverlo.</p>
          </article>

          <!-- ==========================================
               BENEFICIO 3: MÁS QUE UNA TIENDA (COMUNIDAD)
               ========================================== -->
          <article class="benefit-card">
            
            <div class="benefit-icon">
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px; max-width: 28px; max-height: 28px;">
                <!-- Dibuja un icono de calzado o grupo running -->
                <path d="M4 16v-2.38C4 11.5 2.97 8.98 3 6c0-.55.45-1 1-1h2.5c1.24 0 2.36.64 3 1.7L12 11l2.5-4.3A3.5 3.5 0 0 1 17.5 5H20c.55 0 1 .45 1 1 .03 2.98-1 5.5-1 7.62V16"></path>
                <!-- Dibuja la suela/piso -->
                <path d="M2 20h20"></path>
              </svg>
            </div>
            
            <h3 class="benefit-title">MÁS QUE UNA TIENDA</h3>
            <p class="benefit-description">Productos seleccionados por corredores para corredores.</p>
          </article>

          <!-- ==========================================
               BENEFICIO 4: SELECCIÓN CURADA (CALIDAD)
               ========================================== -->
          <article class="benefit-card">
            
            <div class="benefit-icon">
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px; max-width: 28px; max-height: 28px;">
                <!-- Dibuja una medalla/insignia de calidad garantizada -->
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