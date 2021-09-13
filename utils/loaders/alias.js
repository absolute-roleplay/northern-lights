var aliases = [];
var alias = require('../../models/alias').model;
var _ = require('underscore');

exports.checkDatabase = async () => {
    aliases = [];
    let commandRecords = await alias.findAll();

    commandRecords.forEach((m) => {
        let finalObject = { 
            id: m.dataValues.id, 
            name: m.dataValues.name,
            command: m.dataValues.command,
            guildID: m.dataValues.guildID
        };

        aliases.push(finalObject);
    });
};

exports.search = (cmd,guild) => {
    return _.first(_.filter(aliases, (command) => {
        return command.name === cmd && command.guildID === guild;
    }));
};