const { Events } = require('discord.js');
const GuildService = require('../database/services/GuildService');
const createLog = require('../utils/logTypes');

const log = createLog('core', 'GuildDeleteEvent');

module.exports = {
    name: Events.GuildDelete,
    once: false,

    async execute(guild) {
        try {
            await GuildService.removeGuild(guild.id);

            log.info(`Removed guild from database: ${guild.name} (${guild.id})`);
        } catch (err) {
            log.error({ err, guildId: guild.id }, 'Error occurred while handling guildDelete event.');
        }
    }
}