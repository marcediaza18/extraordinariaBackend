const express = require('express');
const router = express.Router();
const acusticaController = require('../controllers/acusticaController');

// Ruta para obtener todos los datos de acústica
router.get('/', acusticaController.getAll);

// Ruta para crear un nuevo dato de acústica
router.post('/', acusticaController.create);

module.exports = router;
