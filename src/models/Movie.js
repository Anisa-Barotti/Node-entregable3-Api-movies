const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Movie = sequelize.define('movie', {
    name: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.TEXT,
    },
    synopsis: {
        type: DataTypes.TEXT,
    },
    releaseYear: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Movie;