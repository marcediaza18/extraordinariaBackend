const mongoose = require('mongoose');

const bicicletaDisponibilidadSchema = new mongoose.Schema({
  dia: String, // formato original del CSV
  horasUso: Number,
  horasDisponibles: Number,
  horasServicio: Number,
  mediaDisponibles: Number,
  usosAnual: Number,
  usosOcasional: Number,
  totalUsos: Number
});

module.exports = mongoose.model('BicicletaDisponibilidad', bicicletaDisponibilidadSchema);
