# cleanUpSchema

Cleans up a schema object by removing extra properties and modifying $ref properties
Properties that are removed are: id, faker, chance
The input object is modified in place. Nothing is returned.

**Parameters**

-   `schema` **object** The schema to be cleaned up.

# getAllFilesFromFolder

Gets all files from a folder

**Parameters**

-   `dir` **string** Path to folder

Returns **array** List of files in the folder.

# getSchemaForSwagger

Accept a schema name and returns an object of that schema with all the requirements for Swagger schema.

**Parameters**

-   `schemaName` **string** Name of the schema to modify

Returns **object** An object representing the schema.

# writeSchemaToFile

Writes output schema to file

**Parameters**

-   `schemaName` **string** Name of the schema to be written.
-   `schema` **object** Schema object to be written to file.
-   `outputFile` **[string]** Path to output file. If nothing is specified, the schema is saved to a file with the schema name under the output folder specified in the fakerConfig file. (optional, default `""`)

Returns **object** Promise. The resolve function has no parameters.

# writeSwaggerDefinitions

Writes output schemas for all available schemas for faker settings

Returns **object** Promise. The resolve function has no parameters.
