const Accidente = require('../models/Accidente');

// Obtener todos
const getAll = async (req, res) => {
  try {
    const datos = await Accidente.find();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos de accidentes' });
  }
};

module.exports = {
  getAll
};
