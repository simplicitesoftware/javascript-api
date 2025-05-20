var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { constants } from './constants';
import { Doc } from './doc';
import { BusinessObjectMetadata } from './businessobjectmetadata';
/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instantiate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @class
 */
class BusinessObject {
    /**
     * Constructor
     * @param {Session} ses Session
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     */
    constructor(ses, name, instance) {
        /**
         * Get meta data (alias to getMetaData)
         * @function
         */
        this.getMetadata = this.getMetaData;
        this.session = ses;
        const inst = instance || 'api_' + name;
        this.metadata = new BusinessObjectMetadata(name, inst);
        this.cacheKey = this.session.getBusinessObjectCacheKey(name, inst);
        this.path = this.session.parameters.objpath + '?object=' + encodeURIComponent(name) + '&inst=' + encodeURIComponent(inst);
        this.item = {};
        this.filters = {};
        this.list = [];
    }
    /**
     * Get meta data
     * @param {object} [opts] Options
     * @param {number} [opts.context] Context
     * @param {string} [opts.contextParam] Context parameter
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<BusinessObjectMetadata>} A promise to the object's meta data (also available as the <code>metadata</code> member)
     * @function
     */
    getMetaData(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getMetaData';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = '';
                if (opts.context)
                    p += '&context=' + encodeURIComponent(opts.context);
                if (opts.contextParam)
                    p += '&contextparam=' + encodeURIComponent(opts.contextParam);
                ses.sendRequest(this.path + '&action=metadata' + p, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.metadata = r.response;
                        resolve.call(this, this.metadata);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Get name
     * @return {string} Name
     * @function
     */
    getName() {
        return this.metadata.name;
    }
    /**
     * Get instance name
     * @return {string} Instance name
     * @function
     */
    getInstance() {
        return this.metadata.instance;
    }
    /**
     * Get display label
     * @return {string} Display label
     * @function
     */
    getLabel() {
        return this.metadata.label;
    }
    /**
     * Get help
     * @return {string} Help
     * @function
     */
    getHelp() {
        return this.metadata.help;
    }
    /**
     * Get all fields definitions
     * @return {array} Array of field definitions
     * @function
     */
    getFields() {
        return this.metadata.fields;
    }
    /**
     * Get a field definition
     * @param {string} fieldName Field name
     * @return {object} Field definition
     * @function
     */
    getField(fieldName) {
        const fs = this.getFields();
        let n = 0;
        while (n < fs.length && fs[n].name !== fieldName)
            n++;
        if (n < fs.length)
            return fs[n];
    }
    /**
     * Get row ID field name
     * @return {string} Row ID field name
     * @function
     */
    getRowIdFieldName() {
        return this.metadata.rowidfield;
    }
    /**
     * Get row ID field definition
     * @return {object} Row ID field definition
     * @function
     */
    getRowIdField() {
        return this.getField(this.getRowIdFieldName());
    }
    /**
     * Get links
     * @return {array} Array of links
     * @function
     */
    getLinks() {
        return this.metadata.links;
    }
    /**
     * Get field type
     * @param {(string|object)} field Field name or definition
     * @return {string} Type (one of <code>constants.TYPE_*</code>)
     * @function
     */
    getFieldType(field) {
        if (typeof field === 'string')
            field = this.getField(field);
        if (field)
            return field.type;
    }
    /**
     * Get field label
     * @param {(string|object)} field Field name or definition
     * @return {string} Field label
     * @function
     */
    getFieldLabel(field) {
        if (typeof field === 'string')
            field = this.getField(field);
        if (field)
            return field.label;
    }
    /**
     * Get value of field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string|Doc} Value
     * @function
     */
    getFieldValue(field, item) {
        if (!item)
            item = this.item;
        if (field && item) {
            const val = item[typeof field === 'string' ? field : field.name];
            if (val && val.mime) // Document?
                return new Doc(val);
            else
                return val;
        }
    }
    /**
     * Get the list value of a list of values field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} List value
     * @function
     */
    getFieldListValue(field, item) {
        if (typeof field === 'string')
            field = this.getField(field);
        const val = this.getFieldValue(field, item);
        return field && field.listOfValues ? this.getListValue(field.listOfValues, val) : val;
    }
    /**
     * Get the list colors of a list of values field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} List color and bgcolor
     * @function
     */
    getFieldListColors(field, item) {
        if (typeof field === 'string')
            field = this.getField(field);
        const val = this.getFieldValue(field, item);
        return field && field.listOfValues ? this.getListColors(field.listOfValues, val) : val;
    }
    /**
     * Get the data URL of an inlined document/image field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string} Document/image field data URL (or nothing if the field is not of document/image type or if it is not inlined or if it is empty)
     * @function
     */
    getFieldDataURL(field, item) {
        if (typeof field !== 'string')
            field = field.fullinput || field.name;
        const val = this.getFieldValue(field, item);
        if (val && val.mime) // Inlined
            return 'data:' + val.mime + ';base64,' + (val.content || val.thumbnail);
    }
    /**
     * Get the field's value as document/image for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @return {string|Doc} Document/image (or nothing if the field is not of document/image type or if it is empty)
     * @function
     */
    getFieldDocument(field, item) {
        if (typeof field !== 'string')
            field = field.fullinput || field.input || field.name;
        const val = this.getFieldValue(field, item);
        if (val && val.mime)
            return new Doc(val);
        else
            return val;
    }
    /**
     * Get the URL of a document/image field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {object} [item] Item (defaults to current item)
     * @param {boolean} [thumbnail=false] Thumbnail?
     * @return {string} Document/image field URL (or nothing if the field is not of document/image type or if it is empty)
     * @function
     */
    getFieldDocumentURL(field, item, thumbnail) {
        if (typeof field !== 'string')
            field = field.fullinput || field.input || field.name;
        let val = this.getFieldValue(field, item);
        if (val && val.mime) // Inlined
            val = val.id;
        if (val)
            return this.session.parameters.url + this.session.parameters.docpath
                + '?object=' + encodeURIComponent(this.metadata.name)
                + '&inst=' + encodeURIComponent(this.metadata.instance)
                + '&field=' + encodeURIComponent(field)
                + '&row_id=' + encodeURIComponent(this.getRowId(item))
                + '&doc_id=' + encodeURIComponent(val)
                + (thumbnail ? '&thumbnail=true' : '')
                + (this.session.authtoken ? '&_x_simplicite_authorization_=' + encodeURIComponent(this.session.authtoken) : '');
    }
    /**
     * Get list item value for code
     * @param {array} list List of values
     * @param {string} code Code
     * @return {string} Value
     * @function
     */
    getListValue(list, code) {
        if (list) {
            for (const l of list) {
                if (l.code === code)
                    return l.value;
            }
        }
        return code;
    }
    /**
     * Get list item colors (color and background color) for code
     * @param {array} list List of values
     * @param {string} code Code
     * @return {any} Colors
     * @function
     */
    getListColors(list, code) {
        if (list) {
            for (const l of list) {
                if (l.code === code)
                    return { color: l.color, bgcolor: l.bgcolor };
            }
        }
        return { color: 'inherit', bgcolor: 'inherit' };
    }
    /**
     * Set value of field for item (or current item)
     * @param {(string|object)} field Field name or definition
     * @param {(string|object)} value Value
     * @param {object} [item] Item (defaults to current item)
     * @function
     */
    setFieldValue(field, value, item) {
        if (!item)
            item = this.item;
        if (field && item) {
            item[typeof field === 'string' ? field : field.name] = value instanceof Doc ? value.getValue() : value;
        }
    }
    /**
     * Reset values of item (or current item)
     * @param {object} [item] Item (defaults to current item)
     */
    resetValues(item) {
        if (!item)
            item = this.item;
        for (const v in item)
            delete item[v];
    }
    /**
    * Set values of item (or current item)
    * @param {object|FormData} data Data (plain object or form data)
    * @param {object} [item] Item (defaults to current item)
    */
    setFieldValues(data, item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item)
                item = this.item;
            // Convert form data to plain object
            let dt;
            if (data instanceof FormData) {
                dt = {};
                data.forEach((v, k) => dt[k] = v);
            }
            else {
                dt = data;
            }
            return new Promise(resolve => {
                const promises = [];
                for (const k of Object.keys(dt)) {
                    const v = dt[k];
                    if (v instanceof File)
                        promises.push(new Promise(r => {
                            new Doc().load(v).then(doc => {
                                this.setFieldValue(k, doc);
                                r.call(this);
                            });
                        }));
                    else
                        this.setFieldValue(k, v);
                }
                Promise.allSettled(promises).then(() => resolve.call(this, item));
            });
        });
    }
    /**
     * Is the field the row ID field?
     * @param {object} field Field definition
     * @return {boolean} True if the field is the row ID field
     * @function
     */
    isRowIdField(field) {
        return !field.ref && field.name === this.metadata.rowidfield;
    }
    /**
     * Is the field a timestamp field?
     * @param {object} field Field definition
     * @return {boolean} True if the field is a timestamp field
     * @function
     */
    isTimestampField(field) {
        const n = field.name;
        return !field.ref && (n === 'created_by' || n === 'created_dt' || n === 'updated_by' || n === 'updated_dt');
    }
    /**
     * Get current filters
     * @param {object} [opts] Options
     * @param {number} [opts.context] Context
     * @param {boolean} [opts.reset] Reset filters?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the object's filters (also available as the <code>filters</code> member)
     * @function
     */
    getFilters(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getFilters';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = '';
                if (opts.context)
                    p += '&context=' + encodeURIComponent(opts.context);
                if (opts.reset)
                    p += '&reset=' + !!opts.reset;
                ses.sendRequest(this.path + '&action=filters' + p, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.filters = r.response;
                        resolve.call(this, this.filters);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Build context option parameters
     * @param {object} options Options
     * @return {string} Option parameters
     * @private
     */
    getReqContextOption(options) {
        return options.context ? `&context=${encodeURIComponent(options.context)}` : '';
    }
    /**
     * Build options parameters
     * @param {object} options Options
     * @return {string} Option parameters
     * @private
     */
    getReqOptions(options) {
        let opts = this.getReqContextOption(options);
        const id = options.inlineDocs || options.inlineDocuments || options.inlineImages; // Naming flexibility
        if (id)
            opts += `&inline_documents=${encodeURIComponent(id.join ? id.join(',') : id)}`;
        const it = options.inlineThumbs || options.inlineThumbnails; // Naming flexibility
        if (it)
            opts += `&inline_thumbnails=${encodeURIComponent(it.join ? it.join(',') : it)}`;
        const io = options.inlineObjs || options.inlineObjects; // Naming flexibility
        if (io)
            opts += `&inline_objects=${encodeURIComponent(io.join ? io.join(',') : io)}`;
        return opts;
    }
    /**
     * Convert usual wildcards to filters wildcards
     * @param {object} filter Filter
     * @return {string} Filter with wildcards converted
     * @private
     */
    convertFilterWildCards(filter) {
        return typeof filter === 'string' ? filter.replace(new RegExp('\\*', 'g'), '%').replace(new RegExp('\\?', 'g'), '_') : filter;
    }
    /**
     * Build request parameters
     * @param {object} data Data
     * @param {boolean} [filters] Filters? Used to convert wildcards if needed
     * @return {string} Request parameters
     * @private
     */
    getReqParams(data, filters) {
        let p = '';
        if (!data)
            return p;
        for (const i of Object.entries(data)) {
            const k = i[0];
            let d = i[1] || '';
            if (d instanceof Doc)
                d = d.getValue();
            if (d.name && d.content) { // Document?
                if (d.content.startsWith('data:')) // Flexibility = extract content from a data URL (just in case...)
                    d.content = d.content.replace(/data:.*;base64,/, '');
                p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent('id|' + (d.id ? d.id : '0') + '|name|' + d.name + '|content|' + d.content);
            }
            else if (d.object && d.row_id) { // Object?
                p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent('object|' + d.object + '|row_id|' + d.row_id);
            }
            else if (d.sort) { // Array?
                for (const dd of d)
                    p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(filters ? this.convertFilterWildCards(dd) : dd);
            }
            else {
                p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(filters ? this.convertFilterWildCards(d) : d);
            }
        }
        return p;
    }
    /**
     * Get path
     * @param {string} action Action
     * @param {object} [opts] Options
     * @param {string} [opts.businessCase] Business case label
     */
    getPath(action, opts) {
        const bc = opts && opts.businessCase ? `&_bc=${encodeURIComponent(opts.businessCase)}` : '';
        return `${this.path}&action=${encodeURIComponent(action)}${bc}`;
    }
    /**
     * Get count
     * @param {object} [filters] Filters (defaults to current filters)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {boolean} [opts.operations] Include operation fields results (sum, ...)
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the count
     * @function
     */
    getCount(filters, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getCount';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = this.getReqContextOption(opts);
                if (opts.operations === true)
                    p += '&_operations=true';
                this.filters = filters || {};
                ses.sendRequest(`${this.getPath('count', opts)}${p}`, this.getReqParams(this.filters, true), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.count = r.response.count;
                        this.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                        this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                        this.list = [];
                        resolve.call(this, this.count);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Search
     * @param {object} [filters] Filters (defaults to current filters)
     * @param {object} [opts] Options
     * @param {number} [opts.page] Page number, a non paginated list is returned if not set
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {boolean} [opts.visible] Return only visible fields?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<array>} Promise to a list of records (also available as the <code>list</code> member)
     * @function
     */
    search(filters, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.search';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = this.getReqOptions(opts);
                if (opts.page > 0)
                    p += `&page=${opts.page - 1}`;
                if (opts.metadata === true)
                    p += '&_md=true';
                if (opts.visible === true)
                    p += '&_visible=true';
                this.filters = filters || {};
                ses.sendRequest(`${this.getPath('search', opts)}${p}`, this.getReqParams(this.filters, true), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        if (res.meta)
                            this.metadata = r.response.meta;
                        this.count = r.response.count;
                        this.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                        this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                        this.list = r.response.list;
                        resolve.call(this, this.list);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Get
     * @param {string} [rowId] Row ID (defaults to current item's row ID)
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {string[]} [opts.fields] List of field names to return, all fields are returned by default
     * @param {string} [opts.treeview] Return the named tree view structure
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record (also available as the <code>item</code> member)
     * @function
     */
    get(rowId, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.get';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = this.getReqOptions(opts);
                const tv = opts.treeView;
                if (tv)
                    p += `&treeview=${encodeURIComponent(tv)}`;
                if (opts.fields) {
                    for (const f of opts.fields.length)
                        p += `&fields=${encodeURIComponent(f.replace('.', '__'))}`;
                }
                if (opts.metadata)
                    p += '&_md=true';
                if (opts.social)
                    p += '&_social=true';
                ses.sendRequest(`${this.getPath('get', opts)}&${this.metadata.rowidfield}=${encodeURIComponent(rowId || this.getRowId())}${p}`, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        if (r.response.meta)
                            this.metadata = r.response.meta;
                        if (r.response.data)
                            this.item = tv ? r.response.data.item : r.response.data;
                        else
                            this.item = tv ? r.response.item : r.response;
                        resolve.call(this, tv ? r.response : this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Get for create
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
     * @function
     */
    getForCreate(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_CREATE;
            return this.get(constants.DEFAULT_ROW_ID, opts);
        });
    }
    /**
     * Get for update
     * @param {string} [rowId] Row ID (defaults to current item's row ID)
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record to update (also available as the <code>item</code> member)
     * @function
     */
    getForUpdate(rowId, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_UPDATE;
            return this.get(rowId || this.getRowId(), opts);
        });
    }
    /**
     * Get for copy
     * @param {string} [rowId] Row ID to copy (defaults to current item's row ID)
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
     * @function
     */
    getForCopy(rowId, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_COPY;
            return this.get(rowId || this.getRowId(), opts);
        });
    }
    /**
     * Get for delete
     * @param {string} [rowId] Row ID (defaults to current item's row ID)
     * @param {object} [opts] Options
     * @param {boolean} [opts.metadata=false] Refresh meta data?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the record to delete (also available as the <code>item</code> member)
     * @function
     */
    getForDelete(rowId, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_DELETE;
            return this.get(rowId || this.getRowId(), opts);
        });
    }
    /**
     * Get specified or current item's row ID value
     * @param {object} [item] Item (defaults to current item)
     * @return {string} Item's row ID value
     * @function
     */
    getRowId(item) {
        item = item || this.item;
        if (item)
            return item[this.getRowIdFieldName()];
    }
    /**
     * Populate
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
     * @function
     */
    populate(item, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.populate';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (item)
                    this.item = item;
                ses.sendRequest(`${this.getPath('populate', opts)}${this.getReqOptions(opts)}`, this.getReqParams(this.item), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = r.response.data ? r.response.data : r.response;
                        resolve.call(this, this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Get the linked list for a list of values field and its specified value(s)
     * @param {(string|object)} field Field name or definition
     * @param {(string|object)} linkedField Linked field name or definition
     * @param {string|boolean} [code] List of values code(s) (if multiple codes use ; as separator), defaults to current field value if empty, means "all" if true
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
     * @function
     */
    getFieldLinkedList(field, linkedField, code, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getFieldLinkedList';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (typeof field !== 'string')
                    field = field.fullinput || field.name;
                if (typeof linkedField !== 'string')
                    linkedField = linkedField.fullinput || linkedField.name;
                let all = false;
                if (code === true) {
                    all = true;
                    code = undefined;
                }
                else if (typeof code === 'undefined') {
                    code = this.getFieldValue(field);
                }
                ses.sendRequest(this.getPath('getlinkedlist', opts), this.getReqParams({ origin: field, input: linkedField, code, all }), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = r.response.result ? r.response.result : r.response;
                        resolve.call(this, this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Save (create or update depending on item row ID value)
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the saved record (also available as the <code>item</code> member)
     * @function
     */
    save(item, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (item)
                this.item = item;
            const rowId = this.item[this.metadata.rowidfield];
            if (!rowId || rowId === constants.DEFAULT_ROW_ID)
                return this.create(item, opts);
            else
                return this.update(item, opts);
        });
    }
    /**
     * Create (create or update)
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
     * @function
     */
    create(item, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.create';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (item)
                    this.item = item;
                this.item.row_id = constants.DEFAULT_ROW_ID;
                ses.sendRequest(`${this.getPath('create', opts)}${this.getReqOptions(opts)}`, this.getReqParams(this.item), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = r.response.data ? r.response.data : r.response;
                        resolve.call(this, this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Update
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the updated record (also available as the <code>item</code> member)
     * @function
     */
    update(item, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.update';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (item)
                    this.item = item;
                ses.sendRequest(`${this.getPath('update', opts)}${this.getReqOptions(opts)}`, this.getReqParams(this.item), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = r.response.data ? r.response.data : r.response;
                        resolve.call(this, this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Delete
     * @param {object} [item] Item (defaults to current item)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise (the <code>item</code> member is emptied)
     * @function
     */
    del(item, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.del';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (item)
                    this.item = item;
                ses.sendRequest(`${this.getPath('delete', opts)}&${this.metadata.rowidfield}=${encodeURIComponent(this.item[this.metadata.rowidfield])}`, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = undefined;
                        delete r.response.undoredo;
                        resolve.call(this, r.response);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Invoke a custom action
     * @param {string} action Action name
     * @param {string} [rowId] Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.parameters] Optional action parameters as key/value pairs
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<string|object>} A promise to the action result
     * @function
     */
    action(action, rowId, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = `BusinessObject.action(${action})`;
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                const p = rowId ? `&${this.getRowIdFieldName()}=${encodeURIComponent(rowId)}` : '';
                ses.sendRequest(`${this.getPath(action, opts)}${p}`, this.getReqParams(opts.parameters), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        const result = r.response.result;
                        resolve.call(this, result);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Build a pivot table
     * @param {string} ctb Pivot table name
     * @param {object} [opts] Options
     * @param {boolean} [opts.cubes] Data as cubes?
     * @param {object} [opts.filters] Filters, by default current filters are used
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the pivot table data (also available as the <code>crosstabdata</code> member)
     * @function
     */
    crosstab(ctb, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = `BusinessObject.crosstab(${ctb})`;
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (opts.filters)
                    this.filters = opts.filters;
                ses.sendRequest(`${this.getPath(opts.cubes ? 'crosstabcubes' : 'crosstab', opts)}&crosstab=${encodeURIComponent(ctb)}`, this.getReqParams(opts.filters || this.filters, true), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        resolve.call(this, r.response);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Build a custom publication
     * @param {string} prt Publication name
     * @param {string} [rowId] Row ID
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<Doc>} A promise to the document of the publication
     * @function
     */
    print(prt, rowId, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = `BusinessObject.print(${prt})`;
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (opts.filters)
                    this.filters = opts.filters;
                let p = '';
                if (opts.all)
                    p += '&all=' + !!opts.all;
                if (opts.mailing)
                    p += '&mailing=' + !!opts.mailing;
                if (rowId)
                    p += `&${this.getRowIdFieldName()}=${encodeURIComponent(rowId)}`;
                ses.sendRequest(`${this.getPath('print', opts)}&printtemplate=${encodeURIComponent(prt)}${p}`, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        resolve.call(this, new Doc(r.response));
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Get place map data
     * @param {string} pcm Place map name
     * @param {string} [filters] Filters
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<any>} A promise to the place map data
     * @function
     */
    placemap(pcm, filters, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = `BusinessObject.placemap(${pcm})`;
            const ses = this.session;
            this.filters = filters || {};
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (opts.filters)
                    this.filters = opts.filters;
                ses.sendRequest(`${this.getPath('placemap', opts)}&placemap=${encodeURIComponent(pcm)}`, this.getReqParams(this.filters, true), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        resolve.call(this, r.response);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Set an object parameter
     * @param {string} param Parameter name
     * @param {string} value Parameter value
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise
     * @function
     */
    setParameter(param, value, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.setParameter';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                const p = { name: param };
                if (value)
                    p.value = value;
                ses.sendRequest(this.getPath('setparameter', opts), this.getReqParams(p), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        const result = r.response.result;
                        resolve.call(this, result);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Get an object parameter
     * @param {string} param Parameter name
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} Promise to the parameter value
     * @function
     */
    getParameter(param, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getParameter';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                const p = { name: param };
                ses.sendRequest(this.getPath('getparameter', opts), this.getReqParams(p), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        const result = r.response.result;
                        resolve.call(this, result);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
    }
    /**
     * Get an object resource URL
     * @param {string} code Resource code
     * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
     * @return {string} Object resource URL
     * @function
     */
    getResourceURL(code, type) {
        return this.session.getResourceURL(code, type, this.metadata.name, this.metadata.id);
    }
}
export { BusinessObject };
//# sourceMappingURL=businessobject.js.map