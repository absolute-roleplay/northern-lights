const { DataTypes } = require('sequelize');

exports.model = database.define('commands', {
    type: {
        type: DataTypes.INTEGER, // 1 - Standard, 2 - Customcom
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    module: {
        type: DataTypes.STRING,
        allowNull: false
    },

    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    guildID: {
        type: DataTypes.STRING,
        allowNull: false
    }
});