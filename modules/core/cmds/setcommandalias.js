const { selfDeletingMessage } = require("../../../utils/main");
    commandModel  = require('../../../models/command').model;
    aliasModel  = require('../../../models/alias').model;
const aliasLoader = require('../../../utils/loaders/alias'); 

exports.usage = {
    arguments: 2,
    helpText: "[Add/Remove] [Alias Name] [Command Name?]"
};

exports.handler = async (channel, action, aliasName, commandName) => {
    aliasRecord = _.first(await aliasModel.findAll({
        where: {
            name: aliasName,
            guildID: channel.guild.id
        }
    }));

    switch(action.toLowerCase()) {
        case 'add':
            commandRecord = _.first(await commandModel.findAll({
                where: {
                    name: commandName,
                    guildID: channel.guild.id
                }
            }));

            if(! commandRecord) {
                return selfDeletingMessage(channel, "That command does not exist!");
            }
            
            if(aliasRecord) {
                return selfDeletingMessage(channel, "That alias is already in use!");
            }

            aliasModel.create({
                name: aliasName,
                command: commandName,
                guildID: channel.guild.id
            });

            selfDeletingMessage(channel, "The " + prefix + aliasName + " alias has been assigned to the " + process.env.COMMAND_PREFIX + commandName +" command was created successfully!");

            break;
        case 'remove':
            if(! aliasRecord) {
                return selfDeletingMessage(channel, "That alias is does not exist!");
            }

            aliasModel.destroy();

            selfDeletingMessage(channel, "The " + prefix + aliasName + " alias was deleted successfully!");
            break;
    }

    aliasLoader.checkDatabase();
};