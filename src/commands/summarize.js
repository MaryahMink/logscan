
const fs = require("fs");
const { ensureFileExists } = require("../utils/file");
const { printResult, fail } = require("../utils/output");
const { extractTitle, extractHeadings, extractOverview } = require("../parsers/readmeParser");

module.exports = async function summarize(filePath, opts) {
  try {
    ensureFileExists(filePath);

    const raw = fs.readFileSync(filePath, "utf8");
    const lines = raw.split(/\r?\n/);

    const title = extractTitle(lines);
    const headings = extractHeadings(lines);
    const overview = extractOverview(lines);

    const result = {
      file: filePath,
      title,
      overview: opts.short && overview ? overview.slice(0, 140) + "…" : overview,
      sections: headings
    };

    if (opts.bullets) {
      result.text =
        `Title: ${title || "(none)"}\n\n` +
        `Overview:\n- ${result.overview || "(none)"}\n\n` +
        `Key Sections:\n` +
        (headings.length ? headings.map((h) => `- ${h}`).join("\n") : "- (none)");
    } else {
      result.text =
        `Title: ${title || "(none)"}\n\n` +
        `Overview:\n${result.overview || "(none)"}\n\n` +
        `Key Sections:\n` +
        (headings.length ? headings.join("\n") : "(none)");
    }

    printResult(result, opts);
  } catch (e) {
    fail(e.message);
  }
};