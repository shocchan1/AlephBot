const { Events } = require('discord.js');
const GuildService = require('../database/services/GuildService');
const createLog = require('../utils/logTypes');

const log = createLog('events', 'GuildCreateEvent');

module.exports = {
    name: Events.GuildCreate,
    once: false,

    async execute(guild) {
        try {
            await GuildService.createGuild(guild.id);

            log.info(`Joined new guild: ${guild.name} (${guild.id})`);
        } catch (err) {
            log.error({ err, guildId: guild.id }, 'Error occurred while handling guildCreate event.');
        }
    }
}