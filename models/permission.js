const { DataTypes } = require('sequelize');

exports.model = database.define('permissions', {
    overrideType: {
        type: DataTypes.STRING,
        allowNull: false
    },

    resource: {
        type: DataTypes.STRING,
        allowNull: false
    },

    grantType: {
        type: DataTypes.STRING,
        allowNull: false
    },

    targetType: {
        type: DataTypes.STRING,
        allowNull: false
    },

    targets: {
        type: DataTypes.STRING,
        allowNull: false
    },

    guildID: {
        type: DataTypes.STRING,
        allowNull: false
    }
});