// Autor: Joao Salas

// Referencia al formulario que captura el nombre de una nueva carrera.
const formulario = document.getElementById("formularioCarrera");
const botonRegistrar = document.getElementById("btnRegistrar");

// Dirección del recurso de carreras expuesto por la API REST.
// Esta misma URL se utilizará para consultar (GET) y registrar (POST).
const API_CARRERAS = "http://localhost:3000/carreras";

console.log("El archivo JavaScript se cargó correctamente.");
console.log("Formulario encontrado:", formulario);

// Evitar envíos accidentales cuando el usuario presiona Enter dentro del campo.
formulario.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
    }

});


// En este bloque se valida la entrada y se crea el objeto esperado por la API.
formulario.addEventListener("submit", async function(event) {

    // Impedir que el navegador recargue la página al enviar el formulario.
    event.preventDefault();

    // Obtener el nombre y eliminar espacios innecesarios al inicio y al final.
    const nombreCarrera = document.getElementById("nombre-carrera").value.trim();
    const mensajeError = validarCarrera(nombreCarrera);

    // Detener el flujo si la función de validación devuelve un mensaje de error.
    if (mensajeError) {
        swalAlertError(mensajeError);
        return;
    }

    // El objeto coincide con la estructura mínima esperada por POST /carreras
    const carrera = {
        nombre: nombreCarrera
    };

    console.log("Formulario validado correctamente.");
    console.log("Objeto preparado para enviar al servidor:", carrera);

    // Bloquear temporalmente el botón para evitar varios POST simultáneos.
    botonRegistrar.disabled = true;
    botonRegistrar.textContent = "Registrando...";

    try {
        const carreraCreada = await guardarCarreraServidor(carrera);

        console.log("Carrera creada por el servidor:", carreraCreada);

        // Limpiar el formulario solamente después de recibir una respuesta exitosa.
        formulario.reset();

        // Repetir el GET para mostrar inmediatamente el registro creado en MongoDB.
        await cargarCarrerasServidor();

        swalAlertPass();

    } catch (error) {
        // Conservar el contenido del formulario para que el usuario pueda corregirlo.
        const mensaje = error instanceof TypeError
            ? "No fue posible conectar con el servidor. Verifica que el backend esté ejecutándose en el puerto 3000."
            : error.message;

        swalAlertServidor(mensaje);

    } finally {
        // Restaurar siempre el botón, tanto después del éxito como del error.
        botonRegistrar.disabled = false;
        botonRegistrar.textContent = "Registrar carrera";
    }

});

//----------------------------------------------------
// FUNCIONES DE VALIDACIÓN
//----------------------------------------------------

// Centralizar las alertas de validación para mantener el mismo diseño y formato.
function swalAlertError(mensaje) {
    Swal.fire({
        title: "Error de validación",
        text: mensaje,
        icon: "warning",
        confirmButtonText: "Intentar de nuevo",
        confirmButtonColor: "#0056b3"
    });
}

// Confirmar al usuario que MongoDB almacenó correctamente la nueva carrera.
function swalAlertPass() {
    Swal.fire({
        title: "Carrera registrada",
        text: "La carrera fue almacenada correctamente en el servidor.",
        icon: "success",
        confirmButtonColor: "#0056b3"
    });
}

// Informar errores HTTP o de conexión ocurridos durante el POST.
function swalAlertServidor(mensaje) {
    Swal.fire({
        title: "Error del servidor",
        text: mensaje,
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
        confirmButtonColor: "#0056b3"
    });
}

// Comprobar que el nombre sea obligatorio y contenga solamente letras y espacios.
// La función devuelve un texto cuando existe un error y null cuando el dato es válido.
function validarCarrera(nombreCarrera) {

    console.log("Iniciando validación de nombre de carrera...");
    const regexNombreCarrera = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombreCarrera === "") {
        return "El nombre de carrera es obligatorio.";
    }

    if (!regexNombreCarrera.test(nombreCarrera)) {
        return "El nombre de carrera debe contener solo letras y espacios.";
    }

    return null;
}

//----------------------------------------------------
// COMUNICACIÓN CON LA API REST
//----------------------------------------------------

// Realizar una petición HTTP GET para obtener todas las carreras de MongoDB.
async function obtenerCarrerasServidor() {

    try {
        // fetch devuelve una promesa; await pausa esta función hasta recibir la respuesta.
        const respuesta = await fetch(API_CARRERAS);

        // Una respuesta HTTP con error no provoca por sí sola el rechazo de fetch
        if (!respuesta.ok) {
            throw new Error(
                "No fue posible consultar las carreras. Código HTTP: " +
                respuesta.status
            );
        }

        // Convertir el cuerpo JSON de la respuesta en un valor utilizable por JavaScript.
        const carreras = await respuesta.json();

        // El backend debe responder con un arreglo de objetos
        if (!Array.isArray(carreras)) {
            throw new Error("El servidor devolvió una respuesta con formato inesperado.");
        }
        return carreras;

    } catch (error) {
        console.error("Error al consultar las carreras del servidor:", error);
        // Propagar el error permite que la interfaz decida cómo mostrárselo al usuario
        throw error;
    }
}

