let guildList = client.guilds.cache.map(guild => guild.id);

guildList.forEach((guildID) => {
    moduleSeeder.create({ name: 'core', enabled: true, guildID});

    commandSeeder.create({ name: 'setmodulestatus', type: 1, enabled: true, guildID, module: 'core'});
    commandSeeder.create({ name: 'setcommandstatus', type: 1, enabled: true, guildID, module: 'core'});
    commandSeeder.create({ name: 'setcommandalias', type: 1, enabled: true, guildID, module: 'core'});
    commandSeeder.create({ name: 'customcommand', type: 1, enabled: true, guildID, module: 'core'});
    commandSeeder.create({ name: 'restrictcommand', type: 1, enabled: true, guildID, module: 'core'});
});