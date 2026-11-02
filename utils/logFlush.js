const { logger } = require('../configs/pino-configs');

module.exports = function flushLogs() {
    return new Promise((resolve, reject) => {
        logger.flush((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
};