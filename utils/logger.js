const logger = require('../configs/pino');

module.exports = function createLog(category = {}) {
  return logger.child(category);
};