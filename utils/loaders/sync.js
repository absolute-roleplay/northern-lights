var syncs = [];
var sync = require('../../models/sync').model;
var _ = require('underscore');

exports.checkDatabase = async () => {
    syncs = [];
    let commandRecords = await sync.findAll();

    commandRecords.forEach((m) => {
        let finalObject = { 
        };

        for (const [key, value] of Object.entries(m.dataValues)) {
            finalObject[key] = value;
        }

        syncs.push(finalObject);
    });
};

exports.searchInSync = (role, guild) => {
    return _.filter(syncs, (command) => {
        return command.inRole === role && command.inServer === guild;
    });
};

exports.searchOutSync = (role, guild) => {
    return _.filter(syncs, (command) => {
        return command.outRole === role && command.outServer === guild;
    });
};