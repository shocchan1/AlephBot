const findFiles = require('../utils/file_reader');
const createLog = require('../utils/logger');
const path = require('path');

const log = createLog({ sys: 'tools', module: 'File Reader' });

module.exports = function eventLoader(client) {
    const files = findFiles('../events');

    for (const file of files) {
        const eventPath = path.join('../events', file);
        const event = require(eventPath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }

        log.info({ events: event.name }, 'Loaded!');
    }
};