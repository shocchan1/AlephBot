const mongoose = require('mongoose');
const createLog = require('../utils/logTypes');

const log = createLog('core', 'GracefulShutdown');

module.exports = function shutdown(client) {
    process.on('unhandledRejection', (reason, promise) => {
        log.fatal({ reason, promise }, 'Unhandled Rejection detected.');
    });

    process.on('uncaughtException', async (err) => {
        logger.fatal({ err }, 'Uncaught Exception detected!');

        setTimeout(() => process.exit(1), 5000).unref();

        try {
            if (client) {
                await client.destroy();
                log.info('Disconnected WebSocket Discord is success!');
            }

            if (mongoose.connection.readyState === 1) {
                await mongoose.disconnect();
                log.info('Disconnected MongoDB is success!');
            }

            process.exit(1);
        } catch (err) {
            log.fatal({ err }, 'An error occurred while client trying to shutdown properly. An immediate action will be granted shortly...');
            process.exit(1);
        }
    });
}