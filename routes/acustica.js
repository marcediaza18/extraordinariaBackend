const express = require('express');
const router = express.Router();
const acusticaController = require('../controllers/acusticaController');

router.get('/', acusticaController.getAll);
router.post('/', acusticaController.create);  // Para pruebas

module.exports = router;
