const { StringSelectMenuBuilder } = require('discord.js');

module.exports = function defautlSelect(data) {
    return new StringSelectMenuBuilder()
        .setCustomId(data.customId)
        .setPlaceholder(data.placeholder)
        .addOptions(data.options ?? [])
        .setMinValues(data.minValues ?? 1)
        .setMaxValues(data.maxValues ?? 1)
        .setDisabled(data.disabled ?? false)
}