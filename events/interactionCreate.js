const { Events } = require('discord.js');
const createLog = require('../utils/logTypes');

const log = createLog('event', 'InteractionCreate');

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                log.warn(`No command matching ${interaction.commandName} was found.`);
            }

            try {
                await command.execute(interaction);
            } catch (err) {
                log.error({ err }, 'An error occurred while executing a command.');
            }
        }
    }
}