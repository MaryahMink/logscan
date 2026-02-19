
function printResult(result, opts) {
  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (result.text) console.log(result.text);
  else console.log(result);
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

module.exports = { printResult, fail };