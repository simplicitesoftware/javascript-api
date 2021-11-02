declare namespace _default {
    export { session };
    export { Session };
    export { Grant };
    export { BusinessObject };
    export { BusinessObjectMetadata };
    export { ExternalObject };
}
export default _default;
/**
 * Simplicite application session.
 * @param {object} params Parameters (see session class for details)
 * @return {Session} session
*/
declare function session(params: object): Session;
/**
 * Simplicite application session.
 * @param {object} params Parameters
 * @param {string} params.url Base URL of the Simplicite application
 * @param {string} params.scheme URL scheme (e.g. <code>'https'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.host Hostname or IP address (e.g. <code>'myhost.mydomain.com'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {number} params.port Port (e.g. <code>443</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.root Root context URL (e.g. <code>'/myapp'</code>) the Simplicite application (not needed if <code>url</code> is set)
 * @param {boolean} [params.endpoint='api'] Endpoint (<code>'api'|'ui'|'public'</code>)
 * @param {string} [params.username] Username (not needed for public endpoint)
 * @param {string} [params.password] Password (not needed for public endpoint)
 * @param {string} [params.authtoken] Auth token (if set, username and password are not needed; not needed for public endpoint)
 * @param {boolean} [params.debug=false] Debug mode?
 * @param {function} [params.debugHandler] Debug handler function
 * @param {function} [params.infoHandler] Info handler function
 * @param {function} [params.warningHandler] Warning handler function
 * @param {function} [params.errorHandler] Error handler function
 * @param {function} [params.logHandler] Log handler function
 * @class
 */
