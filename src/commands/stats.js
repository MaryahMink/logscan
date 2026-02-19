
const { ensureFileExists } = require("../utils/file");
const { printResult, fail } = require("../utils/output");
const { detectLevel, streamLines } = require("../parsers/logParser");

module.exports = async function stats(filePath, opts) {
  try {
    ensureFileExists(filePath);

    const levels = { ERROR: 0, WARN: 0, INFO: 0, DEBUG: 0, OTHER: 0 };
    let totalLines = 0;

    await streamLines(filePath, (line) => {
      totalLines += 1;
      const lvl = detectLevel(line);
      levels[lvl] = (levels[lvl] || 0) + 1;
    });

    const result = { file: filePath, totalLines, levels };

    result.text =
      `File: ${filePath}\n` +
      `Total lines: ${totalLines}\n\n` +
      `Levels:\n` +
      `ERROR: ${levels.ERROR}\n` +
      `WARN : ${levels.WARN}\n` +
      `INFO : ${levels.INFO}\n` +
      `DEBUG: ${levels.DEBUG}\n` +
      `OTHER: ${levels.OTHER}\n`;

    printResult(result, opts);
  } catch (e) {
    fail(e.message);
  }
};