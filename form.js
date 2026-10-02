// form.js
// Parte 3: funcionalidad del formulario (radio buttons, dropdowns país/región, checkboxes)

// ---------- Radio buttons: mostrar contenido oculto según la opción elegida ----------
function inicializarRadios() {
    const radios = document.querySelectorAll('input[name="metodo-contacto"]');
    const campoEmail = document.getElementById("campo-email");
    const campoTelefono = document.getElementById("campo-telefono");
    if (radios.length === 0) return;

    radios.forEach(function (radio) {
        radio.addEventListener("change", function () {
            campoEmail.hidden = radio.value !== "email";
            campoTelefono.hidden = radio.value !== "telefono";
        });
    });
}

// ---------- Dropdowns de país y región ----------
function inicializarPaisRegion() {
    const selectPais = document.getElementById("select-pais");
    const selectRegion = document.getElementById("select-region");
    if (!selectPais || !selectRegion || typeof countryRegionData === "undefined") return;

    countryRegionData.forEach(function (pais) {
        const opcion = document.createElement("option");
        opcion.value = pais.countryShortCode;
        opcion.textContent = pais.countryName;
        selectPais.appendChild(opcion);
    });

    selectPais.addEventListener("change", function () {
        selectRegion.innerHTML = "";

        const paisElegido = countryRegionData.find(function (pais) {
            return pais.countryShortCode === selectPais.value;
        });

        if (!paisElegido || paisElegido.regions.length === 0) {
            selectRegion.innerHTML = '<option value="">Sin regiones disponibles</option>';
            selectRegion.disabled = true;
            return;
        }

        const opcionInicial = document.createElement("option");
        opcionInicial.value = "";
        opcionInicial.textContent = "Selecciona una región";
        selectRegion.appendChild(opcionInicial);

        paisElegido.regions.forEach(function (region) {
            const opcion = document.createElement("option");
            opcion.value = region.shortCode;
            opcion.textContent = region.name;
            selectRegion.appendChild(opcion);
        });

        selectRegion.disabled = false;
    });
}

// ---------- Checkboxes: habilitar botón cuando ambos estén marcados ----------
function inicializarCheckboxes() {
    const checkTerminos = document.getElementById("check-terminos");
    const checkMayorEdad = document.getElementById("check-mayor-edad");
    const botonEnviar = document.getElementById("btn-enviar");
    if (!checkTerminos || !checkMayorEdad || !botonEnviar) return;

    function actualizarBoton() {
        botonEnviar.disabled = !(checkTerminos.checked && checkMayorEdad.checked);
    }

    checkTerminos.addEventListener("change", actualizarBoton);
    checkMayorEdad.addEventListener("change", actualizarBoton);
}

// ---------- Envío del formulario -> POST /contactos (REST-API) ----------
function inicializarEnvioFormulario() {
    const form = document.getElementById("contacto-form");
    if (!form) return;

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const mensaje = document.getElementById("form-mensaje");
        const botonEnviar = document.getElementById("btn-enviar");
        const metodo = form.querySelector('input[name="metodo-contacto"]:checked');

        if (!metodo) {
            mostrarMensaje(mensaje, "Elige cómo prefieres que te contactemos.", "warning");
            return;
        }

        botonEnviar.disabled = true;
        try {
            await apiFetch("/contactos", {
                method: "POST",
                body: {
                    metodo: metodo.value,
                    email: document.getElementById("input-email").value.trim(),
                    telefono: document.getElementById("input-telefono").value.trim(),
                    pais: document.getElementById("select-pais").value,
                    region: document.getElementById("select-region").value,
                },
            });
            mostrarMensaje(mensaje, "¡Formulario enviado correctamente!", "success");
            form.reset();
            document.getElementById("campo-email").hidden = true;
            document.getElementById("campo-telefono").hidden = true;
            const selectRegion = document.getElementById("select-region");
            selectRegion.innerHTML = '<option value="">Selecciona primero un país</option>';
            selectRegion.disabled = true;
        } catch (error) {
            mostrarMensaje(mensaje, error.message, "danger");
            botonEnviar.disabled = false;
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    inicializarRadios();
    inicializarPaisRegion();
    inicializarCheckboxes();
    inicializarEnvioFormulario();
});
