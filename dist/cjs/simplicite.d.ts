/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 2.2.9
 * @license Apache-2.0
 */
/// <reference types="node" />
import { Buffer } from 'buffer';
/**
 * Session parameters endpoints
 */
declare const enum SessionParamEndpoint {
    /**
     * API endpoint
     */
    API = "api",
    /**
     * UI endpoint
     */
    UI = "ui",
    /**
     * Public UI endpoint
     */
    PUBLIC = "public"
}
/**
 * Session parameters
 * @type
 */
declare type SessionParams = {
    /**
     * URL
     * @constant {string}
     */
    url?: string;
    /**
     * Scheme
     * @constant {string}
     */
    scheme?: string;
    /**
     * Hostname or IP address
     * @constant {string}
     */
    host?: string;
    /**
     * Port
     * @constant {number}
     */
    port?: number;
    /**
     * Root
     * @constant {string}
     */
    root?: string;
    /**
     * Endpoint
     * @constant {SessionParamEndpoint}
     */
    endpoint?: SessionParamEndpoint;
    /**
     * Username
     * @constant {string}
     */
    username?: string;
    /**
     * Alias to username
     * @constant {string}
     */
    login?: string;
    /**
     * Password
     * @constant {string}
     */
    password?: string;
    /**
     * Alias to password
     * @constant {string}
     */
    pwd?: string;
    /**
     * Authentication token
     * @constant {string}
     */
    authtoken?: string;
    /**
     * Alias to authentication token
     * @constant {string}
     */
    token?: string;
    /**
     * Timeout (s)
     * @constant {number}
     */
    timeout?: number;
    /**
     * Debug?
     * @constant {boolean}
     */
    debug?: boolean;
    /**
     * Log handler
     * @constant {function}
     */
    logHandler?: (...args: any[]) => any;
    /**
     * Debug handler
     * @constant {function}
     */
    debugHandler?: (...args: any[]) => any;
    /**
     * Info handler
     * @constant {function}
     */
    infoHandler?: (...args: any[]) => any;
    /**
     * Warning handler
     * @constant {function}
     */
    warningHandler?: (...args: any[]) => any;
    /**
     * Error handler
     * @constant {function}
     */
    errorHandler?: (...args: any[]) => any;
};
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
    constructor(params: SessionParams);
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
     * Endpoint
     * @member {string}
     */
    endpoint: SessionParamEndpoint;
    /**
     * Log handler
     * @param {...any} args Arguments
     * @function
     */
    log: (...args: any[]) => any;
    /**
     * Info handler
     * @param {...any} args Arguments
     * @function
     */
    info: (...args: any[]) => any;
    /**
     * Warning handler
     * @param {...any} args Arguments
     * @function
     */
    warn: (...args: any[]) => any;
    /**
     * Error handler
     * @param {...any} args Arguments
     * @function
     */
    error: (...args: any[]) => any;
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
    debug: (...args: any[]) => any;
    /**
     * Parameters
     * @member {object}
     */
    parameters: any;
    /**
     * Username
     * @member {string}
     */
    username: string;
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
    password: string;
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
    authtoken: string;
    /**
     * Session ID
     * @member {string}
     */
    sessionid: string;
    /**
     * Set auth token
     * @param {string} token Auth token
     * @function
     */
    setAuthToken: (token: string) => void;
    /**
     * Business objects cache
     * @member {object}
     * @private
     */
    businessObjectCache: Map<string, BusinessObject>;
    /**
     * Get business object cache key
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {object} Business object cache key
     * @private
     */
    getBusinessObjectCacheKey: (name: string, instance?: string) => any;
    /**
     * Clears all data (credentials, objects, ...)
     * @function
     */
    clear: () => void;
    /**
     * Basic HTTP authorization header value
     * @return {string} HTTP authorization header value
     * @private
     */
    getBasicAuthHeader: () => string;
    /**
     * Get bearer token header value
     * @return {string} Bearer token header value
     * @private
     */
    getBearerTokenHeader: () => string;
    /**
     * Get error object
     * @param {(string|object)} err Error
     * @param {string} err.message Error message
     * @param {number} [status] Optional error status (defaults to 200)
     * @param {string} [origin] Optional error origin
     * @return {object} Error object
     * @private
     */
    getError: (err: string | any, status?: number, origin?: string) => any;
    /**
     * Request
     * @param {string} path Path
     * @param {object} [data] Data
     * @param {function} [callback] Callback
     * @param {function} [errorHandler] Error handler
     * @private
     */
    req: (path: string, data?: any, callback?: (testData: string, status: number, headers: any) => void, errorHandler?: (err: any) => void) => void;
    /**
     * Parse result
     * @param {object} res Response to parse
     * @param {number} [status=200] HTTP status
     * @return {object} Error object
     * @private
     */
    parse: (res: any, status?: number) => any;
    /**
     * Get health check (no need to be authenticated)
     * @param {object} [opts] Options
     * @param {boolean} [opts.full=false] Full health check?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the health data
     * @function
     */
    getHealth: (opts?: any) => Promise<any>;
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
    login: (opts?: any) => Promise<any>;
    /**
     * Logout
     * @param {function} callback Callback (called upon success)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the logout result
     * @function
     */
    logout: (opts?: any) => Promise<any>;
    /**
     * Grant
     * @member {Grant}
     */
    grant: Grant;
    /**
     * Get grant (current user data)
     * @param {object} [opts] Options
     * @param {boolean} [opts.inlinePicture=false] Inline user picture?
     * @param {boolean} [opts.includeTexts=false] Include texts?
     * @param {function} [opts.error] Error handler function
     * @return {promise<Grant>} A promise to the grant (also available as the <code>grant</code> member)
     * @function
     */
    getGrant: (opts?: any) => Promise<any>;
    /**
     * Change password
     * @param {string} pwd Password
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the change password result
     * @function
     */
    changePassword: (pwd: string, opts?: any) => Promise<any>;
    /**
     * Application info
     * @member {object}
     */
    appinfo: any;
    /**
     * Get application info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the application info (also avialable as the <code>appinfo</code> member)
     * @function
     */
    getAppInfo: (opts?: any) => Promise<any>;
    /**
     * System info
     * @member {object}
     */
    sysinfo: any;
    /**
     * Get system info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the system info (also avialable as the <code>sysinfo</code> member)
     * @function
     */
    getSysInfo: (opts?: any) => Promise<any>;
    /**
     * Development info
     * @member {object}
     */
    devinfo: any;
    /**
     * Get development info
     * @param {string} [module] Module name
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the develoment info (also avialable as the <code>devinfo</code> member)
     * @function
     */
    getDevInfo: (module?: string, opts?: any) => Promise<any>;
    /**
     * News
     * @member {array}
     */
    news: any[];
    /**
     * Get news
     * @param {object} [opts] Options
     * @param {boolean} [opts.inlineImages=false] Inline news images?
     * @param {function} [opts.error] Error handler function
     * @return {promise<array>} A promise to the list of news (also avialable as the <code>news</code> member)
     * @function
     */
    getNews: (opts?: any) => Promise<any[]>;
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
    indexSearch: (query: string, object?: string, opts?: any) => Promise<any[]>;
    /**
     * Get business object
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {BusinessObject} Business object
     * @function
     */
    getBusinessObject: (name: string, instance?: string) => any;
    /**
     * Get an external object
     * @param {string} name External object name
     * @function
     */
    getExternalObject: (name: string) => any;
    /**
     * Get a resource URL
     * @param {string} code Resource code
     * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
     * @param {string} [object] Object name (not required for global resources)
     * @param {string} [objId] Object ID (not required for global resources)
     * @function
     */
    getResourceURL: (code: string, type?: string, object?: any, objId?: string) => string;
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
    constructor(value: any);
    /**
     * Document ID
     * @member {string}
     */
    id?: string;
    /**
     * Document MIME type
     * @member {string}
     */
    mime?: string;
    /**
     * Document file name
     * @member {string}
     */
    filename?: string;
    /**
     * Document content as base 64
     * @member {string}
     */
    content?: string;
    /**
     * Document thumbnail as base 64
     * @member {string}
     */
    thumbnail?: string;
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
    getBuffer(data: any): Buffer;
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
    getValue: () => any;
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
    constructor(grant: any);
    /**
     * User ID
     * @member {string}
     */
    userid: string;
    /**
     * User name
     * @member {string}
     */
    login: string;
    /**
     * User language
     * @member {string}
     */
    lang: string;
    /**
     * User email address
     * @member {string}
     */
    email: string;
    /**
     * User first name
     * @member {string}
     */
    firstname: string;
    /**
     * User last name
     * @member {string}
     */
    lastname: string;
    /**
     * User picture
     * @member {Doc}
     */
    picture: Doc;
    /**
     * User responsibilities
     * @member {array}
     */
    responsibilities: string[];
    /**
     * Translated texts
     * @member {object}
     */
    texts: Map<string, string>;
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
    getPictureURL: () => string;
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
     * ID
     * @member {string}
     */
    id: string;
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
     * Links definitions
     * @member {array}
     */
    links: any[];
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
    session: Session;
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
    cacheKey: string;
    /**
     * Path
     * @constant {string}
     * @private
     */
    path: string;
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
     * @return {promise<BusinessObjectMetadata>} A promise to the object'ts meta data (also available as the <code>metadata</code> member)
     * @function
     */
    getMetaData: (opts?: any) => any;
    /**
     * Get meta data (alias to getMetaData)
     * @function
     */
    getMetadata: (opts?: any) => any;
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
    getField: (fieldName: string) => any;
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
    getRowIdField: () => any;
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
    getFieldType: (field: string | any) => string;
    /**
     * Get field label
     * @param {(string|object)} field Field name or definition
     * @return {string} Field label
     * @function
     */
    getFieldLabel: (field: string | any) => string;
    /**
     * Get value of field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string|Doc} Value
     * @function
     */
    getFieldValue: (field: string | any, item?: any) => string | any;
    /**
     * Get the list value of a list of values field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} List value
     * @function
     */
    getFieldListValue: (field: string | any, item?: any) => string;
    /**
     * Get the data URL of an inlined document/image field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} Document/image field data URL (or nothing if the field is not of document/image type or if it is not inlined or if it is empty)
     * @function
     */
    getFieldDataURL: (field: string | any, item?: any) => string;
    /**
     * Get the field's value as document/image for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string|Doc} Document/image (or nothing if the field is not of document/image type or if it is empty)
     * @function
     */
    getFieldDocument: (field: string | any, item?: any) => any;
    /**
     * Get the URL of a document/image field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @param {boolean} [thumbnail=false] Thumbnail?
     * @return {string} Document/image field URL (or nothing if the field is not of document/image type or if it is empty)
     * @function
     */
    getFieldDocumentURL: (field: string | any, item?: any, thumbnail?: boolean) => string;
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
    setFieldValue: (field: string | any, value: string | any, item?: any) => void;
    /**
     * Is the field the row ID field?
     * @param {object} field Field definition
     * @return {boolean} True if the field is the row ID field
     * @function
     */
    isRowIdField: (field: any) => boolean;
    /**
     * Is the field a timestamp field?
     * @param {object} field Field definition
     * @return {boolean} True if the field is a timestamp field
     * @function
     */
    isTimestampField: (field: any) => boolean;
    /**
     * Get current filters
     * @param {object} [opts] Options
     * @param {number} [opts.context] Context
     * @param {boolean} [opts.reset] Reset filters?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the object's filters (also available as the <code>filters</code> member)
     * @function
     */
    getFilters: (opts?: any) => Promise<any>;
    /**
     * Build options parameters
     * @param {object} options Options
     * @return {string} Option parameters
     * @private
     */
    getReqOptions: (options: any) => string;
    /**
     * Build request parameters
     * @param {object} data Data
     * @return {string} Request parameters
     * @private
     */
    getReqParams: (data: any) => string;
    /**
     * Get count
     * @param {object} [filters] Filters, defaults to current filters if not set
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the count
     * @function
     */
    getCount: (filters?: any, opts?: any) => Promise<any>;
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
    search: (filters?: any, opts?: any) => Promise<any[]>;
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
    get: (rowId: string, opts?: any) => Promise<any>;
    /**
     * Get for create
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
     * @function
     */
    getForCreate: (opts?: any) => Promise<any>;
    /**
     * Get for update
     * @param {string} rowId Row ID
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the record to update (also available as the <code>item</code> member)
     * @function
     */
    getForUpdate: (rowId: string, opts?: any) => Promise<any>;
    /**
     * Get for copy
     * @param {string} rowId Row ID to copy
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
     * @function
     */
    getForCopy: (rowId: string, opts?: any) => Promise<any>;
    /**
     * Get for delete
     * @param {string} rowId Row ID
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the record to delete (also available as the <code>item</code> member)
     * @function
     */
    getForDelete: (rowId: string, opts?: any) => Promise<any>;
    /**
     * Get specified or current item's row ID value
     * @param {object} [item] Item, defaults to current item
     * @return {string} Item's row ID value
     * @function
     */
    getRowId: (item: any) => string;
    /**
     * Populate
     * @param {string} rowId Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
     * @function
     */
    populate: (rowId: string, opts?: any) => Promise<any>;
    /**
     * Save (create or update depending on item row ID value)
     * @param {object} item Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the saved record (also available as the <code>item</code> member)
     * @function
     */
    save: (item: any, opts?: any) => Promise<any>;
    /**
     * Create (create or update)
     * @param {object} item Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
     * @function
     */
    create: (item: any, opts?: any) => Promise<any>;
    /**
     * Update
     * @param {object} item Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the updated record (also available as the <code>item</code> member)
     * @function
     */
    update: (item: any, opts?: any) => Promise<any>;
    /**
     * Delete
     * @param {object} item Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise (the <code>item</code> member is emptied)
     * @function
     */
    del: (item: any, opts?: any) => Promise<any>;
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
    action: (action: string, rowId?: string, opts?: any) => Promise<string | any>;
    /**
     * Build a pivot table
     * @param {string} ctb Pivot table name
     * @param {object} [opts] Options
     * @param {object} [opts.filters] Filters, by default current filters are used
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} A promise to the pivot table data (also avialable as the <code>crosstabdata</code> member)
     * @function
     */
    crosstab: (ctb: string, opts?: any) => Promise<any>;
    /**
     * Build a custom publication
     * @param {string} prt Publication name
     * @param {string} [rowId] Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<Doc>} A promise to the document of the publication
     * @function
     */
    print: (prt: string, rowId?: string, opts?: any) => Promise<any>;
    /**
     * Set an object parameter
     * @param {string} param Parameter name
     * @param {string} value Parameter value
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise
     * @function
     */
    setParameter: (param: string, value: string, opts?: any) => Promise<any>;
    /**
     * Get an object parameter
     * @param {string} param Parameter name
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the parameter value
     * @function
     */
    getParameter: (param: string, opts?: any) => Promise<any>;
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
/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getExternalObject</code></span>.
 * @class
 */
declare class ExternalObject {
    /**
     * Constructor
     * @param {Session} ses Session
     * @param {string} name Business object name
     */
    constructor(ses: Session, name: string);
    /**
     * Session
     * @member {Session}
     * @private
     */
    session: Session;
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
    callParams: (params: any) => string;
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
    call: (params?: any, data?: any, opts?: any) => Promise<unknown>;
    /**
     * Alias to <code>call</code>
     * @function
     */
    invoke: (params?: any, data?: any, opts?: any) => Promise<unknown>;
}
declare const _default: {
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
    session: (params: SessionParams) => Session;
    Session: typeof Session;
    Doc: typeof Doc;
    Grant: typeof Grant;
    BusinessObject: typeof BusinessObject;
    BusinessObjectMetadata: typeof BusinessObjectMetadata;
    ExternalObject: typeof ExternalObject;
};
export default _default;