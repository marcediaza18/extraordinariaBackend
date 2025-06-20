const express = require('express');
const router = express.Router();
const traficoController = require('../controllers/traficoController');

router.get('/', traficoController.getAll);

module.exports = router;
