// ==============================
// AÑO ACTUAL
// ==============================

const anio = document.getElementById("anio");
anio.textContent = new Date().getFullYear();

// 2. Procesar el envío del formulario de registro
function enviarFormulario(event) {
    event.preventDefault(); // Evita que la página se recargue

    const nombre = document.getElementById("nombre").value;
    const gamertag = document.getElementById("gamertag").value;
    const juego = document.getElementById("juego").value;

    // Alerta de confirmación (Paso 3 de las instrucciones)
    alert(`¡Gracias ${nombre} (${gamertag})!\n\nTu postulación para el equipo de ${juego} fue recibida correctamente. Te enviaremos un correo de confirmación con los detalles de las pruebas.`);

    // Limpia el formulario
    document.getElementById("formRegistro").reset();
}