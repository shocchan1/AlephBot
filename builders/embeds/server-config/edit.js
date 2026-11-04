const defaultEmbed = require('../defaultEmbed');

module.exports = function editGuildSetting(guild, user) {
    return defaultEmbed({
        description: `# **Editing ${guild.name} Settings**\n\nTap and select the dropdown options below to configure the settings.`,
        thumbnail: guild.iconURL({ dynamic: true, size: 256 }),
        footer: { text: `Requested by ${user.tag ?? user.usesername}`, iconURL: user.displayAvatarURL() }
    });
}