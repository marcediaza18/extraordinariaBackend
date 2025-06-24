const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas protegidas y login
const authController = require('./controllers/authController');
const verifyToken = require('./middlewares/verifyToken');

// Endpoints protegidos de ejemplo
app.get('/secure/hola', verifyToken, (req, res) => {
  res.json({ message: `Hola, ${req.user.username}. Acceso concedido con token.` });
});

// Endpoint para login
app.post('/auth/login', authController.login);

// Rutas de datos (las que ya tenías)
const acusticaRoutes = require('./routes/acustica');
app.use('/api/acustica', acusticaRoutes);

const bicicletaRoutes = require('./routes/bicicleta');
app.use('/api/bicicletas', bicicletaRoutes);

const accidentesRoutes = require('./routes/accidentes');
app.use('/api/accidentes', accidentesRoutes);

const traficoRoutes = require('./routes/trafico');
app.use('/api/trafico', traficoRoutes);

// Home
app.get('/', (req, res) => {
  res.send('API Smart City funcionando');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(4000, () => console.log('Servidor corriendo en http://localhost:4000'));
  })
  .catch((error) => console.error('Error conectando a MongoDB:', error));
