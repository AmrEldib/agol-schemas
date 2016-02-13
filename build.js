var buildFakerSchema = require('./build-faker-schema');
var buildDocs = require('./build-schema-doc');

buildFakerSchema.writeFakerSchemas();
buildDocs.collectDescriptions();
