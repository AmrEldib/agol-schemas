
var config = {
  // Folder where schemas are stored
  "schemasFolder": "input",
  // Folder where fake data is stored
  "outputFolder": "schemas",
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
    ]
  }
}

module.exports = config;
