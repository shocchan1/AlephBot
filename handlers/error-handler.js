const createLog = require('../utils/logger');

const log = createLog({ sys: 'core', module: 'Shutdown System' });

module.exports = async function errorHandling(client) {
    process.on('unhandledRejection', (reason) => {
        log.fatal({ reason }, 'Unhandled Rejection detected. Shutting down the bot properly...');
    });

    process.on('uncaughtException', (err, origin) => {
        log.fatal({ err, origin }, 'Uncaught Exception detected. Shutting down the bot properly...');
    });

    process.on('SIGINT', () => {
        log.info('SIGINT signal received. Shutting down the bot properly...');
    });

    process.on('SIGTERM', () => {
        log.info('SIGTERM signal received. Shutting down the bot properly...');
    })
};