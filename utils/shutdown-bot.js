const { default: mongoose } = require('mongoose');
const createLog = require('./logger');

const log = createLog({ sys: 'tools', module: 'Shutdown System' });

module.exports = class Shutdown {
    constructor(client){
        this.client = client;
        this.log = log;
        this.isShuttingDown = false;
    }
    
    register() {
        process.on('SIGINT', () => this.shutdown('SIGNT'));
        process.on('SIGTERM', () => this.shutdown('SIGTERM'));
    }

    async shutdown(signal) {
        if (this.isShuttingDown) return;

        this.isShuttingDown = true;
        this.log.info({ signal }, 'Shutdown initiated.');

        try {
            if (this.client) {
                await this.client.destroy();
            }

            if (mongoose.connection.readyState === 1) {
                await mongoose.disconnect();
            }

            this.log.info('All resources have been cleaned up.');
        } catch (err) {
            process.exitCode = 1;
            this.log.error({ err }, 'Shutdown failed.');
        } finally {
            this.log.flush();
        }
    }
}