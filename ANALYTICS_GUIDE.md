# 📊 Vercel Analytics - Guía de Implementación

## ✅ Ya implementado en tu proyecto

### 🎯 **Analíticas automáticas:**
- **Page Views**: Se trackean automáticamente
- **Core Web Vitals**: Métricas de rendimiento
- **Bounce Rate**: Tasa de rebote
- **Session Duration**: Duración de sesiones

### 🎮 **Eventos personalizados implementados:**

#### En Login (`index.html`):
- ✅ `Page View` - Cuando se carga la página
- ✅ `Login` - Cuando un usuario inicia sesión
- ✅ `Signup` - Cuando un usuario se registra

#### En Dashboard (`dashboard.html`):
- ✅ `Page View` - Cuando se carga el dashboard
- ✅ `Tab Switch` - Cuando se cambia de pestaña
- ✅ `Item Created` - Cuando se crea un nuevo item

## 📈 **Cómo ver las analíticas:**

### 1. **En el Dashboard de Vercel:**
1. Ve a [vercel.com](https://vercel.com)
2. Selecciona tu proyecto
3. Ve a la pestaña "Analytics"
4. Verás métricas como:
   - **Visitors**: Visitantes únicos
   - **Page Views**: Vistas de página
   - **Top Pages**: Páginas más visitadas
   - **Referrers**: De dónde vienen los usuarios
   - **Countries**: Ubicación geográfica
   - **Devices**: Tipos de dispositivos

### 2. **Eventos personalizados:**
En la sección "Events" verás:
- `Login` - Con datos de método y rol
- `Signup` - Registros nuevos
- `Item Created` - Por categoría
- `Tab Switch` - Navegación en dashboard
- `Page View` - Con página específica

## 🔧 **Configuración técnica:**

### Script agregado a ambas páginas:
```html
<!-- Vercel Analytics -->
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

### Tracking de eventos:
```javascript
// Ejemplo de cómo se trackean eventos
if (window.va) {
    window.va('track', 'Event Name', { 
        property1: 'value1',
        property2: 'value2'
    });
}
```

## 📊 **Métricas disponibles:**

### **Automáticas:**
- **Unique Visitors**: Visitantes únicos
- **Page Views**: Total de vistas
- **Bounce Rate**: % de usuarios que salen sin interactuar
- **Average Session Duration**: Tiempo promedio en el sitio
- **Core Web Vitals**: LCP, FID, CLS (métricas de Google)

### **Personalizadas implementadas:**
- **Login Success**: Por método y rol de usuario
- **User Registration**: Nuevos registros
- **Item Creation**: Por categoría de item
- **Navigation**: Cambios de pestañas en dashboard
- **Page Navigation**: Entre login y dashboard

## 🎛️ **Activación:**

Las analíticas se activan automáticamente cuando:
1. ✅ El sitio está desplegado en Vercel (no en localhost)
2. ✅ Los scripts están incluidos (ya implementado)
3. ✅ Hay tráfico real en el sitio

## 💡 **Agregar más eventos:**

Para trackear eventos adicionales, agrega código como:

```javascript
// Ejemplo: trackear logout
function logout() {
    if (window.va) {
        window.va('track', 'Logout', { 
            sessionDuration: Date.now() - sessionStart 
        });
    }
    // ...resto del código de logout
}

// Ejemplo: trackear errores
function trackError(errorType, errorMessage) {
    if (window.va) {
        window.va('track', 'Error', { 
            type: errorType,
            message: errorMessage
        });
    }
}
```

## 🚀 **Próximos pasos:**

1. **Deploy**: Despliega tu sitio en Vercel
2. **Espera**: Las analíticas aparecen después de unos minutos
3. **Explora**: Ve al dashboard de Vercel para ver los datos
4. **Optimiza**: Usa los datos para mejorar tu aplicación

## 📱 **Datos que obtendrás:**

- **¿Qué páginas son más populares?**
- **¿De dónde vienen tus usuarios?**
- **¿Cuánto tiempo pasan en tu sitio?**
- **¿Qué funciones usan más?**
- **¿Qué categorías de items son más populares?**
- **¿Cuántos usuarios se registran vs. solo navegan?**

¡Tus analíticas están configuradas y listas! 📊✨
