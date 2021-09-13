const { selfDeletingMessage } = require("../../../utils/main");
    syncModel  = require('../../../models/sync').model;
const syncLoader = require('../../../utils/loaders/sync'); 
const { Message } = require("discord.js");

exports.usage = {
    arguments: 2,
    helpText: "[Add/Remove] [Local Role] [Synced Server] [Sync Role]"
};

exports.handler = async (channel, action, localRole, syncServer, syncRole) => {
    switch(action) {
        case "add":
            syncModel.create({
                inServer: channel.guild.id,
                outServer: process.env["GUILD_" + syncServer.toUpperCase()],
                inRole: localRole.replace("<@&","").replace(">",""),
                outRole: syncRole
            });

            selfDeletingMessage(channel, "The" + localRole + " role will now be synced with the " + syncServer + " server.");
            break;
        case "remove":
            break;
    }

    syncLoader.checkDatabase();
};