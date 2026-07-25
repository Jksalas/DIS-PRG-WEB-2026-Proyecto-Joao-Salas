// Obtener el formulario
const formulario = document.querySelector("form");
const botonRegistrar = document.getElementById("btnRegistrar");
const botonCancelarEdicion = document.getElementById("btnCancelarEdicion");

// Guarda la posición del egresado que se está editando.
// El valor null indica que el formulario está en modo de registro.
let indiceEgresadoEditando = null;

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
    const identificacion = document.getElementById("identificacion").value.trim();
    const nombreCompleto = document.getElementById("nombre-completo").value.trim();
    const correoElectronico = document.getElementById("correo-electronico").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fechaRegistro = document.getElementById("fecha-registro").value;
    const lugarTrabajo = document.getElementById("lugar-trabajo").value.trim();


    // Se validan los campos del formulario y se muestran alertas de error si es necesario

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
    // Imprimir fecha de registro en la consola
    console.log("Fecha de registro:", fechaRegistro);

    // Validar lugar de trabajo
    mensajeError = validarLugarTrabajo(lugarTrabajo);

    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }
    console.log("Lugar de trabajo válido.");

    console.log("Formulario validado correctamente.");


    // Crear objeto con la información del egresado
    const egresado = {
        identificacion,
        nombreCompleto,
        correoElectronico,
        telefono,
        fechaRegistro,
        lugarTrabajo
    };

    console.log("Objeto egresado creado:");
    console.log(egresado);

    let listaActualizada;

    // Si no existe un índice de edición, se agrega un registro nuevo.
    // En caso contrario, se reemplaza el egresado seleccionado.
    if (indiceEgresadoEditando === null) {
        listaActualizada = guardarEgresado(egresado);
        swalAlertPass(false);
    } else {
        listaActualizada = actualizarEgresado(
            indiceEgresadoEditando,
            egresado
        );
        swalAlertPass(true);
    }

    // Actualizar el listado visible
    mostrarEgresados(listaActualizada);

    console.log("Lista completa de egresados almacenados:");
    console.log(listaActualizada);

    // Limpiar el formulario y regresar al modo de registro
    finalizarEdicion();
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

function swalAlertPass(esEdicion) {
    Swal.fire({
        title: esEdicion ? "Egresado actualizado" : "Registro válido",
        text: esEdicion
            ? "La información del egresado fue actualizada correctamente."
            : "La información del egresado fue registrada correctamente.",
        icon: "success",
        confirmButtonColor: "#0056b3"
    });
}

