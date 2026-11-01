const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    presence: {
        status: 'dnd',
        activities: [{
            name: 'Development...',
            type: ActivityType.Playing
        }]
    }
});

client.commands = new Collection();
client.components = new Collection();
client.cooldowns = new Collection();

module.exports = client;