module.exports = function errorHandler(shutdown) {
    process.on('unhandledRejection', () => 
    shutdown('Unhandled Promise Rejection'));

    process.on('uncaughtException', () =>
    shutdown('Uncaught Exception'));
}