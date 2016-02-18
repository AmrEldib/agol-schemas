var fs = require('fs');
var path = require('path');
var readMultipleFiles = require('read-multiple-files');
var config = require('./config');
var util = require('./util');

/*
 * Gets a list of all available schemas.
 */
function listAllSchemas() {
  var schemaFiles = util.getAllFilesFromFolder(config.outputFolder)
    .filter(function (f) {
      return f.slice(-4) === "json";
    })
    .map(function (s) {
      return s.substring(0, s.length - 5).substring(config.outputFolder.length + 1);
    });
  return schemaFiles;
}

/*
 * Gets the JSON object of a specific schema.
 * @param {string} schemaName Name of the schema to get.
 * @param {function} callback Callback function. It has one parameter of a JSON object representing the schema.
 */
function getSchema(schemaName, callback) {
  fs.readFile(path.resolve(__dirname, config.outputFolder + '/' + schemaName + '.json'),
    function (err, schemaFileContent) {
      callback(JSON.parse(schemaFileContent));
    });
}

/*
 * Gets an object whose properties are all the schema names and values are JSON objects representing those schemas.
 */
function getSchemas(callback) {
  var schemaFiles = util.getAllFilesFromFolder(config.outputFolder)
    .filter(function (f) {
      return f.slice(-4) === "json";
    });
  var schemaNames = listAllSchemas();
  readMultipleFiles(schemaFiles, 'utf8', function (err, schemaFilesContent) {
    var schemas = schemaFilesContent.map(function (s) {
      return JSON.parse(s);
    }).reduce(function (allSchemas, currentSchema, currentIndex) {
      allSchemas[schemaNames[currentIndex]] = currentSchema;
      return allSchemas;
    }, {});
    callback(schemas);
  });
}

module.exports = {
  listAllSchemas: listAllSchemas,
  getSchema: getSchema,
  getSchemas: getSchemas
};
