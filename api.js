// api.js
// Conexión con la REST-API (backend: https://github.com/max-lopzzz/practica-rest-api)

const API_URL = "http://localhost:4000";

// Hace una petición a la API y regresa el JSON; lanza un Error con el mensaje del backend
async function apiFetch(ruta, opciones = {}) {
    let respuesta;
    try {
        respuesta = await fetch(API_URL + ruta, {
            ...opciones,
            headers: { "Content-Type": "application/json", ...opciones.headers },
            body: opciones.body ? JSON.stringify(opciones.body) : undefined,
        });
    } catch (error) {
        throw new Error("No se pudo conectar con el servidor. ¿Está corriendo la API en " + API_URL + "?");
    }

    if (respuesta.status === 204) return null;

    const datos = await respuesta.json().catch(() => ({}));
    if (!respuesta.ok) {
        throw new Error(datos.message || "Error " + respuesta.status);
    }
    return datos;
}

// ---------- Sesión del usuario (guardada en el navegador) ----------
function guardarSesion(usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem("usuario"));
    } catch (error) {
        return null;
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
}

function mostrarMensaje(elemento, texto, tipo) {
    elemento.className = "alert alert-" + tipo + " mt-3";
    elemento.textContent = texto;
    elemento.hidden = false;
}
