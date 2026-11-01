const client = require('./client');
const connectDB = require('./database/connection');
const commandLoader = require('./handlers/cmdHandler');
const eventLoader = require('./handlers/eventHandler');
const componentLoader = require('./handlers/componentHandler');
const config = require('./configs/configs');
const shutdown = require('./handlers/errorHandler');
const createLog = require('./utils/logTypes');

const log = createLog('core', 'MainBody');

(async () => {
    process.on('SIGINT', () => {
        log.info('SIGINT signal received. Closing the bot...');
        shutdown(client);
    });

    process.on('SIGTERM', () => {
        log.info('SIGTERM signal received. Closing the bot...');
        shutdown(client);
    });

    commandLoader(client);
    eventLoader(client);
    componentLoader(client);

    try {
        await connectDB();
        await client.login(config.discord.token);
    } catch (err) {
        log.error({ err }, 'Error during bot startup.');
        await shutdown(client);
    } 
})();