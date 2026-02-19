#!/usr/bin/env node
const { Command } = require("commander");

const stats = require("../src/commands/stats");
const errors = require("../src/commands/errors");
const top = require("../src/commands/top");
const summarize = require("../src/commands/summarize");

const program = new Command();

program
  .name("logscan")
  .description("Turn noise into signal: summarize logs and README files.")
  .option("--json", "output machine-readable JSON");

program
  .command("stats")
  .description("Show log stats (counts by level, total lines)")
  .argument("<file>", "log file path")
  .action(async (file) => stats(file, program.opts()));

program
  .command("errors")
  .description("Print ERROR lines (optionally limited)")
  .argument("<file>", "log file path")
  .option("-l, --limit <n>", "max lines to output", (v) => parseInt(v, 10))
  .action(async (file, cmdOpts) => errors(file, { ...program.opts(), ...cmdOpts }));

program
  .command("top")
  .description("Show top repeated log patterns")
  .argument("<file>", "log file path")
  .option("-l, --limit <n>", "how many patterns to show", (v) => parseInt(v, 10), 10)
  .action(async (file, cmdOpts) => top(file, { ...program.opts(), ...cmdOpts }));

program
  .command("summarize")
  .description("Summarize a README.md by extracting structure")
  .argument("<file>", "markdown file path (e.g., README.md)")
  .option("--bullets", "bullet output format")
  .option("--short", "shorter overview")
  .action(async (file, cmdOpts) => summarize(file, { ...program.opts(), ...cmdOpts }));

program.parseAsync(process.argv);