declare function Session(params: {
    url: string;
    scheme: string;
    host: string;
    port: number;
    root: string;
    endpoint?: boolean;
    username?: string;
    password?: string;
    authtoken?: string;
    debug?: boolean;
    debugHandler?: Function;
    infoHandler?: Function;
    warningHandler?: Function;
    errorHandler?: Function;
    logHandler?: Function;
}): void;
declare class Session {
    /**
     * Simplicite application session.
     * @param {object} params Parameters
     * @param {string} params.url Base URL of the Simplicite application
     * @param {string} params.scheme URL scheme (e.g. <code>'https'</code>) of the Simplicite application (not needed if <code>url</code> is set)
     * @param {string} params.host Hostname or IP address (e.g. <code>'myhost.mydomain.com'</code>) of the Simplicite application (not needed if <code>url</code> is set)
     * @param {number} params.port Port (e.g. <code>443</code>) of the Simplicite application (not needed if <code>url</code> is set)
     * @param {string} params.root Root context URL (e.g. <code>'/myapp'</code>) the Simplicite application (not needed if <code>url</code> is set)
     * @param {boolean} [params.endpoint='api'] Endpoint (<code>'api'|'ui'|'public'</code>)
     * @param {string} [params.username] Username (not needed for public endpoint)
     * @param {string} [params.password] Password (not needed for public endpoint)
     * @param {string} [params.authtoken] Auth token (if set, username and password are not needed; not needed for public endpoint)
     * @param {boolean} [params.debug=false] Debug mode?
     * @param {function} [params.debugHandler] Debug handler function
     * @param {function} [params.infoHandler] Info handler function
     * @param {function} [params.warningHandler] Warning handler function
     * @param {function} [params.errorHandler] Error handler function
     * @param {function} [params.logHandler] Log handler function
     * @class
     */
    constructor(params: {
        url: string;
        scheme: string;
        host: string;
        port: number;
        root: string;
        endpoint?: boolean;
        username?: string;
        password?: string;
        authtoken?: string;
        debug?: boolean;
        debugHandler?: Function;
        infoHandler?: Function;
        warningHandler?: Function;
        errorHandler?: Function;
        logHandler?: Function;
    });
    /**
     * Constants
     * @constant
     */
    constants: {
        /**
         * API client module version
         * @const {string}
         */
        MODULE_VERSION: string;
        /**
         * Default row ID field name
         * @const {string}
         */
        DEFAULT_ROW_ID_NAME: string;
        /**
         * Default row ID value
         * @const {string}
         */
        DEFAULT_ROW_ID: string;
        /**
         * Default context
         * @const {number}
         */
        CONTEXT_NONE: number;
        /**
         * Search context
         * @const {number}
         */
        CONTEXT_SEARCH: number;
        /**
         * List context
         * @const {number}
         */
        CONTEXT_LIST: number;
        /**
         * Creation context
         * @const {number}
         */
        CONTEXT_CREATE: number;
        /**
         * Copy context
         * @const {number}
         */
        CONTEXT_COPY: number;
        /**
         * Update context
         * @const {number}
         */
        CONTEXT_UPDATE: number;
        /**
         * Delete context
         * @const {number}
         */
        CONTEXT_DELETE: number;
        /**
         * Chart context
         * @const {number}
         */
        CONTEXT_GRAPH: number;
        /**
         * Pivot table context
         * @const {number}
         */
        CONTEXT_CROSSTAB: number;
        /**
         * Publication context
         * @const {number}
         */
        CONTEXT_PRINTTMPL: number;
        /**
         * Bulk update context
         * @const {number}
         */
        CONTEXT_UPDATEALL: number;
        /**
         * Reference selection context
         * @const {number}
         */
        CONTEXT_REFSELECT: number;
        /**
         * Datamap selection context
         * @const {number}
         */
        CONTEXT_DATAMAPSELECT: number;
        /**
         * Pre validation context
         * @const {number}
         */
        CONTEXT_PREVALIDATE: number;
        /**
         * Post validation context
         * @const {number}
         */
        CONTEXT_POSTVALIDATE: number;
        /**
         * State transition context
         * @const {number}
         */
        CONTEXT_STATETRANSITION: number;
        /**
         * Export context
         * @const {number}
         */
        CONTEXT_EXPORT: number;
        /**
         * Import context
         * @const {number}
         */
        CONTEXT_IMPORT: number;
        /**
         * Association context
         * @const {number}
         */
        CONTEXT_ASSOCIATE: number;
        /**
         * Panle list context
         * @const {number}
         */
        CONTEXT_PANELLIST: number;
        /**
         * Foreign key (reference) type
         * @const {number}
         */
        TYPE_ID: number;
        /**
         * Integer type
         * @const {number}
         */
        TYPE_INT: number;
        /**
         * Decimal type
         * @const {number}
         */
        TYPE_FLOAT: number;
        /**
         * Short string type
         * @const {number}
         */
        TYPE_STRING: number;
        /**
         * Date type
         * @const {number}
         */
        TYPE_DATE: number;
        /**
         * Date and time type
         * @const {number}
         */
        TYPE_DATETIME: number;
        /**
         * Time type
         * @const {number}
         */
        TYPE_TIME: number;
        /**
         * Simple enumeration type
         * @const {number}
         */
        TYPE_ENUM: number;
        /**
         * Boolean type
         * @const {number}
         */
        TYPE_BOOLEAN: number;
        /**
         * Password type
         * @const {number}
         */
        TYPE_PASSWORD: number;
        /**
         * URL type
         * @const {number}
         */
        TYPE_URL: number;
        /**
         * HTML content type
         * @const {number}
         */
        TYPE_HTML: number;
        /**
         * Email type
         * @const {number}
         */
        TYPE_EMAIL: number;
        /**
         * Long string type
         * @const {number}
         */
        TYPE_LONG_STRING: number;
        /**
         * Multiple enumeration type
         * @const {number}
         */
        TYPE_ENUM_MULTI: number;
        /**
         * Validated string type
         * @const {number}
         */
        TYPE_REGEXP: number;
        /**
         * Document type
         * @const {number}
         */
        TYPE_DOC: number;
        /**
         * Decimal type
         * @const {number}
         * @deprecated
         */
        TYPE_FLOAT_EMPTY: number;
        /**
         * External file type
         * @const {number}
         * @deprecated
         */
        TYPE_EXTFILE: number;
        /**
         * Image type
         * @const {number}
         */
        TYPE_IMAGE: number;
        /**
         * Notepad type
         * @const {number}
         */
        TYPE_NOTEPAD: number;
        /**
         * Phone number type
         * @const {number}
         */
        TYPE_PHONENUM: number;
        /**
         * RGB color type
         * @const {number}
         */
        TYPE_COLOR: number;
        /**
         * Object type
         * @const {number}
         */
        TYPE_OBJECT: number;
        /**
         * Geocoordinates type
         * @const {number}
         */
        TYPE_GEOCOORDS: number;
        /**
         * Not visible
         * @const {number}
         */
        VIS_NOT: number;
        /**
         * Hiiden (same as not visible)
         * @const {number}
         */
        VIS_HIDDEN: number;
        /**
         * Visible on lists only
         * @const {number}
         */
        VIS_LIST: number;
        /**
         * Visible on forms only
         * @const {number}
         */
        VIS_FORM: number;
        /**
         * Visible on both lists and forms only
         * @const {number}
         */
        VIS_BOTH: number;
        /**
         * No search
         * @const {number}
         */
        SEARCH_NONE: number;
        /**
         * Simple search
         * @const {number}
         */
        SEARCH_MONO: number;
        /**
         * Multiple search (checkboxes)
         * @const {number}
         */
        SEARCH_MULTI_CHECK: number;
        /**
         * Multiple search (listbox)
         * @const {number}
         */
        SEARCH_MULTI_LIST: number;
        /**
         * Search by period (date/time)
         * @const {number}
         */
        SEARCH_PERIOD: number;
        /**
         * True
         * @constant {string}
         */
        TRUE: string;
        /**
         * False
         * @constant {string}
         */
        FALSE: string;
        /**
         * Fatal error level
         * @const {number}
         */
        ERRLEVEL_FATAL: number;
        /**
         * Error level
         * @const {number}
         */
        ERRLEVEL_ERROR: number;
        /**
         * Warning level
         * @const {number}
         */
        ERRLEVEL_WARNING: number;
        /**
         * Image resource type
         * @const {number}
         */
        RESOURCE_TYPE_IMAGE: string;
        /**
         * Icon resource type
         * @const {number}
         */
        RESOURCE_TYPE_ICON: string;
        /**
         * Stylesheet resource type
         * @const {number}
         */
        RESOURCE_TYPE_STYLESHEET: string;
        /**
         * Javascript resource type
         * @const {number}
         */
        RESOURCE_TYPE_JAVASCRIPT: string;
    };
    /**
     * Is used within generic UI?
     * @constant
     */
    endpoint: string | true;
    /**
     * Log handler
     * @param {...any} args Arguments
     * @function
     */
    log: Function;
    /**
     * Info handler
     * @param {...any} args Arguments
     * @function
     */
    info: any;
    /**
     * Warning handler
     * @param {...any} args Arguments
     * @function
     */
    warn: Function;
    /**
     * Error handler
     * @param {...any} args Arguments
     * @function
     */
    error: Function;
    /**
     * Debug handler
     * @param {...any} args Arguments
     * @function
     */
    debug: Function;
    /**
     * Timeout (seconds)
     * @default 30
     * @member {number}
     */
    timeout: any;
    /**
     * Parameters
     * @constant {object}
     */
    parameters: {
        scheme: string;
        host: string;
        port: number;
        root: string;
        url: string;
        healthpath: string;
        apppath: string;
        objpath: string;
        extpath: string;
        docpath: string;
        respath: string;
    };
    /**
     * Username
     * @member {string}
     */
    username: any;
    /**
     * Set username
     * @param {string} usr Username
     * @function
     */
    setUsername: (usr: string) => void;
    /**
     * Password
     * @member {string}
     */
    password: any;
    /**
     * Set password
     * @param {string} pwd Password
     * @function
     */
    setPassword: (pwd: string) => void;
    /**
     * Auth token
     * @member {string}
     */
    authtoken: any;
    /**
     * Set auth token
     * @param {string} tkn Auth token
     * @function
     */
    setAuthToken: (tkn: string) => void;
    /**
     * Get business object cache key
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {object} Business object cache key
     * @private
     */
    private getBusinessObjectCacheKey;
    /**
     * Clears all data (credentials, objects, ...)
     * @function
     */
    clear: () => void;
    sessionid: any;
    grant: any;
    appinfo: any;
    sysinfo: any;
    devinfo: any;
    userinfo: any;
    /**
     * Basic HTTP authorization header
     * @private
     */
    private getBasicAuthHeader;
    /**
     * Get bearer token header
     * @private
     */
    private getBearerTokenHeader;
    /**
     * Request
     * @param {string} path Path
     * @param {object} [data] Data
     * @param {function} [callback] Callback
     * @param {function} [errorHandler] Error handler
     * @private
     */
    private req;
    /**
     * Get error object
     * @param {(string|object)} err Error
     * @param {string} err.message Error message
     * @param {number} [status] Error status
     * @private
     */
    private getError;
    /**
     * Parse result
     * @param {object} res Response to parse
     * @param {number} [status=200] HTTP status
     * @private
     */
    private parse;
    /**
     * Get health check (no need to be authenticated)
     * @param {object} [opts] Options
     * @param {boolean} [opts.full=false] Full health check?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the health data
     * @function
     */
    getHealth: (opts?: {
        full?: boolean;
        error?: Function;
    }) => any;
    /**
     * Login
     * @param {object} [opts] Options
     * @param {string} [opts.username] Username (exclusive with authentication token)
     * @param {string} [opts.password] Password (required if username is set)
     * @param {string} [opts.authtoken] Authentication token ((exclusive with username)
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the login result
     * @function
     */
    login: (opts?: {
        username?: string;
        password?: string;
        authtoken?: string;
        error?: Function;
    }) => any;
    /**
     * Logout
     * @param {function} callback Callback (called upon success)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the logout result
     * @function
     */
    logout: (opts?: {
        error?: Function;
    }) => any;
    /**
     * Get grant (current user data)
     * @param {object} [opts] Options
     * @param {boolean} [opts.inlinePicture=false] Inline user picture?
     * @param {boolean} [opts.includeTexts=false] Include texts?
     * @param {function} [opts.error] Error handler function
     * @return {promise<Grant>} A promise to the grant (also available as the <code>grant</code> member)
     * @function
     */
    getGrant: (opts?: {
        inlinePicture?: boolean;
        includeTexts?: boolean;
        error?: Function;
    }) => any;
    /**
     * Change password
     * @param {string} pwd Password
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the change password result
     * @function
     */
    changePassword: (pwd: string, opts?: {
        error?: Function;
    }) => any;
    /**
     * Get application info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the application info (also avialable as the <code>appinfo</code> member)
     * @function
     */
    getAppInfo: (opts?: {
        error?: Function;
    }) => any;
    /**
     * Get system info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the system info (also avialable as the <code>sysinfo</code> member)
     * @function
     */
    getSysInfo: (opts?: {
        error?: Function;
    }) => any;
    /**
     * Get development info
     * @param {string} [module] Module name
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the develoment info (also avialable as the <code>devinfo</code> member)
     * @function
     */
    getDevInfo: (module?: string, opts?: {
        error?: Function;
    }) => any;
    /**
     * Get news
     * @param {object} [opts] Options
     * @param {boolean} [opts.inlineImages=false] Inline news images?
     * @param {function} [opts.error] Error handler function
     * @return {promise<array>} A promise to the list of news (also avialable as the <code>news</code> member)
     * @function
     */
    getNews: (opts?: {
        inlineImages?: boolean;
        error?: Function;
    }) => any;
    /**
     * Index search
     * @param {string} request Index search request
     * @param {string} [object] Object
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Add meta data for each result
     * @param {number} [opts.context] Context
     * @param {function} [opts.error] Error handler function
     * @return {promise<array>} A promise to a list of index search records
     * @function
     */
    indexSearch: (request: string, object?: string, opts?: {
        metadata?: boolean;
        context?: number;
        error?: Function;
    }) => any;
    /**
     * Get business object
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {BusinessObject} Business object
     * @function
     */
    getBusinessObject: (name: string, instance?: string) => BusinessObject;
    /**
     * Get an external object
     * @param {string} name External object name
     * @function
     */
    getExternalObject: (name: string) => ExternalObject;
    /**
     * Get a resource URL
     * @param {string} code Resource code
     * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
     * @param {string} [object] Object name (not required for global resources)
     * @param {string} [objId] Object ID (not required for global resources)
     * @function
     */
    getResourceURL: (code: string, type?: string, object?: string, objId?: string) => string;
}
/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
declare function Grant(): void;
declare class Grant {
    /**
     * Get user ID
     * @return {string} User ID
     * @function
     */
    getUserId: () => string;
    /**
     * Get username
     * @return {string} Username
     * @function
     */
    getUsername: () => string;
    /**
     * Alias to <code>getUsername</code>
     * @return {string} Login
     * @function
     */
    getLogin: () => string;
    /**
     * Get language
     * @return {string} Language
     * @function
     */
    getLang: () => string;
    /**
     * Get email address
     * @return {string} Email address
     * @function
     */
    getEmail: () => string;
    /**
     * Get first name
     * @return {string} First name
     * @function
     */
    getFirstname: () => string;
    /**
     * Alias to <code>getFirstname</code>
     * @return {string} First name
     * @function
     */
    getFirstName: () => string;
    /**
     * Get last name
     * @return {string} Last name
     * @function
     */
    getLastname: () => string;
    /**
     * Alias to <code>getLastname</code>
     * @return {string} Last name
     * @function
     */
    getLastName: () => string;
    /**
     * Get picture data URL
     * @return {string} Picture data URL
     * @function
     */
    getPictureURL: () => string;
    /**
     * Has responsibility
     * @param {string} group Group name
     * @return {boolean} True if user has a responsibility on the specified group
     * @function
     */
    hasResponsibility: (group: string) => boolean;
    /**
     * Get text
     * @param {string} code Text code
     */
    T: (code: string) => any;
}
/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @param {object} ses Session
 * @param {string} name Business object name
 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
 * @class
 */
