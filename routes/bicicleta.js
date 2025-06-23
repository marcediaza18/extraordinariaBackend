const express = require('express');
const router = express.Router();
const bicicletaController = require('../controllers/bicicletaController');

// Ruta GET para obtener todas las bicicletas
router.get('/', bicicletaController.getAll);

// Ruta POST para crear una nueva bicicleta
router.post('/', bicicletaController.createBicicleta);

module.exports = router;
