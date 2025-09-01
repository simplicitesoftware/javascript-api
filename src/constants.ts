import { SessionParamEndpoint } from './sessionparams';

/**
 * Constants
 * @constant
 */
const constants = {
	/**
	 * API client module version
	 * @constant {string}
	 */
	MODULE_VERSION: '3.1.5-dev',

	/**
	 * Default row ID field name
	 * @constant {string}
	 */
	DEFAULT_ROW_ID_NAME: 'row_id',

	/**
	 * Default row ID value
	 * @constant {string}
	 */
	DEFAULT_ROW_ID: '0',

	/**
	 * Default context
	 * @constant {number}
	 */
	CONTEXT_NONE: 0,

	/**
	 * Search context
	 * @constant {number}
	 */
	CONTEXT_SEARCH: 1,

	/**
	 * List context
	 * @constant {number}
	 */
	CONTEXT_LIST: 2,

	/**
	 * Creation context
	 * @constant {number}
	 */
	CONTEXT_CREATE: 3,

	/**
	 * Copy context
	 * @constant {number}
	 */
	CONTEXT_COPY: 4,

	/**
	 * Update context
	 * @constant {number}
	 */
	CONTEXT_UPDATE: 5,

	/**
	 * Delete context
	 * @constant {number}
	 */
	CONTEXT_DELETE: 6,

	/**
	 * Chart context
	 * @constant {number}
	 */
	CONTEXT_GRAPH: 7,

	/**
	 * Pivot table context
	 * @constant {number}
	 */
	CONTEXT_CROSSTAB: 8,

	/**
	 * Publication context
	 * @constant {number}
	 */
	CONTEXT_PRINTTMPL: 9,

	/**
	 * Bulk update context
	 * @constant {number}
	 */
	CONTEXT_UPDATEALL: 10,

	/**
	 * Reference selection context
	 * @constant {number}
	 */
	CONTEXT_REFSELECT: 11,

	/**
	 * Data mapping selection context
	 * @constant {number}
	 */
	CONTEXT_DATAMAPSELECT: 12,

	/**
	 * Pre validation context
	 * @constant {number}
	 */
	CONTEXT_PREVALIDATE: 13,

	/**
	 * Post validation context
	 * @constant {number}
	 */
	CONTEXT_POSTVALIDATE: 14,

	/**
	 * State transition context
	 * @constant {number}
	 */
	CONTEXT_STATETRANSITION: 15,

	/**
	 * Export context
	 * @constant {number}
	 */
	CONTEXT_EXPORT: 16,

	/**
	 * Import context
	 * @constant {number}
	 */
	CONTEXT_IMPORT: 17,

	/**
	 * Association context
	 * @constant {number}
	 */
	CONTEXT_ASSOCIATE: 18,

	/**
	 * Panel list context
	 * @constant {number}
	 */
	CONTEXT_PANELLIST: 19,

	/**
	 * Action context
	 * @constant {number}
	 */
	CONTEXT_ACTION: 20,

	/**
	 * Agenda context
	 * @constant {number}
	 */
	CONTEXT_AGENDA: 21,

	/**
	 * Place map context
	 * @constant {number}
	 */
	CONTEXT_PLACEMAP: 22,

	/**
	 * Foreign key (reference) type
	 * @constant {number}
	 */
	TYPE_ID: 0,

	/**
	 * Integer type
	 * @constant {number}
	 */
	TYPE_INT: 1,

	/**
	 * Decimal type
	 * @constant {number}
	 */
	TYPE_FLOAT: 2,

	/**
	 * Short string type
	 * @constant {number}
	 */
	TYPE_STRING: 3,

	/**
	 * Date type
	 * @constant {number}
	 */
	TYPE_DATE: 4,

	/**
	 * Date and time type
	 * @constant {number}
	 */
	TYPE_DATETIME: 5,

	/**
	 * Time type
	 * @constant {number}
	 */
	TYPE_TIME: 6,

	/**
	 * Simple enumeration type
	 * @constant {number}
	 */
	TYPE_ENUM: 7,

	/**
	 * Boolean type
	 * @constant {number}
	 */
	TYPE_BOOLEAN: 8,

	/**
	 * Password type
	 * @constant {number}
	 */
	TYPE_PASSWORD: 9,

	/**
	 * URL type
	 * @constant {number}
	 */
	TYPE_URL: 10,

	/**
	 * HTML content type
	 * @constant {number}
	 */
	TYPE_HTML: 11,

	/**
	 * Email type
	 * @constant {number}
	 */
	TYPE_EMAIL: 12,

	/**
	 * Long string type
	 * @constant {number}
	 */
	TYPE_LONG_STRING: 13,

	/**
	 * Multiple enumeration type
	 * @constant {number}
	 */
	TYPE_ENUM_MULTI: 14,

	/**
	 * Validated string type
	 * @constant {number}
	 */
	TYPE_REGEXP: 15,

	/**
	 * Document type
	 * @constant {number}
	 */
	TYPE_DOC: 17,

	/**
	 * Decimal type
	 * @constant {number}
	 * @deprecated
	 */
	TYPE_FLOAT_EMPTY: 18,

	/**
	 * External file type
	 * @constant {number}
	 * @deprecated
	 */
	TYPE_EXTFILE: 19,

	/**
	 * Image type
	 * @constant {number}
	 */
	TYPE_IMAGE: 20,

	/**
	 * Notepad type
	 * @constant {number}
	 */
	TYPE_NOTEPAD: 21,

	/**
	 * Phone number type
	 * @constant {number}
	 */
	TYPE_PHONENUM: 22,

	/**
	 * RGB color type
	 * @constant {number}
	 */
	TYPE_COLOR: 23,

	/**
	 * Object type
	 * @constant {number}
	 */
	TYPE_OBJECT: 24,

	/**
	 * Geographical coordinates type
	 * @constant {number}
	 */
	TYPE_GEOCOORDS: 25,

	/**
	 * Big decimal
	 * @constant {number}
	 */
	TYPE_BIGDECIMAL: 26,

	/**
	 * Types strings
	 * @constant {Array}
	 */
	TYPES: [
		'ID',            //.0
		'integer',       // 1
		'decimal',       // 2
		'string',        // 3
		'date',          // 4
		'datetime',      // 5
		'time',          // 6
		'enum',          // 7
		'boolean',       // 8
		'password',      // 9
		'url',           // 10
		'html',          // 11
		'email',         // 12
		'text',          // 13
		'multienum',     // 14
		'regexp',        // 15
		'undefined',     // 16
		'document',      // 17
		'simpledecimal', // 18
		'extfile',       // 19
		'picture',       // 20
		'notepad',       // 21
		'phonenum',      // 22
		'color',         // 23
		'object',        // 24
		'geocoords',     // 25
		'bigdecimal'     // 26
	],

	/**
	 * Not visible
	 * @constant {number}
	 */
	VIS_NOT: 0,

	/**
	 * Hidden (same as not visible)
	 * @constant {number}
	 */
	VIS_HIDDEN: 0,

	/**
	 * Visible on lists only
	 * @constant {number}
	 */
	VIS_LIST: 1,

	/**
	 * Visible on forms only
	 * @constant {number}
	 */
	VIS_FORM: 2,

	/**
	 * Visible on both lists and forms only
	 * @constant {number}
	 */
	VIS_BOTH: 3,

	/**
	 * No search
	 * @constant {number}
	 */
	SEARCH_NONE: 0,

	/**
	 * Simple search
	 * @constant {number}
	 */
	SEARCH_MONO: 1,
	/**
	 * Multiple search (checkboxes)
	 * @constant {number}
	 */
	SEARCH_MULTI_CHECK: 2,

	/**
	 * Multiple search (listbox)
	 * @constant {number}
	 */
	SEARCH_MULTI_LIST: 3,

	/**
	 * Search by period (date/time)
	 * @constant {number}
	 */
	SEARCH_PERIOD: 4,

	/**
	 * True
	 * @constant {string}
	 */
	TRUE: '1',

	/**
	 * False
	 * @constant {string}
	 */
	FALSE: '0',

	/**
	 * Fatal error level
	 * @constant {number}
	 */
	ERRLEVEL_FATAL: 1,
	/**
	 * Error level
	 * @constant {number}
	 */
	ERRLEVEL_ERROR: 2,
	/**
	 * Warning level
	 * @constant {number}
	 */
	ERRLEVEL_WARNING: 3,

	/**
	 * API endpoint name
	 * @constant {string}
	 */
	ENDPOINT_API: SessionParamEndpoint.API,

	/**
	 * UI endpoint name
	 * @constant {string}
	 */
	ENDPOINT_UI: SessionParamEndpoint.UI,

	/**
	 * Public UI endpoint name
	 * @constant {string}
	 */
	ENDPOINT_UIPUBLIC: SessionParamEndpoint.UIPUBLIC,

	/**
	 * Image resource type
	 * @constant {number}
	 */
	RESOURCE_TYPE_IMAGE: 'IMG',

	/**
	 * Icon resource type
	 * @constant {number}
	 */
	RESOURCE_TYPE_ICON: 'ICO',

	/**
	 * Stylesheet resource type
	 * @constant {number}
	 */
	RESOURCE_TYPE_STYLESHEET: 'CSS',

	/**
	 * Javascript resource type
	 * @constant {number}
	 */
	RESOURCE_TYPE_JAVASCRIPT: 'JS',

	/**
	 * Default authentication header
	 * @constant {string}
	 */
	DEFAULT_AUTH_HEADER: 'authorization',

	/**
	 * Simplicite authentication header
	 * @constant {string}
	 */
	SIMPLICITE_AUTH_HEADER: 'x-simplicite-authorization',

	/**
	 * Simplicite UI endpoint kay name in storage for authentication token
	 * @constant {string}
	 */
	UI_AUTH_TOKEN_STORAGE_KEY: '_authToken',

	/**
	 * Simplicite UI endpoint key name in storage for Ajax key
	 * @constant {string}
	 */
	UI_AJAX_KEY_STORAGE_KEY: '_ajaxKey'
};

export { constants };