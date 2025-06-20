const express = require('express');
const router = express.Router();
const bicicletaController = require('../controllers/bicicletaController');

router.get('/', bicicletaController.getAll);

module.exports = router;
