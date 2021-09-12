require('dotenv')
    .config();
require('./database');

    const { Client } = require('discord.js');
    const fs = require('fs');
    const _ = require('underscore');
    const moduleLoader = require('./utils/loaders/module');
    const commandLoader = require('./utils/loaders/command');

    const client = new Client({ intents: 32767});

    var guilds = [];
    var moduleSeeder = require('./models/module').model;
    var commandSeeder = require('./models/command').model;
    
    var selfDeletingMessage = require('./utils/main').selfDeletingMessage;

    client.login(process.env.BOT_TOKEN);
    
    client.on('ready', () => {
        console.log("INIT: Northern Lights Discord Bot has started.");

        guilds = client.guilds.cache.map(guild => guild.id);

        moduleLoader.checkDatabase();

        setTimeout(() => {
            moduleLoader.getModules().forEach((module) => {
                if(module.enabled && module.onReady) {
                    module.onReady();
                }
            });
        }, 500);
    });

    moduleLoader.hooks.forEach((hook) => {
        client.on(hook, (v1,v2,v3,v4,v5) => {
            let modules = moduleLoader.getModules();

            if(hook === "messageCreate" && v1.content === "**setup") {
                v1.delete();

                moduleSeeder.truncate();
                commandSeeder.truncate();

                fs.readdirSync('./modules').forEach(async (module) => {
                    require('./modules/' + module + "/seeder");
                }); 

                moduleLoader.checkDatabase();
                commandLoader.checkDatabase();

                selfDeletingMessage(v1.channel, "Bot Setup was successful. All Commands and modules are now available.");
            }
            if(v1 && v1.guild) {
                modules.forEach((module) => {
                    if(module.enabled && module["on" + hook.charAt(0).toUpperCase() + hook.slice(1)] && module.guildID === v1.guild.id) {
                        module["on" + hook.charAt(0).toUpperCase() + hook.slice(1)](v1,v2,v3,v4,v5);
                    }
                })
            } else {
                modules.forEach((module) => {
                    if(module.enabled && module["on" + hook.charAt(0).toUpperCase() + hook.slice(1)]) {
                        module["on" + hook.charAt(0).toUpperCase() + hook.slice(1)](v1,v2,v3,v4,v5);
                    }
                })
            }
        });
    });