# 🚀 Servidor Node.js con Express, MongoDB y Autenticación JWT

Un servidor completo con autenticación de usuarios, CRUD de items y listo para deploy en Vercel.

## ✨ Características

### 🔐 Sistema de Autenticación
- **Registro de usuarios** con validación
- **Inicio de sesión** con JWT
- **Roles de usuario** (user/admin)
- **Protección de rutas** con middleware
- **Gestión de usuarios** (solo admin)

### 📋 Gestión de Items
- **Crear items** con categorías y tags
- **Listar items** propios y públicos
- **Actualizar y eliminar** items
- **Control de visibilidad** (público/privado)
- **Estadísticas** por categoría

### 🛡️ Seguridad
- Contraseñas hasheadas con bcrypt
- Rate limiting
- Helmet para headers de seguridad
- CORS configurado
- Validación de datos

## 🛠️ Tecnologías

- **Backend**: Node.js + Express
- **Base de datos**: MongoDB (nube)
- **Autenticación**: JWT
- **Validación**: express-validator
- **Seguridad**: helmet, cors, rate-limit
- **Deploy**: Vercel

## 📦 Instalación

### 1. Clonar y configurar

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

### 2. Configurar MongoDB

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster gratuito
3. Obtener la URI de conexión
4. Actualizar `.env`:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombrebd?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_muy_larga_y_compleja_aqui
JWT_EXPIRES_IN=7d
```

### 3. Ejecutar localmente

```bash
# Desarrollo con nodemon
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 🌐 Deploy en Vercel

### 1. Preparar para deploy

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login
```

### 2. Configurar variables de entorno en Vercel

En el dashboard de Vercel, agregar:
- `MONGODB_URI`: URI de MongoDB Atlas
- `JWT_SECRET`: Clave secreta para JWT
- `NODE_ENV`: production

### 3. Deploy

```bash
# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 📡 API Endpoints

### Autenticación
```
POST /api/auth/register     - Registrar usuario
POST /api/auth/login        - Iniciar sesión
GET  /api/auth/me          - Perfil del usuario actual
GET  /api/auth/users       - Listar usuarios (admin)
PUT  /api/auth/users/:id   - Actualizar usuario (admin)
DELETE /api/auth/users/:id - Eliminar usuario (admin)
```

### Items
```
POST /api/items            - Crear item
GET  /api/items            - Listar items públicos y propios
GET  /api/items/my         - Listar mis items
GET  /api/items/:id        - Obtener item por ID
PUT  /api/items/:id        - Actualizar item
DELETE /api/items/:id      - Eliminar item
GET  /api/items/categories/stats - Estadísticas
```

## 🔑 Credenciales por defecto

**Administrador:**
- Email: `admin@example.com`
- Password: `admin123`

> ⚠️ **¡IMPORTANTE!** Cambia estas credenciales en producción.

## 📝 Ejemplos de uso

### Registro de usuario
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "username": "usuario123",
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

### Crear item
```javascript
POST /api/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Mi primer item",
  "description": "Descripción del item",
  "category": "tecnologia",
  "tags": ["javascript", "nodejs"],
  "isPublic": true
}
```

## 🎨 Interfaz Web

Incluye una interfaz web simple en `/public/index.html` que permite:
- Registrarse e iniciar sesión
- Crear y gestionar items
- Ver estadísticas básicas

## 🔧 Estructura del proyecto

```
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
```

## 🚨 Consideraciones de seguridad

1. **Cambiar credenciales por defecto** en producción
2. **Usar HTTPS** en producción
3. **Configurar CORS** para dominios específicos
4. **Rotar claves JWT** periódicamente
5. **Monitorear rate limits**
6. **Validar siempre** datos de entrada

## 📊 Monitoreo

- Endpoint de salud: `GET /health`
- Logs de servidor en consola
- Rate limiting configurado

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

**¡Tu servidor está listo para producción! 🎉**
