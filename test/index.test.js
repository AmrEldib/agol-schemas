var assert = require('assert');
var agolSchemas = require('../index');

describe("agol-schemas", function () {
  it("Can list all schemas", function () {
    assert.notEqual(agolSchemas.listAllSchemas().length, 0);
  });

  it("Can get a schema", function () {
    assert.notEqual(agolSchemas.getSchema(agolSchemas.listAllSchemas()[0]), '');
  });
});
