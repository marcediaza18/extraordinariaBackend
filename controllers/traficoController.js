const Trafico = require('../models/Trafico');

// Obtener todos los datos de tráfico
const getAll = async (req, res) => {
  try {
    const datos = await Trafico.find();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos de tráfico' });
  }
};

// Crear un nuevo registro de tráfico
const createTrafico = async (req, res) => {
  try {
    const nuevoTrafico = new Trafico(req.body);
    await nuevoTrafico.save();
    res.status(201).json(nuevoTrafico);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el dato de tráfico' });
  }
};

module.exports = {
  getAll,
  createTrafico
};
