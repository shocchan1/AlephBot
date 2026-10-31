const pino = require('../configs/pino-configs');

module.exports = function createLog(sys, module) {
    return pino.child({ sys, module });
}