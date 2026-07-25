// Obtener el formulario
const formulario = document.querySelector("form");
const botonRegistrar = document.getElementById("btnRegistrar");
const botonCancelarEdicion = document.getElementById("btnCancelarEdicion");

// Guarda la posición de la carrera que se está editando.
// El valor null indica que el formulario está en modo de registro.
let indiceCarreraEditando = null;

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

    // Crear objeto con la información de la carrera
    const carrera = {
        nombre: nombreCarrera
    };

    console.log("Objeto carrera creado:");
    console.log(carrera);

    let listaActualizada;

    // Si no existe un índice de edición, se agrega un registro nuevo.
    // En caso contrario, se reemplaza la carrera seleccionada.
    if (indiceCarreraEditando === null) {
        listaActualizada = guardarCarrera(carrera);
        swalAlertPass(false);
    } else {
        listaActualizada = actualizarCarrera(
            indiceCarreraEditando,
            carrera
        );
        swalAlertPass(true);
    }

    // Actualizar el listado visible
    mostrarCarreras(listaActualizada);


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
        title: esEdicion
            ? "Carrera actualizada"
            : "Carrera registrada",
        text: esEdicion
            ? "La carrera fue actualizada correctamente."
            : "La carrera fue registrada correctamente.",
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

// Función para guardar una carrera en el localStorage
function guardarCarrera(carrera) {

    const listaCarreras = obtenerCarreras();

    listaCarreras.push(carrera);

    localStorage.setItem(
        "carreras",
        JSON.stringify(listaCarreras)
    );

    return listaCarreras;
}

function obtenerCarreras() {

    const registros = localStorage.getItem("carreras");

    if (registros === null) {
        return [];
    }

    return JSON.parse(registros);
}

// Reemplaza una carrera existente y guarda nuevamente la lista completa
function actualizarCarrera(indice, carreraActualizada) {

    const listaCarreras = obtenerCarreras();

    listaCarreras[indice] = carreraActualizada;

    localStorage.setItem(
        "carreras",
        JSON.stringify(listaCarreras)
    );

    return listaCarreras;
}

// Función para mostrar las carreras almacenadas en la tabla
function mostrarCarreras(listaCarreras) {

    const cuerpoTabla = document.getElementById("lista-carreras");

    // Elimina las filas mostradas anteriormente
    cuerpoTabla.replaceChildren();

    // Mostrar un mensaje cuando no existen registros
    if (listaCarreras.length === 0) {

        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.textContent = "No hay carreras registradas.";
        celda.colSpan = 2;

        fila.appendChild(celda);
        cuerpoTabla.appendChild(fila);

        return;
    }

    // Crear una fila por cada carrera almacenada
    listaCarreras.forEach(function(carrera, indice) {

        const fila = document.createElement("tr");

        const datos = [
            carrera.nombre
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
            eliminarCarrera(indice);
        });

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);
        fila.appendChild(celdaAcciones);

        cuerpoTabla.appendChild(fila);

    });
}

// Elimina un egresado después de solicitar confirmación al usuario
function eliminarCarrera(indice) {

    const listaCarreras = obtenerCarreras();
    const carrera = listaCarreras[indice];

    // Verificar que el registro todavía exista en la lista
    if (carrera === undefined) {
        swalAlertError("No fue posible encontrar la carrera seleccionada.");
        return;
    }

    // Solicitar confirmación antes de eliminar permanentemente el registro
    Swal.fire({
        title: "¿Eliminar carrera?",
        text: "Se eliminará el registro de " + carrera.nombre + ".",
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
        listaCarreras.splice(indice, 1);

        // Guardar nuevamente la lista sin el registro eliminado
        localStorage.setItem(
            "carreras",
            JSON.stringify(listaCarreras)
        );

        // Cancelar cualquier edición activa y actualizar la tabla
        finalizarEdicion();
        mostrarCarreras(listaCarreras);

        Swal.fire({
            title: "Carrera eliminada",
            text: "El registro fue eliminado correctamente.",
            icon: "success",
            confirmButtonColor: "#0056b3"
        });

    });
}

// Carga en el formulario los datos del egresado seleccionado
function iniciarEdicion(indice) {

    const listaCarreras = obtenerCarreras();
    const carrera = listaCarreras[indice];

    // Evita intentar editar una posición que ya no exista en la lista
    if (carrera === undefined) {
        swalAlertError("No fue posible encontrar la carrera seleccionada.");
        return;
    }

    document.getElementById("nombre-carrera").value =
        carrera.nombre;

    // Cambiar el formulario de modo registro a modo edición
    indiceCarreraEditando = indice;
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
    indiceCarreraEditando = null;
    botonRegistrar.textContent = "Registrar carrera";
    botonCancelarEdicion.hidden = true;
}

botonCancelarEdicion.addEventListener("click", function() {
    finalizarEdicion();
});

mostrarCarreras(obtenerCarreras());
