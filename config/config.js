
var config = {
  // Folder where schemas are stored
  "schemasFolder": "data",
  // Folder where fake data is stored
  "outputFolder": "dist",
  // Name of the output documentation file
  // This file will be saved in the output folder
  "schemasDocFile": "schemas.md",
  // Folder where documentation is generated
  "docFolder": "docs",
  // List of code files to generate documentation for
  "codeFiles": ['build/build-faker-schema.js', 'build/build-schema-doc.js', 'build/build-swagger-schema.js', 'build/build-coverage.js', 'util.js'],
  // Name of output file used to swagger definitions
  "swaggerFile": "swaggerDefinitions",
  // List of how much of the REST API schema is done
  "coverageFile": "coverage.md",
  // Schemas and objects that they reference
  // Top level items are schemas that can be generated
  // If a schema is not listed in the top level, it can't be generated
  "schemas": {
    "getUserContent": [
      "getItem"
    ],
    "getItem": [
      "getFolder",
      "getExtent"
    ],
    "getExtent": [
      "getCoordinate"
    ],
    "getItemComments": [
      "getItemComment"
    ],
    "getItemComment": [],
    "getRelatedItems": [
      "getItem"
    ],
    "getItemRating": [],
    "getGroupContent": [
      "getItem"
    ],
    "getGroup": [],
    "getGroupApplication": [],
    "getGroupApplications": [
      "getGroupApplication"
    ],
    "getGroupUsers": [],
    "getUserInvitation": [
      "getGroup"
    ],
    "getUserInvitations": [
      "getUserInvitation"
    ],
    "getItemGroups": [
      "getGroup"
    ],
    "getNotification": [],
    "getNotifications": [
      "getNotification"
    ],
    "getUser": [
      "getGroup"
    ],
    "getUserTags": [
      "getUserTag"
    ],
    "getUsers": [
      "getUser"
    ],
    "getRegisteredAppInfo": [],
    "getOrgRoot": [],
    "getPortal": [
      "getUser",
      "getExtent",
      "getPortalAppInfo",
      "getPortalFeaturedGroup"
    ],
    "getPortalResources": [
      "getPortalResource"
    ],
    "getPortalServers": [
      "getPortalServer"
    ],
    "getPortalServer": [],
    "getPortalRegions": [
      "getPortalRegion"
    ],
    "getPortalLanguages": [
      "getPortalLanguage"
    ],
    "updateUser": [],
    "deleteUser": [],
    "disableUser": [],
    "enableUser": [],
    "searchUsers": [
      "getUser",
      "searchUsersResultItem"
    ],
    "deleteNotification": [],
    "generateToken": [],
    "search": [
      "getItem"
    ],
    "acceptGroupApplication": []
  }
}

module.exports = config;
