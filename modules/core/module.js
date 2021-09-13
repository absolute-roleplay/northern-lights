let commandLoader = require('./../../utils/loaders/command');
let aliasLoader = require('./../../utils/loaders/alias');
let moduleLoader = require('./../../utils/loaders/module');
let permissionLoader = require('./../../utils/loaders/permission');
let selfDeletingMessage = require('./../../utils/main').selfDeletingMessage;

exports.onReady = () => {
    commandLoader.checkDatabase();
    aliasLoader.checkDatabase();
    permissionLoader.checkDatabase();
};

exports.onMessageCreate = (message) => {
    if(message.content.startsWith(prefix)) {
        let commandParts = message.content.split(" ");
        let commandName = commandParts[0].substring(1);
        let aliasObject = aliasLoader.search(commandName, message.guild.id);
        let actualCommandName = (aliasObject) ? aliasObject.command : commandName;
        let commandObject = commandLoader.search(actualCommandName, message.guild.id);

        message.delete();

        if(commandObject) {
            console.log(message.author.username + " used " + prefix + commandName + " on " + message.guild.name, "[Authorized: Yes, Channel: #" + message.channel.name + "]");

            arg1 = commandParts[1];
            arg2 = commandParts[2];
            arg3 = commandParts[3];
            arg4 = commandParts[4];
            arg5 = commandParts[5];
            arg6 = commandParts[6];
            arg7 = commandParts[7];
            arg8 = commandParts[8];
            arg9 = commandParts[9];
            arg10 = commandParts[10];

            
            if(! moduleLoader.search(commandObject.module, message.guild.id).enabled) {
                return selfDeletingMessage(message.channel, "The '" + commandObject.module + "' module is currently Disabled by an Administrator");
            }

            if(! commandObject.enabled) {
                return selfDeletingMessage(message.channel, "The '" + prefix + commandObject.name + "' command is currently Disabled by an Administrator");
            }

            let hasPermission = false;
            let permissions = permissionLoader.search(actualCommandName, message.guild.id);
            let allowedPermissions = _.filter(permissions, (permission) => { return permission.grantType === "allow"; });
            let deniedPermissions = _.filter(permissions, (permission) => { return permission.grantType === "deny"; });
            
            allowedPermissions.forEach((permission) => {
                switch(permission.targetType) {
                    case "role": {
                        permission.targets.split(" ")
                            .forEach((target) => {
                                if(message.member.roles.cache.map(r => r.id).includes(target)) {
                                    hasPermission = true;
                                }
                            });
                        break;
                    }
                    case "user": {
                        permission.targets.split(" ")
                            .forEach((target) => {
                                if(message.author.id === target) {
                                    hasPermission = true;
                                }
                            });
                        break;
                    }
                    case "permission": {
                        permission.targets.split(" ")
                            .forEach((target) => {
                                if(message.member.permissions.has(target)) {
                                    hasPermission = true;
                                }
                            });
                        break;
                    }
                }
            });

            deniedPermissions.forEach((permission) => {
                switch(permission.targetType) {
                    case "role": {
                        permission.targets.split(" ")
                            .forEach((target) => {
                                if(message.member.roles.cache.map(r => r.id).includes(target)) {
                                    hasPermission = false;
                                }
                            });
                        break;
                    }
                    case "user": {
                        permission.targets.split(" ")
                            .forEach((target) => {
                                if(message.author.id === target) {
                                    hasPermission = false;
                                }
                            });
                        break;
                    }
                    case "permission": {
                        permission.targets.split(" ")
                            .forEach((target) => {
                                if(message.member.permissions.has(target)) {
                                    hasPermission = false;
                                }
                            });
                        break;
                    }
                }
            });


            if(message.member.permissions.has("ADMINISTRATOR")) {
                hasPermission = true;
            }

            if(commandObject.usage) {
                if((commandParts.length-1) < commandObject.usage.arguments) {
                    return selfDeletingMessage(message.channel, "The correct usage for this command is: " + process.env.COMMAND_PREFIX + commandName + " " + commandObject.usage.helpText);
                }

                arg1 = (commandObject.usage.lastOption == 0) ?  commandParts.splice(1).join(" ") : arg1;
                arg2 = (commandObject.usage.lastOption == 1) ?  commandParts.splice(2).join(" ") : arg2;
                arg3 = (commandObject.usage.lastOption == 2) ?  commandParts.splice(3).join(" ") : arg3;
                arg4 = (commandObject.usage.lastOption == 3) ?  commandParts.splice(4).join(" ") : arg4;
                arg5 = (commandObject.usage.lastOption == 4) ?  commandParts.splice(5).join(" ") : arg5;
                arg6 = (commandObject.usage.lastOption == 5) ?  commandParts.splice(6).join(" ") : arg6;
                arg7 = (commandObject.usage.lastOption == 6) ?  commandParts.splice(7).join(" ") : arg7;
                arg8 = (commandObject.usage.lastOption == 7) ?  commandParts.splice(8).join(" ") : arg8;
                arg9 = (commandObject.usage.lastOption == 8) ?  commandParts.splice(9).join(" ") : arg9;
                arg10 = (commandObject.usage.lastOption == 9) ?  commandParts.splice(10).join(" ") : arg10;
            }

            if(commandObject.type == 2) {
                return selfDeletingMessage(message.channel, commandObject.content);
            }

            return commandObject.handler(
                message.channel, 
                arg1,
                arg2,
                arg3,
                arg4,
                arg5,
                arg6,
                arg7,
                arg8,
                arg9,
                arg10
            );
        } else {
            selfDeletingMessage(message.channel, "That command doesn't exist! For a list of commands you have access to, you can use " + process.env.COMMAND_PREFIX + "help");
        }
    }
};