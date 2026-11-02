const GuildSchema = require('../schemas/GuildSchema');

module.exports = class GuildRepo {
    static async #createGuild(guildId) {
        return GuildSchema.create({ guildId });
    }
    static async #deleteGuild(guildId) {
        return GuildSchema.deleteOne({ guildId });
    }
    static async #getGuild(guildId) {
        return GuildSchema.findOne({ guildId });
    }
    static async #updateGuild(guildId, updateData) {
        return GuildSchema.findOneAndUpdate({ guildId }, { $set: updateData }, { returnDocument: 'after' });
    }
    static async updateLanguage(guildId, newLanguage) {
        return this.#updateGuild(guildId, { botLanguage: newLanguage });
    }
}