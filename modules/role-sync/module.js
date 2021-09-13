let syncLoader = require('./../../utils/loaders/sync');

exports.onReady = () => {
    syncLoader.checkDatabase();
}

roleChange = null;

exports.onGuildMemberUpdate = async (oldMember, newMember) => {
    newRoles = newMember.roles.cache.map(role => role.id);
    oldRoles = oldMember.roles.cache.filter(role => role.id !== newMember.guild.roles.everyone.id).map(role => role.id);

    addedRoles = [];

    newRoles.forEach(role => {
        if(role != newMember.guild.roles.everyone.id) {
            index = oldRoles.indexOf(role);

            oldRoles = oldRoles.splice(index,1);
            if(! oldRoles.includes(role)) {
                addedRoles.push(role);
            }
        }
    });

    addedRoles.forEach(async (role) => {
        inSyncs = syncLoader.searchInSync(role, newMember.guild.id);
        outSyncs = syncLoader.searchOutSync(role, newMember.guild.id);

        if(inSyncs.length) {
            inSyncs.forEach(async (sync) => {
                discordGuild = await client.guilds.cache.get(sync.outServer);
                discordMembership = await discordGuild.members.cache.get(newMember.id);
                discordMembership.roles.add(sync.outRole);

                roleChange = sync.outRole;

                setTimeout(() => { roleChange = null}, 2500);
                //TODO: Add Logging to Discord Channel
            });
        }

        if(outSyncs.length) {
            outSyncs.forEach(async (sync) => {
                if(roleChange && roleChange === sync.outRole) return;

                discordGuild = await client.guilds.cache.get(sync.outServer);
                discordMembership = await discordGuild.members.cache.get(newMember.id);
                discordMembership.roles.remove(sync.outRole);

                roleChange = sync.outRole;
                setTimeout(() => { roleChange = null}, 2500);


                //TODO: Add Logging to Discord Channel
            });
        }
    });
    oldRoles.forEach(async (role) => {
        inSyncs = syncLoader.searchInSync(role, newMember.guild.id);
        outSyncs = syncLoader.searchOutSync(role, newMember.guild.id);

        if(inSyncs.length) {
            inSyncs.forEach(async (sync) => {
                discordGuild = await client.guilds.cache.get(sync.outServer);
                discordMembership = await discordGuild.members.cache.get(newMember.id);
                discordMembership.roles.remove(sync.outRole);

                roleChange = sync.outRole;

                setTimeout(() => { roleChange = null}, 2500);

                //TODO: Add Logging to Discord Channel
            });
        }

        if(outSyncs.length) {
            outSyncs.forEach(async (sync) => {
                if(roleChange && roleChange === sync.outRole) return;

                discordGuild = await client.guilds.cache.get(sync.outServer);
                discordMembership = await discordGuild.members.cache.get(newMember.id);
                discordMembership.roles.add(sync.outRole);

                roleChange = sync.outRole;

                setTimeout(() => { roleChange = null}, 2500);

                //TODO: Add Logging to Discord Channel
            });
        }
    });
}

exports.onGuildMemberRemove = async (member) => {
    oldRoles =  member.roles.cache.filter(role => role.id !== member.guild.roles.everyone.id).map(role => role.id);
    
    oldRoles.forEach(async (role) => {
        inSyncs = syncLoader.searchInSync(role, newMember.guild.id);

        if(inSyncs.length) {
            inSyncs.forEach(async (sync) => {
                discordGuild = await client.guilds.cache.get(sync.outServer);
                discordMembership = await discordGuild.members.cache.get(member.id);
                discordMembership.roles.remove(sync.outRole);
                
                roleChange = sync.outRole;
                setTimeout(() => { roleChange = null}, 2500);

                //TODO: Add Logging to Discord Channel
            });
        }
    });
}