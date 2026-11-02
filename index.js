const client = require('./client');
const commandLoader = require('./handlers/cmdHandler');
const eventLoader = require('./handlers/eventHandler');
const componentLoader = require('./handlers/componentHandler');
const config = require('./configs/configs');
const { connectDB } = require('./database/connection');
const shutdownHandler = require('./handlers/shutdownHandler');
const errorHandler = require('./handlers/errorHandler');
const shutdown = require('./utils/shutdown');
const createLog = require('./utils/logTypes');

const log = createLog('core', 'MainBody');

(async () => {
    commandLoader(client);
    eventLoader(client);
    componentLoader(client);

    shutdownHandler(() => shutdown(client, 0));
    errorHandler(async () => await shutdown(client, 1));

    try {
        await connectDB();
        await client.login(config.discord.token);
    } catch (err) {
        log.error({ err }, 'Error during bot startup.');
        await shutdown(client);
    } 
})();