declare function BusinessObject(ses: object, name: string, instance?: string): void;
declare class BusinessObject {
    /**
     * Business object.
     * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
     * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
     * @param {object} ses Session
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @class
     */
    constructor(ses: object, name: string, instance?: string);
    /**
     * Session
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
     */
    cacheKey: any;
    /**
     * Path
     * @constant {string}
     */
    path: string;
    /**
     * Current item
     * @member {object}
     */
    item: {};
    /**
     * Current filters
     * @member {object}
     */
    filters: {};
    /**
     * Current list
     * @member {object[]}
     */
    list: any[];
    /**
     * Get meta data
     * @param {object} [opts] Options
     * @param {number} [opts.context] Context
     * @param {string} [opts.contextParam] Context parameter
     * @param {function} [opts.error] Error handler function
     * @return {promise<BusinessObjectMetadata>} A promise to the object'ts meta data (also available as the <code>metadata</code> member)
     * @function
     */
    getMetaData: (opts?: {
        context?: number;
        contextParam?: string;
        error?: Function;
    }) => any;
    /**
     * Get meta data (alias to getMetaData)
     * @param {object} [opts] Options
     * @param {number} [opts.context] Context
     * @param {string} [opts.contextParam] Context parameter
     * @param {function} [opts.error] Error handler function
     * @return {promise<BusinessObjectMetadata>} A promise to the object'ts meta data (also available as the <code>metadata</code> member)
     * @function
     */
    getMetadata: (opts?: {
        context?: number;
        contextParam?: string;
        error?: Function;
    }) => any;
    /**
     * Get name
     * @return {string} Name
     * @function
     */
    getName: () => string;
    /**
     * Get instance name
     * @return {string} Instance name
     * @function
     */
    getInstance: () => string;
    /**
     * Get display label
     * @return {string} Display label
     * @function
     */
    getLabel: () => string;
    /**
     * Get help
     * @return {string} Help
     * @function
     */
    getHelp: () => string;
    /**
     * Get all fields definitions
     * @return {array} Array of field definitions
     * @function
     */
    getFields: () => any[];
    /**
     * Get a field definition
     * @param {string} fieldName Field name
     * @return {object} Field definition
     * @function
     */
    getField: (fieldName: string) => object;
    /**
     * Get row ID field name
     * @return {string} Row ID field name
     * @function
     */
    getRowIdFieldName: () => string;
    /**
     * Get row ID field definition
     * @return {object} Row ID field definition
     * @function
     */
    getRowIdField: () => object;
    /**
     * Get links
     * @return {array} Array of links
     * @function
     */
    getLinks: () => any[];
    /**
     * Get field type
     * @param {(string|object)} field Field name or definition
     * @return {string} Type (one of <code>constants.TYPE_*</code>)
     * @function
     */
    getFieldType: (field: (string | object)) => string;
    /**
     * Get field label
     * @param {(string|object)} field Field name or definition
     * @return {string} Value
     * @function
     */
    getFieldLabel: (field: (string | object)) => string;
    /**
     * Get value of field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} Value
     * @function
     */
    getFieldValue: (field: (string | object), item?: object) => string;
    /**
     * Get the list value of a list of values field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {string} code Code
     * @return {string} Value
     * @function
     */
    getFieldListValue: (field: (string | object), item: any) => string;
    /**
     * Get the data URL of an inlined document/image field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} Document/image field data URL (or nothing if the field is not of document/image type or if it is not inlined or if it is empty)
     * @function
     */
    getFieldDataURL: (field: (string | object), item?: object) => string;
    /**
     * Get the field's value as document/image for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {Document} Document/image (or nothing if the field is not of document/image type or if it is empty)
     * @function
     */
    getFieldDocument: (field: (string | object), item?: object) => Document;
    /**
     * Get the URL of a document/image field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @param {boolean} [thumbnail=false] Thumbnail?
     * @return {string} Document/image field URL (or nothing if the field is not of document/image type or if it is empty)
     * @function
     */
    getFieldDocumentURL: (field: (string | object), item?: object, thumbnail?: boolean) => string;
    /**
     * Get list value for code
     * @param {list} list List of values
     * @param {string} code Code
     * @return {string} Value
     * @function
     */
    getListValue: (list: any, code: string) => string;
    /**
     * Set value of field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {(string|object)} value Value
     * @param {object} [item] Item (defaults to current item)
     * @function
     */
    setFieldValue: (field: (string | object), value: (string | object), item?: object) => void;
    /**
     * Is the field the row ID field?
     * @param {object} field Field definition
     * @return {boolean} True if the field is the row ID field
     * @function
     */
    isRowIdField: (field: object) => boolean;
    /**
     * Is the field a timestamp field?
     * @param {object} field Field definition
     * @return {boolean} True if the field is a timestamp field
     * @function
     */
    isTimestampField: (field: object) => boolean;
    /**
     * Get current filters
     * @param {object} [opts] Options
     * @param {number} [opts.context] Context
     * @param {boolean} [opts.reset] Reset filters?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the object's filters (also available as the <code>filters</code> member)
     * @function
     */
    getFilters: (opts?: {
        context?: number;
        reset?: boolean;
        error?: Function;
    }) => any;
    /**
     * Count
     * @param {object} [filters] Filters, defaults to current filters if not set
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the count
     * @function
     */
    count: (filters?: object, opts?: {
        error?: Function;
    }) => any;
    /**
     * Count, **deprecated**: use <code>count</code> instead
     * @deprecated
     * @function
     */
    getCount: (filters?: object, opts?: {
        error?: Function;
    }) => any;
    /**
     * Search
     * @param {object} [filters] Filters, defaults to current filters if not set
     * @param {object} [opts] Options
     * @param {number} [opts.page] Page number, a non paginated list is returned if not set
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {boolean} [opts.visible] Return only visible fields?
     * @param {function} [opts.error] Error handler function
     * @return {promise<array>} Promise to a list of records (also available as the <code>list</code> member)
     * @function
     */
    search: (filters?: object, opts?: {
        page?: number;
        metadata?: boolean;
        visible?: boolean;
        error?: Function;
    }) => any;
    /**
     * Get
     * @param {string} rowId Row ID
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {string[]} [opts.fields] List of field names to return, all fields are returned by default
     * @param {string} [opts.treeview] Return the named tree view structure
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the record (also available as the <code>item</code> member)
     * @function
     */
    get: (rowId: string, opts?: {
        metadata?: boolean;
        fields?: string[];
        treeview?: string;
        error?: Function;
    }) => any;
    /**
     * Get for create
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
     * @function
     */
    getForCreate: (opts?: {
        metadata?: boolean;
        error?: Function;
    }) => any;
    /**
     * Get for update
     * @param {string} rowId Row ID
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the record to update (also available as the <code>item</code> member)
     * @function
     */
    getForUpdate: (rowId: string, opts?: {
        metadata?: boolean;
        error?: Function;
    }) => any;
    /**
     * Get for copy
     * @param {string} rowId Row ID to copy
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
     * @function
     */
    getForCopy: (rowId: string, opts?: {
        metadata?: boolean;
        error?: Function;
    }) => any;
    /**
     * Get for delete
     * @param {string} rowId Row ID
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the record to delete (also available as the <code>item</code> member)
     * @function
     */
    getForDelete: (rowId: string, opts?: {
        metadata?: boolean;
        error?: Function;
    }) => any;
    /**
     * Get specified or current item's row ID value
     * @param {object} [item] Item, defaults to current item
     * @return {string} Item's row ID value
     * @function
     */
    getRowId: (item?: object) => string;
    /**
     * Populate
     * @param {string} rowId Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
     * @function
     */
    populate: (rowId: string, opts?: {
        error?: Function;
    }) => any;
    /**
     * Save (create or update depending on item row ID value)
     * @param {object} item Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the saved record (also available as the <code>item</code> member)
     * @function
     */
    save: (item: object, opts?: {
        error?: Function;
    }) => any;
    /**
     * Create (create or update)
     * @param {object} item Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
     * @function
     */
    create: (item: object, opts?: {
        error?: Function;
    }) => any;
    /**
     * Update
     * @param {object} item Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the updated record (also available as the <code>item</code> member)
     * @function
     */
    update: (item: object, opts?: {
        error?: Function;
    }) => any;
    /**
     * Delete
     * @param {object} item Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise} Promise (the <code>item</code> member is emptied)
     * @function
     */
    del: (item: object, opts?: {
        error?: Function;
    }) => Promise<any>;
    /**
     * Invoke a custom action
     * @param {string} action Action name
     * @param {string} [rowId] Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.parameters] Optional action parameters as key/value pairs
     * @param {function} [opts.error] Error handler function
     * @return {promise<string|object>} A promise to the action result
     * @function
     */
    action: (action: string, rowId?: string, opts?: {
        parameters?: Function;
        error?: Function;
    }) => any;
    /**
     * Build a pivot table
     * @param {string} crosstab Pivot table name
     * @param {object} [opts] Options
     * @param {object} [opts.filters] Filters, by default current filters are used
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the pivot table data (also avialable as the <code>crosstabdata</code> member)
     * @function
     */
    crosstab: (crosstab: string, opts?: {
        filters?: object;
        error?: Function;
    }) => any;
    /**
     * Build a custom publication
     * @param {string} prt Publication name
     * @param {string} [rowId] Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<Document>} A promise to the document of the publication
     * @function
     */
    print: (prt: string, rowId?: string, opts?: {
        error?: Function;
    }) => any;
    /**
     * Set an object parameter
     * @param {string} param Parameter name
     * @param {string} value Parameter value
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise
     * @function
     */
    setParameter: (param: string, value: string, opts?: {
        error?: Function;
    }) => any;
    /**
     * Get an object parameter
     * @param {string} param Parameter name
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the parameter value
     * @function
     */
    getParameter: (param: string, opts?: {
        error?: Function;
    }) => any;
    /**
     * Get an object resource URL
     * @param {string} code Resource code
     * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
     * @function
     */
    getResourceURL: (code: string, type?: string) => any;
}
/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>BusinessObject</code> instances</span>.
 * @param {string} name Business object name
 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
 * @class
 */
