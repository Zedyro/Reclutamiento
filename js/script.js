document.addEventListener("DOMContentLoaded", () => {
    const anio = document.getElementById("anio");
    if (anio) {
        anio.textContent = new Date().getFullYear();
    }
});

(function () {
    if (typeof emailjs !== "undefined") {
        emailjs.init("FUOcs1atpHjE9rvx0");
    }
})();


function procesarRegistro(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;
    const observaciones = document.getElementById("observaciones").value.trim();

    const btnEnviar = document.getElementById("btnEnviar");
    if (!nombre || !apellidos || !email || !telefono || !servicio || !fecha) {
        mostrarMensaje("Por favor, complete todos los campos obligatorios.", "error");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensaje("Por favor, ingrese un correo electrónico válido.", "error");
        return;
    }
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Procesando registro...";
    const templateParams = {
        to_name: nombre,
        to_email: email,
        apellidos: apellidos,
        telefono: telefono,
        servicio: servicio,
        fecha: fecha,
        observaciones: observaciones || "Sin observaciones adicionales"
    };
    emailjs.send("service_ildyxbf", "template_u2n11es", templateParams)
        .then((response) => {
            console.log("ÉXITO!", response.status, response.text);
            finalizarRegistroExitoso(nombre, email, servicio);
        })
        .catch((error) => {
            console.error("Error de EmailJS:", error);
            mostrarMensaje("Error al conectar con el servidor de correos.", "error");
            btnEnviar.disabled = false;
            btnEnviar.textContent = "Registrar";
        });
}
function finalizarRegistroExitoso(nombre, email, servicio) {
    const btnEnviar = document.getElementById("btnEnviar");
    if (btnEnviar) {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Registrar";
    }

    mostrarMensaje(`Su registro fue recibido correctamente. Se ha enviado un correo a: ${email}`, "exito");
    alert(
        "Asunto: Confirmación de registro\n\n" +
        `Hola, ${nombre}.\n` +
        "Su registro fue recibido correctamente.\n" +
        "Gracias por utilizar nuestro sitio web."
    );
    document.getElementById("formRegistro").reset();
}

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
