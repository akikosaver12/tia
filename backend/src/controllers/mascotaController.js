const Mascota = require('../models/Mascota');

// @desc    Obtener todas las mascotas
// @route   GET /api/mascotas
// @access  Public
const getAllMascotas = async (req, res) => {
  try {
    const { estado, raza, search } = req.query;
    
    let filters = { active: true };
    
    if (estado) {
      filters.estado = estado;
    }
    
    if (raza) {
      filters.raza = { $regex: raza, $options: 'i' };
    }
    
    if (search) {
      filters.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { raza: { $regex: search, $options: 'i' } }
      ];
    }
    
    const mascotas = await Mascota.find(filters).sort({ createdAt: -1 });
    
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener mascotas', 
      error: error.message 
    });
  }
};

// @desc    Obtener una mascota por ID
// @route   GET /api/mascotas/:id
// @access  Public
const getMascotaById = async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    
    res.status(200).json(mascota);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener mascota', 
      error: error.message 
    });
  }
};

// @desc    Obtener mascota por nombre
// @route   GET /api/mascotas/nombre/:nombre
// @access  Public
const getMascotaByNombre = async (req, res) => {
  try {
    const mascota = await Mascota.findOne({ 
      nombre: new RegExp(req.params.nombre, 'i'),
      active: true
    });
    
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    
    res.status(200).json(mascota);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener mascota', 
      error: error.message 
    });
  }
};

// @desc    Crear una nueva mascota
// @route   POST /api/mascotas
// @access  Public
const createMascota = async (req, res) => {
  try {
    const mascota = await Mascota.create(req.body);
    
    res.status(201).json({
      message: 'Mascota creada exitosamente',
      mascota
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al crear mascota', 
      error: error.message 
    });
  }
};

// @desc    Actualizar una mascota
// @route   PUT /api/mascotas/:id
// @access  Public
const updateMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    
    res.status(200).json({
      message: 'Mascota actualizada exitosamente',
      mascota
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar mascota', 
      error: error.message 
    });
  }
};

// @desc    Eliminar una mascota (soft delete)
// @route   DELETE /api/mascotas/:id
// @access  Public
const deleteMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    
    res.status(200).json({
      message: 'Mascota eliminada exitosamente',
      mascota
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar mascota', 
      error: error.message 
    });
  }
};

// @desc    Agregar vacuna a una mascota
// @route   POST /api/mascotas/:id/vacunas
// @access  Public
const addVacuna = async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    
    mascota.vacunas.push(req.body);
    await mascota.save();
    
    res.status(201).json({
      message: 'Vacuna agregada exitosamente',
      mascota
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al agregar vacuna', 
      error: error.message 
    });
  }
};

// @desc    Obtener próximas vacunas de una mascota
// @route   GET /api/mascotas/:id/proximas-vacunas
// @access  Public
const getProximasVacunas = async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    
    const proximasVacunas = mascota.getProximasVacunas();
    
    res.status(200).json({
      mascota: mascota.nombre,
      proximasVacunas
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener próximas vacunas', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllMascotas,
  getMascotaById,
  getMascotaByNombre,
  createMascota,
  updateMascota,
  deleteMascota,
  addVacuna,
  getProximasVacunas
};
