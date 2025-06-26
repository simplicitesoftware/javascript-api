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
    UIPUBLIC = "uipublic"
}
/**
 * Session parameters
 * @type
 */
type SessionParams = {
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
     * Ajax key
     * @constant {string}
     */
    ajaxkey?: string;
    /**
     * Authorization HTTP header name
     * @constant {string}
     */
    authheader?: string;
    /**
     * Timeout (seconds)
     * @constant {number}
     */
    timeout?: number;
    /**
     * Compression?
     * @constant {boolean}
     */
    compress?: boolean;
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
export { SessionParamEndpoint, SessionParams };
