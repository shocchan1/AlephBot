const defaultSelectString = require('../defaultSelectString');

module.exports = function panelGuildSettingSelect() {
    return defaultSelectString({
        customId: 'panel-guild-setting-select',
        placeholder: 'Tap and select...',
        options: [
            { label: 'Welcome-Leave', value: 'welcomeLeavePanel' },
            { label: 'Auto-Role', value: 'autoRolePanel' },
            { label: 'Honeypot', value: 'honeypotPanel' },
            { label: 'Audit Log', value: 'auditLogPanel' },
            { label: 'Anti-Spam', value: 'antiSpamPanel' },
            { label: 'Auto Mod', value: 'autoModPanel' },
            { label: 'Anti-Raid', value: 'antiRaidPanel' },
            { label: 'Anti-Link', value: 'antiLinkSystem' }
        ]
    });
}