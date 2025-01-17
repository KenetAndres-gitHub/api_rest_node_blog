const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize'); // Importar Sequelize desde un archivo separado


const Article = sequelize.define('article', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false, //no puede ser nulo
        defaultValue: Sequelize.NOW //por defecto es la fecha actual
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true, //puede ser nulo
        defaultValue: "default.png"
    }
});

module.exports = Article;