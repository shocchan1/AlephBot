const findFiles = require('../utils/file_reader');
const createLog = require('../utils/logger');
const path = require('path');

const log = createLog({ sys: 'tools', module: 'Languages Loader' });

module.exports = function commandLoader(client) {
    const files = findFiles('../languages');

    let load;

    for (const file of files) {
        const languagesPath = path.join('../languages', file);
        const language = require(languagesPath);

        if ('idCode' in language) {
            client.languages[language.idCode].set(language.idCode, language);

            log.info({ loaded: language.idCode }, 'Language loaded!');
        } else {
            throw new Error('An error occurred while trying to load the language files. Ensure the language packed with \'idCode\' correctly.');
        }

        load++;
    }

    log.info({ loaded: load }, 'Loading language files was successful.');
};