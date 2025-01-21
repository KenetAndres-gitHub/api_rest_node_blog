const express = require('express');
const multer = require('multer');
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/articles');
    },
    filename: (req, file, cb) => {
        cb(null,"article" + Date.now() + file.originalname);
    }
});

const upload = multer({storage: storage});


const ArticuloController = require('../controllers/article');

//Rutas de prueba
router.post('/add/articles', ArticuloController.add);
router.get('/get/articles/:ultimos?', ArticuloController.getAll); // :ultimos? es un parámetro opcional
router.get('/get/article/:id', ArticuloController.uno);
router.delete('/delete/article/:id', ArticuloController.borrar);
router.put('/update/article/:id', ArticuloController.update);
router.post('/upload/image/:id', [upload.single("file0")] , ArticuloController.uploadImage);
router.get('/get/image/:image', ArticuloController.imagen);
module.exports = router; 