var assert = require('assert');
var agolSchemas = require('../index');
var RSVP = require('rsvp');

describe("agol-schemas", function () {
  it("Can list all schemas", function () {
    assert.notEqual(agolSchemas.listAllSchemas().length, 0);
  });

  it("Can get a schema", function () {
    return agolSchemas.getSchema(agolSchemas.listAllSchemas()[0]).then(function (s) {
      return  assert.notEqual(s, '');
    })
  });
});
