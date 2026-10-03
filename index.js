require('dotenv').config();
const { loadEvents } = require('./handlers/eventLoader.js');
const { loadCommands } = require('./handlers/commandLoader.js');

const client = require('./client.js');
loadEvents(client);
loadCommands(client);

client.login(process.env.BOT_TOKEN);