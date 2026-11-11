const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration
  ],
  allowedMentions: {
    parse: ['users'],
    repliedUser: false
  },
  presence: {
    status: 'dnd',
    activities: [{
      name: 'Developing...',
      type: ActivityType.Playing
    }]
  }
});

client.commands = new Collection();
client.components = {
  buttons: new Collection(),
  modals: new Collection(),
  selects: new Collection()
};
client.cooldowns = new Collection();
client.languages = new Collection();

module.exports = client;