const fs = require('fs');
const path = require('path');

module.exports = function findFiles(dir, files = []) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true, recursive: true });

    for (const dirent of dirents) {
        if (dirent.isFile() && path.extname(dirent.name) === '.js') {
            files.push(path.join(dirent.parentPath, dirent.name));
        }
    }

    return files;
}