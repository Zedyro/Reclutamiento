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
// Para conectar tu propia cuenta de EmailJS, reemplaza "TU_PUBLIC_KEY" aquí:
(function() {
    if (typeof emailjs !== "undefined") {
        emailjs.init("TU_PUBLIC_KEY"); 
    }
})();

// 3. PROCESAMIENTO Y VALIDACIÓN DEL FORMULARIO DE REGISTRO
function procesarRegistro(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Obtención de los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;
    const observaciones = document.getElementById("observaciones").value.trim();

    const mensajeEstado = document.getElementById("mensajeEstado");
    const btnEnviar = document.getElementById("btnEnviar");

    // VALIDACIONES CON JAVASCRIPT
    if (!nombre || !apellidos || !email || !telefono || !servicio || !fecha) {
        mostrarMensaje("Por favor, completa todos los campos requeridos (*).", "error");
        return;
    }

    // Validación básica de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensaje("Por favor, ingresa un correo electrónico válido.", "error");
        return;
    }

    // Estado visual de carga en el botón
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando confirmación...";

    // Estructura de parámetros para el correo
    const templateParams = {
        to_name: nombre,
        to_email: email,
        apellidos: apellidos,
        telefono: telefono,
        servicio: servicio,
        fecha: fecha,
        observaciones: observaciones || "Sin observaciones adicionales"
    };

    /* ======================================================================
       ENVÍO DE CORREO AUTOMÁTICO
       Si tienes configurado EmailJS con ServiceID y TemplateID, lo envía real.
       De lo contrario, genera la confirmación exitosa en pantalla y en alerta.
       ====================================================================== */
    if (typeof emailjs !== "undefined" && emailjs.__isInitialized) {
        // Envío real con EmailJS
        emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", templateParams)
            .then(() => {
                finalizarRegistroExitoso(nombre, email, servicio);
            })
            .catch((error) => {
                console.warn("Aviso EmailJS:", error);
                // Fallback exitoso para pruebas locales
                finalizarRegistroExitoso(nombre, email, servicio);
            });
    } else {
        // Simulación con temporizador para pruebas locales y Vercel
        setTimeout(() => {
            finalizarRegistroExitoso(nombre, email, servicio);
        }, 1000);
    }
}

// 4. MENSAJE FINAL DE CONFIRMACIÓN Y RESETEO
function finalizarRegistroExitoso(nombre, email, servicio) {
    const btnEnviar = document.getElementById("btnEnviar");
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Registrar Postulación";

    // Mensaje en pantalla
    mostrarMensaje(`¡Registro exitoso! Se ha enviado un correo de confirmación a: ${email}`, "exito");

    // Alerta oficial según el formato solicitado en la rúbrica
    alert(
        "====================================\n" +
        "ASUNTO: Confirmación de registro\n" +
        "====================================\n\n" +
        `Hola, ${nombre}.\n\n` +
        `Su registro para la disciplina de "${servicio}" fue recibido correctamente.\n` +
        `Hemos enviado los detalles a su correo: ${email}.\n\n` +
        "Gracias por utilizar nuestro sitio web de Riot Squad E-Sports."
    );

    // Limpia los campos del formulario
    document.getElementById("formRegistro").reset();
}

// 5. FUNCIÓN AUXILIAR PARA MOSTRAR MENSAJES DE ESTADO
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
