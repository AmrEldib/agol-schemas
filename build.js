var buildFakerSchema = require('./build-faker-schema');
var buildDocs = require('./build-schema-doc');
var buildSwaggerSchema = require('./build-swagger-schema');

buildFakerSchema.writeFakerSchemas();
buildSwaggerSchema.writeSwaggerDefinitions();
buildDocs.collectDescriptions();
buildDocs.generateCodeDocs();

console.log('Build complete');
