const { Events } = require('discord.js');
const createLog = require('../utils/logger');

const log = createLog({ sys: 'events', 'Ready' });

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        log.info(`Logged in as ${client.user.tag} (${client.user.id})`);
    }
}