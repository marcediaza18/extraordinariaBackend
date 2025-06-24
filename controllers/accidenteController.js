const Accidente = require('../models/Accidente');

// Obtener todos los datos de accidentes
const getAll = async (req, res) => {
  try {
    const datos = await Accidente.find();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos de accidentes' });
  }
};

// Crear un nuevo registro de accidente
const createAccidente = async (req, res) => {
  try {
    const nuevoAccidente = new Accidente(req.body);  // Crea una nueva instancia con los datos recibidos
    await nuevoAccidente.save();  // Guarda el nuevo accidente en la base de datos
    res.status(201).json(nuevoAccidente);  // Responde con el accidente creado
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el accidente' });
  }
};

module.exports = {
  getAll,
  createAccidente
};
