require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/database');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

// Importar rutas
const productRoutes = require('./src/routes/products');
const mascotaRoutes = require('./src/routes/mascotas');

// Conectar a MongoDB
connectDB();

// Inicializar Express
const app = express();

// ==================== MIDDLEWARES ====================

// CORS - Permitir peticiones desde el frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Body parser - Leer JSON del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan - Logger de peticiones HTTP
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ==================== RUTAS ====================

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API de Mascotas funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      mascotas: '/api/mascotas'
    }
  });
});

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/mascotas', mascotaRoutes);

// ==================== MANEJO DE ERRORES ====================

// Ruta no encontrada
app.use(notFound);

// Error handler global
app.use(errorHandler);

// ==================== SERVIDOR ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`${'='.repeat(50)}\n`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error(`❌ Error no manejado: ${err.message}`);
  process.exit(1);
});
