const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.development);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Todos los modelos fueron sincronizados correctamente.');
  })
  .catch(err => {
    console.error('No se pudo sincronizar con la base de datos:', err);
  });

module.exports = sequelize;