const { selfDeletingMessage } = require("../../../utils/main");
    moduleModel  = require('../../../models/module').model;
exports.usage = {
    arguments: 2,
    helpText: "[Module] [Enable/Disable]"
};

exports.handler = async (channel, module, status) => {
    if(module === "core") {
        return selfDeletingMessage(channel, "I can't allow you to enable or disable that module. Doing so would make the bot unusable!");
    }
    
    let enabled = (status === "enable") ? true: false;
    
    let record = await moduleModel.findOne({
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
            "The '" + module + "' module has been enabled successfully!" :
            "The '" + module + "' module has been disabled successfully!"
        );
    } else {
        selfDeletingMessage(channel, "That module does not exist!");
    }
};