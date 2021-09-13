const { selfDeletingMessage } = require("../../../utils/main");
    commandModel  = require('../../../models/command').model;
    permissionModel  = require('../../../models/permission').model;
const commandLoader = require('../../../utils/loaders/command'); 

exports.usage = {
    arguments: 2,
    helpText: "[Command Name] [Allow/Deny] [Role/User/Permission] [Target(s)]",
    lastOption: 3
};

exports.handler = async (channel, commandName, grantType, targetType, targets) => {
    realTargets = targets
        .replace("<@",'')
        .replace('&','')
        .replace('>','');
    let commandRecord = _.first(await commandModel.findAll({
        where: {
            name: commandName
        }
    }));

    if(commandRecord === undefined) {
        return selfDeletingMessage(channel, "That command does not exist.");
    }

    let permissionRecord = _.first(await permissionModel.findAll({
        where: {
            guildID: channel.guild.id,
            resource:commandName,
            grantType,
            targetType
        }
    }));

    if(permissionRecord) {
        permissionRecord.delete();
    }

    permissionModel.create({
        overrideType: 'command',
        resource: commandName,
        grantType,
        targetType,
        targets: realTargets,
        guildID: channel.guild.id
    });

    return selfDeletingMessage(channel, "The permissions for " + prefix + commandName + " have been changed successfully!");
};