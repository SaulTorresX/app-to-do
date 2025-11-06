require('dotenv').config();
console.log("MONGODB_URI desde .env:", process.env.MONGODB_URI);
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a la base de datos en MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
