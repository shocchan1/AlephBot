const { Events } = require('discord.js');
const createLog = require('../utils/logTypes');

const log = createLog('events', 'Ready');

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        log.info(`Logging in...\nLogged in as ${client.user.tag} (${client.user.id})`);
    }
}