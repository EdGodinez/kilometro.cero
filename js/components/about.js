
/* ==========================================
   ABOUT - KILÓMETRO CERO
   ========================================== */

export function renderAbout() {
  return `
    <section class="about" aria-labelledby="about-title">

      <!-- Portada -->
      <div class="about-banner">
        <h1 class="about-banner-title" id="about-title">
          Sobre<br>nosotros
        </h1>
      </div>

      <!-- Presentación -->
      <div class="about-content">

        <div class="about-description">
          <h2>De aquí parten más metas</h2>

          <p>
            Kilómetro Cero es un e-commerce especializado
            en running, donde el calzado, la ropa y los
            accesorios se unen para acompañarte en cada
            etapa de tu camino.
          </p>

          <p>
            Creemos en el poder de correr para transformar
            vidas, y por eso seleccionamos productos que
            combinan rendimiento, comodidad y estilo,
            pensados para corredores reales, como tú.
          </p>
        </div>

        <!-- Categorías -->
        <div class="about-categories">

          <div class="about-category">
            <div class="about-category-icon">
              <i class="bx bx-run"></i>
            </div>

            <div class="about-category-text">
              <h3>Calzado</h3>
              <p>RENDIMIENTO EN CADA PASO</p>
            </div>
          </div>

          <div class="about-category">
            <div class="about-category-icon">
              <i class="bx bx-closet"></i>
            </div>

            <div class="about-category-text">
              <h3>Ropa</h3>
              <p>COMODIDAD EN MOVIMIENTO</p>
            </div>
          </div>

          <div class="about-category">
            <div class="about-category-icon">
                <i class="bx bx-cool"></i>
            </div>

            <div class="about-category-text">
              <h3>Accesorios</h3>
              <p>DETALLES QUE TE IMPULSAN</p>
            </div>
          </div>

        </div>
      </div>

      <!-- Misión y visión -->
      <div class="about-values">

        <article class="about-value-card">
          <div class="about-value-icon">
            <i class="bx bx-run"></i>
          </div>

          <div class="about-value-text">
            <h3>Misión</h3>
            <p>
              Facilitar el acceso a productos de running
              que combinen rendimiento, comodidad y estilo,
              para que más personas puedan disfrutar de
              correr y alcanzar sus metas, sin importar
              su nivel.
            </p>
          </div>
        </article>

        <article class="about-value-card">
          <div class="about-value-icon">
            <i class="bx bx-group"></i>
          </div>

          <div class="about-value-text">
            <h3>Visión</h3>
            <p>
              Ser la tienda online de running referente
              en Latinoamérica, reconocida por nuestra
              selección de productos, nuestra comunidad
              y por inspirar a más personas a vivir una
              vida activa, saludable y con propósito.
            </p>
          </div>
        </article>

      </div>

    </section>
  `;
}
