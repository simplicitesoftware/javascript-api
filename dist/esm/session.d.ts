import { SessionParamEndpoint, SessionParams } from './sessionparams';
import { Grant } from './grant';
/**
 * Simplicite application session.
 * @param {object} params Parameters
 * @param {string} params.url Base URL of the Simplicite application
 * @param {string} params.scheme URL scheme (e.g. <code>'https'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.host Hostname or IP address (e.g. <code>'host.mydomain.com'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {number} params.port Port (e.g. <code>443</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.root Root context URL (e.g. <code>'/myapp'</code>) the Simplicite application (not needed if <code>url</code> is set)
 * @param {boolean} [params.endpoint='api'] Endpoint (<code>'api'|'ui'|'uipublic'</code>)
 * @param {string} [params.username] Username (not needed for the public UI endpoint)
 * @param {string} [params.password] Password (not needed for the public UI endpoint)
 * @param {string} [params.authtoken] Authentication token (if set, username and password are not needed; not needed for the public UI endpoint)
 * @param {string} [params.authheader] Authorization HTTP header name (defaults to the standard <code>Authorization</code>, the alternative is the value of the <code>SIMPLICITE_AUTH_HEADER</code> constant, not needed for public endpoint)
 * @param {string} [params.ajaxkey] Ajax key (only useful for usage from the generic UI)
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
        MODULE_VERSION: string;
        DEFAULT_ROW_ID_NAME: string;
        DEFAULT_ROW_ID: string;
        CONTEXT_NONE: number;
        CONTEXT_SEARCH: number;
        CONTEXT_LIST: number;
        CONTEXT_CREATE: number;
        CONTEXT_COPY: number;
        CONTEXT_UPDATE: number;
        CONTEXT_DELETE: number;
        CONTEXT_GRAPH: number;
        CONTEXT_CROSSTAB: number;
        CONTEXT_PRINTTMPL: number;
        CONTEXT_UPDATEALL: number;
        CONTEXT_REFSELECT: number;
        CONTEXT_DATAMAPSELECT: number;
        CONTEXT_PREVALIDATE: number;
        CONTEXT_POSTVALIDATE: number;
        CONTEXT_STATETRANSITION: number;
        CONTEXT_EXPORT: number;
        CONTEXT_IMPORT: number;
        CONTEXT_ASSOCIATE: number;
        CONTEXT_PANELLIST: number;
        CONTEXT_ACTION: number;
        CONTEXT_AGENDA: number;
        CONTEXT_PLACEMAP: number;
        TYPE_ID: number;
        TYPE_INT: number;
        TYPE_FLOAT: number;
        TYPE_STRING: number;
        TYPE_DATE: number;
        TYPE_DATETIME: number;
        TYPE_TIME: number;
        TYPE_ENUM: number;
        TYPE_BOOLEAN: number;
        TYPE_PASSWORD: number;
        TYPE_URL: number;
        TYPE_HTML: number;
        TYPE_EMAIL: number;
        TYPE_LONG_STRING: number;
        TYPE_ENUM_MULTI: number;
        TYPE_REGEXP: number;
        TYPE_DOC: number;
        TYPE_FLOAT_EMPTY: number;
        TYPE_EXTFILE: number;
        TYPE_IMAGE: number;
        TYPE_NOTEPAD: number;
        TYPE_PHONENUM: number;
        TYPE_COLOR: number;
        TYPE_OBJECT: number;
        TYPE_GEOCOORDS: number;
        TYPE_BIGDECIMAL: number;
        TYPES: string[];
        VIS_NOT: number;
        VIS_HIDDEN: number;
        VIS_LIST: number;
        VIS_FORM: number;
        VIS_BOTH: number;
        SEARCH_NONE: number;
        SEARCH_MONO: number;
        SEARCH_MULTI_CHECK: number;
        SEARCH_MULTI_LIST: number;
        SEARCH_PERIOD: number;
        TRUE: string;
        FALSE: string;
        ERRLEVEL_FATAL: number;
        ERRLEVEL_ERROR: number;
        ERRLEVEL_WARNING: number;
        RESOURCE_TYPE_IMAGE: string;
        RESOURCE_TYPE_ICON: string;
        RESOURCE_TYPE_STYLESHEET: string;
        RESOURCE_TYPE_JAVASCRIPT: string;
        DEFAULT_AUTH_HEADER: string;
        SIMPLICITE_AUTH_HEADER: string;
    };
    /**
     * Get API client module version
     * @function
     */
    getModuleVersion(): string;
    /**
     * Endpoint
     * @member {string}
     */
    endpoint: SessionParamEndpoint;
    /**
     * Authorization HTTP header name
     * @member {string}
     */
    authheader: string;
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
    setUsername(usr: string): void;
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
    setPassword(pwd: string): void;
    /**
     * Auth token
     * @member {string}
     */
    authtoken: string;
    /**
     * Auth token expiry date
     * @member {Date}
     */
    authtokenexpiry: Date;
    /**
     * Ajax key
     * @member {string}
     */
    ajaxkey: string;
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
    setAuthToken(token: string): void;
    /**
     * Set auth token expiry date
     * @param {Date} expiry Auth token expiry
     * @function
     */
    setAuthTokenExpiryDate(expiry: Date): void;
    /**
     * Is the auth token expired?
     * @return {boolean} true if the auth token is expired
     * @function
     */
    isAuthTokenExpired(): boolean;
    /**
     * Set Ajax key
     * @param {string} key Ajax key
     * @function
     */
    setAjaxKey(key: string): void;
    /**
     * Business objects cache
     * @member {object}
     * @private
     */
    private businessObjectCache;
    /**
     * Get business object cache key
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {object} Business object cache key
     * @function
     */
    getBusinessObjectCacheKey(name: string, instance?: string): any;
    /**
     * Clears all data (credentials, objects, ...)
     * @function
     */
    clear(): void;
    /**
     * Basic HTTP authorization header value
     * @return {string} HTTP authorization header value
     * @function
     */
    getBasicAuthHeader(): string;
    /**
     * Get bearer token header value
     * @return {string} Bearer token header value
     * @function
     */
    getBearerTokenHeader(): string;
    /**
     * Get error object
     * @param {(string|object)} err Error
     * @param {string} err.message Error message
     * @param {number} [status] Optional error status (defaults to 200)
     * @param {string} [origin] Optional error origin
     * @return {object} Error object
     * @function
     */
    getError(err: string | any, status?: number, origin?: string): any;
    /**
     * Compress data as blob
     * @param data {string|any} Data to compress
     * @return {Promise<Blob>} Promise to the compressed data blob
     */
    compressData(data: string | any): Promise<Blob>;
    /**
     * Uncompress blob
     * @param blob {Blob} Compressed data blob
     * @return {Promise<string>} Promise to the uncompressed string
     */
    uncompressData(blob: Blob): Promise<string>;
    /**
     * Send request
     * @param {string} path Path
     * @param {object} [data] Data
     * @param {function} [callback] Callback
     * @param {function} [errorHandler] Error handler
     * @function
     */
    sendRequest(path: string, data?: any, callback?: (testData: string, status: number, headers: any) => void, errorHandler?: (err: any) => void): void;
    /**
     * Parse response
     * @param {object} res Response to parse
     * @param {number} [status=200] HTTP status
     * @return {object} Error object
     * @function
     */
    parseResponse(res: any, status?: number): any;
    /**
     * Get health check (no need to be authenticated)
     * @param {object} [opts] Options
     * @param {boolean} [opts.full=false] Full health check?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the health data
     * @function
     */
    getHealth(opts?: any): Promise<any>;
    /**
     * Alias to getHealth
     * @param {object} [opts] Options
     * @param {boolean} [opts.full=false] Full health check?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the health data
     * @function
     */
    health: (opts?: any) => Promise<any>;
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
    login(opts?: any): Promise<any>;
    /**
     * Logout
     * @param {function} callback Callback (called upon success)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the logout result
     * @function
     */
    logout(opts?: any): Promise<any>;
    /**
     * Grant
     * @member {Grant}
     */
    grant: Grant;
    /**
     * Get path
     * @param {string} action Action
     * @param {object} [opts] Options
     * @param {string} [opts.businessCase] Business case label
     */
    private getPath;
    /**
     * Get grant (current user data)
     * @param {object} [opts] Options
     * @param {boolean} [opts.inlinePicture=false] Inline user picture?
     * @param {boolean} [opts.includeTexts=false] Include texts?
     * @param {boolean} [opts.includeSysparams=false] Include system parameters?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<Grant>} A promise to the grant (also available as the <code>grant</code> member)
     * @function
     */
    getGrant(opts?: any): Promise<any>;
    /**
     * Change password
     * @param {string} pwd Password
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the change password result
     * @function
     */
    changePassword(pwd: string, opts?: any): Promise<any>;
    /**
     * Application info
     * @member {object}
     */
    appinfo: any;
    /**
     * Get application info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the application info (also available as the <code>appinfo</code> member)
     * @function
     */
    getAppInfo(opts?: any): Promise<any>;
    /**
     * System info
     * @member {object}
     */
    sysinfo: any;
    /**
     * Get system info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the system info (also available as the <code>sysinfo</code> member)
     * @function
     */
    getSysInfo(opts?: any): Promise<any>;
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
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the development info (also available as the <code>devinfo</code> member)
     * @function
     */
    getDevInfo(module?: string, opts?: any): Promise<any>;
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
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<array>} A promise to the list of news (also available as the <code>news</code> member)
     * @function
     */
    getNews(opts?: any): Promise<any[]>;
    /**
     * Index search
     * @param {string} query Index search query
     * @param {string} [object] Object
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Add meta data for each result
     * @param {number} [opts.context] Context
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<array>} A promise to a list of index search records
     * @function
     */
    indexSearch(query: string, object?: string, opts?: any): Promise<any[]>;
    /**
     * Get business object
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {BusinessObject} Business object
     * @function
     */
    getBusinessObject(name: string, instance?: string): any;
    /**
     * Get an external object
     * @param {string} name External object name
     * @function
     */
    getExternalObject(name: string): any;
    /**
     * Get a resource URL
     * @param {string} code Resource code
     * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
     * @param {string} [object] Object name (not required for global resources)
     * @param {string} [objId] Object ID (not required for global resources)
     * @function
     */
    getResourceURL(code: string, type?: string, object?: any, objId?: string): string;
}
export { Session };
