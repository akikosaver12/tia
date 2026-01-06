const express = require('express');
const router = express.Router();
const {
  getAllEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  addOperacion,
  updateOperacion,
  deleteOperacion,
  addCitaMedica,
  updateCitaMedica,
  deleteCitaMedica,
  getProximasCitas
} = require('../controllers/Empleadocontroller');
const { protect, admin } = require('../middleware/Auth');

// Todas las rutas requieren autenticación y rol de admin
router.use(protect);
router.use(admin);

// Rutas principales de empleados
router.route('/')
  .get(getAllEmpleados)      // GET /api/empleados
  .post(createEmpleado);     // POST /api/empleados

router.route('/:id')
  .get(getEmpleadoById)      // GET /api/empleados/:id
  .put(updateEmpleado)       // PUT /api/empleados/:id
  .delete(deleteEmpleado);   // DELETE /api/empleados/:id

// Rutas de operaciones médicas
router.post('/:id/operaciones', addOperacion);                           // POST /api/empleados/:id/operaciones
router.put('/:id/operaciones/:operacionId', updateOperacion);            // PUT /api/empleados/:id/operaciones/:operacionId
router.delete('/:id/operaciones/:operacionId', deleteOperacion);         // DELETE /api/empleados/:id/operaciones/:operacionId

// Rutas de citas médicas
router.post('/:id/citas', addCitaMedica);                                // POST /api/empleados/:id/citas
router.put('/:id/citas/:citaId', updateCitaMedica);                      // PUT /api/empleados/:id/citas/:citaId
router.delete('/:id/citas/:citaId', deleteCitaMedica);                   // DELETE /api/empleados/:id/citas/:citaId
router.get('/:id/proximas-citas', getProximasCitas);                     // GET /api/empleados/:id/proximas-citas

module.exports = router;