var buildFakerSchema = require('./build-faker-schema');
var buildDocs = require('./build-schema-doc');
var buildSwaggerSchema = require('./build-swagger-schema');

buildFakerSchema.writeFakerSchemas();
buildDocs.collectDescriptions();
buildSwaggerSchema.writeSwaggerDefinitions();
