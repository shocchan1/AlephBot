const mongoose = require('mongoose');
const config = require('../configs/configs');
const createLog = require('../utils/logTypes');

const log = createLog('core', 'DatabaseConnection');

module.exports = async function connectDB() {
    mongoose.connection.on('connected', () => {
        log.info(`Database connected to ${config.database.cluster}`);
    });

    mongoose.connection.on('disconnected', () => {
        log.warn('Database disconnected.');
    });

    mongoose.connection.on('error', (err) => {
        log.error({ err }, 'Database connection error.');
    });

    try {
        await mongoose.connect(config.database.token);
    } catch (err) {
        log.error({ err }, 'Database connection failed.');
        process.exit(1);
    }
}