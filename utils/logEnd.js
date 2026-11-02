const { transport } = require('../configs/pino-configs');

module.exports = function closeLog() {
    return new Promise((resolve, reject) => {
        transport.end((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
};