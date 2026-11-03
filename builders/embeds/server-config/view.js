const defaultEmbed = require('../defaultEmbed');

module.exports = function viewGuildSetting(guild, guildData, user) {
    const config = Object.entries(guildData).map(([key, value]) => ({
        name: key,
        value: value ? 'Enabled' : 'Disabled'
    }));

    return defaultEmbed({
        title: `${guild.name.toUpperCase()} CONFIGURATIONS`,
        description: 'You\'re viewing your server settings. You may edit the settings by typing /server-config edit.',
        thumbnail: guild.displayAvatarURL({ dynamic: true, size: 256 }),
        fields: config,
        footer: { text: `Requested by ${user.tag ?? user.username}`, iconURL: user.displayAvatarURL() }
    });
}