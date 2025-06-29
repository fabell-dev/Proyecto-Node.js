const express = require('express');
const { body } = require('express-validator');
const Item = require('../models/Item');
const { auth } = require('../middleware/auth');
const handleValidationErrors = require('../middleware/validation');

const router = express.Router();

// Validaciones
const itemValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El título debe tener entre 1 y 100 caracteres'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('La descripción debe tener entre 1 y 500 caracteres'),
  body('category')
    .isIn(['tecnologia', 'ciencia', 'deportes', 'entretenimiento', 'otros'])
    .withMessage('La categoría debe ser válida'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Los tags deben ser un array'),
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic debe ser un valor booleano')
];

const updateItemValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El título debe tener entre 1 y 100 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('La descripción debe tener entre 1 y 500 caracteres'),
  body('category')
    .optional()
    .isIn(['tecnologia', 'ciencia', 'deportes', 'entretenimiento', 'otros'])
    .withMessage('La categoría debe ser válida'),
  body('status')
    .optional()
    .isIn(['activo', 'inactivo', 'pendiente'])
    .withMessage('El estado debe ser válido'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Los tags deben ser un array'),
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic debe ser un valor booleano')
];

// @route   POST /api/items
// @desc    Crear un nuevo item
// @access  Private
router.post('/', auth, itemValidation, handleValidationErrors, async (req, res) => {
  try {
    const { title, description, category, tags, isPublic } = req.body;

    const item = new Item({
      title,
      description,
      category,
      tags: tags || [],
      isPublic: isPublic !== undefined ? isPublic : true,
      createdBy: req.user._id
    });

    await item.save();
    await item.populate('createdBy', 'username email');

    res.status(201).json({
      success: true,
      message: 'Item creado exitosamente',
      data: { item }
    });
  } catch (error) {
    console.error('Error creando item:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/items
// @desc    Obtener todos los items (públicos y del usuario)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { category, status, search } = req.query;

    // Construir filtros
    let filter = {
      $or: [
        { isPublic: true },
        { createdBy: req.user._id }
      ]
    };

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const items = await Item.find(filter)
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Item.countDocuments(filter);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Error obteniendo items:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/items/my
// @desc    Obtener items del usuario actual
// @access  Private
router.get('/my', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const items = await Item.find({ createdBy: req.user._id })
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Item.countDocuments({ createdBy: req.user._id });

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Error obteniendo mis items:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/items/:id
// @desc    Obtener un item por ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id).populate('createdBy', 'username email');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }

    // Verificar permisos de acceso
    if (!item.isPublic && item.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para ver este item'
      });
    }

    res.json({
      success: true,
      data: { item }
    });
  } catch (error) {
    console.error('Error obteniendo item:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de item inválido'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/items/:id
// @desc    Actualizar un item
// @access  Private
router.put('/:id', auth, updateItemValidation, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }

    // Verificar permisos (solo el creador o admin pueden editar)
    if (item.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para editar este item'
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username email');

    res.json({
      success: true,
      message: 'Item actualizado exitosamente',
      data: { item: updatedItem }
    });
  } catch (error) {
    console.error('Error actualizando item:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de item inválido'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   DELETE /api/items/:id
// @desc    Eliminar un item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }

    // Verificar permisos (solo el creador o admin pueden eliminar)
    if (item.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar este item'
      });
    }

    await Item.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Item eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando item:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de item inválido'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/items/categories/stats
// @desc    Obtener estadísticas por categoría
// @access  Private
router.get('/categories/stats', auth, async (req, res) => {
  try {
    const stats = await Item.aggregate([
      {
        $match: {
          $or: [
            { isPublic: true },
            { createdBy: req.user._id }
          ]
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          activeCount: {
            $sum: { $cond: [{ $eq: ['$status', 'activo'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
