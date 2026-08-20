/* ==========================================================================
   RIOT SQUAD E-SPORTS - JAVASCRIPT PRINCIPAL
   IF0009 - Desarrollo de Software IV
   ========================================================================== */

// 1. AÑO DINÁMICO EN EL FOOTER
document.addEventListener("DOMContentLoaded", () => {
    const anio = document.getElementById("anio");
    if (anio) {
        anio.textContent = new Date().getFullYear();
    }
});

// 2. INICIALIZACIÓN DE EMAILJS (Servicio de envío de correos)
(function () {
    if (typeof emailjs !== "undefined") {
        emailjs.init("FUOcs1atpHjE9rvx0");
    }
})();

// 3. PROCESAMIENTO Y VALIDACIÓN DEL FORMULARIO DE REGISTRO
function procesarRegistro(event) {
    event.preventDefault(); // Evita recarga de página

    // Obtención de valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;
    const observaciones = document.getElementById("observaciones").value.trim();

    const mensajeEstado = document.getElementById("mensajeEstado");
    const btnEnviar = document.getElementById("btnEnviar");

    // VALIDACIÓN MEDIANTE JAVASCRIPT
    if (!nombre || !apellidos || !email || !telefono || !servicio || !fecha) {
        mostrarMensaje("Por favor, complete todos los campos obligatorios.", "error");
        return;
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensaje("Por favor, ingrese un correo electrónico válido.", "error");
        return;
    }

    // Estado visual en el botón
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Procesando registro...";

    // Parámetros para el envío
    const templateParams = {
        to_name: nombre,
        to_email: email,
        apellidos: apellidos,
        telefono: telefono,
        servicio: servicio,
        fecha: fecha,
        observaciones: observaciones || "Sin observaciones adicionales"
    };

    // ENVÍO DE CORREO AUTOMÁTICO
    if (typeof emailjs !== "undefined" && emailjs.__isInitialized) {
        emailjs.send("service_ildyxbf", "template_u2n11es", templateParams)
            .then(() => {
                finalizarRegistroExitoso(nombre, email, servicio);
            })
            .catch((error) => {
                console.error("Error de EmailJS:", error); // Esto sí mostrará el problema en la consola
                mostrarMensaje("Error al enviar el correo. Revisa la consola.", "error");
            });
    }
}

// 4. CONFIRMACIÓN FINAL SEGÚN FORMATO DE RÚBRICA
function finalizarRegistroExitoso(nombre, email, servicio) {
    const btnEnviar = document.getElementById("btnEnviar");
    if (btnEnviar) {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Registrar";
    }

    // Mensaje en pantalla
    mostrarMensaje(`Su registro fue recibido correctamente. Se ha enviado un correo a: ${email}`, "exito");

    // Alerta oficial requerida en el documento del curso
    alert(
        "Asunto: Confirmación de registro\n\n" +
        `Hola, ${nombre}.\n` +
        "Su registro fue recibido correctamente.\n" +
        "Gracias por utilizar nuestro sitio web."
    );

    // Limpieza del formulario
    document.getElementById("formRegistro").reset();
}

// 5. FUNCIÓN AUXILIAR DE MENSAJES DE ESTADO
function mostrarMensaje(texto, tipo) {
    const mensajeEstado = document.getElementById("mensajeEstado");
    if (!mensajeEstado) return;

    mensajeEstado.style.display = "block";
    mensajeEstado.textContent = texto;

    if (tipo === "error") {
        mensajeEstado.style.backgroundColor = "#fee2e2";
        mensajeEstado.style.color = "#991b1b";
        mensajeEstado.style.border = "1px solid #f87171";
    } else {
        mensajeEstado.style.backgroundColor = "#dcfce7";
        mensajeEstado.style.color = "#166534";
        mensajeEstado.style.border = "1px solid #4ade80";
    }
}
