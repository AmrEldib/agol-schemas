var fs = require('fs');
var path = require('path');
var readMultipleFiles = require('read-multiple-files');
var config = require('./config');

/*
 * Check if a schema has any dependencies.
 * @param {string} schemaName The name of the schema to check whether it has references or not.
 * @returns {boolean} True if the schema has references, False if not.
 */
function hasRefs(schemaName) {
  return (config.schemas[schemaName]);
}

/*
 * Resolve dependencies of a certain schema.
 * @param {string} schemaName The name of the schema to get its references.
 * @returns {array} List of strings naming the schemas referenced in the input schema.
 */
function getSchemaRefs(schemaName) {
  var schemaRefs = config.schemas[schemaName];
  schemaRefs.forEach(function (schemaRef) {
    if (schemaRefs.indexOf(schemaRef) === -1) {
      schemaRefs.push(schemaRef);
    }
    if (hasRefs(schemaRef)) {
      getSchemaRefs(schemaRef).map(function (sr) {
        if (schemaRefs.indexOf(sr) === -1) {
          schemaRefs.push(sr);
        }
      })
    }
  })
  return schemaRefs;
}

/*
 * Gets a list of all available schemas.
 * @returns {array} List of strings naming the available schemas.
 */
function getSchemaList() {
  var keys = [];
  for (var key in config.schemas) {
    keys.push(key);
  }
  return keys;
}

/*
 * Cleans up a schema object by removing IDs and modifying $ref properties
 * @param {object} schema The schema to be cleaned up. This object is modified in place. Nothing is returned.
 */
function cleanUpSchema(schema) {
  for (var prop in schema) {
    if (prop === "$ref" && typeof (schema[prop]) == "string") {
      schema[prop] = "#/definitions/" + schema[prop];
    }
    else if (prop === "id" && typeof (schema[prop]) == "string") {
      delete schema[prop];
    }
    else if (typeof (schema[prop]) === "object") {
      cleanUpSchema(schema[prop]);
    }
  }
}

/*
 * Accept a schema name and returns an object of that schema with the 'definitions' object filled out correctly.
 * @param {string} schemaName Name of the schema to modify
 * @param {function} callback A callback function with one parameter of object type representing the schema with definitions.
 */
function getSchemaWithDefinitions(schemaName, callback) {

  // Check if schema name if valid
  if (config.schemas[schemaName] == undefined) {
    throw Error("Invalid schema name. Name must be one of: " + getSchemaList());
  }

  // Collect schema refs
  var schemaRefs = [];
  if (hasRefs(schemaName)) {
    schemaRefs = getSchemaRefs(schemaName);
  }

  // Get paths of referenced files
  var schemaRefsFiles = schemaRefs.map(function (ref) {
    return path.resolve(__dirname, config.schemasFolder + '/' + ref + '.json');
  })

  // Read schema file
  fs.readFile(path.resolve(__dirname, config.schemasFolder + '/' + schemaName + '.json'), function (err, schemaFileContent) {

    // Read reference files
    readMultipleFiles(schemaRefsFiles, 'utf8',
    (err, contents) => {
      if (err) {
        throw err;
      }

      // Parse schema and refs into JSON objects
      var schema = JSON.parse(schemaFileContent);
      // Modify $ref values, and remove IDs
      cleanUpSchema(schema);
      // Add definitions object
      schema.definitions = {};
      contents.forEach(function (refFileContent, index) {
        var schemaRef = JSON.parse(refFileContent);
        // Modify $ref values, and remove IDs
        cleanUpSchema(schemaRef);
        // Add schema reference
        schema.definitions[schemaRefs[index]] = schemaRef;
      })

      // return full schema object
      callback(schema);
    })
  })
}

/*
 * Writes output schema to file
 * @param {string} schemaName Name of the schema to be written.
 * @param {object} schema Schema object to be written to file.
 * @param {string} [outputFile=""] Path to output file. If nothing is specified, the schema is saved to a file with the schema name under the output folder specified in the fakerConfig file.
 */
function writeSchemaToFile(schemaName, schema, outputFile) {
  // Get path of schema file
  if (!outputFile) {
    outputFile = config.outputFolder + '/' + schemaName + '.json';
  }

  // Write fake data to file
  fs.writeFile(path.resolve(__dirname, outputFile), JSON.stringify(schema, null, 2));
}

/*
 * Writes output schemas for all available schemas for faker settings
 */
function writeFakerSchemas() {
  var schemas = getSchemaList();
  schemas.forEach(function (schemaName) {
    getSchemaWithDefinitions(schemaName, function (schema) {
      writeSchemaToFile(schemaName, schema);
    });
  })
}

module.exports = {
  getSchemaWithDefinitions: getSchemaWithDefinitions,
  getSchemaList: getSchemaList,
  writeFakerSchemas: writeFakerSchemas
};
