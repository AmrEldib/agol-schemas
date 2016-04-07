var assert = require('assert');
var agolSchemas = require('../index');

describe("agol-schemas", function () {
  it("Can list all schemas", function () {
    assert.notEqual(agolSchemas.listAllSchemas().length, 0);
  });
});
