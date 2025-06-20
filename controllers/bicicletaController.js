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

module.exports = {
  getAll
};
