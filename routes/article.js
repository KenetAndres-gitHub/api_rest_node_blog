const express = require('express');
const router = express.Router();

const ArticuloController = require('../controllers/Article');

//Rutas de prueba
router.get('/prueba', ArticuloController.prueba);
router.post('/add', ArticuloController.add);

module.exports = router;