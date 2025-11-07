# App de Pendientes (MERN)

Una aplicación web completa de "to-do list" construida con el stack MERN (MongoDB, Express, React, Node.js) y Vite, incluyendo autenticación de usuarios y rutas protegidas.

El proyecto sigue una arquitectura **monorepo**, con el código fuente separado en dos carpetas principales:
* `/backend`: La API REST del servidor (Node.js, Express).
* `/frontend`: La aplicación cliente (React, Vite).

## 🚀 Características

### Autenticación
* **Registro de Usuarios:** Creación de cuentas nuevas (hasheo de contraseñas con `bcrypt`).
* **Login de Usuarios:** Autenticación y generación de "JSON Web Tokens" (`JWT`).
* **Rutas Protegidas:** La API de "pendientes" está 100% protegida. Solo usuarios autenticados (con un token válido) pueden acceder a sus propios pendientes.

### Funcionalidad de la App
* **CRUD Completo:** Crear, Leer, Actualizar (Editar) y Eliminar pendientes.
* **Ligado a Usuario:** Cada pendiente está ligado al usuario que lo creó.
* **Filtrado:** Filtra la lista de pendientes por prioridad y categoría.
* **Ordenamiento:** Ordena los pendientes por "más cercanos a vencer" o "mayor prioridad".
* **Responsive:** La interfaz se adapta a dispositivos móviles y de escritorio.

## 🛠️ Stack Tecnológico

* **Backend:** Node.js, Express, Mongoose, JSON Web Token (JWT), bcrypt.js
* **Frontend:** React, Vite, React Router, Axios
* **Base de Datos:** MongoDB (requiere instalación local)

## 🏃 Cómo Correr el Proyecto

Para correr este proyecto, necesitarás tener **Node.js** y **MongoDB Community Server** instalados localmente.

### 1. Iniciar la Base de Datos

# 1. Navega a la carpeta del backend
cd backend

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor
npm run dev

Abre una segunda terminal y navega a la carpeta del frontend.

# 1. Navega a la carpeta del frontend
cd frontend

# 2. Instala las dependencias
npm install

# 3. Inicia el cliente de Vite
npm run dev

