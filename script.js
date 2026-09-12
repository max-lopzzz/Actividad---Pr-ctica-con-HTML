// script.js
// Parte 2: funcionalidad principal del sitio (login, botones interactivos)

// ---------- Credenciales de prueba (solo front-end, sin backend) ----------
const USUARIO_VALIDO = "admin";
const PASSWORD_VALIDO = "1234";

// ---------- Login (index.html) ----------
function inicializarLogin() {
    const form = document.getElementById("login-form");
    if (!form) return;

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const usuario = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const mensaje = document.getElementById("login-mensaje");

        if (usuario === USUARIO_VALIDO && password === PASSWORD_VALIDO) {
            mensaje.className = "alert alert-success mt-3";
            mensaje.textContent = "Inicio de sesión correcto. Redirigiendo...";
            mensaje.hidden = false;
            setTimeout(function () {
                window.location.href = "profile.html";
            }, 900);
        } else {
            mensaje.className = "alert alert-danger mt-3";
            mensaje.textContent = "Usuario o contraseña incorrectos. Intenta de nuevo.";
            mensaje.hidden = false;
        }
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
    inicializarBotonTema();
    inicializarBotonTabla();
});
