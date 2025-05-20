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
         * Alias to <code>getUsername</code>
         * @return {string} Login
         * @function
         */
        this.getLogin = this.getUsername;
        /**
         * Alias to <code>getFirstname</code>
         * @return {string} First name
         * @function
         */
        this.getFirstName = this.getFirstname;
        /**
         * Alias to <code>getLastname</code>
         * @return {string} Last name
         * @function
         */
        this.getLastName = this.getLastname;
        /**
         * Alias to <code>getSystemParameter</code>
         * @param {string} name System parameter name
         * @return {string} System parameter value
         * @function
         */
        this.getSysParam = this.getSystemParameter;
        Object.assign(this, grant);
    }
    /**
     * Get user ID
     * @return {string} User ID
     * @function
     */
    getUserId() {
        return this.userid;
    }
    /**
     * Get username
     * @return {string} Username
     * @function
     */
    getUsername() {
        return this.login;
    }
    /**
     * Get user language
     * @return {string} User language
     * @function
     */
    getLang() {
        return this.lang;
    }
    /**
     * Get email address
     * @return {string} Email address
     * @function
     */
    getEmail() {
        return this.email;
    }
    /**
     * Get first name
     * @return {string} First name
     * @function
     */
    getFirstname() {
        return this.firstname;
    }
    /**
     * Get last name
     * @return {string} Last name
     * @function
     */
    getLastname() {
        return this.lastname;
    }
    /**
     * Get picture data URL
     * @return {Doc} Picture data URL
     * @function
     */
    getPictureURL() {
        if (this.picture)
            return 'data:' + this.picture.mime + ';base64,' + this.picture.content;
    }
    /**
     * Has responsibility?
     * @param {string} group Group name
     * @return {boolean} True if user has a responsibility on the specified group
     * @function
     */
    hasResponsibility(group) {
        return this.responsibilities && this.responsibilities.indexOf(group) !== -1;
    }
    /**
     * Has home scope?
     * @param {string} home Home scope name
     * @return {boolean} True if user has the specified home scope
     * @function
     */
    hasScope(home) {
        if (this.apps)
            for (const app of this.apps)
                if (app.home === home)
                    return true;
        return false;
    }
    /**
     * Get system parameter value
     * @param {string} name System parameter name
     * @return {string} System parameter value
     * @function
     */
    getSystemParameter(name) {
        return this.sysparams ? this.sysparams[name] || '' : '';
    }
    /**
     * Get text value
     * @param {string} code Text code
     * @return {string} Text value
     */
    T(code) {
        return this.texts ? this.texts[code] || '' : '';
    }
}
export { Grant };
//# sourceMappingURL=grant.js.map