// Función para validar la identificación
function validarIdentificacion(identificacion) {

    console.log("Iniciando validación de identificación...");
    const regexIdentificacion = /^\d{9}$/;

    // Validar que la identificación no esté vacía y tenga exactamente 9 dígitos
    if (identificacion === "") {
        return "La identificación es obligatoria.";
    }

    if (!regexIdentificacion.test(identificacion)) {
        return "La identificación debe contener exactamente 9 números.";
    }

    return null;
}
// Función para validar el nombre completo
function validarNombreCompleto(
    nombreCompleto
) {
    console.log("Iniciando validación de nombre completo...");
    const regexNombreCompleto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/;

    // Validar que el nombre completo no esté vacío y contenga al menos un nombre y un apellido
    if (nombreCompleto === "") {
        return "El nombre completo es obligatorio.";
    }

    if (!regexNombreCompleto.test(nombreCompleto)) {
        return "El nombre completo debe contener solo letras, con su nombre y apellidos.";
    }

    return null;
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
// Función para validar la fecha de registro
function validarFechaRegistro(fechaRegistro) {

    console.log("Iniciando validación de fecha de registro...");

    // Validar que la fecha de registro no esté vacía
    // por default el navergador asigna la fecha actual, pero se valida por si el usuario borra la fecha o la deja vacía
    if (fechaRegistro === "") {
        return "La fecha de registro es obligatoria.";
    }

    return null;
}
// Función para validar el lugar de trabajo
function validarLugarTrabajo(
    lugarTrabajo
) {
    console.log("Iniciando validación de lugar de trabajo...");
    const regexLugarTrabajo = /^[A-Za-z0-9\s.,&-]+$/;

    // Validar que el lugar de trabajo no esté vacío y contenga solo letras, números y espacios
    if (lugarTrabajo === "") {
        return "El lugar de trabajo es obligatorio.";
    }

    if (!regexLugarTrabajo.test(lugarTrabajo)) {
        return "El lugar de trabajo no tiene un formato válido, de debe contener solo letras, números, espacios y caracteres especiales validos (.,&-).";
    }

    return null;
}

//----------------------------------------------------
// LOCAL STORAGE
//----------------------------------------------------

// Función para obtener los egresados almacenados en el localStorage
function obtenerEgresados() {

    const registros = localStorage.getItem("egresados");

    if (registros === null) {
        return [];
    }

    return JSON.parse(registros);
}

// Función para guardar un egresado en el localStorage
function guardarEgresado(egresado) {

    const listaEgresados = obtenerEgresados();

    listaEgresados.push(egresado);

    localStorage.setItem(
        "egresados",
        JSON.stringify(listaEgresados)
    );

    return listaEgresados;
}

// Reemplaza un egresado existente y guarda nuevamente la lista completa
function actualizarEgresado(indice, egresadoActualizado) {

    const listaEgresados = obtenerEgresados();

    listaEgresados[indice] = egresadoActualizado;

    localStorage.setItem(
        "egresados",
        JSON.stringify(listaEgresados)
    );

    return listaEgresados;
}

// Carga en el formulario los datos del egresado seleccionado
function iniciarEdicion(indice) {

    const listaEgresados = obtenerEgresados();
    const egresado = listaEgresados[indice];

    // Evita intentar editar una posición que ya no exista en la lista
    if (egresado === undefined) {
        swalAlertError("No fue posible encontrar el egresado seleccionado.");
        return;
    }

    document.getElementById("identificacion").value =
        egresado.identificacion;
    document.getElementById("nombre-completo").value =
        egresado.nombreCompleto;
    document.getElementById("correo-electronico").value =
        egresado.correoElectronico;
    document.getElementById("telefono").value =
        egresado.telefono;
    document.getElementById("fecha-registro").value =
        egresado.fechaRegistro;
    document.getElementById("lugar-trabajo").value =
        egresado.lugarTrabajo;

    // Cambiar el formulario de modo registro a modo edición
    indiceEgresadoEditando = indice;
    botonRegistrar.textContent = "Guardar cambios";
    botonCancelarEdicion.hidden = false;

    // Llevar al usuario hasta el formulario que contiene los datos cargados
    formulario.scrollIntoView({
        behavior: "smooth"
    });
}

// Limpia el formulario y restaura sus controles al modo de registro
function finalizarEdicion() {

    formulario.reset();
    indiceEgresadoEditando = null;
    botonRegistrar.textContent = "Registrar egresado";
    botonCancelarEdicion.hidden = true;
}

// Elimina un egresado después de solicitar confirmación al usuario
function eliminarEgresado(indice) {

    const listaEgresados = obtenerEgresados();
    const egresado = listaEgresados[indice];

    // Verificar que el registro todavía exista en la lista
    if (egresado === undefined) {
        swalAlertError("No fue posible encontrar el egresado seleccionado.");
        return;
    }

    // Solicitar confirmación antes de eliminar permanentemente el registro
    Swal.fire({
        title: "¿Eliminar egresado?",
        text: "Se eliminará el registro de " + egresado.nombreCompleto + ".",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#0056b3",
        cancelButtonColor: "#6c757d"
    }).then(function(resultado) {

        // No modificar los datos si el usuario cancela la operación
        if (!resultado.isConfirmed) {
            return;
        }

        // Eliminar un elemento del arreglo en la posición indicada
        listaEgresados.splice(indice, 1);

        // Guardar nuevamente la lista sin el registro eliminado
        localStorage.setItem(
            "egresados",
            JSON.stringify(listaEgresados)
        );

        // Cancelar cualquier edición activa y actualizar la tabla
        finalizarEdicion();
        mostrarEgresados(listaEgresados);

        Swal.fire({
            title: "Egresado eliminado",
            text: "El registro fue eliminado correctamente.",
            icon: "success",
            confirmButtonColor: "#0056b3"
        });

    });
}

// Función para mostrar los egresados almacenados en la tabla
function mostrarEgresados(listaEgresados) {

    const cuerpoTabla = document.getElementById("lista-egresados");

    // Elimina las filas mostradas anteriormente
    cuerpoTabla.replaceChildren();

    // Mostrar un mensaje cuando no existen registros
    if (listaEgresados.length === 0) {

        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.textContent = "No hay egresados registrados.";
        celda.colSpan = 7;

        fila.appendChild(celda);
        cuerpoTabla.appendChild(fila);

        return;
    }

    // Crear una fila por cada egresado almacenado
    listaEgresados.forEach(function(egresado, indice) {

        const fila = document.createElement("tr");

        const datos = [
            egresado.identificacion,
            egresado.nombreCompleto,
            egresado.correoElectronico,
            egresado.telefono,
            egresado.fechaRegistro,
            egresado.lugarTrabajo
        ];

        datos.forEach(function(dato) {

            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);

        });

        // Celda reservada para editar y eliminar
        const celdaAcciones = document.createElement("td");

        const botonEditar = document.createElement("button");
        botonEditar.type = "button";
        botonEditar.textContent = "Editar";

        // Cargar en el formulario el registro correspondiente a esta fila
        botonEditar.addEventListener("click", function() {
            iniciarEdicion(indice);
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";

        // Solicitar la eliminación del registro correspondiente a esta fila
        botonEliminar.addEventListener("click", function() {
            eliminarEgresado(indice);
        });

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);
        fila.appendChild(celdaAcciones);

        cuerpoTabla.appendChild(fila);

    });
}

// Permitir que el usuario abandone una edición sin guardar cambios
botonCancelarEdicion.addEventListener("click", function() {
    finalizarEdicion();
});

// Mostrar los registros existentes al cargar la página
mostrarEgresados(obtenerEgresados());
