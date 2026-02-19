
function extractTitle(lines) {
  const t = lines.find((l) => l.startsWith("# "));
  return t ? t.replace(/^#\s+/, "").trim() : null;
}

function extractHeadings(lines) {
  return lines
    .filter((l) => /^#{2,3}\s+/.test(l))
    .map((l) => l.replace(/^#{2,3}\s+/, "").trim());
}

function extractOverview(lines) {
  // First non-empty paragraph that isn't a heading or code fence
  let buf = [];
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const trimmed = line.trim();
    if (!trimmed) {
      if (buf.length) break;
      continue;
    }
    if (/^#/.test(trimmed)) continue;

    buf.push(trimmed);
    if (buf.join(" ").length > 240) break;
  }

  return buf.length ? buf.join(" ") : null;
}

module.exports = { extractTitle, extractHeadings, extractOverview };