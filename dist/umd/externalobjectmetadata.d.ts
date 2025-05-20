/**
 * External object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instantiate this class directly
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
export { ExternalObjectMetadata };
