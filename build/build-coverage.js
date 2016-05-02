var writeFile = require('fs-writefile-promise');
var path = require('path');
var config = require('../config/config');
var coverageConfig = require('../config/coverage-config');
var util = require('../util');
var RSVP = require('rsvp');

/**
 * Determines whether a certain item of the ArcGIS REST API is covered or not
 * @param {object} coverage Coverage object that contains number of completed items, total count, description all items
 * @param {object} coverageItem Item who coverage will be checked
 * @returns {string} Text representation of whether an item is covered or not
 */
function getCoverage(coverage, coverageItem) {
  if (coverageItem.hasOwnProperty("children") && coverageItem.children.length != 0) {
    coverage.description += "**" + coverageItem.title + "**  \n";
    return coverageItem.children.reduce(getCoverage, coverage);
  }
  else if (!coverageItem.hasOwnProperty("children") && coverageItem.title != "") {
    if (util.checkIfFileExists(config.schemasFolder, coverageItem.schema + ".json")) {
      coverage.description += "✔ ";
      coverage.completed += 1;
    }
    else {
      coverage.description += "✖ ";
    }
    coverage.itemsCount += 1;
    coverage.description += "[" + coverageItem.title + "](" + coverageItem.url + ")" + "  \n";
    return coverage;
  }
  else {
    return coverage;
  }
}

/**
 * Collects coverage for all ArcGIS REST API items. Writes results to file specified in config.coverageFile
 * @returns {object} Promise. The resolve function has no parameters.
 */
function collectCoverage() {
  return new RSVP.Promise(function (resolve, reject) {
    var coverage = {
      completed: 0,
      itemsCount: 0,
      description: ""
    };
    coverage = coverageConfig.reduce(getCoverage, coverage);

    var coverageText = "### Coverage  \n"
    + "Completed items: " + coverage.completed + "  \n"
    + "Total items: " + coverage.itemsCount + "  \n"
    + "Completed: " + ((coverage.completed / coverage.itemsCount) * 100).toFixed(0) + " %  \n\n\n"
    + coverage.description;

    // Write to file
    writeFile(path.resolve(__dirname, '..', config.docFolder + "/" + config.coverageFile), coverageText).then(resolve);
  });
}

module.exports = {
  collectCoverage: collectCoverage
};
