const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB conectado: ${conn.connection.host}`);
    
    // Crear usuario administrador por defecto si no existe
    const User = require('../models/User');
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      
      await admin.save();
      console.log('Usuario administrador creado por defecto');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
      console.log('¡CAMBIA ESTAS CREDENCIALES EN PRODUCCIÓN!');
    }
    
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
