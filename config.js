
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
  "codeFiles": ['build-faker-schema.js', 'build-schema-doc.js', 'build-swagger-schema.js', 'build.js', 'util.js'],
  // Name of output file used to swagger definitions
  "swaggerFile": "swaggerDefinitions",
  // Schemas and objects that they reference
  // Top level items are schemas that can be generated
  // If a schema is not listed in the top level, it can't be generated
  "schemas": {
    "userContent": [
      "item"
    ],
    "item": [
      "folder",
      "extent"
    ],
    "extent": [
      "coordinate"
    ],
    "comments": [
      "comment"
    ],
    "comment": [],
    "relatedItems": [
      "item"
    ],
    "rating": [],
    "groupContent": [
      "item"
    ],
    "group": [],
    "groupApplication": [],
    "groupApplications": [
      "groupApplication"
    ],
    "groupUsers": [],
    "userInvitation": [
      "group"
    ],
    "userInvitations": [
      "userInvitation"
    ],
    "groups": [
      "group"
    ],
    "notification": [],
    "notifications": [
      "notification"
    ],
    "user": [
      "group"
    ],
    "userTags": [
      "userTag"
    ],
    "users": [
      "user"
    ],
    "registeredApp": [],
    "root": [],
    "portal": [
      "user",
      "extent",
      "portalAppInfo",
      "portalFeaturedGroup"
    ],
    "resources": [
      "resource"
    ],
    "servers": [
      "server"
    ],
    "server": [],
    "regions": [
      "region"
    ],
    "languages": [
      "language"
    ],
    "updateUser": [],
    "deleteUser": [],
    "disableUser": [],
    "enableUser": [],
    "userSearch": [
      "user"
    ],
    "deleteNotification": []
  }
}

module.exports = config;
