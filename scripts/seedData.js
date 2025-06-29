const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Item = require('../models/Item');

const seedData = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ Conectado a MongoDB');

    // Limpiar datos existentes (opcional - descomenta si quieres empezar limpio)
    // await User.deleteMany({});
    // await Item.deleteMany({});
    // console.log('🗑️ Datos anteriores eliminados');

    // Crear usuario administrador
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('👤 Usuario administrador creado');
    }

    // Crear usuarios de prueba
    const testUsers = [
      {
        username: 'usuario1',
        email: 'usuario1@test.com',
        password: 'password123',
        role: 'user'
      },
      {
        username: 'usuario2',
        email: 'usuario2@test.com',
        password: 'password123',
        role: 'user'
      }
    ];

    for (const userData of testUsers) {
      const userExists = await User.findOne({ email: userData.email });
      if (!userExists) {
        const user = new User(userData);
        await user.save();
        console.log(`👤 Usuario ${userData.username} creado`);
      }
    }

    // Obtener usuarios para crear items
    const users = await User.find({ role: 'user' });
    
    if (users.length > 0) {
      // Items de prueba
      const testItems = [
        {
          title: 'Introducción a Node.js',
          description: 'Una guía completa para aprender Node.js desde cero, cubriendo conceptos básicos y avanzados.',
          category: 'tecnologia',
          tags: ['nodejs', 'javascript', 'backend'],
          isPublic: true,
          createdBy: users[0]._id
        },
        {
          title: 'Ejercicios de Algoritmos',
          description: 'Colección de ejercicios de algoritmos y estructuras de datos para practicar.',
          category: 'tecnologia',
          tags: ['algoritmos', 'programacion', 'practica'],
          isPublic: true,
          createdBy: users[0]._id
        },
        {
          title: 'Recetas de Cocina Saludable',
          description: 'Recetas fáciles y nutritivas para una alimentación balanceada.',
          category: 'otros',
          tags: ['cocina', 'salud', 'recetas'],
          isPublic: true,
          createdBy: users.length > 1 ? users[1]._id : users[0]._id
        },
        {
          title: 'Rutina de Ejercicios',
          description: 'Plan de entrenamiento semanal para mantenerse en forma desde casa.',
          category: 'deportes',
          tags: ['ejercicio', 'fitness', 'salud'],
          isPublic: false,
          createdBy: users.length > 1 ? users[1]._id : users[0]._id
        },
        {
          title: 'Lista de Películas Recomendadas',
          description: 'Películas imperdibles de diferentes géneros y épocas.',
          category: 'entretenimiento',
          tags: ['peliculas', 'cine', 'recomendaciones'],
          isPublic: true,
          createdBy: users[0]._id
        }
      ];

      for (const itemData of testItems) {
        const itemExists = await Item.findOne({ 
          title: itemData.title, 
          createdBy: itemData.createdBy 
        });
        
        if (!itemExists) {
          const item = new Item(itemData);
          await item.save();
          console.log(`📋 Item "${itemData.title}" creado`);
        }
      }
    }

    console.log('\n🎉 ¡Datos de prueba creados exitosamente!');
    console.log('\n📝 Credenciales para probar:');
    console.log('👤 Admin: admin@example.com / admin123');
    console.log('👤 Usuario 1: usuario1@test.com / password123');
    console.log('👤 Usuario 2: usuario2@test.com / password123');
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Error inicializando datos:', error);
    process.exit(1);
  }
};

seedData();
