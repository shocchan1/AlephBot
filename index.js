require('dotenv').config();
const { loadEvents } = require('./handlers/eventLoader.js');

const client = require('./client.js');
loadEvents(client);

client.login(process.env.BOT_TOKEN);