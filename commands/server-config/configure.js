const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const createLog = require('../../utils/logTypes');
const { viewGuildSetting, editGuildSetting } = require('../../builders/index');
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
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const guild = interaction.guild;
        const user = interaction.user ?? interaction.member;
        const guildData = await GuildService.findOrCreateGuild(guild.id);

        switch (interaction.options.getSubcommand()) {
            case 'view': {
                try {
                    await interaction.editReply({
                        embeds: [viewGuildSetting(guild, guildData.toggles, user)]
                    });
                } catch (err) {
                    log.error({ err }, 'An error occurred while viewing the server settings.');
                    await interaction.editReply({
                        content: err.message
                    });
                }
                break;
            }
            case 'edit': {
                try {
                    await interaction.editReply({
                        embeds: [editGuildSetting(guild, user)]
                    });
                } catch (err) {
                    log.error({ err }, 'An error occurred while editing the server settings.');
                    await interaction.editReply({
                        content: err.message
                    });
                }
            }
        }
    }
}