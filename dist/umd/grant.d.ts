import { Doc } from './doc';
/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instantiate this class directly
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
    picture?: Doc;
    /**
     * User responsibilities
     * @member {array}
     */
    responsibilities?: string[];
    /**
     * User home scopes
     * @member {array}
     */
    apps?: any[];
    /**
     * Translated texts
     * @member {object}
     */
    texts?: Map<string, string>;
    /**
     * System parameters
     * @member {object}
     */
    sysparams?: Map<string, string>;
    /**
     * Get user ID
     * @return {string} User ID
     * @function
     */
    getUserId(): string;
    /**
     * Get username
     * @return {string} Username
     * @function
     */
    getUsername(): string;
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
    getLang(): string;
    /**
     * Get email address
     * @return {string} Email address
     * @function
     */
    getEmail(): string;
    /**
     * Get first name
     * @return {string} First name
     * @function
     */
    getFirstname(): string;
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
    getLastname(): string;
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
    getPictureURL(): string;
    /**
     * Has responsibility?
     * @param {string} group Group name
     * @return {boolean} True if user has a responsibility on the specified group
     * @function
     */
    hasResponsibility(group: string): boolean;
    /**
     * Has home scope?
     * @param {string} home Home scope name
     * @return {boolean} True if user has the specified home scope
     * @function
     */
    hasScope(home: string): boolean;
    /**
     * Get system parameter value
     * @param {string} name System parameter name
     * @return {string} System parameter value
     * @function
     */
    getSystemParameter(name: string): string;
    /**
     * Alias to <code>getSystemParameter</code>
     * @param {string} name System parameter name
     * @return {string} System parameter value
     * @function
     */
    getSysParam: (name: string) => string;
    /**
     * Get text value
     * @param {string} code Text code
     * @return {string} Text value
     */
    T(code: string): string;
}
export { Grant };
