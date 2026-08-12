<!-- Autor: Joao Salas -->

# Sistema de Gestión de Egresados - Universidad CENFOTEC

Proyecto académico del curso Diseño y Programación Web. La aplicación permite gestionar información de egresados y carreras, validar formularios, utilizar almacenamiento local y comunicarse con una API REST conectada a MongoDB Atlas.

- **Autor:** Joao Salas
- **Institución:** Universidad CENFOTEC
- **Periodo:** 2026
- **Rama de la entrega final:** `backend`

## Funcionalidades implementadas

- Página pública de inicio con información, beneficios y actividades.
- Inicio de sesión mediante correo institucional e identificación.
- Consulta y actualización de la información profesional del egresado activo.
- Gestión local de egresados con creación, listado, edición y eliminación.
- Validación de campos obligatorios y formatos mediante JavaScript.
- Mensajes de validación, confirmación y error mediante SweetAlert2.
- Consulta de carreras mediante una petición HTTP GET.
- Registro de carreras mediante una petición HTTP POST.
- Actualización automática del listado de carreras después de un POST exitoso.
- Manejo de operaciones asíncronas con `async`, `await` y `try/catch`.
- Persistencia de carreras en MongoDB Atlas.

## Estructura del proyecto

```text
.
|-- backend/
|   |-- models/
|   |-- routes/
|   |-- .env
|   |-- index.js
|   |-- package-lock.json
|   `-- package.json
|-- docs/
|-- frontend/
|   |-- assets/
|   |-- css/
|   |-- js/
|   |-- gestion_carreras.html
|   |-- gestion_egresado.html
|   |-- login.html
|   |-- pagina_inicio.html
|   `-- perfil_egresado.html
|-- .gitignore
`-- README.md
```

`backend/.env` y `backend/node_modules/` están excluidos del repositorio mediante `.gitignore`.

## Tecnologías

### Frontend

- HTML5 semántico.
- CSS3.
- JavaScript.
- Fetch API.
- Web Storage API.
- SweetAlert2 mediante CDN.

### Backend

- Node.js.
- Mongoose.
- MongoDB Atlas.

## Configuración del backend

### 1. Instalar dependencias

Desde la raíz del repositorio:

```powershell
cd backend
npm install
```

### 2. Configurar variables de entorno

Crear `backend/.env` con las variables proporcionadas para el proyecto:

```env
MONGODB_URI=conexion_de_mongodb_atlas
PORT=3000
```


### 3. Ejecutar el servidor

Dentro de `backend/`:

```powershell
node index.js
```

Cuando la configuración es correcta, la terminal muestra:

```text
Servidor corriendo en http://localhost:3000
MongoDB Atlas conectado
```

El backend debe mantenerse en ejecución mientras se utiliza la gestión de carreras.

## Ejecución del frontend

Abrir `frontend/pagina_inicio.html` mediante un servidor local, por ejemplo Live Server de Visual Studio Code. Desde la página inicial se puede navegar a las demás secciones.

## API REST de carreras

El frontend consume el siguiente recurso:

```text
http://localhost:3000/carreras
```

### Consultar carreras

```http
GET /carreras
```

La consulta se ejecuta automáticamente al cargar `gestion_carreras.html` y muestra el arreglo recuperado desde MongoDB.

### Registrar una carrera

```http
POST /carreras
Content-Type: application/json
```

Estructura enviada:

```json
{
  "nombre": "Ingeniería en Sistemas"
}
```

Después de un POST exitoso, el formulario se limpia y se realiza nuevamente el GET para actualizar la tabla sin recargar la página.

## Almacenamiento local

La gestión de egresados y el perfil utilizan `localStorage` :

- `egresados`: arreglo de objetos con información personal y profesional.
- `usuarioActivo`: identificación del egresado que inició sesión.

La gestión de carreras utiliza MongoDB Atlas y no almacena carreras en `localStorage`.

## Flujo de uso

1. Instalar las dependencias del backend.
2. Configurar `backend/.env`.
3. Ejecutar el backend con `node index.js`.
4. Abrir `frontend/pagina_inicio.html` mediante un servidor local.
5. Acceder a Gestión de carreras.
6. Consultar las carreras recuperadas mediante GET.
7. Registrar una carrera mediante POST.
8. Confirmar que la nueva carrera aparece automáticamente en la tabla.

