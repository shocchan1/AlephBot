const mongoose = require('mongoose');
const config = require('../configs/configs');
const createLog = require('../utils/logTypes');

const log = createLog('core', 'DatabaseConnection');

module.exports = async function connectDB() {
    mongoose.connection.on('connected', () => {
        log.info(`Database connected to ${config.env}`);
    });

    mongoose.connection.on('disconnected', () => {
        log.warn('Database disconnected.');
    });

    mongoose.connection.on('error', (err) => {
        log.error({ err }, 'Database connection error.');
    });

    try {
        if (!config.database.cluster) {
            log.error({ err: 'Database cluster is undefined' }, 'Database connection failed to start.');
            process.exit(1);
        } else {
            await mongoose.connect(config.database.cluster);
        }
    } catch (err) {
        log.error({ err }, 'Database connection failed.');
        process.exit(1);
    }
}