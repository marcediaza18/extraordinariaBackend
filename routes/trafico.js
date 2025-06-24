const express = require('express');
const router = express.Router();
const traficoController = require('../controllers/traficoController');

// Ruta para obtener todos los datos de tráfico
router.get('/', traficoController.getAll);

// Ruta para crear un nuevo dato de tráfico
router.post('/', traficoController.createTrafico);

module.exports = router;
