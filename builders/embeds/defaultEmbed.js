const { EmbedBuilder } = require('discord.js');

module.exports = function defaultEmbed(data) {
    const embed = new EmbedBuilder()
        .setTitle(data.title ?? 'No Title')
        .setDescription(data.description ?? 'No Description')
        .setColor(data.color ?? 'Orange')
        .setFooter({ text: data.footerText ?? 'AlephBot', iconURL: data.footerIcon ?? null })
        .setTimestamp();
    
    if (data.image) embed.setImage(data.image);
    if (data.thumbnail) embed.setThumbnail(data.thumbnail);

    return embed;
}