declare function BusinessObjectMetadata(name: string, instance?: string): void;
declare class BusinessObjectMetadata {
    /**
     * Business object meta data.
     * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
     * but rather use it from the <code>metadata</code> variable of your <code>BusinessObject</code> instances</span>.
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @class
     */
    constructor(name: string, instance?: string);
    /**
     * Name
     * @constant {string}
     */
    name: string;
    /**
     * Instance name
     * @constant {string}
     */
    instance: string;
    /**
     * Row ID field name
     * @member {string}
     */
    rowidfield: string;
    /**
     * Display label
     * @member {string}
     */
    label: string;
    /**
     * Help
     * @member {string}
     */
    help: string;
    /**
     * Fields definitions
     * @member {array}
     */
    fields: any[];
}
/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getExternalObject</code></span>.
 * @param {object} ses Session
 * @param {string} name Business object name
 * @class
 */
declare function ExternalObject(ses: object, name: string): void;
declare class ExternalObject {
    /**
     * External object.
     * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
     * but rather call <code>getExternalObject</code></span>.
     * @param {object} ses Session
     * @param {string} name Business object name
     * @class
     */
    constructor(ses: object, name: string);
    /**
     * Session
     * @private
     */
    private session;
    /**
     * Metadata
     * @constant
     */
    metadata: ExternalObjectMetadata;
    /**
     * Path
     * @constant {string}
     */
    path: string;
    /**
     * Get name
     * @return {string} Name
     * @function
     */
    getName: () => string;
    /**
     * Build URL-encoded parameters
     * @param {object} params URL parameters as key/value pairs
     * @function
     */
    callParams: (params: object) => string;
    /**
     * Call an external object
     * @param {object} [params] Optional URL parameters
     * @param {object} [data] Optional data (for 'POST' and 'PUT' methods only)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {object} [opts.method] Optional method 'GET', 'POST', 'PUT' or 'DELETE' (defaults to 'GET' if data is not set or 'POST" if data is set
     * @param {function} [opts.contentType] Optional data content type (for 'POST' and 'PUT' methods only)
     * @return {promise<object>} Promise to the external object content
     * @function
     */
    call: (params?: object, data?: object, opts?: {
        error?: Function;
        method?: object;
        contentType?: Function;
    }) => any;
}
/**
 * Document
 * @class
 */
