const path = require('path');
const findFiles = require('../utils/recursive');
const createLog = require('../utils/logTypes');

const log = createLog('core', 'ComponentLoader');

module.exports = function componentLoader(client) {
    const foldersPath = path.join(__dirname, '../components');
    const files = findFiles(foldersPath);

    for (const file of files) {
        const component = require(file);
        const item = path.basename(file.name);

        if ('customId' in component && 'execute' in component) {
            client.components.set(component.customId, component);

            log.info({ item }, 'A component loaded.');
        } else {
            log.fatal({ item }, 'The file is missing \'customId\' or \'execute\' property.');
        }
    }
    
    log.info(`${client.components.size} components loaded successfully.`);
}