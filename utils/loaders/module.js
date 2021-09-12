var modules = [];
var module = require('../../models/module').model;
var _ = require('underscore');

exports.checkDatabase = async () => {
    let moduleRecords = await module.findAll();

    moduleRecords.forEach((m) => {
        let moduleObject = require('./../../modules/' + m.dataValues.name + '/module');

        let finalObject = { 
            id: m.dataValues.id, 
            name: m.dataValues.name, 
            guildID: m.dataValues.guildID,
            enabled: m.dataValues.enabled
        };

        for (const [key, value] of Object.entries(moduleObject)) {
            finalObject[key] = value;
        }

        modules.push(finalObject);
    });
};

exports.getModules = () => {
    let moduleArray = [];

    modules.forEach(module => {
        moduleArray.push(module);
    });
    return moduleArray;
};

exports.searchModule = (module) => {
    return _.first(_.filter(modules, (m) => {
        return m.name === module;
    }));
};

exports.hooks = [
    'applicationCommandCreate',
    'applicationCommandDelete',
    'applicationCommandUpdate',
    'channelCreate',
    'channelDelete',
    'channelPinsUpdate',
    'channelUpdate',
    'debug',
    'emojiCreate',
    'emojiDelete',
    'emojiUpdate',
    'error',
    'guildBanAdd',
    'guildBanRemove',
    'guildCreate',
    'guildDelete',
    'guildIntegrationsUpdate',
    'guildMemberAdd',
    'guildMemberAvailable',
    'guildMemberRemove',
    'guildMembersChunk',
    'guildMemberUpdate',
    'guildUnavailable',
    'guildUpdate',
    'interaction',
    'interactionCreate',
    'invalidRequestWarning',
    'inviteCreate',
    'inviteDelete',
    'messageCreate',
    'messageDelete',
    'messageDeleteBulk',
    'messageReactionAdd',
    'messageReactionRemove',
    'messageReactionRemoveAll',
    'messageReactionRemoveEmoji',
    'messageUpdate',
    'presenceUpdate',
    'rateLimit',
    'roleCreate',
    'roleDelete',
    'roleUpdate',
    'shardDisconnect',
    'shardError',
    'shardReady',
    'shardReconnecting',
    'shardResume',
    'stageInstanceCreate',
    'stageInstanceDelete',
    'stageInstanceUpdate',
    'stickerCreate',
    'stickerDelete',
    'stickerUpdate',
    'threadCreate',
    'threadDelete',
    'threadListSyncc',
    'threadMembersUpdate',
    'threadMemberUpdate',
    'threadUpdate',
    'typingStart',
    'userUpdate',
    'voiceStateUpdate',
    'warn',
    'webhookUpdate'
];