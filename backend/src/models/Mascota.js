const mongoose = require('mongoose');

const vacunaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  imagen: {
    type: String,
    default: ''
  },
  proximaDosis: {
    type: Date
  },
  veterinario: {
    type: String
  }
}, { _id: true });

const mascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la mascota es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  años: {
    type: Number,
    required: [true, 'La edad es obligatoria'],
    min: [0, 'La edad no puede ser negativa'],
    max: [50, 'La edad no puede exceder 50 años']
  },
  raza: {
    type: String,
    required: [true, 'La raza es obligatoria'],
    trim: true
  },
  estado: {
    type: String,
    enum: ['saludable', 'enfermo', 'en tratamiento', 'recuperación'],
    default: 'saludable'
  },
  genero: {
    type: String,
    enum: ['macho', 'hembra'],
    required: [true, 'El género es obligatorio']
  },
  imagen: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  vacunas: [vacunaSchema],
  peso: {
    type: Number,
    min: [0, 'El peso no puede ser negativo']
  },
  colorPelaje: {
    type: String
  },
  observaciones: {
    type: String,
    maxlength: [1000, 'Las observaciones no pueden exceder 1000 caracteres']
  },
  propietario: {
    nombre: String,
    telefono: String,
    email: String
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índices
mascotaSchema.index({ nombre: 'text', raza: 'text' });
mascotaSchema.index({ estado: 1 });

// Virtual para ID
mascotaSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Configuración JSON
mascotaSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

// Método para obtener próximas vacunas
mascotaSchema.methods.getProximasVacunas = function() {
  const hoy = new Date();
  return this.vacunas.filter(vacuna => {
    return vacuna.proximaDosis && vacuna.proximaDosis > hoy;
  }).sort((a, b) => a.proximaDosis - b.proximaDosis);
};

const Mascota = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascota;
