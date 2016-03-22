# cleanUpSchema

Cleans up a schema object by removing IDs and modifying $ref properties

**Parameters**

-   `schema` **object** The schema to be cleaned up. This object is modified in place. Nothing is returned.

# cleanUpSchema

Cleans up a schema object by removing extra properties and modifying $ref properties
Properties that are removed are: id, faker, chance
The input object is modified in place. Nothing is returned.

**Parameters**

-   `schema` **object** The schema to be cleaned up.

# collectDescriptions

Collect descriptions of all schemas.

# generateCodeDocs

Generate documentation for code files. It reads the JSDoc comments and generate markdown files for them. One markdown file is generated for each code file.

# getAllFilesFromFolder

Gets all files from a folder

**Parameters**

-   `dir` **string** Path to folder

Returns **array** List of files in the folder.

# getAllFilesFromFolder

Gets all files from a folder

**Parameters**

-   `dir` **string** Path to folder
-   `recursive` **[boolean]** List files in child directories as well (optional, default `false`)

Returns **array** List of files in the folder.

# getSchemaDescription

Extract Description from Schema and correctly markdown URLs in it.

**Parameters**

-   `schema` **object** The schema who's name and description will be extracted.

Returns **string** Schema description with URLs markdowned.

# getSchemaForSwagger

Accept a schema name and returns an object of that schema with all the requirements for Swagger schema.

**Parameters**

-   `schemaName` **string** Name of the schema to modify

Returns **object** An object representing the schema.

# getSchemaList

Gets a list of all available schemas.

Returns **array** List of strings naming the available schemas.

# getSchemaRefs

Resolve dependencies of a certain schema.

**Parameters**

-   `schemaName` **string** The name of the schema to get its references.

Returns **array** List of strings naming the schemas referenced in the input schema.

# getSchemaWithDefinitions

Accept a schema name and returns an object of that schema with the 'definitions' object filled out correctly.

**Parameters**

-   `schemaName` **string** Name of the schema to modify
-   `callback` **function** A callback function with one parameter of object type representing the schema with definitions.

# hasRefs

Check if a schema has any dependencies.

**Parameters**

-   `schemaName` **string** The name of the schema to check whether it has references or not.

Returns **boolean** True if the schema has references, False if not.

# markdownLinks

Takes a block of text and wraps URL into a Markdown link.
For example: this text "Search using <http://google.com>"
is turned into "Search using <http://google.com>"
An optional linkText can be display text for the URL
The above example would be: "Search using [Google](http://google.com)"

**Parameters**

-   `paragraph` **string** Block of text to be searched into for URLs
-   `linkText` **[string]** Text to be displayed for the URL. If this is missing, the URL is used as text. (optional, default `""`)

Returns **string** Block of text with all URLs turned into Markdown links.

# writeFakerSchemas

Writes output schemas for all available schemas for faker settings

# writeSchemaToFile

Writes output schema to file

**Parameters**

-   `schemaName` **string** Name of the schema to be written.
-   `schema` **object** Schema object to be written to file.
-   `outputFile` **[string]** Path to output file. If nothing is specified, the schema is saved to a file with the schema name under the output folder specified in the fakerConfig file. (optional, default `""`)

# writeSchemaToFile

Writes output schema to file

**Parameters**

-   `schemaName` **string** Name of the schema to be written.
-   `schema` **object** Schema object to be written to file.
-   `outputFile` **[string]** Path to output file. If nothing is specified, the schema is saved to a file with the schema name under the output folder specified in the fakerConfig file. (optional, default `""`)

# writeSwaggerDefinitions

Writes output schemas for all available schemas for faker settings
