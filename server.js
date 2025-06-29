const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Comentamos la conexión a MongoDB por ahora
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');

const app = express();

// Conectar a la base de datos (comentado por ahora)
connectDB();

// Configuración de CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-dominio.vercel.app'] // Cambia por tu dominio de producción
    : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares de seguridad
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
    },
  },
}));

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // límite de requests por ventana de tiempo
  message: {
    success: false,
    message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir archivos estáticos
app.use(express.static('public'));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Ruta principal con información de la API
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API del Servidor Node.js con MongoDB',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me',
        users: 'GET /api/auth/users (Admin)',
        updateUser: 'PUT /api/auth/users/:id (Admin)',
        deleteUser: 'DELETE /api/auth/users/:id (Admin)'
      },
      items: {
        create: 'POST /api/items',
        getAll: 'GET /api/items',
        getMy: 'GET /api/items/my',
        getById: 'GET /api/items/:id',
        update: 'PUT /api/items/:id',
        delete: 'DELETE /api/items/:id',
        stats: 'GET /api/items/categories/stats'
      }
    },
    documentation: {
      authentication: 'Incluye el token JWT en el header: Authorization: Bearer <token>',
      adminCredentials: {
        email: 'admin@example.com',
        password: 'admin123',
        note: '¡CAMBIA ESTAS CREDENCIALES EN PRODUCCIÓN!'
      }
    }
  });
});

// Ruta para health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Middleware global de manejo de errores
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  
  // Error de MongoDB
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors
    });
  }

  // Error de JWT
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }

  // Error de MongoDB duplicado
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Recurso duplicado'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 3000;

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📱 API disponible en http://localhost:${PORT}`);
    console.log(`📚 Documentación en http://localhost:${PORT}/`);
  });
}

// Para Vercel (serverless)
module.exports = app;
