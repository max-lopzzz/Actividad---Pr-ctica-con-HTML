// script.js
// Parte 2: funcionalidad principal del sitio (login, registro, perfil, botones interactivos)
// Usa las funciones de api.js para comunicarse con la REST-API

// ---------- Login (index.html) -> POST /login ----------
function inicializarLogin() {
    const form = document.getElementById("login-form");
    if (!form) return;

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const mensaje = document.getElementById("login-mensaje");
        const boton = form.querySelector("button[type=submit]");

        if (!email || !password) {
            mostrarMensaje(mensaje, "Escribe tu correo y tu contraseña.", "warning");
            return;
        }

        boton.disabled = true;
        try {
            const datos = await apiFetch("/login", {
                method: "POST",
                body: { email, password },
            });
            guardarSesion(datos.user);
            mostrarMensaje(mensaje, "Inicio de sesión correcto. Redirigiendo...", "success");
            setTimeout(function () {
                window.location.href = "profile.html";
            }, 900);
        } catch (error) {
            mostrarMensaje(mensaje, error.message, "danger");
            boton.disabled = false;
        }
    });
}

// ---------- Registro (registro.html) -> POST /users ----------
function inicializarRegistro() {
    const form = document.getElementById("registro-form");
    if (!form) return;

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("reg-nombre").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value;
        const confirmar = document.getElementById("reg-confirmar").value;
        const mensaje = document.getElementById("registro-mensaje");
        const boton = form.querySelector("button[type=submit]");

        if (!nombre || !email || !password) {
            mostrarMensaje(mensaje, "Llena todos los campos.", "warning");
            return;
        }
        if (password !== confirmar) {
            mostrarMensaje(mensaje, "Las contraseñas no coinciden.", "warning");
            return;
        }

        boton.disabled = true;
        try {
            const usuario = await apiFetch("/users", {
                method: "POST",
                body: { nombre, email, password },
            });
            guardarSesion({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
            mostrarMensaje(mensaje, "Cuenta creada. Redirigiendo a tu perfil...", "success");
            setTimeout(function () {
                window.location.href = "profile.html";
            }, 900);
        } catch (error) {
            mostrarMensaje(mensaje, error.message, "danger");
            boton.disabled = false;
        }
    });
}

// ---------- Perfil (profile.html) -> GET / PUT / DELETE /users/:id ----------
async function inicializarPerfil() {
    const contenedor = document.getElementById("perfil-datos");
    if (!contenedor) return;

    const sesion = obtenerSesion();
    if (!sesion) {
        window.location.href = "index.html";
        return;
    }

    const mensaje = document.getElementById("perfil-mensaje");
    const form = document.getElementById("perfil-form");

    function pintarUsuario(usuario) {
        document.getElementById("perfil-nombre").textContent = usuario.nombre;
        document.getElementById("perfil-email").textContent = usuario.email;
        document.getElementById("perfil-fecha").textContent = new Date(usuario.created_at).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        document.getElementById("edit-nombre").value = usuario.nombre;
        document.getElementById("edit-email").value = usuario.email;
    }

    try {
        const usuario = await apiFetch("/users/" + sesion.id);
        pintarUsuario(usuario);
        contenedor.hidden = false;
    } catch (error) {
        mostrarMensaje(mensaje, error.message, "danger");
        if (error.message === "Usuario no encontrado") {
            cerrarSesion();
        }
        return;
    }

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const cambios = {
            nombre: document.getElementById("edit-nombre").value.trim(),
            email: document.getElementById("edit-email").value.trim(),
        };
        const password = document.getElementById("edit-password").value;
        if (password) cambios.password = password;

        try {
            const usuario = await apiFetch("/users/" + sesion.id, { method: "PUT", body: cambios });
            guardarSesion({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
            pintarUsuario(usuario);
            document.getElementById("edit-password").value = "";
            mostrarMensaje(mensaje, "Datos actualizados.", "success");
        } catch (error) {
            mostrarMensaje(mensaje, error.message, "danger");
        }
    });

    document.getElementById("btn-eliminar").addEventListener("click", async function () {
        if (!confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) return;

        try {
            await apiFetch("/users/" + sesion.id, { method: "DELETE" });
            cerrarSesion();
            window.location.href = "index.html";
        } catch (error) {
            mostrarMensaje(mensaje, error.message, "danger");
        }
    });

    document.getElementById("btn-logout").addEventListener("click", function () {
        cerrarSesion();
        window.location.href = "index.html";
    });
}

// ---------- Botón "Cambiar tema" (profile.html) ----------
function inicializarBotonTema() {
    const boton = document.getElementById("btn-tema");
    if (!boton) return;

    boton.addEventListener("click", function () {
        document.body.classList.toggle("tema-oscuro");
        boton.textContent = document.body.classList.contains("tema-oscuro")
            ? "Volver a tema claro"
            : "Cambiar a tema oscuro";
    });
}

// ---------- Botón "Mostrar/ocultar tabla" (tags.html) ----------
function inicializarBotonTabla() {
    const boton = document.getElementById("btn-toggle-tabla");
    const tabla = document.getElementById("contenedor-tabla");
    if (!boton || !tabla) return;

    boton.addEventListener("click", function () {
        const oculta = tabla.hidden;
        tabla.hidden = !oculta;
        boton.textContent = oculta ? "Ocultar tabla" : "Mostrar tabla";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    inicializarLogin();
    inicializarRegistro();
    inicializarPerfil();
    inicializarBotonTema();
    inicializarBotonTabla();
});
