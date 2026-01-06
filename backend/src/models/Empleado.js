const mongoose = require('mongoose');

// Sub-esquema para Operaciones Médicas
const operacionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la operación es obligatorio']
  },
  descripcion: {
    type: String,
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria']
  },
  hospital: String,
  medico: String,
  observaciones: String
}, { _id: true, timestamps: true });

// Sub-esquema para Citas Médicas
const citaMedicaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: [true, 'El tipo de cita es obligatorio']
  },
  descripcion: {
    type: String,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria']
  },
  hora: String,
  lugar: String,
  medico: String,
  estado: {
    type: String,
    enum: ['programada', 'completada', 'cancelada'],
    default: 'programada'
  }
}, { _id: true, timestamps: true });

// Esquema principal de Empleado
const empleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  apellidos: {
    type: String,
    required: [true, 'Los apellidos son obligatorios'],
    trim: true,
    maxlength: [100, 'Los apellidos no pueden exceder 100 caracteres']
  },
  edad: {
    type: Number,
    required: [true, 'La edad es obligatoria'],
    min: [18, 'La edad mínima es 18 años'],
    max: [100, 'La edad máxima es 100 años']
  },
  oficio: {
    type: String,
    required: [true, 'El oficio/sector es obligatorio'],
    trim: true
  },
  eps: {
    type: String,
    required: [true, 'La EPS es obligatoria'],
    trim: true
  },
  imagen: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Sin+Foto'
  },
  
  // Información adicional
  telefono: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  direccion: {
    type: String,
    maxlength: [200, 'La dirección no puede exceder 200 caracteres']
  },
  
  // Información médica
  tipoSangre: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Desconocido'],
    default: 'Desconocido'
  },
  alergias: [{
    type: String
  }],
  enfermedadesPreexistentes: [{
    type: String
  }],
  
  // Historial médico
  operaciones: [operacionSchema],
  citasMedicas: [citaMedicaSchema],
  
  // Estado
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'incapacidad', 'vacaciones'],
    default: 'activo'
  },
  
  observaciones: {
    type: String,
    maxlength: [1000, 'Las observaciones no pueden exceder 1000 caracteres']
  },
  
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índices para búsquedas
empleadoSchema.index({ nombre: 'text', apellidos: 'text', oficio: 'text' });
empleadoSchema.index({ estado: 1 });
empleadoSchema.index({ eps: 1 });

// Virtual para nombre completo
empleadoSchema.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellidos}`;
});

// Virtual para ID
empleadoSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Configuración JSON
empleadoSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

// Método para obtener próximas citas
empleadoSchema.methods.getProximasCitas = function() {
  const hoy = new Date();
  return this.citasMedicas
    .filter(cita => cita.fecha >= hoy && cita.estado === 'programada')
    .sort((a, b) => a.fecha - b.fecha);
};

// Método para obtener historial de operaciones
empleadoSchema.methods.getHistorialOperaciones = function() {
  return this.operaciones.sort((a, b) => b.fecha - a.fecha);
};

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;