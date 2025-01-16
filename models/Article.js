const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../index'); // Importar Sequelize desde index.js

const Article = sequelize.define('article', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        required: true
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