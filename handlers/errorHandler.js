const mongoose = require('mongoose');
const createLog = require('../utils/logTypes');

const log = createLog('core', 'GracefulShutdown');

module.exports = async function shutdown(client, isShuttingDown = false) {
    const closeResources = async (exitCode) => {
        if (isShuttingDown) return;
        isShuttingDown = true;

        setTimeout(() => process.exit(exitCode), 5000).unref();

        try {
            if (client) {
                await client.destroy();
                log.info('Discord client destroyed successfully.');
            }

            if (mongoose.connection.readyState === 1) {
                await mongoose.connection.close();
                log.info('MongoDB connection closed successfully.');
            }
        } catch (err) {
            log.fatal({ err }, 'An error occurred while closing resources.');
            exitCode = 1;
        }

        if (typeof log.flush === 'function') log.flush();

        setTimeout(() => process.exit(exitCode), 100);
    }

    process.on('unhandledRejection', (reason, promise) => {
        log.fatal({ reason, promise }, 'Unhandled promise rejection detected.');
    });

    closeResources(0);

    process.on('uncaughtException', (err) => {
        log.fatal({ err }, 'Uncaught exception detected.');
        closeResources(1);
    });
}