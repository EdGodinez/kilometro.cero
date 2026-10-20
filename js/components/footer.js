export function renderFooter() {
    return `
        <div class="footer-container">

            <!--- Columna 1 - marca y esecenia --->
            <div class="footer-col brand-col">
                <a href="/" class="footer-logo">KM<span class="accent-dot">.</span>0</a>
                <p class="brand-desc">Toda gran carrera comienza en el Kilómetro Cero.</p>
                <div class="social-links">
                    <a href="#instagram" aria-label="Instagram">INSTAGRAM</a>
                    <a href="#strava" aria-label="Strava">STRAVA</a>
                    <a href="#spotify" aria-label="Spotify">SPOTIFY</a>
                </div>
            </div>

            <!-- columna 2 hombres -->
            <div class="footer-col nav-col">
                <h4 class="footer-heading">PARA ÉL</h4>
                <ul class="footer-list">
                    <li><a href="productos.html?genero=hombre&cat=calzado" class="footer-link">Calzado</a></li>
                    <li><a href="productos.html?genero=hombre&cat=ropa" class="footer-link">Ropa</a></li>
                    <li><a href="productos.html?genero=hombre&cat=accesorios" class="footer-link">Accesorios</a></li>
                </ul>
            </div>

            <!-- columna 3 mujeres -->
            <div class="footer-col nav-col">
                <h4 class="footer-heading">PARA ELLA</h4>
                <ul class="footer-list">
                    <li><a href="productos.html?genero=mujer&cat=calzado" class="footer-link">Calzado</a></li>
                    <li><a href="productos.html?genero=mujer&cat=ropa" class="footer-link">Ropa</a></li>
                    <li><a href="productos.html?genero=mujer&cat=accesorios" class="footer-link">Accesorios</a></li>
                </ul>
            </div>

            <!-- columna 4 comunidad -->
            <div class="footer-col newsletter-col">
                <h4 class="footer-heading">ÚNETE AL CLUB</h4>
                <p class="newsletter-desc">Recibe lanzamientos exclusivos, nuevos estilos y acceso anticipado.</p>
                <form class="newsletter-form" onsubmit="event.preventDefault();">
                    <input type="email" placeholder="corredor@km0.com" required class="newsletter-input">
                    <button type="submit" class="newsletter-btn">&rarr;</button>
                </form>
            </div>

        </div>

        <!-- Copyright inferior -->
        <div class="footer-bottom">
            <p>&copy; 2026 KM.0 Running Co. Todos los derechos reservados.</p>
        </div>
    `;
}