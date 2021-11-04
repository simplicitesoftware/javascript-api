declare namespace _default {
    export { constants };
    export { session };
    export { Session };
    export { Doc };
    export { Grant };
    export { BusinessObject };
    export { BusinessObjectMetadata };
    export { ExternalObject };
}
export default _default;
declare namespace constants {
    const MODULE_VERSION: string;
    const DEFAULT_ROW_ID_NAME: string;
    const DEFAULT_ROW_ID: string;
    const CONTEXT_NONE: number;
    const CONTEXT_SEARCH: number;
    const CONTEXT_LIST: number;
    const CONTEXT_CREATE: number;
    const CONTEXT_COPY: number;
    const CONTEXT_UPDATE: number;
    const CONTEXT_DELETE: number;
    const CONTEXT_GRAPH: number;
    const CONTEXT_CROSSTAB: number;
    const CONTEXT_PRINTTMPL: number;
    const CONTEXT_UPDATEALL: number;
    const CONTEXT_REFSELECT: number;
    const CONTEXT_DATAMAPSELECT: number;
    const CONTEXT_PREVALIDATE: number;
    const CONTEXT_POSTVALIDATE: number;
    const CONTEXT_STATETRANSITION: number;
    const CONTEXT_EXPORT: number;
    const CONTEXT_IMPORT: number;
    const CONTEXT_ASSOCIATE: number;
    const CONTEXT_PANELLIST: number;
    const TYPE_ID: number;
    const TYPE_INT: number;
    const TYPE_FLOAT: number;
    const TYPE_STRING: number;
    const TYPE_DATE: number;
    const TYPE_DATETIME: number;
    const TYPE_TIME: number;
    const TYPE_ENUM: number;
    const TYPE_BOOLEAN: number;
    const TYPE_PASSWORD: number;
    const TYPE_URL: number;
    const TYPE_HTML: number;
    const TYPE_EMAIL: number;
    const TYPE_LONG_STRING: number;
    const TYPE_ENUM_MULTI: number;
    const TYPE_REGEXP: number;
    const TYPE_DOC: number;
    const TYPE_FLOAT_EMPTY: number;
    const TYPE_EXTFILE: number;
    const TYPE_IMAGE: number;
    const TYPE_NOTEPAD: number;
    const TYPE_PHONENUM: number;
    const TYPE_COLOR: number;
    const TYPE_OBJECT: number;
    const TYPE_GEOCOORDS: number;
    const VIS_NOT: number;
    const VIS_HIDDEN: number;
    const VIS_LIST: number;
    const VIS_FORM: number;
    const VIS_BOTH: number;
    const SEARCH_NONE: number;
    const SEARCH_MONO: number;
    const SEARCH_MULTI_CHECK: number;
    const SEARCH_MULTI_LIST: number;
    const SEARCH_PERIOD: number;
    const TRUE: string;
    const FALSE: string;
    const ERRLEVEL_FATAL: number;
    const ERRLEVEL_ERROR: number;
    const ERRLEVEL_WARNING: number;
    const RESOURCE_TYPE_IMAGE: string;
    const RESOURCE_TYPE_ICON: string;
    const RESOURCE_TYPE_STYLESHEET: string;
    const RESOURCE_TYPE_JAVASCRIPT: string;
}
/**
 * Simplicite application session. Same as <code>new Session(parameter)</code>.
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
declare class Session {
    /**
     * Constructor
     * @param params {object} Parameters
     */
    constructor(params: object);
    /**
     * Endpoint
     * @member {string}
     */
    endpoint: any;
    /**
     * Log handler
     * @param {...any} args Arguments
     * @function
     */
    log: any;
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
    warn: any;
    /**
     * Error handler
     * @param {...any} args Arguments
     * @function
     */
    error: any;
    /**
     * Debug mode enabled?
     * @member {boolean}
     */
    debugMode: boolean;
    /**
     * Debug handler
     * @param {...any} args Arguments
     * @function
     */
    debug: any;
    /**
     * Parameters
     * @member {object}
     */
    parameters: {
        scheme: any;
        host: any;
        port: any;
        root: any;
        url: string;
        timeout: any;
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
     * Password
     * @member {string}
     */
    password: any;
    /**
     * Auth token
     * @member {string}
     */
    authtoken: any;
    /**
     * Business objects cache
     * @member {object}
     * @private
     */
    private businessObjectCache;
    /**
     * Constants
     * @member
     */
    constants: {
        /**
         * API client module version
         * @constant {string}
         */
        MODULE_VERSION: string;
        /**
         * Default row ID field name
         * @constant {string}
         */
        DEFAULT_ROW_ID_NAME: string;
        /**
         * Default row ID value
         * @constant {string}
         */
        DEFAULT_ROW_ID: string;
        /**
         * Default context
         * @constant {number}
         */
        CONTEXT_NONE: number;
        /**
         * Search context
         * @constant {number}
         */
        CONTEXT_SEARCH: number;
        /**
         * List context
         * @constant {number}
         */
        CONTEXT_LIST: number;
        /**
         * Creation context
         * @constant {number}
         */
        CONTEXT_CREATE: number;
        /**
         * Copy context
         * @constant {number}
         */
        CONTEXT_COPY: number;
        /**
         * Update context
         * @constant {number}
         */
        CONTEXT_UPDATE: number;
        /**
         * Delete context
         * @constant {number}
         */
        CONTEXT_DELETE: number;
        /**
         * Chart context
         * @constant {number}
         */
        CONTEXT_GRAPH: number;
        /**
         * Pivot table context
         * @constant {number}
         */
        CONTEXT_CROSSTAB: number;
        /**
         * Publication context
         * @constant {number}
         */
        CONTEXT_PRINTTMPL: number;
        /**
         * Bulk update context
         * @constant {number}
         */
        CONTEXT_UPDATEALL: number;
        /**
         * Reference selection context
         * @constant {number}
         */
        CONTEXT_REFSELECT: number;
        /**
         * Datamap selection context
         * @constant {number}
         */
        CONTEXT_DATAMAPSELECT: number;
        /**
         * Pre validation context
         * @constant {number}
         */
        CONTEXT_PREVALIDATE: number;
        /**
         * Post validation context
         * @constant {number}
         */
        CONTEXT_POSTVALIDATE: number;
        /**
         * State transition context
         * @constant {number}
         */
        CONTEXT_STATETRANSITION: number;
        /**
         * Export context
         * @constant {number}
         */
        CONTEXT_EXPORT: number;
        /**
         * Import context
         * @constant {number}
         */
        CONTEXT_IMPORT: number;
        /**
         * Association context
         * @constant {number}
         */
        CONTEXT_ASSOCIATE: number;
        /**
         * Panle list context
         * @constant {number}
         */
        CONTEXT_PANELLIST: number;
        /**
         * Foreign key (reference) type
         * @constant {number}
         */
        TYPE_ID: number;
        /**
         * Integer type
         * @constant {number}
         */
        TYPE_INT: number;
        /**
         * Decimal type
         * @constant {number}
         */
        TYPE_FLOAT: number;
        /**
         * Short string type
         * @constant {number}
         */
        TYPE_STRING: number;
        /**
         * Date type
         * @constant {number}
         */
        TYPE_DATE: number;
        /**
         * Date and time type
         * @constant {number}
         */
        TYPE_DATETIME: number;
        /**
         * Time type
         * @constant {number}
         */
        TYPE_TIME: number;
        /**
         * Simple enumeration type
         * @constant {number}
         */
        TYPE_ENUM: number;
        /**
         * Boolean type
         * @constant {number}
         */
        TYPE_BOOLEAN: number;
        /**
         * Password type
         * @constant {number}
         */
        TYPE_PASSWORD: number;
        /**
         * URL type
         * @constant {number}
         */
        TYPE_URL: number;
        /**
         * HTML content type
         * @constant {number}
         */
        TYPE_HTML: number;
        /**
         * Email type
         * @constant {number}
         */
        TYPE_EMAIL: number;
        /**
         * Long string type
         * @constant {number}
         */
        TYPE_LONG_STRING: number;
        /**
         * Multiple enumeration type
         * @constant {number}
         */
        TYPE_ENUM_MULTI: number;
        /**
         * Validated string type
         * @constant {number}
         */
        TYPE_REGEXP: number;
        /**
         * Document type
         * @constant {number}
         */
        TYPE_DOC: number;
        /**
         * Decimal type
         * @constant {number}
         * @deprecated
         */
        TYPE_FLOAT_EMPTY: number;
        /**
         * External file type
         * @constant {number}
         * @deprecated
         */
        TYPE_EXTFILE: number;
        /**
         * Image type
         * @constant {number}
         */
        TYPE_IMAGE: number;
        /**
         * Notepad type
         * @constant {number}
         */
        TYPE_NOTEPAD: number;
        /**
         * Phone number type
         * @constant {number}
         */
        TYPE_PHONENUM: number;
        /**
         * RGB color type
         * @constant {number}
         */
        TYPE_COLOR: number;
        /**
         * Object type
         * @constant {number}
         */
        TYPE_OBJECT: number;
        /**
         * Geocoordinates type
         * @constant {number}
         */
        TYPE_GEOCOORDS: number;
        /**
         * Not visible
         * @constant {number}
         */
        VIS_NOT: number;
        /**
         * Hiiden (same as not visible)
         * @constant {number}
         */
        VIS_HIDDEN: number;
        /**
         * Visible on lists only
         * @constant {number}
         */
        VIS_LIST: number;
        /**
         * Visible on forms only
         * @constant {number}
         */
        VIS_FORM: number;
        /**
         * Visible on both lists and forms only
         * @constant {number}
         */
        VIS_BOTH: number;
        /**
         * No search
         * @constant {number}
         */
        SEARCH_NONE: number;
        /**
         * Simple search
         * @constant {number}
         */
        SEARCH_MONO: number;
        /**
         * Multiple search (checkboxes)
         * @constant {number}
         */
        SEARCH_MULTI_CHECK: number;
        /**
         * Multiple search (listbox)
         * @constant {number}
         */
        SEARCH_MULTI_LIST: number;
        /**
         * Search by period (date/time)
         * @constant {number}
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
         * @constant {number}
         */
        ERRLEVEL_FATAL: number;
        /**
         * Error level
         * @constant {number}
         */
        ERRLEVEL_ERROR: number;
        /**
         * Warning level
         * @constant {number}
         */
        ERRLEVEL_WARNING: number;
        /**
         * Image resource type
         * @constant {number}
         */
        RESOURCE_TYPE_IMAGE: string;
        /**
         * Icon resource type
         * @constant {number}
         */
        RESOURCE_TYPE_ICON: string;
        /**
         * Stylesheet resource type
         * @constant {number}
         */
        RESOURCE_TYPE_STYLESHEET: string;
        /**
         * Javascript resource type
         * @constant {number}
         */
        RESOURCE_TYPE_JAVASCRIPT: string;
    };
    /**
     * Set username
     * @param {string} usr Username
     * @function
     */
    setUsername: (usr: string) => void;
    /**
     * Set password
     * @param {string} pwd Password
     * @function
     */
    setPassword: (pwd: string) => void;
    /**
     * Session ID
     * @member {string}
     */
    sessionid: any;
    /**
     * Set auth token
     * @param {string} token Auth token
     * @function
     */
    setAuthToken: (token: string) => void;
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
    /**
     * Grant
     * @member {Grant}
     */
    grant: any;
    /**
     * Application info
     * @member {object}
     */
    appinfo: any;
    /**
     * System info
     * @member {object}
     */
    sysinfo: any;
    /**
     * Development info
     * @member {object}
     */
    devinfo: any;
    /**
     * Basic HTTP authorization header value
     * @return {string} HTTP authorization header value
     * @private
     */
    private getBasicAuthHeader;
    /**
     * Get bearer token header value
     * @return {string} Bearer token header value
     * @private
     */
    private getBearerTokenHeader;
    /**
     * Get error object
     * @param {(string|object)} err Error
     * @param {string} err.message Error message
     * @param {number} [status] Optional error status (defaults to 200)
     * @param {string} [origin] Optional error origin
     * @return {object} Error object
     * @private
     */
    private getError;
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
     * Parse result
     * @param {object} res Response to parse
     * @param {number} [status=200] HTTP status
     * @return {object} Error object
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
     * News
     * @member {array}
     */
    news: any;
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
     * @param {string} query Index search query
     * @param {string} [object] Object
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Add meta data for each result
     * @param {number} [opts.context] Context
     * @param {function} [opts.error] Error handler function
     * @return {promise<array>} A promise to a list of index search records
     * @function
     */
    indexSearch: (query: string, object?: string, opts?: {
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
 * Document
 * @class
 */
declare class Doc {
    /**
     * Constructor
     * @param value {object} Document value
     */
    constructor(value: object);
    /**
     * Document ID
     * @member {string}
     */
    id: any;
    /**
     * Document MIME type
     * @member {string}
     */
    mime: any;
    /**
     * Document file name
     * @member {string}
     */
    filename: any;
    /**
     * Document content as base 64
     * @member {string}
     */
    content: any;
    /**
     * Document thumbnail as base 64
     * @member {string}
     */
    thumbnail: any;
    /**
     * Get the document ID
     * @return {string} ID
     * @function
     */
    getId: () => string;
    /**
     * Get the document MIME type
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
     * Set the document MIME type
     * @param {string} mime MIME type
     * @function
     */
    setMIMEType: (mime: string) => void;
    /**
     * Alias to <code>setMIMEType</code>
     * @param {string} mime MIME type
     * @function
     */
    setMimeType: (mime: string) => void;
    /**
     * Get the document file name
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
     * Set the document file name
     * @param {string} filename File name
     * @function
     */
    setFilename: (filename: string) => void;
    /**
     * Alias to <code>setFilename</code>
     * @param {string} filename File name
     * @function
     */
    setFileName: (filename: string) => void;
    /**
     * Get the document content (encoded in base 64)
     * @return {string} Content
     * @function
     */
    getContent: () => string;
    /**
     * Get the document thumbnail (encoded in base 64)
     * @return {string} Thumbnail
     * @function
     */
    getThumbnail: () => string;
    /**
     * Get the document content as a buffer
     * @param {any} data Content data
     * @return {buffer} Content data as buffer
     * @private
     */
    private getBuffer;
    /**
     * Get the document content as an array buffer
     * @return {ArrayBuffer} Content as an array buffer
     * @function
     */
    getContentAsArrayBuffer: () => ArrayBuffer;
    /**
     * Get the document thumbnail as an array buffer
     * @return {ArrayBuffer} Thumbnail as an array buffer
     * @function
     */
    getThumbnailAsArrayBuffer: () => ArrayBuffer;
    /**
     * Get the document content as a text
     * @return {string} Content as plain text
     * @function
     */
    getContentAsText: () => string;
    /**
     * Set the document content
     * @param {string} content Content (encoded in base 64)
     * @function
     */
    setContent: (content: string) => void;
    /**
     * Set the document content from plain text string
     * @param {string} content Content as plain text string
     * @function
     */
    setContentFromText: (content: string) => void;
    /**
     * Get the document data URL
     * @param {boolean} [thumbnail=false] Thumbnail? If thumbnail does not exists the content is used.
     * @return {string} Data URL or nothing if content is empty
     */
    getDataURL: (thumbnail?: boolean) => string;
    /**
     * Get the document as a simple value
     * @return {object} Value
     */
    getValue: () => object;
}
/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
declare class Grant {
    /**
     * Constructor
     * @param grant {object} Grant object
     */
    constructor(grant: object);
    /**
     * User ID
     * @member {string}
     */
    userid: any;
    /**
     * User name
     * @member {string}
     */
    login: any;
    /**
     * User language
     * @member {string}
     */
    lang: any;
    /**
     * User email address
     * @member {string}
     */
    email: any;
    /**
     * User first name
     * @member {string}
     */
    firstname: any;
    /**
     * User last name
     * @member {string}
     */
    lastname: any;
    /**
     * User picture
     * @member {Doc}
     */
    picture: any;
    /**
     * User responsibilities
     * @member {array}
     */
    responsibilities: any;
    /**
     * Translated texts
     * @member {object}
     */
    texts: any;
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
     * Get user language
     * @return {string} User language
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
     * @return {Doc} Picture data URL
     * @function
     */
    getPictureURL: () => Doc;
    /**
     * Has responsibility
     * @param {string} group Group name
     * @return {boolean} True if user has a responsibility on the specified group
     * @function
     */
    hasResponsibility: (group: string) => boolean;
    /**
     * Get text value
     * @param {string} code Text code
     * @return {string} Text value
     */
    T: (code: string) => string;
}
/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @class
 */
declare class BusinessObject {
    /**
     * Constructor
     * @param {Session} session Session
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     */
    constructor(session: Session, name: string, instance?: string);
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
    item: {};
    /**
     * Current filters
     * @member {object}
     */
    filters: {};
    /**
     * Current list
     * @member {array}
     */
    list: any[];
    /**
     * Current count
     * @member {number}
     */
    count: any;
    /**
     * Current page number
     * @member {number}
     */
    page: any;
    /**
     * Number of pages
     * @member {number}
     */
    maxpage: any;
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
     * @return {string} Field label
     * @function
     */
    getFieldLabel: (field: (string | object)) => string;
    /**
     * Get value of field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string|Doc} Value
     * @function
     */
    getFieldValue: (field: (string | object), item?: object) => string | Doc;
    /**
     * Get the list value of a list of values field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} List value
     * @function
     */
    getFieldListValue: (field: (string | object), item?: object) => string;
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
     * @return {string|Doc} Document/image (or nothing if the field is not of document/image type or if it is empty)
     * @function
     */
    getFieldDocument: (field: (string | object), item?: object) => string | Doc;
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
     * @param {array} list List of values
     * @param {string} code Code
     * @return {string} Value
     * @function
     */
    getListValue: (list: any[], code: string) => string;
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
     * Build options parameters
     * @param {object} options Options
     * @return {string} Option parameters
     * @private
     */
    private getReqOptions;
    /**
     * Build request parameters
     * @param {object} data Data
     * @return {string} Request parameters
     * @private
     */
    private getReqParams;
    /**
     * Get count
     * @param {object} [filters] Filters, defaults to current filters if not set
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the count
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
     * @return {promise<object>} Promise (the <code>item</code> member is emptied)
     * @function
     */
    del: (item: object, opts?: {
        error?: Function;
    }) => any;
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
     * @param {string} ctb Pivot table name
     * @param {object} [opts] Options
     * @param {object} [opts.filters] Filters, by default current filters are used
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the pivot table data (also avialable as the <code>crosstabdata</code> member)
     * @function
     */
    crosstab: (ctb: string, opts?: {
        filters?: object;
        error?: Function;
    }) => any;
    /**
     * Build a custom publication
     * @param {string} prt Publication name
     * @param {string} [rowId] Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<Doc>} A promise to the document of the publication
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
     * @return {string} Object resource URL
     * @function
     */
    getResourceURL: (code: string, type?: string) => string;
}
/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>BusinessObject</code> instances</span>.
 * @class
 */
declare class BusinessObjectMetadata {
    /**
     * Constructor
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     */
    constructor(name: string, instance?: string);
    /**
     * Name
     * @member {string}
     */
    name: string;
    /**
     * Instance name
     * @member {string}
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
    /**
     * ID
     * @member {string}
     */
    id: any;
    /**
     * Links definitions
     * @member {array}
     */
    links: any;
}
/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getExternalObject</code></span>.
 * @class
 */
declare class ExternalObject {
    /**
     * Constructor
     * @param {Session} session Session
     * @param {string} name Business object name
     */
    constructor(session: Session, name: string);
    /**
     * Session
     * @member {Session}
     * @private
     */
    private session;
    /**
     * Metadata
     * @member {ExternalObjectMetadata}
     */
    metadata: ExternalObjectMetadata;
    /**
     * Path
     * @member {string}
     * @parivate
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
     * @return {string} URL-encoded parameters
     * @function
     */
    callParams: (params: object) => string;
    /**
     * Call an external object
     * @param {object} [params] Optional URL parameters
     * @param {object} [data] Optional data (for 'POST' and 'PUT' methods only)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {object} [opts.method] Optional method 'GET', 'POST', 'PUT' or 'DELETE' (defaults to 'GET' if data is not set or 'POST' if data is set
     * @param {function} [opts.contentType] Optional data content type (for 'POST' and 'PUT' methods only)
     * @return {promise<object>} Promise to the external object content
     * @function
     */
    call: (params?: object, data?: object, opts?: {
        error?: Function;
        method?: object;
        contentType?: Function;
    }) => any;
    /**
     * Alias to <code>call</code>
     * @function
     */
    invoke: (params?: object, data?: object, opts?: {
        error?: Function;
        method?: object;
        contentType?: Function;
    }) => any;
}
/**
 * External object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>ExternalObject</code> instances</span>.
 * @class
 */
declare class ExternalObjectMetadata {
    /**
     * Constructor
     * @param {string} name External object name
     */
    constructor(name: string);
    /**
     * Name
     * @member {string}
     */
    name: string;
}
