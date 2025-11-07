// /controllers/todo.controller.js
const Todo = require('../models/todo.model');

// OBTENER (los del usuario logueado)
exports.getTodos = async (req, res) => {
  try {
    const { priority, category, sortBy } = req.query;
    
    //El filtro base es el ID del usuario
    let filter = { user: req.user }; 

    if (priority) filter.priority = priority;
    if (category) filter.category = { $regex: category, $options: 'i' };

    let sortOptions = {};
    if (sortBy === 'priority') {
      sortOptions.priority = 'desc';
    } else {
      sortOptions.dueDate = 'asc'; 
    }
    
    // find(filter) ahora busca { user: '...', priority: '...' }
    const todos = await Todo.find(filter).sort(sortOptions); 
    res.json(todos);
  } catch (err) {
    console.error("¡ERROR EN EL BACKEND (getTodos)!", err); 
    res.status(500).json({ message: err.message });
  }
};

// CREAR 
exports.createTodo = async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    category: req.body.category,
    user: req.user //El ID viene del middleware 'auth'
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// --- EDITAR y BORRAR (verificar que no editen lo de otros) 

exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pendiente eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};