declare function Document(): void;
declare class Document {
    /**
     * Get the document's ID
     * @return ID
     * @function
     */
    getId: () => any;
    /**
     * Get the document's MIME type
     * @return {string} MIME type
     * @function
     */
    getMIMEType: () => string;
    /**
     * Alias to <code>getMIMEType</code>
     * @return {string} MIME type
     * @function
     */
    getMimeType: () => string;
    /**
     * Set the document's MIME type
     * @param {string} mime MIME type
     * @function
     */
    setMIMEType: (mime: string) => void;
    mime: string;
    /**
     * Alias to <code>setMIMEType</code>
     * @param {string} mime MIME type
     * @function
     */
    setMimeType: (mime: string) => void;
    /**
     * Get the document's file name
     * @return {string} File name
     * @function
     */
    getFilename: () => string;
    /**
     * Alias to <code>getFilename</code>
     * @return {string} File name
     * @function
     */
    getFileName: () => string;
    /**
     * Set the document's file name
     * @param {string} filename File name
     * @function
     */
    setFilename: (filename: string) => void;
    filename: string;
    /**
     * Alias to <code>setFilename</code>
     * @param {string} filename File name
     * @function
     */
    setFileName: (filename: string) => void;
    /**
     * Get the document's content (encoded in base 64)
     * @return {string} Content
     * @function
     */
    getContent: () => string;
    /**
     * Get the document's thumbnail (encoded in base 64)
     * @return {string} Thumbnail
     * @function
     */
    getThumbnail: () => string;
    /**
     * Get the document's content as an array buffer
     * @return {ArrayBuffer} Content as an array buffer
     * @function
     */
    getContentAsArrayBuffer: () => ArrayBuffer;
    /**
     * Get the document's thumbnail as an array buffer
     * @return {ArrayBuffer} Thumbnail as an array buffer
     * @function
     */
    getThumbnailAsArrayBuffer: () => ArrayBuffer;
    /**
     * Get the document's content as a text
     * @param {string} [encoding] Encoding, defaults to UTF-8
     * @return {string} Content as plain text
     * @function
     */
    getContentAsText: (encoding?: string) => string;
    /**
     * Set the document's content
     * @param {string} content Content (encoded in base 64)
     * @function
     */
    setContent: (content: string) => void;
    content: any;
    /**
     * Set the document's content from plain text string
     * @param {string} content Content as plain text string
     * @param {string} [encoding] Encoding, defaults to UTF-8
     * @function
     */
    setContentFromText: (content: string, encoding?: string) => void;
    /**
     * Get the document's data URL
     * @param {boolean} [thumbnail] Thumbnail? If thumbnail does not exists the content is used.
     * @return {string} Data URL or nothing if content is empty
     */
    getDataURL: (thumbnail?: boolean) => string;
    /**
     * Get the document as a simple value
     * @return Value
     */
    getValue: () => any;
}
/**
 * External object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>ExternalObject</code> instances</span>.
 * @param {string} name Business object name
 * @class
 */
declare function ExternalObjectMetadata(name: string): void;
declare class ExternalObjectMetadata {
    /**
     * External object meta data.
     * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
     * but rather use it from the <code>metadata</code> variable of your <code>ExternalObject</code> instances</span>.
     * @param {string} name Business object name
     * @class
     */
    constructor(name: string);
    /**
     * Name
     * @constant {string}
     */
    name: string;
}
