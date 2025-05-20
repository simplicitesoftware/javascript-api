"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grant = void 0;
/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instantiate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
var Grant = /** @class */ (function () {
    /**
     * Constructor
     * @param grant {object} Grant object
     */
    function Grant(grant) {
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
    Grant.prototype.getUserId = function () {
        return this.userid;
    };
    /**
     * Get username
     * @return {string} Username
     * @function
     */
    Grant.prototype.getUsername = function () {
        return this.login;
    };
    /**
     * Get user language
     * @return {string} User language
     * @function
     */
    Grant.prototype.getLang = function () {
        return this.lang;
    };
    /**
     * Get email address
     * @return {string} Email address
     * @function
     */
    Grant.prototype.getEmail = function () {
        return this.email;
    };
    /**
     * Get first name
     * @return {string} First name
     * @function
     */
    Grant.prototype.getFirstname = function () {
        return this.firstname;
    };
    /**
     * Get last name
     * @return {string} Last name
     * @function
     */
    Grant.prototype.getLastname = function () {
        return this.lastname;
    };
    /**
     * Get picture data URL
     * @return {Doc} Picture data URL
     * @function
     */
    Grant.prototype.getPictureURL = function () {
        if (this.picture)
            return 'data:' + this.picture.mime + ';base64,' + this.picture.content;
    };
    /**
     * Has responsibility?
     * @param {string} group Group name
     * @return {boolean} True if user has a responsibility on the specified group
     * @function
     */
    Grant.prototype.hasResponsibility = function (group) {
        return this.responsibilities && this.responsibilities.indexOf(group) !== -1;
    };
    /**
     * Has home scope?
     * @param {string} home Home scope name
     * @return {boolean} True if user has the specified home scope
     * @function
     */
    Grant.prototype.hasScope = function (home) {
        if (this.apps)
            for (var _i = 0, _a = this.apps; _i < _a.length; _i++) {
                var app = _a[_i];
                if (app.home === home)
                    return true;
            }
        return false;
    };
    /**
     * Get system parameter value
     * @param {string} name System parameter name
     * @return {string} System parameter value
     * @function
     */
    Grant.prototype.getSystemParameter = function (name) {
        return this.sysparams ? this.sysparams[name] || '' : '';
    };
    /**
     * Get text value
     * @param {string} code Text code
     * @return {string} Text value
     */
    Grant.prototype.T = function (code) {
        return this.texts ? this.texts[code] || '' : '';
    };
    return Grant;
}());
exports.Grant = Grant;
//# sourceMappingURL=grant.js.map