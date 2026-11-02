const GuildRepo = require('../repositories/GuildRepo');

module.exports = class GuildService {
    static async findOrCreateGuild(guildId) {
        let guild = await GuildRepo.getGuild(guildId);

        if (guild) {
            return guild;
        } else {
            guild = await GuildRepo.createGuild(guildId);
            return guild;
        }
    }
    static async removeGuild(guildId) {
        const guildData = await GuildRepo.deleteGuild(guildId);

        if (guildData.deletedCount === 0) throw new Error(`Guild with ID ${guildId} not found.`);

        return guildData;
    }
    static async updateBotLanguage(guildId, newLanguage) {
        const guildData = await GuildRepo.getGuild(guildId);

        if (guildData.botLanguage === newLanguage) {
            throw new Error(`The bot language is already set to ${newLanguage}.`);
        } else {
            const updateLanguage = await GuildRepo.updateLanguage(guildId, newLanguage);
            return updateLanguage;   
        }
    }
}