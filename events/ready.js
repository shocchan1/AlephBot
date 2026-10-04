const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        console.log(`[START UP] Logging in...\n[START UP] Success! Logged in as ${client.user.tag} (${client.user.id})`);
    }
}