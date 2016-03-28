var fs = require('fs');
var path = require('path');

/**
 * Gets all files from a folder
 * @param {string} dir Path to folder
 * @param {boolean} [recursive=false] List files in child directories as well
 * @returns {array} List of files in the folder.
 */
function getAllFilesFromFolder(dir, recursive) {
  recursive = recursive || false;
  var results = [];
  dir = path.resolve(__dirname, dir);
  fs.readdirSync(dir).forEach(function (file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory() && recursive) {
      results = results.concat(getAllFilesFromFolder(file))
    } else results.push(file);
  });
  return results;
}

/**
 * Check if a file exists and process has access to it
 * @param string folder Path to the folder where the file should exist
 * @param string fileName Name of the file included exention
 * @returns boolean True if file exists. Fales if it doesn't
 */
function checkIfFileExists(folder, fileName) {
  try {
    fs.accessSync(path.resolve(__dirname, folder + "/" + fileName));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  getAllFilesFromFolder: getAllFilesFromFolder,
  checkIfFileExists: checkIfFileExists
};
