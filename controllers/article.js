const validator = require('validator');
const Article = require('../models/Article');
const prueba = (req , res) => {
    return res.status(200).json({
        message: 'Soy una acción de prueba en el controlador de Article'
    });
}

const add = async (req, res) => {
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
    // Guardar en la base de datos
    try {
        // Crear el objeto a guardar
        let article = await Article.create(parametros);

        // Devolver una respuesta
        return res.status(200).json({
            status: 'success',
            article: article,
            message: 'El artículo se ha guardado correctamente'
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'El artículo no se ha guardado',
            error: error.message
        });
    }
}

const getAll = async (req, res) => {
    try {
        let articles = await Article.findAll({
            order: [['createdAt', 'DESC']]
        });
        
        if(req.params.ultimos){
           articles = articles.slice(0, parseInt(req.params.ultimos));//obtener los N ultimos articulos
        }

        return res.status(200).json({
            status: 'success',
            articles: articles,
            parametro: req.params.ultimos
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'No se han podido obtener los artículos',
            error: error.message
        });
    }
}


module.exports = {
    prueba,
    add,
    getAll
}