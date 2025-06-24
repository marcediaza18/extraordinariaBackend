const Acustica = require('../models/Acustica');

// Obtener todos los registros de acústica
const getAll = async (req, res) => {
  try {
    const datos = await Acustica.find();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos de acústica' });
  }
};

// Insertar nuevos datos de acústica
const create = async (req, res) => {
  try {
    const { estacion, fecha, ld, le, ln, laeq24 } = req.body;

    // Validación de datos: asegurarnos de que no falten campos
    if (!estacion || !fecha || ld === undefined || le === undefined || ln === undefined || laeq24 === undefined) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Validación de valores numéricos
    if (typeof ld !== 'number' || typeof le !== 'number' || typeof ln !== 'number' || typeof laeq24 !== 'number') {
      return res.status(400).json({ error: 'Los valores de ld, le, ln y laeq24 deben ser números' });
    }

    const nuevo = new Acustica(req.body); // Crear un nuevo registro con los datos
    await nuevo.save(); // Guardar en la base de datos
    res.status(201).json(nuevo); // Responder con el nuevo registro creado
  } catch (err) {
    res.status(400).json({ error: 'Error al crear registro de acústica' });
  }
};

module.exports = {
  getAll,
  create
};
