
const fs = require("fs");
const readline = require("readline");

function detectLevel(line) {
  const upper = line.toUpperCase();
  if (upper.includes(" ERROR ")) return "ERROR";
  if (upper.includes(" WARN ")) return "WARN";
  if (upper.includes(" INFO ")) return "INFO";
  if (upper.includes(" DEBUG ")) return "DEBUG";
  if (upper.startsWith("ERROR")) return "ERROR";
  if (upper.startsWith("WARN")) return "WARN";
  if (upper.startsWith("INFO")) return "INFO";
  if (upper.startsWith("DEBUG")) return "DEBUG";
  return "OTHER";
}

function normalizeLine(line) {
  // Remove common timestamp shapes and long number sequences so repeats group together
  return line
    .replace(/\b\d{4}-\d{2}-\d{2}\b/g, "<date>")
    .replace(/\b\d{2}:\d{2}:\d{2}\b/g, "<time>")
    .replace(/\b[0-9a-f]{8,}\b/gi, "<id>")
    .replace(/\b\d+\b/g, "<num>")
    .replace(/\s+/g, " ")
    .trim();
}

async function streamLines(filePath, onLine) {
  const stream = fs.createReadStream(filePath, { encoding: "utf8" });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of rl) {
    await onLine(line);
  }
}

module.exports = { detectLevel, normalizeLine, streamLines };