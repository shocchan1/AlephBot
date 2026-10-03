const { findFiles } = require('../utils/recursive.js');
const path = require('path');

function loadCommands(client) {
    const folder = path.join(__dirname, '../commands');
    const commands = findFiles(folder);

    for (const file of commands) {
        try {
            const command = require(file);

            if (!command.data || !command.execute) {
                console.warn('[COMMAND] Command missing data or execute property.');
                continue;
            }

            client.commands.set(command.data.name, command);
        } catch (error) {
            console.warn('[COMMAND] An error occured.');
            console.error('[COMMAND]', error);
        }
    }
}

module.exports = { loadCommands };