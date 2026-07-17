// Obtener el formulario
const formulario = document.querySelector("form");

console.log("El archivo JavaScript se cargó correctamente.");
console.log("Formulario encontrado:", formulario);

const botonRegistrar = document.getElementById("btnRegistrar");


// Bloquea el envío del formulario al presionar Enter
formulario.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
    }

});

formulario.addEventListener("submit", function(event) {

    let mensajeError;

    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener los valores de los campos
    const identificacion = document.getElementById("identificacion").value.trim();
    const nombreCompleto = document.getElementById("nombre-completo").value.trim();
    const correoElectronico = document.getElementById("correo-electronico").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fechaRegistro = document.getElementById("fecha-registro").value;
    const lugarTrabajo = document.getElementById("lugar-trabajo").value.trim();


    // Validar identificación
    mensajeError = validarIdentificacion(identificacion);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Identificación válida.");

    // Validar nombre completo
    mensajeError = validarNombreCompleto(nombreCompleto);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Nombre completo válido.");

    // Validar correo
    mensajeError = validarCorreoElectronico(correoElectronico);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Correo electrónico válido.");

    // Imprimir fecha de registro en la consola
    console.log("Fecha de registro:", fechaRegistro);

    // Validar teléfono
    mensajeError = validarTelefono(telefono);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Teléfono válido.");

    // Validar fecha de registro
    mensajeError = validarFechaRegistro(fechaRegistro);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }

    console.log("Fecha de registro válida.");

    // Validar lugar de trabajo
    mensajeError = validarLugarTrabajo(lugarTrabajo);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Lugar de trabajo válido.");

});

//----------------------------------------------------
// FUNCIONES DE VALIDACIÓN
//----------------------------------------------------

function swalAlertError(mensaje) {
    Swal.fire({
        title: "Error de validación",
        text: mensaje,
        icon: "warning",
        confirmButtonText: "Intentar de nuevo",
        confirmButtonColor: "#0056b3"
    });
}

function validarIdentificacion(identificacion) {

    console.log("Iniciando validación de identificación...");
    const regexIdentificacion = /^\d{9}$/;

    if (identificacion === "") {
        return "La identificación es obligatoria.";
    }

    if (!regexIdentificacion.test(identificacion)) {
        return "La identificación debe contener exactamente 9 números.";
    }

    return null;
}

function validarNombreCompleto(
    nombreCompleto
) {
    console.log("Iniciando validación de nombre completo...");
    const regexNombreCompleto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+ [A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;

    if (nombreCompleto === "") {
        return "El nombre completo es obligatorio.";
    }

    if (!regexNombreCompleto.test(nombreCompleto)) {
        return "El nombre completo debe contener solo letras, con su nombre y apellido.";
    }

    return null;
}

function validarCorreoElectronico(
    correoElectronico
) {
    console.log("Iniciando validación de correo electrónico...");
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correoElectronico === "") {
        return "El correo electrónico es obligatorio.";
    }

    if (!regexCorreo.test(correoElectronico)) {
        return "El correo electrónico no tiene un formato válido.";
    }

    return null;
}

function validarTelefono(
    telefono
) {
    console.log("Iniciando validación de teléfono...");
    const regexTelefono = /^\+\d{1,4}\d{8}$/;

    if (telefono === "") {
        return "El teléfono es obligatorio.";
    }

    if (!regexTelefono.test(telefono)) {
        return "El teléfono no tiene un formato válido, asegurese de ingresar el código de país y el número de teléfono correctamente.";
    }

    return null;
}

function validarFechaRegistro(fechaRegistro) {

    console.log("Iniciando validación de fecha de registro...");

    if (fechaRegistro === "") {
        return "La fecha de registro es obligatoria.";
    }

    return null;
}

function validarLugarTrabajo(
    lugarTrabajo
) {
    console.log("Iniciando validación de lugar de trabajo...");
    const regexLugarTrabajo = /^[A-Za-z0-9\s]+$/;

    if (lugarTrabajo === "") {
        return "El lugar de trabajo es obligatorio.";
    }

    if (!regexLugarTrabajo.test(lugarTrabajo)) {
        return "El lugar de trabajo no tiene un formato válido.";
    }

    return null;
}