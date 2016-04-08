var readFile = require('fs-readfile-promise');
var readFiles = require('read-files-promise');
var path = require('path');
var config = require('./config/config');
var util = require('./util');
var RSVP = require('rsvp');

/**
 * Gets a list of all available schemas.
 */
function listAllSchemas() {
  var schemaFiles = util.getAllFilesFromFolder(config.outputFolder)
    .filter(function (f) {
      // Remove all files that aren't JSON files.
      return f.slice(-4) === "json";
    })
    .map(function (s) {
      // Remove ".json" from file names
      return s.substring(0, s.length - 5).substring(config.outputFolder.length + 1);
    })
    .map(function (s) {
      // Get only the name of the schema
      return s.substring(s.lastIndexOf("/") + 1);
    });
  return schemaFiles;
}

/**
 * Gets the JSON object of a specific schema.
 * @param {string} schemaName Name of the schema to get.
 * @returns {object} Promise. The resolve function has one parameter of a JSON object representing the schema.
 */
function getSchema(schemaName) {
  return new RSVP.Promise(function (resolve, reject) {
    readFile(path.resolve(__dirname, config.outputFolder + '/' + schemaName + '.json'))
      .then(function (buffer) {
      var schemaFileContent = buffer.toString();
      resolve(JSON.parse(schemaFileContent));
    })
  });
}

module.exports = {
  listAllSchemas: listAllSchemas,
  getSchema: getSchema
};
