// Esta funcion regresa el HTML de la pagina de contacto
export function renderContact() {
    return `
    <section class="contact-page">

        <!-- Parte de arriba con la foto -->
        <div class="contact-hero">
            <div class="contact-hero-content">
                <p class="contact-kicker">CONTACTO</p>
                <h1 class="contact-title">HABLEMOS.</h1>
                <p class="contact-subtitle">¿Dudas sobre tallas, envíos o tu próximo par? Escríbenos y te respondemos.</p>
            </div>
        </div>

        <!-- Aqui van las 2 columnas: formulario y datos de contacto -->
        <div class="contact-container">

            <!-- Columna 1: formulario -->
            <div class="contact-form-col">
                <h2 class="contact-heading">ENVÍANOS UN MENSAJE</h2>

                <form class="contact-form" id="contact-form">

                    <div class="contact-row">
                        <div class="contact-field">
                            <label for="contact-nombre" class="contact-label">NOMBRE</label>
                            <input type="text" id="contact-nombre" class="contact-input" placeholder="Tu nombre" required>
                        </div>
                        <div class="contact-field">
                            <label for="contact-correo" class="contact-label">CORREO</label>
                            <input type="email" id="contact-correo" class="contact-input" placeholder="correo@email.com" required>
                        </div>
                    </div>

                    <div class="contact-field">
                        <label for="contact-asunto" class="contact-label">ASUNTO</label>
                        <select id="contact-asunto" class="contact-input">
                            <option>Pedido o envío</option>
                            <option>Tallas y producto</option>
                            <option>Cambios y devoluciones</option>
                            <option>Colaboraciones</option>
                            <option>Otro</option>
                        </select>
                    </div>

                    <div class="contact-field">
                        <label for="contact-mensaje" class="contact-label">MENSAJE</label>
                        <textarea id="contact-mensaje" class="contact-input contact-textarea" rows="6" placeholder="Cuéntanos en qué podemos ayudarte" required></textarea>
                    </div>

                    <button type="submit" class="contact-btn">Enviar mensaje &rarr;</button>
                    <p class="contact-status" id="contact-status"></p>
                </form>
            </div>

            <!-- Columna 2: datos de contacto -->
            <div class="contact-info-col">

                <div class="contact-card">
                    <span class="contact-card-label">Correo:</span>
                    <span class="contact-card-value">[correo@km0.com]</span>
                </div>

                <div class="contact-card">
                    <span class="contact-card-label">WhatsApp:</span>
                    <span class="contact-card-value">[+52 44 1234 5678]</span>
                </div>

                <div class="contact-card">
                    <span class="contact-card-label">Horario dea atención:</span>
                    <span class="contact-card-value">[Lun a Vie · 09:00 – 19:00]</span>
                </div>

                <div class="contact-social">
                    <a href="#instagram" class="contact-social-btn">INSTAGRAM &rarr;</a>
                    <a href="#strava" class="contact-social-btn">STRAVA &rarr;</a>
                    <a href="#spotify" class="contact-social-btn">SPOTIFY &rarr;</a>
                </div>

            </div>
        </div>
    </section>
    `;
}

// Esta funcion hace que el formulario funcione.
// Se llama despues de poner el HTML en la pagina.
export function initContact() {
    const form = document.getElementById('contact-form');
    const mensaje = document.getElementById('contact-status');

    form.addEventListener('submit', function (event) {
        // evita que la pagina se recargue
        event.preventDefault();

        // muestra un mensaje de gracias
        mensaje.textContent = '¡Gracias! Recibimos tu mensaje.';

        // limpia el formulario
        form.reset();
    });
}