var fs = require('fs');
var path = require('path');
var config = require('./config');
var coverageConfig = require('./coverage-config');
var util = require('./util');

/**
 * Determines whether a certain item of the ArcGIS REST API is covered or not
 * @param object prev Item that has been checked right before this one
 * @param object coverageItem Item who coverage will be checked
 * @returns string Text representation of whether an item is covered or not
 */
function getCoverage(prev, coverageItem) {
  if (coverageItem.hasOwnProperty("children") && coverageItem.children.length != 0) {
    prev += "**" + coverageItem.title + "**  \n";
    var coverageDescriptions = coverageItem.children.reduce(getCoverage, "");
    return prev + coverageDescriptions;
  }
  else if (!coverageItem.hasOwnProperty("children") && coverageItem.title != "") {
    return prev + (util.checkIfFileExists(config.outputFolder, coverageItem.schema + ".json") ? "✔ " : "✖ ") + "[" + coverageItem.title + "](" + coverageItem.url + ")" + "  \n";
  }
  else {
    return prev;
  }
}

/**
 * Collect coverage for all ArcGIS REST API items. Writes results to file specified in config.coverageFile
 */
function collectCoverage() {
  var coverage = coverageConfig.reduce(getCoverage, "");
  // Write to file
  fs.writeFile(path.resolve(__dirname, config.docFolder + "/" + config.coverageFile), coverage);
}


module.exports = {
  collectCoverage: collectCoverage
};
