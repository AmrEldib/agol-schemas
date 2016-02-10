var fs = require('fs');
var path = require('path');
var readMultipleFiles = require('read-multiple-files');
var fakerConfig = require('./faker-config');

// Check if a schema has any dependencies
var hasRefs = function (schemaName) {
  return (fakerConfig.schemas[schemaName]);
}

// Resolve dependencies of a certain schema
var getSchemaRefs = function (schemaName) {
  var schemaRefs = fakerConfig.schemas[schemaName];
  schemaRefs.forEach(function (schemaRef) {
    if (schemaRefs.indexOf(schemaRef) === -1) {
      schemaRefs.push(schemaRef);
    }
    if (hasRefs(schemaRef)) {
      getSchemaRefs(schemaRef).map(function (sr) {
        if (schemaRefs.indexOf(sr) === -1) {
          schemaRefs.push(sr);
        }
      })
    }
  })
  return schemaRefs;
}

// Gets a list of all available schemas
var getSchemaList = function () {
  var keys = [];
  for (var key in fakerConfig.schemas) {
    keys.push(key);
  }
  return keys;
}

// Accept a schema name and returns an object of that schema with the 'definitions' object filled out correctly.
var getSchemaWithDefinitions = function (schemaName, callback) {

  // Check if schema name if valid
  if (fakerConfig.schemas[schemaName] == undefined) {
    throw Error("Invalid schema name. Name must be one of: " + getSchemaList());
  }

  // Collect schema refs
  var schemaRefs = [];
  if (hasRefs(schemaName)) {
    schemaRefs = getSchemaRefs(schemaName);
  }

  // Get paths of referenced files
  var schemaRefsFiles = schemaRefs.map(function (ref) {
    return path.resolve(__dirname, fakerConfig.schemasFolder + '/' + ref + '.json');
  })

  // Read schema file
  fs.readFile(path.resolve(__dirname, fakerConfig.schemasFolder + '/' + schemaName + '.json'), function (err, schemaFileContent) {

    // Read reference files
    readMultipleFiles(schemaRefsFiles, 'utf8',
    (err, contents) => {
      if (err) {
        throw err;
      }

      // Parse schema and refs into JSON objects
      var schema = JSON.parse(schemaFileContent);
      schema.definitions = {};
      contents.forEach(function (refFileContent, index) {
        //refs.push(JSON.parse(refFileContent));
        schema.definitions[schemaRefs[index]] = JSON.parse(refFileContent);
      })
            
      // return full schema object
      callback(schema);
    })
  })
}

module.exports = {
  getSchemaWithDefinitions: getSchemaWithDefinitions
};

getSchemaWithDefinitions("comments", function (s) {
  console.log(s);
});