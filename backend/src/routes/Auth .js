const express = require('express');
const router = express.Router();
const {
  login,
  register,
  getPerfil,
  verificarToken
} = require('../controllers/Authcontroller');
const { protect } = require('../middleware/Auth');

// Rutas públicas
router.post('/login', login);
router.post('/register', register);

// Rutas protegidas
router.get('/perfil', protect, getPerfil);
router.get('/verificar', protect, verificarToken);

module.exports = router;