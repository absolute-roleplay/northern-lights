const { selfDeletingMessage } = require("../../../utils/main");
    commandModel  = require('../../../models/command').model;
exports.usage = {
    arguments: 2,
    helpText: "[Command] [Enable/Disable]"
};

exports.handler = async (channel, module, status) => {    
    let enabled = (status === "enable") ? true: false;
    
    let record = await commandModel.findOne({
        where: {
            name: module,
            guildID: channel.guild.id
        }
    });

    if(record) {
        record.update({
            enabled
        });

        
        selfDeletingMessage(channel, (enabled) ? 
            "The '" + module + "' command has been enabled successfully!" :
            "The '" + module + "' command has been disabled successfully!"
        );
    } else {
        selfDeletingMessage(channel, "That command does not exist!");
    }
};