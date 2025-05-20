import { ExternalObjectMetadata } from './externalobjectmetadata';
import { Session } from './session';
/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instantiate this class directly
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
    private session;
    /**
     * Metadata
     * @member {ExternalObjectMetadata}
     */
    metadata: ExternalObjectMetadata;
    /**
     * Path
     * @member {string}
     * @private
     */
    private path;
    /**
     * Get name
     * @return {string} Name
     * @function
     */
    getName(): string;
    /**
     * Build URL-encoded parameters
     * @param {object} params URL parameters as key/value pairs
     * @return {string} URL-encoded parameters
     * @function
     */
    callParams(params: any): string;
    /**
     * Call an external object
     * @param {object} [params] Optional URL parameters
     * @param {object|string|FormData} [data] Optional body data (for 'POST' and 'PUT' methods only)
     * @param {object} [opts] Options
     * @param {string} [opts.path] Absolute or relative path (e.g. absolute '/my/mapped/path' or relative 'my/additional/path')
     * @param {object} [opts.method] Optional method 'GET', 'POST', 'PUT' or 'DELETE' (defaults to 'GET' if data is not set or 'POST' if data is set)
     * @param {function} [opts.contentType] Optional data content type (for 'POST' and 'PUT' methods only)
     * @param {function} [opts.accept] Optional accepted response type (e.g. 'application/json")
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the external object content
     * @function
     */
    call(params?: any, data?: string | FormData | any, opts?: any): Promise<any>;
    /**
     * Alias to <code>call</code>
     * @function
     */
    invoke: (params?: any, data?: string | FormData | any, opts?: any) => Promise<any>;
}
export { ExternalObject };
