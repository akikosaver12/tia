const express = require('express');
const router = express.Router();
const {
  getAllMascotas,
  getMascotaById,
  getMascotaByNombre,
  createMascota,
  updateMascota,
  deleteMascota,
  addVacuna,
  getProximasVacunas
} = require('../controllers/mascotaController');

// Rutas de mascotas
router.route('/')
  .get(getAllMascotas)     // GET /api/mascotas
  .post(createMascota);    // POST /api/mascotas

// Ruta para buscar por nombre (DEBE ir antes de /:id)
router.get('/nombre/:nombre', getMascotaByNombre);  // GET /api/mascotas/nombre/:nombre

router.route('/:id')
  .get(getMascotaById)     // GET /api/mascotas/:id
  .put(updateMascota)      // PUT /api/mascotas/:id
  .delete(deleteMascota);  // DELETE /api/mascotas/:id

// Rutas de vacunas
router.post('/:id/vacunas', addVacuna);  // POST /api/mascotas/:id/vacunas
router.get('/:id/proximas-vacunas', getProximasVacunas);  // GET /api/mascotas/:id/proximas-vacunas

module.exports = router;
