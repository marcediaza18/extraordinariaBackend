const mongoose = require('mongoose');

const acusticaSchema = new mongoose.Schema({
  estacion: String,           // Código de estación
  nombre: String,             // Nombre de la calle o zona
  fecha: String,              // Formato "ene-51"
  ld: Number,                 // Nivel diurno
  le: Number,                 // Nivel vespertino
  ln: Number,                 // Nivel nocturno
  laeq24: Number              // Nivel medio diario
});

module.exports = mongoose.model('Acustica', acusticaSchema);
