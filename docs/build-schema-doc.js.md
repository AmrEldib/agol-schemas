# collectDescriptions

Collect descriptions of all schemas.

# generateCodeDocs

Generate documentation for code files. It reads the JSDoc comments and generate markdown files for them. One markdown file is generated for each code file.

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
