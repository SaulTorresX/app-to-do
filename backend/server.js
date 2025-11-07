// backend/server.js

require('dotenv').config(); // Carga el .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- 1. Importa AMBAS rutas ---
const todoRoutes = require('./routes/todo.routes');
const authRoutes = require('./routes/auth.routes.js');

// --- Configuración ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors()); // Permite que React se conecte
app.use(express.json()); // Acepta JSON en el body

// --- Conexión DB ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado (local)'))
  .catch(err => console.error(err));

// --- 3. Usa AMBAS rutas (¡una sola vez!) ---
app.use('/api/auth', authRoutes); 
app.use('/api/todos', todoRoutes); 

// --- Iniciar ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});