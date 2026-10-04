require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { findFiles } = require('./recursive');
const path = require('path')

const commands = [];

const folder = path.join(__dirname, '../commands');
const files = findFiles(folder);

async function deployCommands() {
    try {
        for(const file of files) {
        const command = require(file);

        if (!command.data || !command.execute) {
            console.warn(`[COMMAND] Command missing data or execute property at ${file}`);
            continue;
        }

        commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    } catch (error) {
        console.warn('[COMMAND] An error occured.');
        console.error('[COMMAND] ', error);
    }
}

deployCommands();