const mongoose = require('mongoose');
const config = require('../configs/configs');
const createLog = require('../utils/logTypes');

const log = createLog('core', 'DatabaseConnection');

async function connectDB() {
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
            process.exitCode = 1;
        } else {
            await mongoose.connect(config.database.cluster);
        }
    } catch (err) {
        log.error({ err }, 'Database connection failed.');
        process.exitCode = 1;
    }
}

async function disconnectDB() {
    try {
        await mongoose.disconnect();
    } catch (err) {
        log.error({ err }, 'Error occurred while disconnecting from the database.');
        process.exitCode = 1;
    }
}

module.exports = { connectDB, disconnectDB };