const path = require('path');
const findFiles = require('../utils/recursive');
const createLog = require('../utils/logTypes');

const log = createLog('core', 'EventLoader');

module.exports = function eventLoader(client) {
    const foldersPath = path.join(__dirname, '../events');
    const files = findFiles(foldersPath);

    let loadedEvents = 0;

    for (const file of files) {
        const event = require(file);
        const item = path.basename(file.name);

        if (!event.name || !event.execute) {
            log.fatal({ item }, 'The file is missing \'name\' or \'execute\' property');
            continue;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }

        log.info({ type: event.name }, 'The event loaded successfully.');
        loadedEvents++;
    }

    log.info({ loaded: loadedEvents }, 'Succeed installing event listeners.');
}