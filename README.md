# agol-schemas

JSON Schemas for ArcGIS Online's requests and responses.  
Based on [ArcGIS REST API documentation](http://resources.arcgis.com/en/help/arcgis-rest-api/). 

All schemas are written in their own separate files under the `data` folder.  
A script combines them into the output format under the `dist` folder.  
This folder includes the scripts that combines input schemas into output.  

Schemas are available in 2 formats: `swagger` and `json-schema-faker`  

#### swagger  
- Definitions for [OpenAPI](https://openapis.org/) specifications ([swagger.io](http://swagger.io/specification/)).  
- This is the Definitions section of the swagger.json file.  
- It removes faker, chance, and id properties.  
- Stored in `/dist/swaggerDefinitions.json`.  

#### json-schema-faker  
- Definitions for [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker)  
- These schemas are one file for each schema. Each file includes the schema and a Definitions section that include all the other schemas that the main schema depend on.  
- This includes [faker.js](https://github.com/Marak/faker.js), and [chance.js](https://github.com/victorquinn/chancejs) info.  

For a list of all schemas list in the [ArcGIS REST API](http://resources.arcgis.com/en/help/arcgis-rest-api/#/The_ArcGIS_REST_API/02r300000054000000/), see [coverage](/docs/coverage.md).  
A list of schemas included in this library and their descriptions is in the [schemas doc file](/docs/schemas.md).  
For documentation of code files, read the doc for each file in the [doc folder](/docs/).  
