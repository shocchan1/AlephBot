const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const createLog = require('../../utils/logTypes');

const log = createLog('command', 'ServerConfiguration');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-config')
        .setDescription('Configure the server settings')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(cmd =>
            cmd.setName('view')
                .setDescription('Configure the bot language')
                .setRequired(false)
        )
        .addSubcommand(cmd =>
            cmd.setName('edit')
                .setDescription('Edit the server configuration')
                .setRequired(false)
        ),

    async execute(interaction) {
        switch (interaction.geSubcommand()) {
            case 'view': {}
            case 'edit': {}
        }
    }
}