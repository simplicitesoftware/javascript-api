/**
 * Constants
 * @constant
 */
declare const constants: {
    /**
     * API client module version
     * @constant {string}
     */
    MODULE_VERSION: string;
    /**
     * Default row ID field name
     * @constant {string}
     */
    DEFAULT_ROW_ID_NAME: string;
    /**
     * Default row ID value
     * @constant {string}
     */
    DEFAULT_ROW_ID: string;
    /**
     * Default context
     * @constant {number}
     */
    CONTEXT_NONE: number;
    /**
     * Search context
     * @constant {number}
     */
    CONTEXT_SEARCH: number;
    /**
     * List context
     * @constant {number}
     */
    CONTEXT_LIST: number;
    /**
     * Creation context
     * @constant {number}
     */
    CONTEXT_CREATE: number;
    /**
     * Copy context
     * @constant {number}
     */
    CONTEXT_COPY: number;
    /**
     * Update context
     * @constant {number}
     */
    CONTEXT_UPDATE: number;
    /**
     * Delete context
     * @constant {number}
     */
    CONTEXT_DELETE: number;
    /**
     * Chart context
     * @constant {number}
     */
    CONTEXT_GRAPH: number;
    /**
     * Pivot table context
     * @constant {number}
     */
    CONTEXT_CROSSTAB: number;
    /**
     * Publication context
     * @constant {number}
     */
    CONTEXT_PRINTTMPL: number;
    /**
     * Bulk update context
     * @constant {number}
     */
    CONTEXT_UPDATEALL: number;
    /**
     * Reference selection context
     * @constant {number}
     */
    CONTEXT_REFSELECT: number;
    /**
     * Data mapping selection context
     * @constant {number}
     */
    CONTEXT_DATAMAPSELECT: number;
    /**
     * Pre validation context
     * @constant {number}
     */
    CONTEXT_PREVALIDATE: number;
    /**
     * Post validation context
     * @constant {number}
     */
    CONTEXT_POSTVALIDATE: number;
    /**
     * State transition context
     * @constant {number}
     */
    CONTEXT_STATETRANSITION: number;
    /**
     * Export context
     * @constant {number}
     */
    CONTEXT_EXPORT: number;
    /**
     * Import context
     * @constant {number}
     */
    CONTEXT_IMPORT: number;
    /**
     * Association context
     * @constant {number}
     */
    CONTEXT_ASSOCIATE: number;
    /**
     * Panel list context
     * @constant {number}
     */
    CONTEXT_PANELLIST: number;
    /**
     * Action context
     * @constant {number}
     */
    CONTEXT_ACTION: number;
    /**
     * Agenda context
     * @constant {number}
     */
    CONTEXT_AGENDA: number;
    /**
     * Place map context
     * @constant {number}
     */
    CONTEXT_PLACEMAP: number;
    /**
     * Foreign key (reference) type
     * @constant {number}
     */
    TYPE_ID: number;
    /**
     * Integer type
     * @constant {number}
     */
    TYPE_INT: number;
    /**
     * Decimal type
     * @constant {number}
     */
    TYPE_FLOAT: number;
    /**
     * Short string type
     * @constant {number}
     */
    TYPE_STRING: number;
    /**
     * Date type
     * @constant {number}
     */
    TYPE_DATE: number;
    /**
     * Date and time type
     * @constant {number}
     */
    TYPE_DATETIME: number;
    /**
     * Time type
     * @constant {number}
     */
    TYPE_TIME: number;
    /**
     * Simple enumeration type
     * @constant {number}
     */
    TYPE_ENUM: number;
    /**
     * Boolean type
     * @constant {number}
     */
    TYPE_BOOLEAN: number;
    /**
     * Password type
     * @constant {number}
     */
    TYPE_PASSWORD: number;
    /**
     * URL type
     * @constant {number}
     */
    TYPE_URL: number;
    /**
     * HTML content type
     * @constant {number}
     */
    TYPE_HTML: number;
    /**
     * Email type
     * @constant {number}
     */
    TYPE_EMAIL: number;
    /**
     * Long string type
     * @constant {number}
     */
    TYPE_LONG_STRING: number;
    /**
     * Multiple enumeration type
     * @constant {number}
     */
    TYPE_ENUM_MULTI: number;
    /**
     * Validated string type
     * @constant {number}
     */
    TYPE_REGEXP: number;
    /**
     * Document type
     * @constant {number}
     */
    TYPE_DOC: number;
    /**
     * Decimal type
     * @constant {number}
     * @deprecated
     */
    TYPE_FLOAT_EMPTY: number;
    /**
     * External file type
     * @constant {number}
     * @deprecated
     */
    TYPE_EXTFILE: number;
    /**
     * Image type
     * @constant {number}
     */
    TYPE_IMAGE: number;
    /**
     * Notepad type
     * @constant {number}
     */
    TYPE_NOTEPAD: number;
    /**
     * Phone number type
     * @constant {number}
     */
    TYPE_PHONENUM: number;
    /**
     * RGB color type
     * @constant {number}
     */
    TYPE_COLOR: number;
    /**
     * Object type
     * @constant {number}
     */
    TYPE_OBJECT: number;
    /**
     * Geographical coordinates type
     * @constant {number}
     */
    TYPE_GEOCOORDS: number;
    /**
     * Big decimal
     * @constant {number}
     */
    TYPE_BIGDECIMAL: number;
    /**
     * Types strings
     * @constant {Array}
     */
    TYPES: string[];
    /**
     * Not visible
     * @constant {number}
     */
    VIS_NOT: number;
    /**
     * Hidden (same as not visible)
     * @constant {number}
     */
    VIS_HIDDEN: number;
    /**
     * Visible on lists only
     * @constant {number}
     */
    VIS_LIST: number;
    /**
     * Visible on forms only
     * @constant {number}
     */
    VIS_FORM: number;
    /**
     * Visible on both lists and forms only
     * @constant {number}
     */
    VIS_BOTH: number;
    /**
     * No search
     * @constant {number}
     */
    SEARCH_NONE: number;
    /**
     * Simple search
     * @constant {number}
     */
    SEARCH_MONO: number;
    /**
     * Multiple search (checkboxes)
     * @constant {number}
     */
    SEARCH_MULTI_CHECK: number;
    /**
     * Multiple search (listbox)
     * @constant {number}
     */
    SEARCH_MULTI_LIST: number;
    /**
     * Search by period (date/time)
     * @constant {number}
     */
    SEARCH_PERIOD: number;
    /**
     * True
     * @constant {string}
     */
    TRUE: string;
    /**
     * False
     * @constant {string}
     */
    FALSE: string;
    /**
     * Fatal error level
     * @constant {number}
     */
    ERRLEVEL_FATAL: number;
    /**
     * Error level
     * @constant {number}
     */
    ERRLEVEL_ERROR: number;
    /**
     * Warning level
     * @constant {number}
     */
    ERRLEVEL_WARNING: number;
    /**
     * Image resource type
     * @constant {number}
     */
    RESOURCE_TYPE_IMAGE: string;
    /**
     * Icon resource type
     * @constant {number}
     */
    RESOURCE_TYPE_ICON: string;
    /**
     * Stylesheet resource type
     * @constant {number}
     */
    RESOURCE_TYPE_STYLESHEET: string;
    /**
     * Javascript resource type
     * @constant {number}
     */
    RESOURCE_TYPE_JAVASCRIPT: string;
    /**
     * Default authentication header
     * @constant {string}
     */
    DEFAULT_AUTH_HEADER: string;
    /**
     * Simplicite authentication header
     * @constant {string}
     */
    SIMPLICITE_AUTH_HEADER: string;
};
export { constants };
