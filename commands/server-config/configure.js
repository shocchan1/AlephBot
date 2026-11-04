const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const createLog = require('../../utils/logTypes');
const { viewGuildSetting } = require('../../builders/index');
const GuildService = require('../../database/services/GuildService');

const log = createLog('command', 'ServerConfiguration');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-config')
        .setDescription('Configure the server settings')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(cmd =>
            cmd.setName('view')
                .setDescription('Configure the bot language')
        )
        .addSubcommand(cmd =>
            cmd.setName('edit')
                .setDescription('Edit the server configuration')
        ),

    async execute(interaction) {
        const guild = interaction.guild;
        const user = interaction.user ?? interaction.member;

        switch (interaction.options.getSubcommand()) {
            case 'view': {
                try {
                    const guildData = await GuildService.findOrCreateGuild(guild.id);

                    await interaction.reply({ embeds: [viewGuildSetting(guild, guildData.toggles, user)], flags: MessageFlags.Ephemeral });
                } catch (err) {
                    log.error({ err }, 'An error occurred while viewing the server configurations.');
                    await interaction.reply({ content: err.message, flags: MessageFlags.Ephemeral });
                }
                break;
            }
            case 'edit': {}
        }
    }
}