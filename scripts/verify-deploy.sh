#!/bin/bash

echo "🔍 Verificando configuración para deploy en Vercel..."

# Verificar archivos necesarios
echo "📁 Verificando archivos..."

if [ -f "package.json" ]; then
    echo "✅ package.json encontrado"
else
    echo "❌ package.json no encontrado"
    exit 1
fi

if [ -f "server.js" ]; then
    echo "✅ server.js encontrado"
else
    echo "❌ server.js no encontrado"
    exit 1
fi

if [ -f "vercel.json" ]; then
    echo "✅ vercel.json encontrado"
else
    echo "❌ vercel.json no encontrado"
    exit 1
fi

# Verificar estructura de carpetas
echo "📂 Verificando estructura..."

if [ -d "public" ]; then
    echo "✅ Carpeta public encontrada"
else
    echo "❌ Carpeta public no encontrada"
    exit 1
fi

if [ -d "routes" ]; then
    echo "✅ Carpeta routes encontrada"
else
    echo "❌ Carpeta routes no encontrada"
    exit 1
fi

if [ -d "models" ]; then
    echo "✅ Carpeta models encontrada"
else
    echo "❌ Carpeta models no encontrada"
    exit 1
fi

# Verificar variables de entorno
echo "🔐 Verificando variables de entorno..."

if [ -f ".env" ]; then
    echo "✅ Archivo .env encontrado (para desarrollo)"
    
    if grep -q "MONGODB_URI" .env; then
        echo "✅ MONGODB_URI configurado"
    else
        echo "⚠️  MONGODB_URI no encontrado en .env"
    fi
    
    if grep -q "JWT_SECRET" .env; then
        echo "✅ JWT_SECRET configurado"
    else
        echo "⚠️  JWT_SECRET no encontrado en .env"
    fi
else
    echo "⚠️  Archivo .env no encontrado (normal para producción)"
fi

# Verificar dependencias
echo "📦 Verificando dependencias..."

if npm list express > /dev/null 2>&1; then
    echo "✅ Express instalado"
else
    echo "❌ Express no instalado"
    exit 1
fi

if npm list mongoose > /dev/null 2>&1; then
    echo "✅ Mongoose instalado"
else
    echo "❌ Mongoose no instalado"
    exit 1
fi

echo ""
echo "🎉 ¡Verificación completada!"
echo ""
echo "📋 Próximos pasos para deploy:"
echo "1. Configura las variables de entorno en Vercel:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=tu_uri_de_mongodb"
echo "   - JWT_SECRET=tu_clave_secreta"
echo "   - JWT_EXPIRES_IN=7d"
echo ""
echo "2. Ejecuta el deploy:"
echo "   vercel --prod"
echo ""
echo "✨ ¡Listo para deploy!"
