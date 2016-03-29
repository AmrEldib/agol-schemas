// Search every schema name assigned in ../coverage-config.js and check for duplicates

var buildCoverage = require('../coverage-config');

schemaListFull = [];
schemaListDuplicates = [];

function searchChildElements(element, index, array) {
  if ('children' in element) {
    element.children.forEach(searchChildElements)
  } else {
    if (schemaListFull.indexOf(element.schema) != -1) {
      console.log("Duplicate found: " + element.schema);
      schemaListDuplicates.push(element.schema);
    } else {
      schemaListFull.push(element.schema);
    }
  }
}

function checkDuplicates() {

  buildCoverage.forEach(function(element, index, array) {
    searchChildElements(element, index, array)
  });

  if (schemaListDuplicates.length > 0) {
    console.warn(`Coverage Tests completed, ${schemaListDuplicates.length} DUPLICATES FOUND`);
  } else {
    console.log('\nCoverage Tests completed, no duplicates found');
  }
  return schemaListDuplicates;
}

module.exports = {
  checkDuplicates: checkDuplicates
};
