const findFiles = require('../utils/file_reader');
const createLog = require('../utils/logger');
const path = require('path');

const log = createLog({ sys: 'tools', module: 'Components Loader' });

module.exports = function commandLoader(client) {
    const files = findFiles('../components');

    let load;

    for (const file of files) {
        const componentsPath = path.join('../components', file);
        const component = require(componentsPath);

        if ('customId' in component && 'execute' in component && 'type' in component) {
            client.components[component.type].set(component.customId, component);

            log.info({ loaded: component.customId }, 'Component loaded!');
        } else {
            throw new Error('An error occurred while trying to load the component files. Ensure the component packed with \'type\', \'data\', and \'execute\' correctly.');
        }

        load++;
    }

    log.info({ loaded: load }, 'Loading component files was successful.');
};