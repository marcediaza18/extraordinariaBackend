const mongoose = require('mongoose');

const traficoSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  tipo: String,
  latitud: Number,
  longitud: Number,
  intensidadMediaDiaria: Number,
  velocidadMedia: Number
});

module.exports = mongoose.model('Trafico', traficoSchema);
