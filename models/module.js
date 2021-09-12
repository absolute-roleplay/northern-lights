const { DataTypes } = require('sequelize');

exports.model = database.define('modules', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },

    guildID: {
        type: DataTypes.STRING,
        allowNull: false
    }
});