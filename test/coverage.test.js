var assert = require('assert');
var coverageConfig = require('../config/coverage-config');

/**
 * Traverse coverage-config.js file to get array of schema names, callback function of array.prototype.reduce
 * @param {array} schemas Previous value of iteration
 * @param {object} resource Current element of array
 * @returns {array} Array of all named schemas
 */
function getSchemas(schemas, resource) {
  if (resource.hasOwnProperty('children')) {
    resource.children.reduce(getSchemas, schemas);
  } else {
    schemas.push(resource.schema);
  }
  return schemas;
}

/**
 * Get duplicates schemas and their counts from full schema list
 * @param {array} schemas Full schema list
 * @returns {object} Object whose properties are the names of the schemas with duplicates and their values are the count of their duplication
 */
function getDuplicates(schemas) {
  var uniqueSchemas = schemas.map(function (schema) {
    return {
      count: 1,
      schema: schema
    }
  })
    .reduce(function (schemaCounts, schema) {
      schemaCounts[schema.schema] = (schemaCounts[schema.schema] || 0) + schema.count
      return schemaCounts
    }, {});

  var duplicates = Object.keys(uniqueSchemas).reduce(function (d, schema) {
    if (uniqueSchemas[schema] > 1) {
      d[schema] = uniqueSchemas[schema];
    };
    return d;
  }, {});
  return duplicates;
}

/**
 * Exposed function to generate schema list and get duplicates
 * @returns {object} Object whose properties are the names of the schemas with duplicates and their values are the count of their duplication
 */
function findDuplicates() {
  var schemas = coverageConfig.reduce(getSchemas, []);
  return getDuplicates(schemas);
}

/**
 * Exposed function to return true/false if duplicates exist
 * @returns {boolean} True if duplicates are found
 */
function anyDuplicates() {
  return Object.keys(findDuplicates()).length > 0 ? true : false;
}

describe("coverage-config", function () {
  it("Has duplicate schema names", function () {
    var duplicates = findDuplicates();
    assert.equal(Object.keys(duplicates).length, 0, "List of duplicated schema names: " + JSON.stringify(duplicates, null, 2));
  });
});
