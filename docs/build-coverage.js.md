# collectCoverage

Collects coverage for all ArcGIS REST API items. Writes results to file specified in config.coverageFile

Returns **object** Promise. The resolve function has no parameters.

# getCoverage

Determines whether a certain item of the ArcGIS REST API is covered or not

**Parameters**

-   `coverage` **object** Coverage object that contains number of completed items, total count, description all items
-   `coverageItem` **object** Item who coverage will be checked

Returns **string** Text representation of whether an item is covered or not
