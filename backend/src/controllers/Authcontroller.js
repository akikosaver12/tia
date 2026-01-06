const Usuario = require('../models/Usuario');
const { generarToken } = require('../middleware/Auth');

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que se enviaron los datos
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Por favor proporciona usuario y contraseña' 
      });
    }

    // Buscar el usuario
    const usuario = await Usuario.findOne({ username });

    if (!usuario) {
      return res.status(401).json({ 
        message: 'Credenciales inválidas' 
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.active) {
      return res.status(401).json({ 
        message: 'Usuario inactivo. Contacta al administrador.' 
      });
    }

    // Comparar contraseñas
    const passwordCorrecto = await usuario.compararPassword(password);

    if (!passwordCorrecto) {
      return res.status(401).json({ 
        message: 'Credenciales inválidas' 
      });
    }

    // Generar token
    const token = generarToken(usuario._id);

    // Responder con el usuario y el token
    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        username: usuario.username,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      message: 'Error en el servidor', 
      error: error.message 
    });
  }
};

// @desc    Registro de nuevo usuario (solo admin puede crear)
// @route   POST /api/auth/register
// @access  Public (cambiar a Private/Admin en producción)
const register = async (req, res) => {
  try {
    const { username, password, nombre, rol } = req.body;

    // Validar datos requeridos
    if (!username || !password || !nombre) {
      return res.status(400).json({ 
        message: 'Por favor proporciona todos los campos requeridos' 
      });
    }

    // Verificar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({ username });

    if (usuarioExiste) {
      return res.status(400).json({ 
        message: 'El usuario ya existe' 
      });
    }

    // Crear nuevo usuario
    const usuario = await Usuario.create({
      username,
      password,
      nombre,
      rol: rol || 'admin'
    });

    // Generar token
    const token = generarToken(usuario._id);

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      token,
      usuario: {
        id: usuario._id,
        username: usuario.username,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ 
      message: 'Error al crear usuario', 
      error: error.message 
    });
  }
};

// @desc    Obtener perfil del usuario autenticado
// @route   GET /api/auth/perfil
// @access  Private
const getPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      id: usuario._id,
      username: usuario.username,
      nombre: usuario.nombre,
      rol: usuario.rol
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener perfil', 
      error: error.message 
    });
  }
};

// @desc    Verificar si el token es válido
// @route   GET /api/auth/verificar
// @access  Private
const verificarToken = async (req, res) => {
  res.json({
    valido: true,
    usuario: {
      id: req.usuario._id,
      username: req.usuario.username,
      nombre: req.usuario.nombre,
      rol: req.usuario.rol
    }
  });
};

module.exports = {
  login,
  register,
  getPerfil,
  verificarToken
};