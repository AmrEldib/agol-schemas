# cleanUpSchema

Cleans up a schema object by removing IDs and modifying $ref properties

**Parameters**

-   `schema` **object** The schema to be cleaned up. This object is modified in place. Nothing is returned.

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

# writeFakerSchemas

Writes output schemas for all available schemas for faker settings

# writeSchemaToFile

Writes output schema to file

**Parameters**

-   `schemaName` **string** Name of the schema to be written.
-   `schema` **object** Schema object to be written to file.
-   `outputFile` **[string]** Path to output file. If nothing is specified, the schema is saved to a file with the schema name under the output folder specified in the fakerConfig file. (optional, default `""`)
