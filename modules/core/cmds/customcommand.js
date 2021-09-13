const { selfDeletingMessage } = require("../../../utils/main");
    commandModel  = require('../../../models/command').model;
const commandLoader = require('../../../utils/loaders/command'); 

exports.usage = {
    arguments: 2,
    helpText: "[Add/Edit/Remove] [Command Name] [Command Text?]",
    lastOption: 2
};

exports.handler = async (channel, action, commandName, commandText) => {
    commandRecord = _.first(await commandModel.findAll({
        where: {
            name: commandName,
            guildID: channel.guild.id
        }
    }));
    switch(action) {
        case "add":
            if(commandRecord) {
                return selfDeletingMessage(channel, "That command is already in use!");
            }

            commandModel.create({ 
                name: commandName,
                guildID: channel.guild.id,
                type: 2, 
                module: 'core', 
                content: commandText,
                enabled: true
            });

            selfDeletingMessage(channel, "The '" + prefix + commandName + "' custom command was created successfully!");
            break;
        case "edit":
            commandRecord.update({
                content: commandText
            });

            selfDeletingMessage(channel, "The '" + prefix + commandName + "' custom command was edited successfully!");
            break;
        case "remove":
            commandRecord.destroy();
            selfDeletingMessage(channel, "The '" + prefix + commandName + "' custom command was deleted successfully!");
            break;
    }

    commandLoader.checkDatabase();
};