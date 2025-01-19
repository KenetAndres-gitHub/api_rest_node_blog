const express = require('express');
const router = express.Router();

const ArticuloController = require('../controllers/article');

//Rutas de prueba
router.get('/prueba', ArticuloController.prueba);
router.post('/add/articles', ArticuloController.add);
router.get('/get/articles/:ultimos?', ArticuloController.getAll); // :ultimos? es un parámetro opcional
router.get('/get/article/:id', ArticuloController.getUno);
module.exports = router; 