// ==============================
// AÑO ACTUAL
// ==============================

const anio = document.getElementById("anio");

anio.textContent = new Date().getFullYear();


// ==============================
// BOTONES DE PROYECTOS
// ==============================

function verProyecto(nombreProyecto) {

    alert(
        "Ha seleccionado el proyecto: " +
        nombreProyecto
    );

}


// ==============================
// FORMULARIO DE CONTACTO
// ==============================

const formulario = document.getElementById("formContacto");


formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nombre =
            document.getElementById("nombre").value;

        const correo =
            document.getElementById("correo").value;

        const mensaje =
            document.getElementById("mensaje").value;


        if (
            nombre.trim() === "" ||
            correo.trim() === "" ||
            mensaje.trim() === ""
        ) {

            alert(
                "Por favor complete todos los campos."
            );

            return;
        }


        alert(
            "Gracias " +
            nombre +
            ". Su mensaje fue recibido correctamente."
        );


        formulario.reset();

    }
);