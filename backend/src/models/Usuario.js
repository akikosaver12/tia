const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El usuario es obligatorio'],
    unique: true,
    trim: true,
    minlength: [3, 'El usuario debe tener al menos 3 caracteres']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  nombre: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'empleado'],
    default: 'admin'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  // Solo hashear si la contraseña fue modificada
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = async function(passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

// No devolver la contraseña en las respuestas JSON
usuarioSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;