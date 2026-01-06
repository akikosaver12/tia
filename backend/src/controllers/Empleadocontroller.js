const Empleado = require('../models/Empleado');

// @desc    Obtener todos los empleados
// @route   GET /api/empleados
// @access  Private/Admin
const getAllEmpleados = async (req, res) => {
  try {
    const { estado, oficio, eps, search } = req.query;
    
    let filters = { active: true };
    
    if (estado) {
      filters.estado = estado;
    }
    
    if (oficio) {
      filters.oficio = { $regex: oficio, $options: 'i' };
    }
    
    if (eps) {
      filters.eps = { $regex: eps, $options: 'i' };
    }
    
    if (search) {
      filters.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { apellidos: { $regex: search, $options: 'i' } },
        { oficio: { $regex: search, $options: 'i' } }
      ];
    }
    
    const empleados = await Empleado.find(filters).sort({ createdAt: -1 });
    
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener empleados', 
      error: error.message 
    });
  }
};

// @desc    Obtener un empleado por ID
// @route   GET /api/empleados/:id
// @access  Private/Admin
const getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener empleado', 
      error: error.message 
    });
  }
};

// @desc    Crear un nuevo empleado
// @route   POST /api/empleados
// @access  Private/Admin
const createEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.create(req.body);
    
    res.status(201).json({
      message: 'Empleado creado exitosamente',
      empleado
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al crear empleado', 
      error: error.message 
    });
  }
};

// @desc    Actualizar un empleado
// @route   PUT /api/empleados/:id
// @access  Private/Admin
const updateEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    res.status(200).json({
      message: 'Empleado actualizado exitosamente',
      empleado
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar empleado', 
      error: error.message 
    });
  }
};

// @desc    Eliminar un empleado (soft delete)
// @route   DELETE /api/empleados/:id
// @access  Private/Admin
const deleteEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    res.status(200).json({
      message: 'Empleado eliminado exitosamente',
      empleado
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar empleado', 
      error: error.message 
    });
  }
};

// ============ OPERACIONES MÉDICAS ============

// @desc    Agregar operación médica a un empleado
// @route   POST /api/empleados/:id/operaciones
// @access  Private/Admin
const addOperacion = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    empleado.operaciones.push(req.body);
    await empleado.save();
    
    res.status(201).json({
      message: 'Operación agregada exitosamente',
      empleado
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al agregar operación', 
      error: error.message 
    });
  }
};

// @desc    Actualizar operación médica
// @route   PUT /api/empleados/:id/operaciones/:operacionId
// @access  Private/Admin
const updateOperacion = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    const operacion = empleado.operaciones.id(req.params.operacionId);
    
    if (!operacion) {
      return res.status(404).json({ message: 'Operación no encontrada' });
    }
    
    Object.assign(operacion, req.body);
    await empleado.save();
    
    res.status(200).json({
      message: 'Operación actualizada exitosamente',
      empleado
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar operación', 
      error: error.message 
    });
  }
};

// @desc    Eliminar operación médica
// @route   DELETE /api/empleados/:id/operaciones/:operacionId
// @access  Private/Admin
const deleteOperacion = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    empleado.operaciones.pull(req.params.operacionId);
    await empleado.save();
    
    res.status(200).json({
      message: 'Operación eliminada exitosamente',
      empleado
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar operación', 
      error: error.message 
    });
  }
};

// ============ CITAS MÉDICAS ============

// @desc    Agregar cita médica a un empleado
// @route   POST /api/empleados/:id/citas
// @access  Private/Admin
const addCitaMedica = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    empleado.citasMedicas.push(req.body);
    await empleado.save();
    
    res.status(201).json({
      message: 'Cita médica agregada exitosamente',
      empleado
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al agregar cita médica', 
      error: error.message 
    });
  }
};

// @desc    Actualizar cita médica
// @route   PUT /api/empleados/:id/citas/:citaId
// @access  Private/Admin
const updateCitaMedica = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    const cita = empleado.citasMedicas.id(req.params.citaId);
    
    if (!cita) {
      return res.status(404).json({ message: 'Cita médica no encontrada' });
    }
    
    Object.assign(cita, req.body);
    await empleado.save();
    
    res.status(200).json({
      message: 'Cita médica actualizada exitosamente',
      empleado
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar cita médica', 
      error: error.message 
    });
  }
};

// @desc    Eliminar cita médica
// @route   DELETE /api/empleados/:id/citas/:citaId
// @access  Private/Admin
const deleteCitaMedica = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    empleado.citasMedicas.pull(req.params.citaId);
    await empleado.save();
    
    res.status(200).json({
      message: 'Cita médica eliminada exitosamente',
      empleado
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar cita médica', 
      error: error.message 
    });
  }
};

// @desc    Obtener próximas citas de un empleado
// @route   GET /api/empleados/:id/proximas-citas
// @access  Private/Admin
const getProximasCitas = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    const proximasCitas = empleado.getProximasCitas();
    
    res.status(200).json({
      empleado: empleado.nombreCompleto,
      proximasCitas
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener próximas citas', 
      error: error.message 
    });
  }
};

module.exports = {
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
};