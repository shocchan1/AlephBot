const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    botLanguage: {
        type: String,
        enum: ['en', 'id'],
        default: 'en'
    },
    toggles: {
        welcomeSystem: {
            type: Boolean,
            default: false
        },
        autoRoleSystem: {
            type: Boolean,
            default: false
        },
        honeypotSystem: {
            type: Boolean,
            default: false
        },
        auditLogSystem: {
            type: Boolean,
            default: false
        },
        antiSpamSystem: {
            type: Boolean,
            default: false
        },
        autoModSystem: {
            type: Boolean,
            default: false
        },
        antiRaidSystem: {
            type: Boolean,
            default: false
        },
        antiLinkSystem: {
            type: Boolean,
            default: false
        },
    },
    channels: {
        welcomeChannel: {
            type: String,
            default: null
        },
        auditLogChannel: {
            type: String,
            default: null
        },
        honeypotChannel: {
            type: String,
            default: null
        },
        antiRaidChannel: {
            type: String,
            default: null
        },
    },
    roles: {
        autoRole: {
            type: String,
            default: null
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('GuildConfig', GuildSchema);