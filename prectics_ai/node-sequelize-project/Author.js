// models/Author.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Author = sequelize.define('Author', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Author;
