const express = require('express');
const router = express.Router();
const accidenteController = require('../controllers/accidenteController');

router.get('/', accidenteController.getAll);

module.exports = router;
