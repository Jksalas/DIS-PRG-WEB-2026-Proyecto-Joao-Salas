// Autor: Joao Salas

// Obtener el formulario
const formulario = document.querySelector("form");

// Guarda la posición del egresado activo dentro del arreglo de localStorage.
let indiceUsuarioActivo = null;

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
    const correoPersonal = document.getElementById("correo-personal").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const empresaActual = document.getElementById("empresa").value.trim();
    const puestoActual = document.getElementById("puesto").value.trim();
    const areaProfesional = document.getElementById("area-profesional").value.trim();
    const perfilLinkedin = document.getElementById("linkedin").value.trim();
    const portafolioProfesional = document.getElementById("portafolio").value.trim();

    // Se validan los campos del formulario y se muestran alertas de error si es necesario

    // Validar correo personal
    mensajeError = validarCorreoElectronico(correoPersonal);

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
    mensajeError = validarEmpresa(empresaActual);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Nombre de la empresa válido.");

    // Validar nombre del puesto
    mensajeError = validarPuesto(puestoActual);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Nombre del puesto válido.");

    // Validar nombre del área profesional
    mensajeError = validarAreaProfesional(areaProfesional);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Nombre del área profesional válido.");

    // Validar perfil de LinkedIn
    mensajeError = validarPerfilLinkedIn(perfilLinkedin);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Perfil de LinkedIn válido.");

    // Validar portafolio profesional
    mensajeError = validarPortafolio(portafolioProfesional);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Portafolio profesional válido.");

    console.log("Formulario validado correctamente.");

    // Crear un objeto con los campos que el egresado puede actualizar.
    // El correo institucional no se incluye para conservar la credencial.
    const informacionProfesional = {
        correoPersonal,
        telefono,
        lugarTrabajo: empresaActual,
        puestoActual,
        areaProfesional,
        perfilLinkedin,
        portafolioProfesional
    };

    const egresadoActualizado = actualizarInformacionProfesional(
        informacionProfesional
    );

    if (egresadoActualizado === null) {
        return;
    }

    // Reflejar inmediatamente los datos guardados y limpiar el formulario.
    mostrarInformacionEgresado(egresadoActualizado);
    formulario.reset();
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

// Mostrar una confirmación después de guardar la información profesional
function swalAlertPass() {
    Swal.fire({
        title: "Información actualizada",
        text: "La información profesional fue actualizada correctamente.",
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

    // El campo es opcional, pero debe respetar el formato si se completa
    if (nombrePerfil === "") {
        return null;
    }

    if (!regexpLinkedin.test(nombrePerfil)) {
        return "El enlace de LinkedIn no tiene un formato válido.";
    }

    return null;
}

// Función para validar el portafolio profesional
function validarPortafolio(portafolio) {

    // El portafolio es opcional
    if (portafolio === "") {
        return null;
    }

    try {
        const direccion = new URL(portafolio);

        if (direccion.protocol !== "http:" &&
            direccion.protocol !== "https:") {
            return "El portafolio debe utilizar una dirección http o https.";
        }
    } catch (error) {
        return "El portafolio debe contener una dirección válida.";
    }

    return null;
}

//----------------------------------------------------
// LOCAL STORAGE Y PERFIL
//----------------------------------------------------

// Obtener la lista completa de egresados almacenados
function obtenerEgresados() {

    const registros = localStorage.getItem("egresados");

    if (registros === null) {
        return [];
    }

    return JSON.parse(registros);
}

// Buscar al egresado que inició sesión y preparar su perfil
function cargarUsuarioActivo() {

    const identificacionUsuario = localStorage.getItem("usuarioActivo");
    const listaEgresados = obtenerEgresados();

    indiceUsuarioActivo = listaEgresados.findIndex(function(egresado) {
        return egresado.identificacion === identificacionUsuario;
    });

    if (identificacionUsuario === null || indiceUsuarioActivo === -1) {
        localStorage.removeItem("usuarioActivo");

        Swal.fire({
            title: "Sesión no válida",
            text: "Debes iniciar sesión para consultar el perfil.",
            icon: "warning",
            confirmButtonColor: "#0056b3"
        }).then(function() {
            window.location.href = "login.html";
        });

        return;
    }

    mostrarInformacionEgresado(listaEgresados[indiceUsuarioActivo]);
}

// Actualizar únicamente los campos personales y profesionales editables
function actualizarInformacionProfesional(informacionProfesional) {

    const listaEgresados = obtenerEgresados();
    const egresadoExistente = listaEgresados[indiceUsuarioActivo];

    if (egresadoExistente === undefined) {
        swalAlertError("No fue posible encontrar el perfil del egresado.");
        return null;
    }

    listaEgresados[indiceUsuarioActivo] = {
        ...egresadoExistente,
        ...informacionProfesional
    };

    localStorage.setItem(
        "egresados",
        JSON.stringify(listaEgresados)
    );

    return listaEgresados[indiceUsuarioActivo];
}

// Mostrar la información almacenada en las secciones del perfil
function mostrarInformacionEgresado(egresado) {

    document.getElementById("perfil-identificacion").textContent =
        egresado.identificacion;
    document.getElementById("perfil-nombre").textContent =
        egresado.nombreCompleto;
    document.getElementById("perfil-correo-institucional").textContent =
        egresado.correoElectronico;
    document.getElementById("perfil-correo-personal").textContent =
        egresado.correoPersonal || "No registrado";
    document.getElementById("perfil-telefono").textContent =
        egresado.telefono;
    document.getElementById("perfil-empresa").textContent =
        egresado.lugarTrabajo || "No registrado";
    document.getElementById("perfil-puesto").textContent =
        egresado.puestoActual || "No registrado";
    document.getElementById("perfil-area").textContent =
        egresado.areaProfesional || "No registrado";

    mostrarEnlace(
        "perfil-linkedin",
        egresado.perfilLinkedin
    );
    mostrarEnlace(
        "perfil-portafolio",
        egresado.portafolioProfesional
    );
}

// Configurar de forma segura un enlace opcional del perfil
function mostrarEnlace(idEnlace, direccion) {

    const enlace = document.getElementById(idEnlace);

    if (!direccion) {
        enlace.textContent = "No registrado";
        enlace.removeAttribute("href");
        enlace.removeAttribute("target");
        enlace.removeAttribute("rel");
        return;
    }

    enlace.textContent = direccion;
    enlace.href = direccion;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
}

// Cargar el perfil correspondiente al usuario que inició sesión
cargarUsuarioActivo();
