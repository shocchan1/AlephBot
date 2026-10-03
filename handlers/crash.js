module.exports = function crashHandler() {
    process.on('uncaughtException', (err, origin) => {
        console.error('[CRASH] Uncaught Exception:', err, '\n[CRASH] Exception origin:', origin);
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.error('[CRASH] Unhandled Rejection at', promise, '\n[CRASH] Reason:', reason);
    });
}