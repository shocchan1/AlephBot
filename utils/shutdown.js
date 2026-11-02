const createLog = require('./logTypes');
const { disconnectDB } = require('../database/connection');
const flushLogs = require('./logFlush');
const closeLog = require('./logEnd');

const log = createLog('core', 'GracefulShutdown');

module.exports = async function shutdown(client, exitCode = 0, isShuttingDown = false) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    try {
        if (client) {
            client.destroy();
            log.info('Bot client destroyed.');
        }

        if (disconnectDB) {
            await disconnectDB();
            log.info('Database connection closed.');
        }

        await flushLogs();
        await closeLog();
        process.exitCode = exitCode;
    } catch (error) {
        log.error('Error occurred while shutting down:', error);
        process.exitCode = 1;
    }
}