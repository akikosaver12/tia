const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Secret key para JWT (en producción debe estar en .env)
const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro_cambiar_en_produccion';

// Middleware para proteger rutas
const protect = async (req, res, next) => {
  let token;

  // Verificar si el token viene en los headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Obtener el usuario del token (sin la contraseña)
      req.usuario = await Usuario.findById(decoded.id).select('-password');

      if (!req.usuario) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      if (!req.usuario.active) {
        return res.status(401).json({ message: 'Usuario inactivo' });
      }

      next();
    } catch (error) {
      console.error('Error en autenticación:', error);
      return res.status(401).json({ message: 'Token no válido o expirado' });
    }
  } else {
    return res.status(401).json({ message: 'No autorizado, no se proporcionó token' });
  }
};

// Middleware para verificar rol de admin
const admin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado. Solo administradores.' });
  }
};

// Función para generar JWT
const generarToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d' // Token expira en 30 días
  });
};

module.exports = { protect, admin, generarToken, JWT_SECRET };