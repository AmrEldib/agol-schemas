var assert = require('assert');
var fs = require('fs');
var path = require('path');
var readMultipleFiles = require('read-multiple-files');
var config = require('../config/config');
var util = require('../util');
var tv4 = require('tv4');

describe("Output schemas", function () {
  it("Check if schemas are valid", function (done) {
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
        // the validationResult object (returned from tv4) is described here
        // https://github.com/geraintluff/tv4#usage-3-multiple-errors
        // It looks like this
        //  {
        //    "valid": false,
        //    "errors": [
        //        {...},
        //        ...
        //    ],
        //    "missing": [...]
        //  }
        result.validationResult = tv4.validateMultiple(fileContent, jsonSchema);
        return result;
      });
      var invalidSchemas = validationResults.filter(function (result) {
        return result.validationResult.valid === false;
      });
      var namesOfInvalidSchemas = invalidSchemas.map(function (invS) {
        return "*** " + invS.name + ": \n"
        + invS.validationResult.errors.reduce(function (errorText, error) {
          return errorText + error.message + "\n" + "At: " + error.dataPath + "\n";
        }, "");
      });
      assert.equal(invalidSchemas, 0, "\nList of invalid schemas: \n"
        + namesOfInvalidSchemas.reduce(function (text, schemaErrosText) {
          return text + "\n" + schemaErrosText
        }, ""));
      done();
    });
  })
});
