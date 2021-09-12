var commands = [];
var module = require('../../models/command').model;
var _ = require('underscore');

exports.checkDatabase = async () => {
    commands = [];
    let commandRecords = await module.findAll();

    commandRecords.forEach((m) => {
        let finalObject = { 
            id: m.dataValues.id, 
            type: m.dataValues.type,
            name: m.dataValues.name,
            module: m.dataValues.module,
            content: m.dataValues.content, 
            guildID: m.dataValues.guildID,
            enabled: m.dataValues.enabled
        };

        if(m.dataValues.type == 1) {
            let moduleObject = require('./../../modules/' + m.dataValues.module + '/cmds/' + m.dataValues.name);

            for (const [key, value] of Object.entries(moduleObject)) {
                finalObject[key] = value;
            }
        }

        commands.push(finalObject);
    });
};

exports.searchCommand = (cmd, guild) => {
    return _.first(_.filter(commands, (command) => {
        return command.name === cmd && command.guildID === guild;
    }));
};