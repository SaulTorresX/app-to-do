// backend/controllers/auth.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- REGISTRO ---
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Validar input
    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    // 2. Revisar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya existe' });
    }

    // 3. Hashear la contraseña 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Crear y guardar el nuevo usuario
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado exitosamente' });

  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Validar input
    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    // 2. Buscar al usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 3. Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 4. Crear el token 
    const payload = {
      id: user._id, // Guardamos el ID del usuario en el token
      username: user.username
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    // 5. Enviar el token al cliente
    res.json({
      message: 'Login exitoso',
      token: token,
      username: user.username
    });

  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};