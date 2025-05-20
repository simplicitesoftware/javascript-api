import { Doc } from './doc';

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
	constructor(grant: any) {
		Object.assign(this, grant);
	}

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
	picture: Doc;

	/**
	 * User responsibilities
	 * @member {array}
	 */
	responsibilities: string[];

	/**
	 * Translated texts
	 * @member {object}
	 */
	texts: Map<string, string>;

	/**
	 * System parameters
	 * @member {object}
	 */
	sysparams: Map<string, string>;

	/**
	 * Get user ID
	 * @return {string} User ID
	 * @function
	 */
	getUserId = (): string => {
		return this.userid;
	};

	/**
	 * Get username
	 * @return {string} Username
	 * @function
	 */
	getUsername = (): string => {
		return this.login;
	};

	/**
	 * Alias to <code>getUsername</code>
	 * @return {string} Login
	 * @function
	 */
	getLogin = this.getUsername; // Naming flexibility

	/**
	 * Get user language
	 * @return {string} User language
	 * @function
	 */
	getLang = (): string => {
		return this.lang;
	};

	/**
	 * Get email address
	 * @return {string} Email address
	 * @function
	 */
	getEmail = (): string => {
		return this.email;
	};

	/**
	 * Get first name
	 * @return {string} First name
	 * @function
	 */
	getFirstname = (): string => {
		return this.firstname;
	};

	/**
	 * Alias to <code>getFirstname</code>
	 * @return {string} First name
	 * @function
	 */
	getFirstName = this.getFirstname; // Naming flexibility

	/**
	 * Get last name
	 * @return {string} Last name
	 * @function
	 */
	getLastname = (): string => {
		return this.lastname;
	};

	/**
	 * Alias to <code>getLastname</code>
	 * @return {string} Last name
	 * @function
	 */
	getLastName = this.getLastname; // Naming flexibility

	/**
	 * Get picture data URL
	 * @return {Doc} Picture data URL
	 * @function
	 */
	getPictureURL = (): string => {
		if (this.picture)
			return 'data:' + this.picture.mime + ';base64,' + this.picture.content;
	};

	/**
	 * Has responsibility
	 * @param {string} group Group name
	 * @return {boolean} True if user has a responsibility on the specified group
	 * @function
	 */
	hasResponsibility = (group: string): boolean => {
		return this.responsibilities && this.responsibilities.indexOf(group) !== -1;
	};

	/**
	 * Get system parameter value
	 * @param {string} name System parameter name
	 * @return {string} System parameter value
	 * @function
	 */
	getSystemParameter = (name: string): string => {
		return this.sysparams ? this.sysparams[name] || '' : '';
	};

	/**
	 * Alias to <code>getSystemParameter</code>
	 * @param {string} name System parameter name
	 * @return {string} System parameter value
	 * @function
	 */
	getSysParam = this.getSystemParameter;

	/**
	 * Get text value
	 * @param {string} code Text code
	 * @return {string} Text value
	 */
	T = (code: string): string => {
		return this.texts ? this.texts[code] || '' : '';
	};
}

export { Grant };