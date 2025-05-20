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
        var _this = this;
        /**
         * Get user ID
         * @return {string} User ID
         * @function
         */
        this.getUserId = function () {
            return _this.userid;
        };
        /**
         * Get username
         * @return {string} Username
         * @function
         */
        this.getUsername = function () {
            return _this.login;
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
        this.getLang = function () {
            return _this.lang;
        };
        /**
         * Get email address
         * @return {string} Email address
         * @function
         */
        this.getEmail = function () {
            return _this.email;
        };
        /**
         * Get first name
         * @return {string} First name
         * @function
         */
        this.getFirstname = function () {
            return _this.firstname;
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
        this.getLastname = function () {
            return _this.lastname;
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
        this.getPictureURL = function () {
            if (_this.picture)
                return 'data:' + _this.picture.mime + ';base64,' + _this.picture.content;
        };
        /**
         * Has responsibility
         * @param {string} group Group name
         * @return {boolean} True if user has a responsibility on the specified group
         * @function
         */
        this.hasResponsibility = function (group) {
            return _this.responsibilities && _this.responsibilities.indexOf(group) !== -1;
        };
        /**
         * Get system parameter value
         * @param {string} name System parameter name
         * @return {string} System parameter value
         * @function
         */
        this.getSystemParameter = function (name) {
            return _this.sysparams ? _this.sysparams[name] || '' : '';
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
        this.T = function (code) {
            return _this.texts ? _this.texts[code] || '' : '';
        };
        Object.assign(this, grant);
    }
    return Grant;
}());
exports.Grant = Grant;
//# sourceMappingURL=grant.js.map