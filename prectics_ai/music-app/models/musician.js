// models/musician.js

'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Musician = sequelize.define('Musician', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instrument: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        musicianArea: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Musician.associate = (models) => {
        Musician.hasMany(models.Album, { as: 'albums', foreignKey: 'musicianId' });
    };

    return Musician;
};
