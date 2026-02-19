
const fs = require("fs");

function ensureFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    const err = new Error(`File not found: ${filePath}`);
    err.code = "FILE_NOT_FOUND";
    throw err;
  }
}

module.exports = { ensureFileExists };