const Bicicleta = require('../models/BicicletaDisponibilidad');

// Obtener todos
const getAll = async (req, res) => {
  try {
    const datos = await Bicicleta.find();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los datos de bicicletas' });
  }
};

// Crear una bicicleta nueva
const createBicicleta = async (req, res) => {
  try {
    const nuevaBicicleta = new Bicicleta(req.body);
    await nuevaBicicleta.save();
    res.status(201).json(nuevaBicicleta);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la bicicleta' });
  }
};

module.exports = {
  getAll,
  createBicicleta
};
