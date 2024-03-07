// models/Book.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Author = require('./Author');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Add a foreign key for the Author model
    authorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Author,
            key: 'id',
        },
    },
});

Book.belongsTo(Author, { foreignKey: 'authorId' });
module.exports = Book;
