const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/database');

dotenv.config(); // Cargar variables de entorno
connectDB();     // Conectar a MongoDB

const app = express();
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando y conectado a MongoDB');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

