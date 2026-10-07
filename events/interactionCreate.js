const { Events, Collection, MessageFlags } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        const cooldown = interaction.client.cooldowns;

        if (!command) {
            console.warn(`[INTERACTION] No command matching ${interaction.commandName} was found.`);
        }
        if (!cooldown.has(command.data.name)) {
            cooldown.set(command.data.name, new Collection());
        }

        const timeNow = Date.now();
        const cdList = cooldown.get(command.data.name);
        const duration = (command.cooldown ?? 3) * 1000;

        if (cdList.has(interaction.user.id)) {
            const freeTime = cdList.get(interaction.user.id) + duration;

            if (timeNow < freeTime) return interaction.reply({ content: 'Please wait a moment! Command in cooldown.', flags: MessageFlags.Ephemeral });
        }

        cdList.set(interaction.user.id, timeNow);
        setTimeout(() => cdList.delete(interaction.user.id), duration);

        try {
            await command.execute(interaction);
        } catch (error) {
            console.warn('[INTERACTION] An error occured.');
            console.error('[INTERACTION] ', error);
        }
    }
}