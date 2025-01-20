const fs = require('fs');
const { validaDatos } = require('../helpers/validar');
const Article = require('../models/Article');

const add = async (req, res) => {
    // Recibir los datos por POST
    let parametros = req.body; 

    // Validar los datos
    try{
        validaDatos(parametros);
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

const uno = async (req, res) => {
    try {
        let article = await Article.findOne({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({
            status: 'success',
            article: article
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'No se ha podido obtener el artículo',
            error: error.message
        });
    }
}

const borrar = async (req, res) => {
    try {
        let article = await Article.findOne({
            where: {
                id: req.params.id
            }
        });
        let articleDeleted = article;
        await article.destroy();

        return res.status(200).json({
            status: 'success',
            article: articleDeleted,
            message: 'El artículo se ha borrado correctamente'
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'No se ha podido borrar el artículo',
            error: error.message
        });
    }
}

const update = async (req, res) => {
    // Recibir los datos por POST
    let parametros = req.body; 
    // Validar los datos
    try{
        validaDatos(parametros);
    }catch(err){
        return res.status(400).json({
            status: 'error',
            message: 'Faltan datos por enviar',
        });
    }   
    let {title, content, image} = parametros; // Desestructurar los datos
    
    // Guardar en la base de datos
    try {
        // Crear el objeto a guardar
        let article = await Article.update({
            title: title, content: content, image: image
        }, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });

        article = article[1]; // Obtener el artículo actualizado

        // Devolver una respuesta
        return res.status(200).json({
            status: 'success',
            article: article,
            message: 'El artículo se ha actualizado correctamente'
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'El artículo no se ha actualizado',
            error: error.message
        });
    }
}

const uploadImage = async (req, res) => {
    //configurar multer

    // Recibir el fichero de imagen por POST
    if(!req.file && !req.files ){
        return res.status(400).json({
            status: 'error',
            message: 'No se ha subido ninguna imagen'
        });
    }
    //Nombre del archivo
    let fileName = req.file.originalname;
    //Extensión del archivo
    let fileExtension = fileName.split("\."); //Dividir el nombre del archivo por el punto
    let extension = fileExtension[fileExtension.length - 1]; //Obtener la última parte del array

    //Comprobar la extensión del archivo
    if(['png', 'jpg', 'jpeg', 'gif'].includes(extension)){
        //Subir la imagen
        return res.status(200).json({
            status: 'success',
            message: 'Imagen subida correctamente',
            file: req.file,
            extension: extension,
            fileExtension: fileExtension
        });
    }else{
         // Borrar el archivo
        fs.unlink(req.file.path, (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al borrar el archivo'
                });
            }
            return res.status(400).json({
                status: 'error',
                message: 'La extensión del archivo no es válida'
            });
        });
       
    }


}

module.exports = {
    add,
    getAll,
    uno,
    borrar,
    update,
    uploadImage
}