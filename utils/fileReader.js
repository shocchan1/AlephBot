const fs = require('fs');
const path = require('path');

function getFiles(dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const address = path.join(dir, entry.name);

        if (entry.isDirectory) {
            files.push(...getFiles(address));
        } else {
            files.push(address);
        }
    }

    return files;
}

module.exports = { getFiles };