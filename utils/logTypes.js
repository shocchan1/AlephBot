const { logger } = require('../configs/pino-configs');

module.exports = function createLog(sys, module) {
    return logger.child({ sys, module });
}