const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const acusticaRoutes = require('./routes/acustica');
app.use('/api/acustica', acusticaRoutes);

const bicicletaRoutes = require('./routes/bicicleta');
app.use('/api/bicicletas', bicicletaRoutes);

const accidentesRoutes = require('./routes/accidentes');
app.use('/api/accidentes', accidentesRoutes);

const traficoRoutes = require('./routes/trafico');
app.use('/api/trafico', traficoRoutes);



app.get('/', (req, res) => {
  res.send('API Smart City funcionando');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(4000, () => console.log('Servidor corriendo en http://localhost:4000'));
  })
  .catch((error) => console.error('Error conectando a MongoDB:', error));
