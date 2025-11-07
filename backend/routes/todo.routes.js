// /routes/todo.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo.controller');
const auth = require('../middleware/auth.middleware');

// Ruta Raíz: /api/todos
// GET  -> Obtener todos (con filtros)
// POST -> Crear uno nuevo
// Ruta Raíz: /api/todos
// Ahora, 'auth' se ejecuta ANTES que el controlador.
router.route('/')
  .get(auth, controller.getTodos)    // <-- 2. APLICA 'auth'
  .post(auth, controller.createTodo); // <-- 2. APLICA 'auth'

// Ruta Específica: /api/todos/:id
// PUT    -> Editar uno (por ID)
// DELETE -> Borrar uno (por ID)
// Ruta Específica: /api/todos/:id
router.route('/:id')
  .put(auth, controller.updateTodo)    // <-- 2. APLICA 'auth'
  .delete(auth, controller.deleteTodo); // <-- 2. APLICA 'auth'

module.exports = router;