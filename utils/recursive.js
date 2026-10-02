const fs = require('fs');
const path = require('path');

function recursive(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const itemPath = path.join(dir, item.name);
        const relativePath = path.resolve(itemPath);

        if (item.isDirectory()) {
            files.push(...recursive(itemPath));
            continue;
        }

        if (path.extname(item.name) !== '.js') continue;

        try {
            files.push(relativePath);
        } catch (error) {
            console.log('[RECURSIVE] An error occured.');
            console.error('[RECURSIVE]', error);
        }
    }
    return files;
}

module.exports = { recursive };

const filep = recursive('./events');
console.log(filep);