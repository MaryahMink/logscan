
const assert = require("assert");
const { extractTitle, extractHeadings } = require("../src/parsers/readmeParser");

(function testReadmeParser() {
  const lines = ["# logscan", "", "hello", "## Installation", "## Usage"];
  assert.strictEqual(extractTitle(lines), "logscan");
  assert.deepStrictEqual(extractHeadings(lines), ["Installation", "Usage"]);
  console.log("✅ readmeParser tests passed");
})();