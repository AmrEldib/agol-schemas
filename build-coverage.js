var fs = require('fs');
var path = require('path');
var config = require('./config');
var coverageConfig = require('./coverage-config');

function checkIfSchemaExist(schemaFileName) {
  try {
    fs.accessSync(path.resolve(__dirname, config.outputFolder + "/" + schemaFileName + ".json"));
    return true;
  } catch (e) {
    return false;
  }
}

function getCoverage(prev, coverageItem) {
  if (coverageItem.hasOwnProperty("children") && coverageItem.children.length != 0) {
    prev += "**" + coverageItem.title + "**  \n";
    var coverageDescriptions = coverageItem.children.reduce(getCoverage, "");
    return prev + coverageDescriptions;
  }
  else if (!coverageItem.hasOwnProperty("children") && coverageItem.title != "") {
    return prev + "- " + (checkIfSchemaExist(coverageItem.schema) ? "![DONE](greencheckmark.png) " : "![NOT YET](redx.png) ") + "[" + coverageItem.title + "](" + coverageItem.url + ")" + "  \n";
  }
  else {
    return prev;
  }
}

function collectCoverage() {
  var coverage = coverageConfig.reduce(getCoverage, "");
  // Write to file
  fs.writeFile(path.resolve(__dirname, config.docFolder + "/" + config.coverageFile), coverage);
}


module.exports = {
  collectCoverage: collectCoverage
};
