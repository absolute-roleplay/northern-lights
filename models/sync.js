const { DataTypes } = require('sequelize');

exports.model = database.define('syncs', {
    inServer: {
        type: DataTypes.STRING,
        allowNull: false
    },

    outServer: {
        type: DataTypes.STRING,
        allowNull: true
    },

    inRole: {
        type: DataTypes.STRING,
        allowNull: false
    },

    outRole: {
        type: DataTypes.STRING,
        allowNull: true
    }
});