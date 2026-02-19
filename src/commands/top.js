
const { ensureFileExists } = require("../utils/file");
const { printResult, fail } = require("../utils/output");
const { normalizeLine, streamLines } = require("../parsers/logParser");

module.exports = async function top(filePath, opts) {
  try {
    ensureFileExists(filePath);

    const limit = Number.isFinite(opts.limit) ? opts.limit : 10;
    const freq = new Map();

    await streamLines(filePath, (line) => {
      const key = normalizeLine(line);
      freq.set(key, (freq.get(key) || 0) + 1);
    });

    const sorted = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([pattern, count]) => ({ count, pattern }));

    const result = { file: filePath, top: sorted };
    result.text =
      `File: ${filePath}\nTop patterns:\n` +
      sorted.map((x, i) => `${i + 1}) (${x.count}) ${x.pattern}`).join("\n");

    printResult(result, opts);
  } catch (e) {
    fail(e.message);
  }
};