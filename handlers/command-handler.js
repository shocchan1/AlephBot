const findFiles = require('../utils/file_reader');
const createLog = require('../utils/logger');
const path = require('path');

const log = createLog({ sys: 'tools', module: 'Commands Loader' });

module.exports = function commandLoader(client) {
    const files = findFiles('../commands');

    let load;

    for (const file of files) {
        const commandsPath = path.join('../commands', file);
        const command = require(commandsPath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data, command);

            log.info({ loaded: command.data.name }, 'Command loaded!');
        } else {
            throw new Error('An error occurred while trying to load the command files. Ensure the command packed with \'data\' and \'execute\' correctly.');
        }

        load++;
    }

    log.info({ loaded: load }, 'Loading command files was successful.');
};