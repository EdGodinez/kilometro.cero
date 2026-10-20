
/* ==========================================
   KILÓMETRO CERO - AUTENTICACIÓN
   ========================================== */

// Usuario de demostración
const demoUser = {
    id: 1,
    nombre: "Eduardo",
    email: "eduardo@godinez.com",
    password: "12345"
};

// Obtener elementos del formulario
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

// Escuchar el envío del formulario

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email")
            .value.trim().toLowerCase();

        const password = document.getElementById("password").value;

        let user = null;

        // Cuenta de demostración original
        if (
            email === demoUser.email &&
            password === demoUser.password
        ) {
            user = demoUser;
        } else {
            // Buscar usuarios registrados en LocalStorage
            const users = getUsers();
            const passwordHash = await hashPassword(password);

            user = users.find(
                account =>
                    account.email === email &&
                    account.passwordHash === passwordHash
            );
        }

        if (user) {
            // Guardar únicamente información pública
            const session = {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            };

            localStorage.setItem(
                "kilometroCero_session",
                JSON.stringify(session)
            );

            window.location.href = "./index.html";

        } else {
            loginMessage.textContent =
                "Correo electrónico o contraseña incorrectos.";

            loginMessage.className = "error";
        }
    });
}



/* ==========================================
   GESTIÓN DE SESIÓN
   ========================================== */

// Obtener la sesión almacenada
export function getSession() {
    const data = localStorage.getItem("kilometroCero_session");

    if (!data) return null;

    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
}

// Comprobar si existe una sesión activa
export function isAuthenticated() {
    return getSession() !== null;
}

// Cerrar sesión
export function logout() {
    localStorage.removeItem("kilometroCero_session");
    window.location.href = "./index.html";
}


/* ==========================================
   REGISTRO DE USUARIOS
   ========================================== */

// Obtener usuarios registrados
function getUsers() {
    try {
        return JSON.parse(
            localStorage.getItem("kilometroCero_users") || "[]"
        );
    } catch {
        return [];
    }
}

// Generar hash de la contraseña de demostración
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

// Registrar un nuevo usuario
async function registerUser(name, email, password) {
    const users = getUsers();

    const normalizedEmail = email.trim().toLowerCase();

    // Comprobar que el correo no esté registrado
    const exists = users.some(
        user => user.email === normalizedEmail
    );

    if (exists || normalizedEmail === demoUser.email) {
        throw new Error("Este correo ya está registrado.");
    }

    const newUser = {
        id: crypto.randomUUID(),
        nombre: name.trim(),
        email: normalizedEmail,
        passwordHash: await hashPassword(password)
    };

    users.push(newUser);

    localStorage.setItem(
        "kilometroCero_users",
        JSON.stringify(users)
    );

    return newUser;
}

/* ==========================================
   EVENTOS DEL FORMULARIO DE REGISTRO
   ========================================== */

const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById(
            "register-confirm-password"
        ).value;

        if (!name || !email || !password) {
            registerMessage.textContent = "Completa todos los campos.";
            registerMessage.className = "error";
            return;
        }

        if (password !== confirmPassword) {
            registerMessage.textContent = "Las contraseñas no coinciden.";
            registerMessage.className = "error";
            return;
        }

        if (password.length < 8) {
            registerMessage.textContent =
                "La contraseña debe tener al menos 8 caracteres.";
            registerMessage.className = "error";
            return;
        }

        try {
            await registerUser(name, email, password);

            registerMessage.textContent =
                "¡Cuenta registrada correctamente!";
            registerMessage.className = "success";

            registerForm.reset();

            // Navegar al inicio de sesión
            window.location.href = "./login.html";

        } catch (error) {
            registerMessage.textContent = error.message;
            registerMessage.className = "error";
        }
    });
}


/* ==========================================
   REDIRECCIÓN DE USUARIOS AUTENTICADOS
   ========================================== */

function redirectAuthenticatedUser() {
    // Obtener la sesión actual
    const session = getSession();

    // Identificar la página actual
    const currentPage = window.location.pathname
        .split("/")
        .pop();

    // Páginas exclusivas para visitantes
    const guestPages = ["login.html", "register.html"];

    // Redirigir cuando ya existe una sesión
    if (session && guestPages.includes(currentPage)) {
        window.location.replace("./index.html");
    }
}

// Comprobar al cargar el módulo
redirectAuthenticatedUser();



