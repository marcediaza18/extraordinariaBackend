const Acustica = require('../models/Acustica');

// Obtener todos los registros
const getAll = async (req, res) => {
  try {
    const datos = await Acustica.find();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos de acústica' });
  }
};

// Insertar datos (opcional para pruebas)
const create = async (req, res) => {
  try {
    const nuevo = new Acustica(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear registro' });
  }
};

module.exports = {
  getAll,
  create
};
