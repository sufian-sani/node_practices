// models/album.js

'use strict';
const { DataTypes } = require('sequelize');
const Musician =

module.exports = (sequelize) => {
    const Album = sequelize.define('Album', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    Album.associate = (models) => {
        Album.belongsTo(models.Musician, { foreignKey: 'musicianId' });
    };

    return Album;
};
