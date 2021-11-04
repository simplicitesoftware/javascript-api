/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 2.2.2
 * @license Apache-2.0
 */
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
 * @param {object} params Parameters (see session class for details)
 * @return {Session} session
*/
declare function session(params: any): any;
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
declare function Session(params: SessionParams): void;
/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
declare function Grant(): void;
/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>BusinessObject</code> instances</span>.
 * @param {string} name Business object name
 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
 * @class
 */
declare function BusinessObjectMetadata(name: string, instance: string): void;
/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @param {object} ses Session
 * @param {string} name Business object name
 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
 * @class
 */
declare function BusinessObject(ses: any, name: string, instance: string): void;
/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getExternalObject</code></span>.
 * @param {object} ses Session
 * @param {string} name Business object name
 * @class
 */
declare function ExternalObject(ses: any, name: string): void;
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
    session: typeof session;
    Session: typeof Session;
    Grant: typeof Grant;
    BusinessObject: typeof BusinessObject;
    BusinessObjectMetadata: typeof BusinessObjectMetadata;
    ExternalObject: typeof ExternalObject;
};
export default _default;
