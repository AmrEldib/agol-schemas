# agol-schemas

JSON Schemas for ArcGIS Online's requests and responses.  
Based on [ArGIS REST API](http://resources.arcgis.com/en/help/arcgis-rest-api/)  

All schemas are written in their own seperate files under the `input` folder.  
A script combines them into the output format under the `schemas` folder.  
The `scripts` folder include the script that combines input schemas into output.  

Schemas are avaliable in 2 formats:  
- **swagger**: Definitions for [OpenAPI](https://openapis.org/) specifications ([Swagger](http://swagger.io/specification/))  
  - This is the Definitions sction of the swagger.json file  
  - It removes faker, chance, and id properties.  
- **json-faker**: Definitions for [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker)  
  - This includes [faker.js](https://github.com/Marak/faker.js), and [chance.js](https://github.com/victorquinn/chancejs) info.  