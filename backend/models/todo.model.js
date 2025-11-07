// /models/todo.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Este es el molde para los pendientes
const todoSchema = new Schema({
  text: { type: String, required: true },
  priority: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  category: { type: String, required: false },
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Hace referencia al modelo 'User'
    required: true
  } // Opcional
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

// "Todo" será el nombre de la colección en la base de datos
module.exports = mongoose.model('Todo', todoSchema);
