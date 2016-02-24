var fs = require('fs');

/**
 * Gets all files from a folder
 * @param {string} dir Path to folder
 * @param {boolean} [recursive=false] List files in child directories as well
 * @returns {array} List of files in the folder.
 */
function getAllFilesFromFolder(dir, recursive) {
  recursive = recursive || false;
  var results = [];
  fs.readdirSync(dir).forEach(function (file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory() && recursive) {
      results = results.concat(getAllFilesFromFolder(file))
    } else results.push(file);
  });
  return results;
}

module.exports = {
  getAllFilesFromFolder: getAllFilesFromFolder
};
