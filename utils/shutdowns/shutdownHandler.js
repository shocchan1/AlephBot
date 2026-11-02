module.exports = async function shutdownHandler(shutdown) {
    process.on('SIGINT', () =>
    shutdown('SIGINT signal received. Closing the bot...'));

    process.on('SIGTERM', () =>
    shutdown('SIGTERM signal received. Closing the bot...'));
}