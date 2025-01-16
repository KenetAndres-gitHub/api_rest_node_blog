const validator = require('validator');
const Article = require('../models/Article');
const prueba = (req , res) => {
    return res.status(200).json({
        message: 'Soy una acción de prueba en el controlador de Article'
    });
}

const add = (req, res) => {
    // Recibir los datos por POST
    let parametros = req.body; 

    // Validar los datos
    try{
        let validar_titulo = !validator.isEmpty(parametros.title) && validator.isLength(parametros.title, {min: 5, max: undefined});
        let validar_contenido = !validator.isEmpty(parametros.content);
        //let validar_imagen = !validator.isEmpty(image);
        if(!validar_titulo || !validar_contenido){
           throw new Error('No se han enviado los datos correctamente');
        }

    }catch(err){
        return res.status(400).json({
            status: 'error',
            message: 'Faltan datos por enviar',
        });
    }
    // Crear el objeto a guardar
    let article = new Article(parametros);
   

    // Guardar en la base de datos
    article.save((error, articleStored) => {
        if(error || !articleStored){
            return res.status(400).json({
                status: 'error',
                message: 'El artículo no se ha guardado'
            });
        }
        // Devolver una respuesta
        return res.status(200).json({
            status: 'success',
            article: articleStored,
            message: 'El artículo se ha guardado correctamente'
        });
    });
   
}
module.exports = {
    prueba,
    add
}