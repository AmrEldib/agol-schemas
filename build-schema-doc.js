var fs = require('fs');
var path = require('path');
var readMultipleFiles = require('read-multiple-files');
var config = require('./config');

/*
 * Takes a block of text and wraps URL into a Markdown link.
 * For example: this text "Search using http://google.com"
 * is turned into "Search using [http://google.com](http://google.com)"
 * An optional linkText can be display text for the URL
 * The above example would be: "Search using [Google](http://google.com)"
 * @param {string} paragraph Block of text to be searched into for URLs
 * @param {string} [linkText=""] Text to be displayed for the URL. If this is missing, the URL is used as text.
 * @return {string} Block of text with all URLs turned into Markdown links.
 */
function markdownLinks(paragraph, linkText) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return paragraph.replace(urlRegex, function (url) {
    if (!linkText) {
      linkText = url;
    }
    return "[" + linkText + "](" + url + ")";
  })
}

/*
 * Gets a list of all available schemas.
 * @returns {array} List of strings naming the available schemas.
 */
function getSchemaList() {
  var keys = [];
  for (var key in config.schemas) {
    keys.push(key);
  }
  return keys;
}

/*
 * Gets all files from a folder
 * @param {string} dir Path to folder
 * @returns {array} List of files in the folder.
 */
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
 * Extract Description from Schema and correctly markdown URLs in it.
 * @param {object} schema The schema who's name and description will be extracted.
 * @returns {string} Schema description with URLs markdowned.
 */
function getSchemaDescription(schema) {
  for (var prop in schema) {
    if (prop === "description" && typeof (schema[prop]) == "string") {
      return markdownLinks(schema[prop], "source");
    }
  }
}

/*
 * Collect descriptions of all schemas.
 */
function collectDescriptions() {
  var schemasWithDesc = "";
  var schemaFiles = getAllFilesFromFolder(config.schemasFolder);

  // Get path of schema file
  var schemas = schemaFiles.map(function (sf) {
    return path.basename(sf, ".json");
  })

  // Read schema file
  readMultipleFiles(schemaFiles, 'utf8', (err, contents) => {
    contents.forEach(function (schemaFileContent, index) {
      var schema = JSON.parse(schemaFileContent);
      var schemaDesc = getSchemaDescription(schema);
      schemasWithDesc += "* **" + schemas[index] + "**: " + schemaDesc + "  \n";
    })

    // Write to file
    fs.writeFile(path.resolve(__dirname, config.outputFolder + "/" + config.docFile), schemasWithDesc);
  });
}

module.exports = {
  collectDescriptions: collectDescriptions
};
