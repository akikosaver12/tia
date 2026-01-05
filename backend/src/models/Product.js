const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  image: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
    default: 'https://via.placeholder.com/300'
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: ['electronics', 'clothing', 'food', 'toys', 'accessories', 'other'],
    default: 'other'
  },
  description: {
    type: String,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true, // Crea automáticamente createdAt y updatedAt
  versionKey: false
});

// Índices para mejorar rendimiento de búsquedas
productSchema.index({ name: 'text', category: 1 });
productSchema.index({ price: 1 });

// Método virtual para obtener el ID como 'id' en lugar de '_id'
productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Asegurar que los virtuals se incluyan cuando se convierte a JSON
productSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
