var readFiles = require('read-files-promise');
var fs = require('mz/fs');
var path = require('path');
var config = require('../config/config');
var RSVP = require('rsvp');

/**
 * Check if a schema has any dependencies.
 * @param {string} schemaName The name of the schema to check whether it has references or not.
 * @returns {boolean} True if the schema has references, False if not.
 */
function hasRefs(schemaName) {
  return (config.schemas[schemaName]);
}

/**
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

/**
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

/**
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

/**
 * Accept a schema name and returns an object of that schema with the 'definitions' object filled out correctly.
 * @param {string} schemaName Name of the schema to modify.
 * @return {object} Promise. The resolve function has one parameter that represents the schema with definitions.
 */
function getSchemaWithDefinitions(schemaName) {
  return new RSVP.Promise(function (resolve, reject) {
    // Check if schema name if valid
    if (config.schemas[schemaName] == undefined) {
      reject(new Error("Invalid schema name. Name must be one of: " + getSchemaList()));
    }

    // Collect schema refs
    var schemaRefs = [];
    if (hasRefs(schemaName)) {
      schemaRefs = getSchemaRefs(schemaName);
    }

    // Get paths of referenced files
    var schemaRefsFiles = schemaRefs.map(function (ref) {
      return path.resolve(__dirname, '..', config.schemasFolder + '/' + ref + '.json');
    });

    var schemaFileLocation = path.resolve(__dirname, '..', config.schemasFolder + '/' + schemaName + '.json');

    RSVP.all([
      fs.readFile(schemaFileLocation),
      readFiles(schemaRefsFiles, { encoding: 'utf8' })
    ])
    .then(function (buffers) {
      var schemaFileContent = buffers[0].toString();
      var contents = buffers[1].map(function (buffer) { return buffer.toString(); });

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
      });

      resolve({ name: schemaName, schema: schema});
    });
  });
}

/**
 * Writes output schema to file
 * @param {string} schemaName Name of the schema to be written.
 * @param {object} schema Schema object to be written to file.
 * @param {string} [outputFile=""] Path to output file. If nothing is specified, the schema is saved to a file with the schema name under the output folder specified in the fakerConfig file.
 * @returns {object} Promise. The resolve function has no parameters.
 */
function writeSchemaToFile(schemaName, schema, outputFile) {
  return new RSVP.Promise(function (resolve, reject) {
    // Get path of schema file
    if (!outputFile) {
      outputFile = config.outputFolder + '/' + schemaName + '.json';
    }

    // Write fake data to file
    fs.writeFile(path.resolve(__dirname, '..', outputFile), JSON.stringify(schema, null, 2)).then(function () {
      resolve();
    });
  });
}

/**
 * Writes output schemas for all available schemas for faker settings
 * @returns {object} Promise. The resolve function has no parameters.
 */
function writeFakerSchemas() {
  return new RSVP.Promise(function (resolve, reject) {
    var schemas = getSchemaList();

    RSVP.all(schemas.map(function (schema) {
      return getSchemaWithDefinitions(schema);
    })).then(function (schemasWithDescArray) {
      return RSVP.all(schemasWithDescArray.map(function (schemaWithDesc) {
        return writeSchemaToFile(schemaWithDesc.name, schemaWithDesc.schema);
      }));
    }).then(resolve);
  });
}

module.exports = {
  getSchemaWithDefinitions: getSchemaWithDefinitions,
  getSchemaList: getSchemaList,
  writeFakerSchemas: writeFakerSchemas
};
