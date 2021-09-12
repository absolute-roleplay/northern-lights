const { Sequelize } = require('sequelize');
const fs = require('fs');

database = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

fs.readdirSync('./models').forEach(async (model) => {
    modelObject = require('./models/' + model).model;

    modelObject.sync();
});