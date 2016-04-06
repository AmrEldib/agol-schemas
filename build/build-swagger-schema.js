var fs = require('fs');
var writeFile = require('fs-writefile-promise');
var path = require('path');
var config = require('../config/config');
var RSVP = require('rsvp');

/**
 * Gets all files from a folder
 * @param {string} dir Path to folder
 * @returns {array} List of files in the folder.
 */
function getAllFilesFromFolder(dir) {
  var filesystem = require("fs");
  var results = [];
  filesystem.readdirSync(dir).forEach(function (file) {
    file = dir + '/' + file;
    var stat = filesystem.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file))
    } else results.push(file);
  });
  return results;
}

/**
 * Cleans up a schema object by removing extra properties and modifying $ref properties
 * Properties that are removed are: id, faker, chance
 * The input object is modified in place. Nothing is returned.
 * @param {object} schema The schema to be cleaned up.
 */
function cleanUpSchema(schema) {
  for (var prop in schema) {
    if (prop === "$ref" && typeof (schema[prop]) == "string") {
      schema[prop] = "#/definitions/" + schema[prop];
    }
    else if (prop === "id" && typeof (schema[prop]) == "string") {
      delete schema[prop];
    }
    else if (prop === "faker") {
      delete schema[prop];
    }
    else if (prop === "chance") {
      delete schema[prop];
    }
    else if (typeof (schema[prop]) === "object") {
      cleanUpSchema(schema[prop]);
    }
  }
}

/**
 * Accept a schema name and returns an object of that schema with all the requirements for Swagger schema.
 * @param {string} schemaName Name of the schema to modify
 * @returns {object} An object representing the schema.
 */
function getSchemaForSwagger(schemaName) {
  // Read schema file
  var schemaFileContent = fs.readFileSync(path.resolve(__dirname, '..', config.schemasFolder + '/' + schemaName + '.json'));

  // Parse schema and refs into JSON objects
  var schema = JSON.parse(schemaFileContent);

  // Modify $ref values, and remove extra properties
  cleanUpSchema(schema);

  // return full schema object
  return schema;
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
    writeFile(path.resolve(__dirname, '..', outputFile), JSON.stringify(schema, null, 2)).then(function () {
      resolve();
    })
  });
}

/**
 * Writes output schemas for all available schemas for faker settings
 * @returns {object} Promise. The resolve function has no parameters.
 */
function writeSwaggerDefinitions() {
  var schemaFiles = getAllFilesFromFolder(config.schemasFolder);
  var schemas = schemaFiles.map(function (sf) {
    return path.basename(sf, ".json");
  })
  var swaggerDefinitions = {};
  schemas.forEach(function (schemaName) {
    var schema = getSchemaForSwagger(schemaName);
    // Add schema reference
    swaggerDefinitions[schemaName] = schema;
  });
  return writeSchemaToFile(config.swaggerFile, swaggerDefinitions);
}

module.exports = {
  getSchemaForSwagger: getSchemaForSwagger,
  writeSwaggerDefinitions: writeSwaggerDefinitions
};
