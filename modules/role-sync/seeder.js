let guildList = client.guilds.cache.map(guild => guild.id);

guildList.forEach((guildID) => {
    moduleSeeder.create({ name: 'role-sync', enabled: true, guildID});

    commandSeeder.create({ name: 'rolesync', type: 1, enabled: true, guildID, module: 'role-sync'});
});