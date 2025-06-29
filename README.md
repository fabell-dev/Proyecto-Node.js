# 🚀 Servidor Node.js con Express, MongoDB y Autenticación JWT

Un servidor completo con autenticación de usuarios, CRUD de items y listo para deploy en Vercel.

## 📡 API Endpoints

### Autenticación

POST /api/auth/register     - Registrar usuario
POST /api/auth/login        - Iniciar sesión
GET  /api/auth/me          - Perfil del usuario actual
GET  /api/auth/users       - Listar usuarios (admin)
PUT  /api/auth/users/:id   - Actualizar usuario (admin)
DELETE /api/auth/users/:id - Eliminar usuario (admin)


### Items

POST /api/items            - Crear item
GET  /api/items            - Listar items públicos y propios
GET  /api/items/my         - Listar mis items
GET  /api/items/:id        - Obtener item por ID
PUT  /api/items/:id        - Actualizar item
DELETE /api/items/:id      - Eliminar item
GET  /api/items/categories/stats - Estadísticas


proyecto-nodejs/
├── config/
│   └── database.js         # Configuración de MongoDB
├── middleware/
│   ├── auth.js            # Middleware de autenticación
│   └── validation.js      # Manejo de validaciones
├── models/
│   ├── User.js           # Modelo de usuario
│   └── Item.js           # Modelo de item
├── public/
│   └── index.html        # Interfaz web
├── routes/
│   ├── auth.js           # Rutas de autenticación
│   └── items.js          # Rutas de items
├── .env.example          # Variables de entorno ejemplo
├── .gitignore           # Archivos ignorados por git
├── package.json         # Dependencias del proyecto
├── server.js            # Archivo principal
└── vercel.json          # Configuración de Vercel