const mongoose = require('mongoose');

const accidenteSchema = new mongoose.Schema({
  expediente: String,
  fecha: String, // en formato dd/mm/yyyy
  hora: String,
  calle: String,
  numero: String,
  distrito: String,
  tipoAccidente: String,
  estadoMeteorologico: String,
  tipoVehiculo: String,
  tipoPersona: String,
  tramoEdad: String,
  sexo: String,
  lesividad: String
});

module.exports = mongoose.model('Accidente', accidenteSchema);
