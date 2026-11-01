const path = require('path');
const findFiles = require('../utils/recursive');
const createLog = require('../utils/logTypes');

const log = createLog('core', 'CommandLoader');

module.exports = function commandLoader(client) {
    const foldersPath = path.join(__dirname, 'commands');
    const files = findFiles(foldersPath);

    for (const file of files) {
        const command = require(file);
        const item = path.basename(file.name);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);

            log.info({ item }, 'A command loaded.');
        } else {
            log.fatal({ item }, 'The file is missing \'data\' or \'execute\' property.');
        }

        log.info(`${client.commands.size} commands loaded successfully.`);
    }
}