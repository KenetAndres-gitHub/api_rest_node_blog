require('dotenv').config(); // Importar la configuración de las variables de entorno

module.exports = {
    "development": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "dialect": "postgres"
    }
};