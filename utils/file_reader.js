const fs = require('fs');
const path = require('path');

module.exports = function findFiles(dir) {
  const files = [];
  const folders = path.join(__dirname, dir);
  const items = fs.readdirSync(folders, { withFileTypes: true, recursive: true });

  for (const item of items) {
    if (!item.isDirectory() && path.extname(item.name) === '.js') {
      files.push(item.name);
    }
  }

  return files;
};