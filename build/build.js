var buildFakerSchema = require('./build-faker-schema');
var buildDocs = require('./build-schema-doc');
var buildSwaggerSchema = require('./build-swagger-schema');
var buildCoverage = require('./build-coverage');

buildFakerSchema.writeFakerSchemas();
buildSwaggerSchema.writeSwaggerDefinitions();
buildDocs.collectDescriptions();
buildDocs.generateCodeDocs();
buildCoverage.collectCoverage();

console.log('Build complete');
