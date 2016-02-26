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
