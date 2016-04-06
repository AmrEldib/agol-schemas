var RSVP = require('rsvp');
var buildFakerSchema = require('./build-faker-schema');
var buildDocs = require('./build-schema-doc');
var buildSwaggerSchema = require('./build-swagger-schema');
var buildCoverage = require('./build-coverage');

buildFakerSchema.writeFakerSchemas()
  .then(buildSwaggerSchema.writeSwaggerDefinitions())
  .then(buildDocs.collectDescriptions())
  .then(buildDocs.generateCodeDocs())
  .then(buildCoverage.collectCoverage())
  .then(function () {
    return new RSVP.Promise(function (resolve, reject) {
      console.log('Build Complete');
    });
  }).catch(function (reason) {
    console.error(reason);
  });
