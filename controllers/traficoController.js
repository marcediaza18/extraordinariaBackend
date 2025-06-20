const Trafico = require('../models/Trafico');

const getAll = async (req, res) => {
  try {
    const datos = await Trafico.find();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos de tráfico' });
  }
};

module.exports = {
  getAll
};
