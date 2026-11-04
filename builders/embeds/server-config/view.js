const defaultEmbed = require('../defaultEmbed');

module.exports = function viewGuildSetting(guild, toggles, user) {
    const toggleNames = {
        welcomeSystem: 'Welcome-Leave System:',
        autoRoleSystem: 'Auto-Role System:',
        honeypotSystem: 'Honeypot System:',
        auditLogSystem: 'Audit Log System:',
        antiSpamSystem: 'Anti-Spam System',
        autoModSystem: 'Auto Mod System:',
        antiRaidSystem: 'Anti-Raid System:',
        antiLinkSystem: 'Anti-Link System:'
    }

    const toggleFields = Object.entries(toggles).map(([key, value]) => ({
        name: toggleNames[key] ?? key,
        value: value ? 'Enabled' : 'Disabled'
    }));

    return defaultEmbed({
        title: `${guild.name.toUpperCase()} CONFIGURATIONS`,
        description: 'You\'re viewing your server settings. You may edit the settings by typing /server-config edit.',
        thumbnail: guild.iconURL({ dynamic: true, size: 256 }),
        fields: toggleFields,
        footer: { text: `Requested by ${user.tag ?? user.username}`, iconURL: user.displayAvatarURL() }
    });
}