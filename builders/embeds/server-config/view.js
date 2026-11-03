const defaultEmbed = require('../defaultEmbed');

module.exports = function viewGuildSetting(guild, guildData, user) {
    const data = guildData.toggles;
    return defaultEmbed({
        title: `${guild.name.toUpperCase()} CONFIGURATIONS`,
        description: 'You\'re viewing your server settings. You may edit the settings by typing /server-config edit.',
        thumbnail: guild.displayAvatarURL({ dynamic: true, size: 256 }),
        fields: [
            { name: 'Auto-Role System:', value: data.autoRoleSystem },
            { name: 'Welcome-Leave System:', value: data.welcomeSystem },
            { name: 'Honeypot System:', value: data.honeypotSystem },
            { name: 'Audit Log System:', value: data.auditLogSystem },
            { name: 'Anti-Spam System:', value: data.antiSpamSystem },
            { name: 'Auto-Mod System:', value: data.autoModSystem },
            { name: 'Anti-Raid System:', value: data.antiRaidSystem },
            { name: 'Anti-Link System:', value: data.antiLinkSystem }
        ],
        footer: { text: `Requested by ${user.tag ?? user.username}`, iconURL: user.displayAvatarURL() }
    });
}