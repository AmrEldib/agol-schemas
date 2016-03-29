var coverageConfig = require('../coverage-config');

/**
 * Traverse coverage-config.js file to get array of schema names, callback function of array.prototype.reduce
 * @param array schemas Previous value of iteration
 * @param object resource Current element of array
 * @returns array Array of all named schemas
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
 * @param array schemas Full schema list
 * @returns array Array of objects containing schema name and counts
 */
function getDuplicates(schemas) {
  var uniqueSchemas = schemas.map(function(schema) {
      return {
        count: 1,
        schema: schema
      }
    })
    .reduce(function(schemaCounts, schema) {
      schemaCounts[schema.schema] = (schemaCounts[schema.schema] || 0) + schema.count
      return schemaCounts
    }, {});

  var schemaArray = Object.keys(uniqueSchemas).reduce(function(schemaCount, schema) {
    schemaCount.push({
      schema: schema,
      count: uniqueSchemas[schema]
    });
    return schemaCount;
  }, [])

  var duplicates = schemaArray.filter(function(schema) {
    return schema.count > 1;
  })
  return duplicates;
}

/**
 * Exposed function to generate schema list and get duplicates
 * @returns array Array of objects containing schema name and counts
 */
function findDuplicates() {
  var schemas = coverageConfig.reduce(getSchemas, []);
  var duplicates = getDuplicates(schemas);
  if (duplicates.length > 0) {
    console.log(String(duplicates.length), 'duplicates found');
    console.log(duplicates);
  }
  return duplicates;
}

/**
 * Exposed function to return true/false if duplicates exist
 * @returns bool True if duplicates are found
 */
function anyDuplicates() {
  return findDuplicates().length > 0 ? true : false;
}

module.exports = {
  findDuplicates: findDuplicates,
  anyDuplicates: anyDuplicates
};
