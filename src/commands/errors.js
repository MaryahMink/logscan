
const { ensureFileExists } = require("../utils/file");
const { printResult, fail } = require("../utils/output");
const { detectLevel, streamLines } = require("../parsers/logParser");

module.exports = async function errors(filePath, opts) {
  try {
    ensureFileExists(filePath);

    const limit = Number.isFinite(opts.limit) ? opts.limit : undefined;
    const matches = [];
    let seen = 0;

    await streamLines(filePath, (line) => {
      if (detectLevel(line) === "ERROR") {
        seen += 1;
        if (!limit || matches.length < limit) matches.push(line);
      }
    });

    const result = { file: filePath, errorCount: seen, lines: matches };
    result.text =
      `File: ${filePath}\n` +
      `Errors found: ${seen}\n\n` +
      (matches.length ? matches.join("\n") : "No ERROR lines found.");

    printResult(result, opts);
  } catch (e) {
    fail(e.message);
  }
};