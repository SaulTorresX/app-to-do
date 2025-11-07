// backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

// "next" es la función que llamamos para que pase al siguiente controlador
const auth = (req, res, next) => {
  // 1. Buscar el token en los headers
  const token = req.header('x-auth-token');

  // 2. Si no hay token, no hay acceso
  if (!token) {
    return res.status(401).json({ message: 'No hay token, acceso denegado' });
  }

  try {
    // 3. Verificar el token (¿es válido? ¿no ha expirado?)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Si es válido, añadimos los datos del usuario (el payload)
    //    al objeto 'req' para que los siguientes controladores lo usen
    req.user = decoded.id; // <-- Guardar el ID del usuario
    next(); // <-- Continuar

  } catch (err) {
    res.status(401).json({ message: 'Token no es válido' });
  }
};

module.exports = auth;