const express = require('express');
const router = express.Router();
const accidenteController = require('../controllers/accidenteController');

// Ruta para obtener todos los datos de accidentes
router.get('/', accidenteController.getAll);

// Ruta para crear un nuevo accidente
router.post('/', accidenteController.createAccidente);

module.exports = router;
