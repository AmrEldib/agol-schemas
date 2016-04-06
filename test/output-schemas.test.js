var assert = require('assert');
var fs = require('fs');
var path = require('path');
var readMultipleFiles = require('read-multiple-files');
var config = require('../config/config');
var util = require('../util');
var tv4 = require('tv4');

describe("Output schemas", function () {
  it("Schemas are valid", function (done) {
    tv4.addSchema('http://json-schema.org/draft-04/schema', JSON.parse(fs.readFileSync(path.resolve(__dirname + '/jsonSchema'), 'utf8')));
    var jsonSchema = tv4.getSchema('http://json-schema.org/draft-04/schema');
    var schemaFiles = util.getAllFilesFromFolder(path.resolve(__dirname + '/../' + config.outputFolder))
      .filter(function (f) {
        return f.slice(-4) === "json";
      })
      .filter(function (f) {
        return f != 'swaggerDefinitions';
      });
    readMultipleFiles(schemaFiles, 'utf8', function (err, schemaFilesContent) {
      var validationResults = schemaFilesContent.map(function (s) {
        var fileContent = JSON.parse(s);
        var result = {};
        result.name = fileContent.title;
        result.result = tv4.validate(fileContent, jsonSchema);
        return result;
      });
      var invalidSchemas = validationResults.filter(function (result) {
        return result.result === false;
      });
      assert.equal(invalidSchemas, 0, "List of invalid schemas: " + JSON.stringify(invalidSchemas, null, 2));
      done();
    });
  })
});
