const assert = require('assert');
const fs = require('fs');

describe('uml-to-json', () => {
  it('should convert a UML file to a JSON object', () => {
    const outputName = 'tests/rules.yaml';
    const expectedJsonName = 'tests/person.yaml.json';
    process.argv = ['node', 'app.js', "-i", inputName, "-o", outputName];

    const runApp = require('../app');

    const json = fs.readFileSync(outputName, 'utf-8');
    const expectedJson = fs.readFileSync(expectedJsonName, 'utf-8');
    assert.deepEqual(json, expectedJson); // insert expected output here
  });
});