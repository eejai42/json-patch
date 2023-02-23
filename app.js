#!/usr/bin/env node
"use strict";

const fs = require("fs");
const jsonpatch = require("fast-json-patch");
const program = require("commander");

function runApp(args) {
try {
program
.option("-j, --json <json>", "input JSON file")
.option("-t, --patch <patch>", "JSON patch file")
.option("-h, --help", " Show the usage/help documentation.")
.action((action) => {
program.json = action.json;
program.patch = action.patch;
})
.parse(args);

if (!program.json || !program.patch) {
  console.error(
    "Error: Required option --json <json> --patch <patch> not specified"
  );
  console.error("");
  console.error(
    "Usage: json-patch --json <json> --patch <patch> [options]"
  );
  console.error("");
  console.error("");
  console.error("Options:");
  console.error("--json <json>  Input JSON file");
  console.error("--patch <patch>  Input JSON Patch file");
  console.error("-h, --help     Output usage information");
  console.error("");

  process.exit(1);
}

// Read the input JSON file
const inputJSON = fs.readFileSync(program.json, "utf-8");
const json = JSON.parse(inputJSON);

// Read the input Patch file
const inputPatch = fs.readFileSync(program.patch, "utf-8");
console.error(inputPatch.trim());
const patch = JSON.parse(inputPatch.trim());

// Apply the patch to the input JSON
const result = jsonpatch.applyPatch(json, patch).newDocument;

// Output the resulting JSON to the standard output
var jsonStr = JSON.stringify(result, null, 2);
console.log(jsonStr);
fs.writeFileSync(program.json, jsonStr, 'utf-8');

} catch (err) {
console.error(err);
}
}

runApp(process.argv);

module.exports = { runApp };




