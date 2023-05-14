const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Movie = sequelize.define('movie', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sinopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    releaseYears: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Movie;