// Obtener el formulario
const formulario = document.querySelector("form");

console.log("El archivo JavaScript se cargó correctamente.");
console.log("Formulario encontrado:", formulario);

// Bloquea el envío del formulario al presionar Enter
formulario.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
    }

});

// Agrega un evento de escucha para el envío del formulario
formulario.addEventListener("submit", function(event) {

    // Variable para almacenar el mensaje de error
    let mensajeError;

    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener los valores de los campos
    const nombreCarrera = document.getElementById("nombre-carrera").value.trim();


    // Se validan los campos del formulario y se muestran alertas de error si es necesario

    mensajeError = validarCarrera(nombreCarrera);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Nombre de carrera válido.");

    console.log("Formulario validado correctamente.");
    swalAlertPass();

    // Limpiar el formulario
    formulario.reset();
    console.log("Formulario limpiado correctamente.");


});

//----------------------------------------------------
// FUNCIONES DE VALIDACIÓN
//----------------------------------------------------

// Función para mostrar alertas de error usando SweetAlert2
// reutilizable para mostrar mensajes de error de validación
function swalAlertError(mensaje) {
    Swal.fire({
        title: "Error de validación",
        text: mensaje,
        icon: "warning",
        confirmButtonText: "Intentar de nuevo",
        confirmButtonColor: "#0056b3"
    });
}

function swalAlertPass() {
    Swal.fire({
        title: "Registro válido",
        text: "La información de la carrera fue validada correctamente.",
        icon: "success",
        confirmButtonColor: "#0056b3"
    });
}

// Función para validar el nombre de la carrera
function validarCarrera(
    nombreCarrera
) {
    console.log("Iniciando validación de nombre de carrera...");
    const regexNombreCarrera = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    // Validar que el nombre de carrera no esté vacío y contenga solo letras y espacios
    if (nombreCarrera === "") {
        return "El nombre de carrera es obligatorio.";
    }

    if (!regexNombreCarrera.test(nombreCarrera)) {
        return "El nombre de carrera debe contener solo letras y espacios.";
    }

    return null;
}