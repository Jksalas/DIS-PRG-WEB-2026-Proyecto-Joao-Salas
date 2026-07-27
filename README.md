<!-- Autor: Joao Salas -->

# Sistema de Gestión de Egresados - Universidad CENFOTEC

Proyecto académico del curso Diseño y Programación Web. Sistema de Gestión de Egresados de la Universidad CENFOTEC.

- **Autor:** Joao Salas
- **Institución:** Universidad CENFOTEC
- **Periodo:** 2026

## Funcionalidades implementadas

- Página pública de inicio con beneficios, actividades y acceso a las secciones.
- Inicio de sesión mediante correo institucional e identificación.
- Consulta y actualización persistente de información personal y profesional.
- Gestión de egresados con creación, listado, edición y eliminación.
- Gestión de carreras con creación, listado, edición y eliminación.
- Validación de campos obligatorios y formatos mediante JavaScript.
- Mensajes de validación y confirmación mediante SweetAlert2.
- Persistencia de egresados, carreras y usuario activo en `localStorage`.

## Páginas

- `pagina_inicio.html`: página pública de inicio.
- `login.html`: autenticación de egresados registrados.
- `perfil_egresado.html`: consulta y actualización del perfil activo.
- `gestion_egresado.html`: administración de registros de egresados.
- `gestion_carreras.html`: administración de carreras académicas.

## Estructura

```text
.
|-- assets/
|   |-- egresados1.png
|   |-- logo_cenfotec.png
|   `-- logo_cenfotec1.png
|-- css/
|   |-- estilos_base.css
|   |-- forms.css
|   `-- tarjetas.css
|-- docs/
|-- js/
|   |-- gestion_carreras.js
|   |-- gestion_egresado.js
|   |-- login.js
|   `-- perfil_egresado.js
|-- gestion_carreras.html
|-- gestion_egresado.html
|-- login.html
|-- pagina_inicio.html
|-- perfil_egresado.html
`-- README.md
```

## Almacenamiento local

El proyecto utiliza las siguientes claves de `localStorage`:

- `egresados`: arreglo de objetos con información personal y profesional.
- `carreras`: arreglo de objetos con las carreras registradas.
- `usuarioActivo`: identificación del egresado que inició sesión.

Los datos se almacenan únicamente en el navegador donde se utiliza el sistema.

## Uso

1. Abrir `pagina_inicio.html` en un navegador.
2. Registrar un egresado desde `gestion_egresado.html`.
3. Iniciar sesión desde `login.html` usando el correo institucional y la identificación como contraseña.
4. Consultar o actualizar la información desde `perfil_egresado.html`.
5. Crear, editar o eliminar egresados y carreras desde sus páginas de gestión.

## Tecnologías

- HTML5 semántico.
- CSS3.
- JavaScript.
- Web Storage API.
- SweetAlert2 mediante CDN.
