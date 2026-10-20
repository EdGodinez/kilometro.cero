
/* ==========================================
   HERO - KILÓMETRO CERO
   ========================================== */

export function renderHero() {
  return `
    <section class="hero" aria-labelledby="hero-title">

      <div class="hero-overlay"></div>

      <div class="hero-content">

        <p class="hero-kicker">
          TODA GRAN CARRERA<br>
          COMIENZA EN EL
        </p>

        <h1 class="hero-title" id="hero-title">
          KILÓMETRO<br>CERO.
        </h1>

        <p class="hero-subtitle">
          Encuentra tu estilo para el nuevo año
        </p>

        <div class="hero-buttons">
          <a href="#hombre" class="hero-btn">
            Para él <span aria-hidden="true">→</span>
          </a>

          <a href="#mujer" class="hero-btn">
            Para ella <span aria-hidden="true">→</span>
          </a>
        </div>

      </div>

      <div class="hero-scroll" aria-hidden="true">
        SCROLL TO EXPLORE
      </div>

    </section>
  `;
}
