const { EmbedBuilder } = require('discord.js');
const { DEFAULT_COLOR } = require('../../configs/colors');

module.exports = function defaultEmbed(data) {
    return new EmbedBuilder()
        .setTitle(data.title ?? null)
        .setDescription(data.description ?? null)
        .setColor(data.color ?? DEFAULT_COLOR)
        .setAuthor(data.author ?? null)
        .setThumbnail(data.thumbnail ?? null)
        .setImage(data.image ?? null)
        .setFields(data.fields ?? null)
        .setFooter(data.footer ??  null)
        .setTimestamp();
}