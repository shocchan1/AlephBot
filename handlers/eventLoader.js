const { findFile } = require('../utils/recursive');
const path = require('path');

function loadEvents(client) {
    const folder = path.join(__dirname, '../events');
    const events = recursive(folder);

    for (const file of events) {
        try {
            const event = require(file);

            if (!event.name) {
                console.warn('[EVENT] Event missing data property.');
                continue;
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }

            console.log(`[EVENT] Loaded events: ${event.name}`);
        } catch (error) {
            console.warn('[EVENT] An error occured.');
            console.log('[EVENT]', error);
        }
    }
}

module.exports = { loadEvents };