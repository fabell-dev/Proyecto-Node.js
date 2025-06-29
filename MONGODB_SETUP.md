# 🗄️ Configuración de MongoDB Atlas

## Pasos para configurar MongoDB en la nube

### 1. Crear cuenta en MongoDB Atlas
1. Ve a [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Haz clic en "Try Free" o "Start Free"
3. Crea tu cuenta con Google/GitHub o email

### 2. Crear un Cluster
1. Selecciona "Build a Database"
2. Elige "Free" (M0 Sandbox)
3. Selecciona tu región más cercana
4. Nombra tu cluster (ej: "Cluster0")
5. Crea el cluster

### 3. Configurar acceso
1. **Crear usuario de base de datos:**
   - Ve a "Database Access"
   - Clic en "Add New Database User"
   - Username: `tu_usuario`
   - Password: `tu_password_seguro`
   - Rol: "Read and write to any database"

2. **Configurar IP whitelist:**
   - Ve a "Network Access"
   - Clic en "Add IP Address"
   - Para desarrollo: "Allow Access from Anywhere" (0.0.0.0/0)
   - Para producción: agrega IPs específicas

### 4. Obtener URI de conexión
1. Ve a "Database" > "Connect"
2. Selecciona "Connect your application"
3. Copia la URI que se ve así:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### 5. Configurar en tu proyecto

Reemplaza en tu archivo `.env`:

```env
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster0.xxxxx.mongodb.net/proyecto_nodejs?retryWrites=true&w=majority
```

**Importante:** 
- Reemplaza `<username>` y `<password>` con tus credenciales
- Reemplaza `<database>` con el nombre de tu base de datos (ej: `proyecto_nodejs`)
- No incluyas los símbolos `< >`

### 6. Probar conexión

```bash
# Ejecutar el script de inicialización
npm run seed

# Si ves "✅ Conectado a MongoDB", ¡está funcionando!
```

## 🚨 Problemas comunes

### Error: "MongoNetworkError"
- Verifica que tu IP esté en la whitelist
- Verifica las credenciales de usuario

### Error: "Authentication failed"
- Verifica username y password
- Asegúrate de que no haya caracteres especiales sin codificar

### Error: "Server selection timed out"
- Verifica tu conexión a internet
- Verifica que el cluster esté activo

## 💡 Tips

1. **Para desarrollo**: Usa "Allow Access from Anywhere"
2. **Para producción**: Restringe IPs específicas
3. **Seguridad**: Usa contraseñas fuertes
4. **Backups**: MongoDB Atlas hace backups automáticos en clusters M10+

## 📊 Datos incluidos

Después de ejecutar `npm run seed`, tendrás:

### Usuarios:
- **Admin**: admin@example.com / admin123
- **Usuario 1**: usuario1@test.com / password123  
- **Usuario 2**: usuario2@test.com / password123

### Items de ejemplo:
- Guías de tecnología
- Recetas de cocina
- Rutinas de ejercicio
- Recomendaciones de entretenimiento

---

¡Tu base de datos estará lista para usar! 🎉
