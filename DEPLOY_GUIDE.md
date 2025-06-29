# 🚀 Guía de Deploy en Vercel

## Pasos para deployar en Vercel

### 1. Preparar el proyecto

```bash
# Asegúrate de que todas las dependencias estén instaladas
npm install

# Verifica que el proyecto funcione localmente
npm run dev
```

### 2. Instalar Vercel CLI

```bash
npm i -g vercel
```

### 3. Login en Vercel

```bash
vercel login
```

### 4. Configurar variables de entorno en Vercel

**Opción A: Desde el dashboard de Vercel**
1. Ve a tu proyecto en vercel.com
2. Settings → Environment Variables
3. Agrega estas variables:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/proyecto?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_muy_larga_y_compleja_aqui
JWT_EXPIRES_IN=7d
```

**Opción B: Desde la línea de comandos**

```bash
vercel env add NODE_ENV
# Valor: production

vercel env add MONGODB_URI
# Valor: tu URI de MongoDB Atlas

vercel env add JWT_SECRET
# Valor: tu clave secreta JWT

vercel env add JWT_EXPIRES_IN
# Valor: 7d
```

### 5. Deploy

```bash
# Deploy de prueba
vercel

# Deploy a producción
vercel --prod
```

### 6. Configurar dominio personalizado (opcional)

En el dashboard de Vercel:
1. Ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Actualiza el CORS en server.js con tu dominio

## 🔧 Configuración actual

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### Variables requeridas
- `NODE_ENV`: production
- `MONGODB_URI`: URI de MongoDB Atlas
- `JWT_SECRET`: Clave secreta para JWT
- `JWT_EXPIRES_IN`: 7d

## 🚨 Troubleshooting

### Error: "functions" pattern doesn't match
✅ **Solucionado** - Actualizado vercel.json a la nueva estructura

### Error: Cannot find module
- Verifica que todas las dependencias estén en package.json
- Ejecuta `npm install` antes del deploy

### Error: MongoDB connection
- Verifica la URI de MongoDB Atlas
- Asegúrate de que la IP de Vercel esté en la whitelist (0.0.0.0/0)

### Error: Environment variables
- Verifica que todas las variables estén configuradas en Vercel
- Usa `vercel env ls` para listar las variables

## 📋 Checklist de Deploy

- [ ] MongoDB Atlas configurado y accesible
- [ ] Variables de entorno configuradas en Vercel
- [ ] Código commiteado en Git
- [ ] vercel.json actualizado
- [ ] Dependencias correctas en package.json
- [ ] CORS configurado para el dominio de producción

## 🔗 URLs después del deploy

- **Frontend**: https://tu-proyecto.vercel.app
- **API**: https://tu-proyecto.vercel.app/api/auth/login
- **Dashboard**: https://tu-proyecto.vercel.app/dashboard.html

¡Tu aplicación estará lista para usarse en producción! 🎉
