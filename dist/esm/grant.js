/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instantiate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
class Grant {
    /**
     * Constructor
     * @param grant {object} Grant object
     */
    constructor(grant) {
        /**
         * Get user ID
         * @return {string} User ID
         * @function
         */
        this.getUserId = () => {
            return this.userid;
        };
        /**
         * Get username
         * @return {string} Username
         * @function
         */
        this.getUsername = () => {
            return this.login;
        };
        /**
         * Alias to <code>getUsername</code>
         * @return {string} Login
         * @function
         */
        this.getLogin = this.getUsername; // Naming flexibility
        /**
         * Get user language
         * @return {string} User language
         * @function
         */
        this.getLang = () => {
            return this.lang;
        };
        /**
         * Get email address
         * @return {string} Email address
         * @function
         */
        this.getEmail = () => {
            return this.email;
        };
        /**
         * Get first name
         * @return {string} First name
         * @function
         */
        this.getFirstname = () => {
            return this.firstname;
        };
        /**
         * Alias to <code>getFirstname</code>
         * @return {string} First name
         * @function
         */
        this.getFirstName = this.getFirstname; // Naming flexibility
        /**
         * Get last name
         * @return {string} Last name
         * @function
         */
        this.getLastname = () => {
            return this.lastname;
        };
        /**
         * Alias to <code>getLastname</code>
         * @return {string} Last name
         * @function
         */
        this.getLastName = this.getLastname; // Naming flexibility
        /**
         * Get picture data URL
         * @return {Doc} Picture data URL
         * @function
         */
        this.getPictureURL = () => {
            if (this.picture)
                return 'data:' + this.picture.mime + ';base64,' + this.picture.content;
        };
        /**
         * Has responsibility
         * @param {string} group Group name
         * @return {boolean} True if user has a responsibility on the specified group
         * @function
         */
        this.hasResponsibility = (group) => {
            return this.responsibilities && this.responsibilities.indexOf(group) !== -1;
        };
        /**
         * Get system parameter value
         * @param {string} name System parameter name
         * @return {string} System parameter value
         * @function
         */
        this.getSystemParameter = (name) => {
            return this.sysparams ? this.sysparams[name] || '' : '';
        };
        /**
         * Alias to <code>getSystemParameter</code>
         * @param {string} name System parameter name
         * @return {string} System parameter value
         * @function
         */
        this.getSysParam = this.getSystemParameter;
        /**
         * Get text value
         * @param {string} code Text code
         * @return {string} Text value
         */
        this.T = (code) => {
            return this.texts ? this.texts[code] || '' : '';
        };
        Object.assign(this, grant);
    }
}
export { Grant };
//# sourceMappingURL=grant.js.map