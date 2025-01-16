const express = require('express');
const Sequelize = require('sequelize');
const config = require('./database/config');
// Requiere el módulo 'cors' que permite habilitar CORS (Cross-Origin Resource Sharing) en la aplicación.
// CORS es un mecanismo que permite que recursos restringidos en una página web sean solicitados desde otro dominio fuera del dominio desde el cual se sirvió el recurso.
const cors = require('cors');

const sequelize = new Sequelize(config.development);
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

  module.exports = sequelize;
//Importar modelos
const Article = require('./models/Article');
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Todos los modelos fueron sincronizados correctamente.');
  })
  .catch(err => {
    console.error('No se pudo sincronizar con la base de datos:', err);
  });

//Sincronizar modelos con la base de datos


//Crear servidor Node con Express
const app = express();
const port = 3000;
//Configurar el cors
app.use(cors());

//Convertir body a objeto json
app.use(express.json()); //recibir datos con content-type application/json
app.use(express.urlencoded({extended: true})); //recibir datos con content-type application/x-www-form-urlencoded
//Rutas
const rutas_article = require('./routes/Article');

//Cargo las rutas
app.use('/api', rutas_article);

//Rutas prueba hardcoded
app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'Bienvenido a la API REST con Node.js y Express',
        autor: 'Kenet Chungandro'
    });
});

//Crear servidor y escuchar peticiones HTTP
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
