// Obtener el formulario
const formulario = document.querySelector("form");

console.log("El archivo JavaScript se cargó correctamente.");
console.log("Formulario encontrado:", formulario);

// Agrega un evento de escucha para el envío del formulario
formulario.addEventListener("submit", function(event) {

    // Variable para almacenar el mensaje de error
    let mensajeError;

    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener los valores de los campos
    const correoElectronico = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Se validan los campos del formulario y se muestran alertas de error si es necesario

    // Validar correo
    mensajeError = validarCorreoElectronico(correoElectronico);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Correo electrónico válido.");

    // Validar contraseña no esté vacía
    mensajeError = validarPassword(password);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }

    console.log("Formulario validado correctamente.");

    const listaUsuarios = obtenerUsuarios();
    const usuarioEncontrado = listaUsuarios.find(function(usuario) {
        return (
            usuario.correoElectronico === correoElectronico &&
            usuario.identificacion === password
        );
    });

    if (usuarioEncontrado) {
        Swal.fire({
            title: "Bienvenido",
            text: "Inicio de sesión exitoso.",
            icon: "success",
            confirmButtonColor: "#0056b3"
        }).then(function() {
            window.location.href = "perfil_egresado.html";
        });
    } else {
        Swal.fire({
            title: "Error de inicio de sesión",
            text: "Las credenciales ingresadas no son válidas.",
            icon: "error",
            confirmButtonColor: "#0056b3"
        });
    }

    // Limpiar el formulario después de guardar el registro
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

// Función para validar la contraseña
function validarPassword(password) {

    console.log("Iniciando validación de contraseña...");

    // Validar que la contraseña no esté vacía
    if (password === "") {
        return "La contraseña es obligatoria.";
    }

    return null;
}

//----------------------------------------------------
// LOCAL STORAGE
//----------------------------------------------------

// Función para obtener los usuarios almacenados en el localStorage
function obtenerUsuarios() {

    const registros = localStorage.getItem("egresados");

    if (registros === null) {
        return [];
    }

    return JSON.parse(registros);
}

