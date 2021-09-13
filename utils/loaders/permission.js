var perms = [];
var module = require('../../models/permission').model;
var _ = require('underscore');

exports.checkDatabase = async () => {
    perms = [];
    let commandRecords = await module.findAll();

    commandRecords.forEach((m) => {
        let finalObject = { 
        };

        for (const [key, value] of Object.entries(m.dataValues)) {
            finalObject[key] = value;
        }

        perms.push(finalObject);
    });
};

exports.search = (cmd, guild) => {
    return _.filter(perms, (command) => {
        return command.overrideType === "command" && command.resource === cmd && command.guildID === guild;
    });
};