// Realizar una petición HTTP POST para almacenar una nueva carrera en MongoDB.
// Recibe el objeto validado del formulario y devuelve la carrera creada por el servidor.
async function guardarCarreraServidor(carrera) {

    try {
        const respuesta = await fetch(API_CARRERAS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(carrera)
        });

        // Intentar leer el cuerpo JSON tanto en respuestas exitosas como fallidas.
        // El backend utiliza este cuerpo para devolver la carrera o un mensaje de error.
        let datosRespuesta;

        try {
            datosRespuesta = await respuesta.json();
        } catch (errorConversion) {
            datosRespuesta = {};
        }

        // fetch no rechaza automáticamente las respuestas 400 o 500.
        // Por eso se debe comprobar el estado HTTP antes de considerar exitoso el POST.
        if (!respuesta.ok) {
            const mensajeServidor =
                datosRespuesta.mensajeError ||
                datosRespuesta.msj ||
                "No fue posible registrar la carrera. Código HTTP: " + respuesta.status;

            throw new Error(mensajeServidor);
        }

        return datosRespuesta;

    } catch (error) {
        console.error("Error al registrar la carrera en el servidor:", error);

        // Propagar el error permite que el evento submit decida cómo informar al usuario.
        throw error;
    }
}

// Convertir el arreglo recibido mediante GET en filas visibles dentro de la tabla.
// Esta función se limita a presentar datos y no realiza nuevas peticiones al servidor.
function mostrarCarrerasServidor(listaCarreras) {

    const cuerpoTabla = document.getElementById("lista-carreras-servidor");
    // Retirar el mensaje provisional y cualquier resultado anterior
    cuerpoTabla.replaceChildren();

    // Presentar un estado vacío válido cuando MongoDB no contiene carreras.
    if (listaCarreras.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.textContent = "No hay carreras almacenadas en el servidor.";
        celda.colSpan = 3;

        fila.appendChild(celda);
        cuerpoTabla.appendChild(fila);
        return;
    }

    // Crear una fila segura por cada objeto recibido desde el servidor
    listaCarreras.forEach(function(carrera) {
        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = carrera.nombre || "Nombre no disponible";

        const celdaDescripcion = document.createElement("td");
        celdaDescripcion.textContent = carrera.descripcion || "Sin descripción";

        const celdaFecha = document.createElement("td");
        celdaFecha.textContent = formatearFechaServidor(carrera.createdAt);

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaFecha);
        cuerpoTabla.appendChild(fila);
    });
}

// Convertir el valor ISO de createdAt, generado por MongoDB, a una fecha legible.
// Si el servidor no envía la fecha o el valor es inválido, se muestra un texto alternativo.
function formatearFechaServidor(fechaServidor) {

    if (!fechaServidor) {
        return "Fecha no disponible";
    }

    const fecha = new Date(fechaServidor);

    if (Number.isNaN(fecha.getTime())) {
        return "Fecha no disponible";
    }

    return fecha.toLocaleDateString("es-CR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

// Coordinar el flujo completo de consulta: mostrar la carga, esperar el GET
// y decidir si se deben presentar carreras o un mensaje de error en la tabla.
async function cargarCarrerasServidor() {

    mostrarMensajeTablaServidor("Consultando carreras en el servidor...");

    try {
        const carreras = await obtenerCarrerasServidor();
        mostrarCarrerasServidor(carreras);
    } catch (error) {
        // Los errores TypeError normalmente indican que fetch no pudo conectarse.
        // Los demás errores contienen el mensaje HTTP o de formato creado anteriormente.
        const mensaje = error instanceof TypeError
            ? "No fue posible conectar con el servidor. Verifica que el backend esté ejecutándose en el puerto 3000."
            : error.message;

        mostrarMensajeTablaServidor(mensaje);
    }
}

// Construir una fila informativa reutilizable para estados de carga o error.
// colSpan permite que el mensaje ocupe las tres columnas de la tabla del servidor.
function mostrarMensajeTablaServidor(mensaje) {

    const cuerpoTabla = document.getElementById("lista-carreras-servidor");
    const fila = document.createElement("tr");
    const celda = document.createElement("td");

    celda.textContent = mensaje;
    celda.colSpan = 3;

    fila.appendChild(celda);
    cuerpoTabla.replaceChildren(fila);
}

// Iniciar la consulta automática cuando el navegador termine de construir el DOM.
// De esta manera, la tabla se llena sin que el usuario tenga que recargarla manualmente.
document.addEventListener("DOMContentLoaded", function() {
    cargarCarrerasServidor();
});
