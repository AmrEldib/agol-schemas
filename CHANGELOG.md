## 1.0.2
- Fixed schemas: createGroup and getExtent
- Fixed getSchema test

## 1.0.1
- Fixed getSchema to use Promises
- Added test for getSchema
- Removed getAllSchemas

## 1.0.0
- Switched library's API to use Promises
- Added new schemas
- Added documentation for Coverage. See docs/coverage.md
- Added tests
- Renamed schemas to avoid conflicts 
- Re-organized files and folders for better structure

## 0.3.4
- Fixed bug with `util.getAllFilesFromFolder` not applying correct path resolution.  
- Fixed bug with `listAllSchemas` returning path of schema rather than the schema name.  
- Removed `$schema` property from `comments` schema, which causes issues with generating fake data.  

## 0.3.3
**Added code documentation**  
The `docs` folder will now include one markdown file for each code file. It'll list all functions and their documentation.  
This documentation is generated using `documentation.js` library and JSDoc comments for every function.  

**Folder organization**  
Moved the `schemas.md` file to the new `docs` folder.  
