require('dotenv').config();
const client = require('./client.js');

client.login(process.env.BOT_TOKEN);