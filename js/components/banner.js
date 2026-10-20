// =================================================================
// COMPONENTE: BANNER DE NOVEDADES
// Este archivo genera el contenido HTML del banner publicitario.
// =================================================================

// Exportamos la función 'renderBanner' para que main.js la pueda importar y mostrar.
export function renderBanner() {
  
  // Guardamos el enlace directo de la fotografía de iStock en una variable.
  const bgImage = 'https://media.istockphoto.com/id/1324617388/photo/rear-view-of-three-asian-runners-running-in-seaside-park.jpg?s=170667a&w=0&k=20&c=MbTbB9_aSeTfjv238zW5kdEGcshnbvhymR5weMDDHiY=';

  // Devolvemos la estructura HTML con el nuevo enfoque inclusivo y de novedades.
  return `
    <!-- 'banner-wrapper' limita el ancho horizontal para que el banner no toque las orillas de la pantalla -->
    <div class="banner-wrapper">
      
      <!-- 'banner-section' contiene la imagen de fondo con la capa oscura para resaltar los textos -->
      <section class="banner-section" style="background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url('${bgImage}');">
        
        <!-- Contenedor flex para alinear e integrar todo el contenido al centro -->
        <div class="banner-content">
          
          <!-- Insignia superior destacada en verde lima -->
          <span class="banner-badge">NUEVAS LLEGADAS</span>
          
          <!-- Título enfocado en la inclusión y comunidad -->
          <h1 class="banner-title">EL RUNNING ES PARA TODOS</h1>
          
          <!-- Subtítulo descriptivo de lanzamientos y novedades -->
          <p class="banner-subtitle">Descubre las últimas novedades en tecnología y diseño. Sin importar tu ritmo o meta, en Kilómetro Cero hay un espacio para ti.</p>
          
          <!-- Botones de navegación principal y secundaria -->
          <div class="banner-buttons">
            <!-- Botón verde lima direccionado a novedades -->
            <a href="productos.html?novedades=true" class="banner-btn banner-btn-primary">Ver Novedades ↗</a>
          </div>

        </div>
      </section>

    </div>
  `;
}