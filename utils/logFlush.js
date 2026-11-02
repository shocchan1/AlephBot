const pino = require('../configs/pino-configs');

module.exports = function flushLogs() {
    return new Promise((resolve, reject) => {
        pino.flush((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
};