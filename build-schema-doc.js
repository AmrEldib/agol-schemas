var fs = require('fs');
var path = require('path');
var readMultipleFiles = require('read-multiple-files');
var fakerConfig = require('./faker-config');


function urlify(paragraph, linkText) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return paragraph.replace(urlRegex, function (url) {
    return "[" + linkText + "](" + url + ")";
  })
}


/*
 * Gets a list of all available schemas.
 * @returns {array} List of strings naming the available schemas.
 */
function getSchemaList() {
  var keys = [];
  for (var key in fakerConfig.schemas) {
    keys.push(key);
  }
  return keys;
}

function getAllFilesFromFolder(dir) {
  var filesystem = require("fs");
  var results = [];
  filesystem.readdirSync(dir).forEach(function (file) {
    file = dir + '/' + file;
    var stat = filesystem.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file))
    } else results.push(file);
  });
  return results;
};

/*
 * AA
 * @param {object} schema The schema who's name and description will be extracted.
 */
function getSchemaDescription(schema) {
  //console.log(JSON.stringify(schema));
  for (var prop in schema) {
    if (prop === "description" && typeof (schema[prop]) == "string") {
      return urlify(schema[prop], "source");
    }
  }
}

function collectDescriptions() {
  var schemasWithDesc = "";
  var schemaFiles = getAllFilesFromFolder(fakerConfig.schemasFolder);

  var schemas = schemaFiles.map(function (sf) {
    return path.basename(sf, ".json");
  })

  console.log(schemas);

  // Read schema file
  readMultipleFiles(schemaFiles, 'utf8', (err, contents) => {
    contents.forEach(function (schemaFileContent, index) {
      var schema = JSON.parse(schemaFileContent);
      var schemaDesc = getSchemaDescription(schema);
      schemasWithDesc += "* **" + schemas[index] + "**: " + schemaDesc + "  \n";
    })

    // Write to file
    fs.writeFile(path.resolve(__dirname, "doc.md"), schemasWithDesc);
  });
}

collectDescriptions();
