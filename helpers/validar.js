const validator = require('validator');

const validaDatos = (parametros) => {
    
    let validar_titulo = !validator.isEmpty(parametros.title) && validator.isLength(parametros.title, {min: 5, max: undefined});
    let validar_contenido = !validator.isEmpty(parametros.content);
    if(!validar_titulo || !validar_contenido){
        throw new Error('No se han enviado los datos correctamente');
    }
}

module.exports = {
    validaDatos
}