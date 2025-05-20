import { BusinessObjectMetadata } from './businessobjectmetadata';
import { Session } from './session';
/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instantiate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @class
 */
declare class BusinessObject {
    /**
     * Constructor
     * @param {Session} ses Session
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     */
    constructor(ses: Session, name: string, instance?: string);
    /**
     * Session
     * @member {Session}
     * @private
     */
    private session;
    /**
     * Object metadata
     * @member {BusinessObjectMetadata}
     */
    metadata: BusinessObjectMetadata;
    /**
     * Cache key
     * @constant {string}
     * @private
     */
    private cacheKey;
    /**
     * Path
     * @constant {string}
     * @private
     */
    private path;
    /**
     * Current item
     * @member {object}
     */
    item: any;
    /**
     * Current filters
     * @member {object}
     */
    filters: any;
    /**
     * Current list
     * @member {array}
     */
    list: any[];
    /**
     * Current count
     * @member {number}
     */
    count: number;
    /**
     * Current page number
     * @member {number}
     */
    page: number;
    /**
     * Number of pages
     * @member {number}
     */
    maxpage: number;
    /**
     * Get meta data
     * @param {object} [opts] Options
     * @param {number} [opts.context] Context
     * @param {string} [opts.contextParam] Context parameter
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<BusinessObjectMetadata>} A promise to the object's meta data (also available as the <code>metadata</code> member)
     * @function
     */
    getMetaData(opts?: any): Promise<any>;
    /**
     * Get meta data (alias to getMetaData)
     * @function
     */
    getMetadata: (opts?: any) => Promise<any>;
    /**
     * Get name
     * @return {string} Name
     * @function
     */
    getName(): string;
    /**
     * Get instance name
     * @return {string} Instance name
     * @function
     */
    getInstance(): string;
    /**
     * Get display label
     * @return {string} Display label
     * @function
     */
    getLabel(): string;
    /**
     * Get help
     * @return {string} Help
     * @function
     */
    getHelp(): string;
    /**
     * Get all fields definitions
     * @return {array} Array of field definitions
     * @function
     */
    getFields(): any[];
    /**
     * Get a field definition
     * @param {string} fieldName Field name
     * @return {object} Field definition
     * @function
     */
    getField(fieldName: string): any;
    /**
     * Get row ID field name
     * @return {string} Row ID field name
     * @function
     */
    getRowIdFieldName(): string;
    /**
     * Get row ID field definition
     * @return {object} Row ID field definition
     * @function
     */
    getRowIdField(): any;
    /**
     * Get links
     * @return {array} Array of links
     * @function
     */
    getLinks(): any[];
    /**
     * Get field type
     * @param {(string|object)} field Field name or definition
     * @return {string} Type (one of <code>constants.TYPE_*</code>)
     * @function
     */
    getFieldType(field: string | any): string;
    /**
     * Get field label
     * @param {(string|object)} field Field name or definition
     * @return {string} Field label
     * @function
     */
    getFieldLabel(field: string | any): string;
    /**
     * Get value of field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string|Doc} Value
     * @function
     */
    getFieldValue(field: string | any, item?: any): string | any;
    /**
     * Get the list value of a list of values field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} List value
     * @function
     */
    getFieldListValue(field: string | any, item?: any): string;
    /**
     * Get the list colors of a list of values field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} List color and bgcolor
     * @function
     */
    getFieldListColors(field: string | any, item?: any): any;
    /**
     * Get the data URL of an inlined document/image field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} Document/image field data URL (or nothing if the field is not of document/image type or if it is not inlined or if it is empty)
     * @function
     */
    getFieldDataURL(field: string | any, item?: any): string;
    /**
     * Get the field's value as document/image for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string|Doc} Document/image (or nothing if the field is not of document/image type or if it is empty)
     * @function
     */
    getFieldDocument(field: string | any, item?: any): any;
    /**
     * Get the URL of a document/image field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @param {boolean} [thumbnail=false] Thumbnail?
     * @return {string} Document/image field URL (or nothing if the field is not of document/image type or if it is empty)
     * @function
     */
    getFieldDocumentURL(field: string | any, item?: any, thumbnail?: boolean): string;
    /**
     * Get list item value for code
     * @param {array} list List of values
     * @param {string} code Code
     * @return {string} Value
     * @function
     */
    getListValue(list: any[], code: string): string;
    /**
     * Get list item colors (color and background color) for code
     * @param {array} list List of values
     * @param {string} code Code
     * @return {any} Colors
     * @function
     */
    getListColors(list: any[], code: string): any;
    /**
     * Set value of field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {(string|object)} value Value
     * @param {object} [item] Item (defaults to current item)
     * @function
     */
    setFieldValue(field: string | any, value: string | any, item?: any): void;
    /**
     * Reset values of item (or current item)
     * @param {object} [item] Item (defaults to current item)
     */
    resetValues(item?: any): void;
    /**
    * Set values of item (or current item)
    * @param {object|FormData} data Data (plain object or form data)
    * @param {object} [item] Item (defaults to current item)
    */
    setFieldValues(data: object | FormData, item?: any): Promise<any>;
    /**
     * Is the field the row ID field?
     * @param {object} field Field definition
     * @return {boolean} True if the field is the row ID field
     * @function
     */
    isRowIdField(field: any): boolean;
    /**
     * Is the field a timestamp field?
     * @param {object} field Field definition
     * @return {boolean} True if the field is a timestamp field
     * @function
     */
    isTimestampField(field: any): boolean;
    /**
     * Get current filters
     * @param {object} [opts] Options
     * @param {number} [opts.context] Context
     * @param {boolean} [opts.reset] Reset filters?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the object's filters (also available as the <code>filters</code> member)
     * @function
     */
    getFilters(opts?: any): Promise<any>;
    /**
     * Build context option parameters
     * @param {object} options Options
     * @return {string} Option parameters
     * @private
     */
    private getReqContextOption;
    /**
     * Build options parameters
     * @param {object} options Options
     * @return {string} Option parameters
     * @private
     */
    private getReqOptions;
    /**
     * Convert usual wildcards to filters wildcards
     * @param {object} filter Filter
     * @return {string} Filter with wildcards converted
     * @private
     */
    private convertFilterWildCards;
    /**
     * Build request parameters
     * @param {object} data Data
     * @param {boolean} [filters] Filters? Used to convert wildcards if needed
     * @return {string} Request parameters
     * @private
     */
    private getReqParams;
    /**
     * Get path
     * @param {string} action Action
     * @param {object} [opts] Options
     * @param {string} [opts.businessCase] Business case label
     */
    private getPath;
    /**
     * Get count
     * @param {object} [filters] Filters (defaults to current filters)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {boolean} [opts.operations] Include operation fields results (sum, ...)
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the count
     * @function
     */
    getCount(filters?: any, opts?: any): Promise<any>;
    /**
     * Search
     * @param {object} [filters] Filters (defaults to current filters)
     * @param {object} [opts] Options
     * @param {number} [opts.page] Page number, a non paginated list is returned if not set
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {boolean} [opts.visible] Return only visible fields?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<array>} Promise to a list of records (also available as the <code>list</code> member)
     * @function
     */
    search(filters?: any, opts?: any): Promise<any[]>;
    /**
     * Get
     * @param {string} [rowId] Row ID (defaults to current item's row ID)
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {string[]} [opts.fields] List of field names to return, all fields are returned by default
     * @param {string} [opts.treeview] Return the named tree view structure
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record (also available as the <code>item</code> member)
     * @function
     */
    get(rowId?: string, opts?: any): Promise<any>;
    /**
     * Get for create
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
     * @function
     */
    getForCreate(opts?: any): Promise<any>;
    /**
     * Get for update
     * @param {string} [rowId] Row ID (defaults to current item's row ID)
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record to update (also available as the <code>item</code> member)
     * @function
     */
    getForUpdate(rowId?: string, opts?: any): Promise<any>;
    /**
     * Get for copy
     * @param {string} [rowId] Row ID to copy (defaults to current item's row ID)
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
     * @function
     */
    getForCopy(rowId?: string, opts?: any): Promise<any>;
    /**
     * Get for delete
     * @param {string} [rowId] Row ID (defaults to current item's row ID)
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record to delete (also available as the <code>item</code> member)
     * @function
     */
    getForDelete(rowId?: string, opts?: any): Promise<any>;
    /**
     * Get specified or current item's row ID value
     * @param {object} [item] Item (defaults to current item)
     * @return {string} Item's row ID value
     * @function
     */
    getRowId(item?: any): string;
    /**
     * Populate
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
     * @function
     */
    populate(item?: any, opts?: any): Promise<any>;
    /**
     * Get the linked list for a list of values field and its specified value(s)
     * @param {(string|object)} field Field name or definition
     * @param {(string|object)} linkedField Linked field name or definition
     * @param {string|boolean} [code] List of values code(s) (if multiple codes use ; as separator), defaults to current field value if empty, means "all" if true
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
     * @function
     */
    getFieldLinkedList(field: string | any, linkedField: string | any, code?: string | boolean, opts?: any): Promise<any>;
    /**
     * Save (create or update depending on item row ID value)
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the saved record (also available as the <code>item</code> member)
     * @function
     */
    save(item?: any, opts?: any): Promise<any>;
    /**
     * Create (create or update)
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
     * @function
     */
    create(item?: any, opts?: any): Promise<any>;
    /**
     * Update
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the updated record (also available as the <code>item</code> member)
     * @function
     */
    update(item?: any, opts?: any): Promise<any>;
    /**
     * Delete
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise (the <code>item</code> member is emptied)
     * @function
     */
    del(item?: any, opts?: any): Promise<any>;
    /**
     * Invoke a custom action
     * @param {string} action Action name
     * @param {string} [rowId] Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.parameters] Optional action parameters as key/value pairs
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<string|object>} A promise to the action result
     * @function
     */
    action(action: string, rowId?: string, opts?: any): Promise<string | any>;
    /**
     * Build a pivot table
     * @param {string} ctb Pivot table name
     * @param {object} [opts] Options
     * @param {boolean} [opts.cubes] Data as cubes?
     * @param {object} [opts.filters] Filters, by default current filters are used
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the pivot table data (also available as the <code>crosstabdata</code> member)
     * @function
     */
    crosstab(ctb: string, opts?: any): Promise<any>;
    /**
     * Build a custom publication
     * @param {string} prt Publication name
     * @param {string} [rowId] Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<Doc>} A promise to the document of the publication
     * @function
     */
    print(prt: string, rowId?: string, opts?: any): Promise<any>;
    /**
     * Get place map data
     * @param {string} pcm Place map name
     * @param {string} [filters] Filters
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<any>} A promise to the place map data
     * @function
     */
    placemap(pcm: string, filters?: any, opts?: any): Promise<any>;
    /**
     * Set an object parameter
     * @param {string} param Parameter name
     * @param {string} value Parameter value
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise
     * @function
     */
    setParameter(param: string, value: string, opts?: any): Promise<any>;
    /**
     * Get an object parameter
     * @param {string} param Parameter name
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the parameter value
     * @function
     */
    getParameter(param: string, opts?: any): Promise<any>;
    /**
     * Get an object resource URL
     * @param {string} code Resource code
     * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
     * @return {string} Object resource URL
     * @function
     */
    getResourceURL(code: string, type?: string): string;
}
export { BusinessObject };
