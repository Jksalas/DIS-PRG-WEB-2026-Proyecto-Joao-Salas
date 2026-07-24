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

    // Obtener los valores de los campos`
    const correoElectronico = document.getElementById("correo-electronico").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const empresa_actual = document.getElementById("empresa").value.trim();
    const puesto_actual = document.getElementById("puesto").value.trim();
    const area_profesional = document.getElementById("area-profesional").value.trim();
    const perfil_linkedin = document.getElementById("linkedin").value.trim();

    // Se validan los campos del formulario y se muestran alertas de error si es necesario

    // Validar correo
    mensajeError = validarCorreoElectronico(correoElectronico);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Correo electrónico válido.");

    // Validar teléfono
    mensajeError = validarTelefono(telefono);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Teléfono válido.");

    // Validar nombre de la empresa
    mensajeError = validarEmpresa(empresa_actual);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Nombre de la empresa válido.");

    // Validar nombre del puesto
    mensajeError = validarPuesto(puesto_actual);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Nombre del puesto válido.");

    // Validar nombre del área profesional
    mensajeError = validarAreaProfesional(area_profesional);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Nombre del área profesional válido.");

    // Validar perfil de LinkedIn
    mensajeError = validarPerfilLinkedIn(perfil_linkedin);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Perfil de LinkedIn válido.");

    console.log("Formulario validado correctamente.");
    swalAlertPass();

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
        text: "La información del egresado fue validada correctamente.",
        icon: "success",
        confirmButtonColor: "#0056b3"
    });
}

// Función para validar el correo electrónico
function validarCorreoElectronico(
    correoElectronico
) {
    console.log("Iniciando validación de correo electrónico...");
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar que el correo electrónico no esté vacío y tenga un formato válido 
    if (correoElectronico === "") {
        return "El correo electrónico es obligatorio.";
    }

    if (!regexCorreo.test(correoElectronico)) {
        return "El correo electrónico debe tener un formato válido (Ej: usuario@correo.com).";
    }

    return null;
}
// Función para validar el teléfono
function validarTelefono(
    telefono
) {
    console.log("Iniciando validación de teléfono...");
    const regexTelefono = /^\+\d{1,4}\d{8,10}$/;

    // Validar que el teléfono no esté vacío y tenga un formato válido con código de país y número de teléfono
    if (telefono === "") {
        return "El teléfono es obligatorio.";
    }

    if (!regexTelefono.test(telefono)) {
        return "El teléfono no tiene un formato válido, asegurese de ingresar el código de país y el número de teléfono correctamente.";
    }

    return null;
}

// Función para validar el nombre de la empresa
function validarEmpresa(
    empresa
) {
    console.log("Iniciando validación de empresa...");
    const regexEmpresa = /^[A-Za-z0-9\s.,&-]+$/;

    // Validar que el nombre de la empresa no esté vacío y contenga solo letras, números y espacios
    if (empresa === "") {
        return "El nombre de la empresa es obligatorio.";
    }

    if (!regexEmpresa.test(empresa)) {
        return "El nombre de la empresa no tiene un formato válido, debe contener solo letras, números, espacios y caracteres especiales válidos (.,&-).";
    }

    return null;
}

// Función para validar el nombre del puesto
function validarPuesto(
    nombrePuesto
) {
    console.log("Iniciando validación de nombre de puesto...");
    const regexNombrePuesto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    // Validar que el nombre de puesto no esté vacío y contenga solo letras y espacios
    if (nombrePuesto === "") {
        return "El nombre de puesto es obligatorio.";
    }

    if (!regexNombrePuesto.test(nombrePuesto)) {
        return "El nombre de puesto debe contener solo letras y espacios.";
    }

    return null;
}

// Función para validar el nombre del área profesional
function validarAreaProfesional(
    nombreArea
) {
    console.log("Iniciando validación de nombre de área profesional...");
    const regexNombreArea = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    // Validar que el nombre de área profesional no esté vacío y contenga solo letras y espacios
    if (nombreArea === "") {
        return "El nombre de área profesional es obligatorio.";
    }

    if (!regexNombreArea.test(nombreArea)) {
        return "El nombre de área profesional debe contener solo letras y espacios.";
    }

    return null;
}


// Función para validar el nombre del perfil de LinkedIn
function validarPerfilLinkedIn(
    nombrePerfil
) {
    console.log("Iniciando validación de nombre de perfil de LinkedIn...");
    const regexpLinkedin = /^https:\/\/linkedin\.com\/in\/[a-zA-Z0-9._-]+$/;

    // Validar que el enlace de LinkedIn no esté vacío y tenga un formato válido
    if (nombrePerfil === "") {
        return "El enlace de LinkedIn es obligatorio.";
    }

    if (!regexpLinkedin.test(nombrePerfil)) {
        return "El enlace de LinkedIn no tiene un formato válido.";
    }

    return null;
}