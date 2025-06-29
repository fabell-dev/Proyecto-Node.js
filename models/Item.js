const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: ['tecnologia', 'ciencia', 'deportes', 'entretenimiento', 'otros'],
    default: 'otros'
  },
  status: {
    type: String,
    enum: ['activo', 'inactivo', 'pendiente'],
    default: 'activo'
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para mejorar las consultas
itemSchema.index({ title: 'text', description: 'text' });
itemSchema.index({ category: 1 });
itemSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Item', itemSchema);
