const { DataTypes } = require('sequelize');

exports.model = database.define('aliases', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    command: {
        type: DataTypes.STRING,
        allowNull: true
    },

    guildID: {
        type: DataTypes.STRING,
        allowNull: false
    }
});