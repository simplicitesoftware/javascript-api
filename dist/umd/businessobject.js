var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./constants", "./doc", "./businessobjectmetadata"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BusinessObject = void 0;
    var constants_1 = require("./constants");
    var doc_1 = require("./doc");
    var businessobjectmetadata_1 = require("./businessobjectmetadata");
    /**
     * Business object.
     * <br/><span style="color: red;">ou <strong>should never</strong> instantiate this class directly
     * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
     * @class
     */
    var BusinessObject = /** @class */ (function () {
        /**
         * Constructor
         * @param {Session} ses Session
         * @param {string} name Business object name
         * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
         */
        function BusinessObject(ses, name, instance) {
            var _this = this;
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
            this.getMetaData = function (opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.getMetaData';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var p = '';
                            if (opts.context)
                                p += '&context=' + encodeURIComponent(opts.context);
                            if (opts.contextParam)
                                p += '&contextparam=' + encodeURIComponent(opts.contextParam);
                            ses.sendRequest(_this.path + '&action=metadata' + p, undefined, function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    _this.metadata = r.response;
                                    resolve.call(_this, _this.metadata);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
            /**
             * Get meta data (alias to getMetaData)
             * @function
             */
            this.getMetadata = this.getMetaData;
            /**
             * Get name
             * @return {string} Name
             * @function
             */
            this.getName = function () {
                return _this.metadata.name;
            };
            /**
             * Get instance name
             * @return {string} Instance name
             * @function
             */
            this.getInstance = function () {
                return _this.metadata.instance;
            };
            /**
             * Get display label
             * @return {string} Display label
             * @function
             */
            this.getLabel = function () {
                return _this.metadata.label;
            };
            /**
             * Get help
             * @return {string} Help
             * @function
             */
            this.getHelp = function () {
                return _this.metadata.help;
            };
            /**
             * Get all fields definitions
             * @return {array} Array of field definitions
             * @function
             */
            this.getFields = function () {
                return _this.metadata.fields;
            };
            /**
             * Get a field definition
             * @param {string} fieldName Field name
             * @return {object} Field definition
             * @function
             */
            this.getField = function (fieldName) {
                var fs = _this.getFields();
                var n = 0;
                while (n < fs.length && fs[n].name !== fieldName)
                    n++;
                if (n < fs.length)
                    return fs[n];
            };
            /**
             * Get row ID field name
             * @return {string} Row ID field name
             * @function
             */
            this.getRowIdFieldName = function () {
                return _this.metadata.rowidfield;
            };
            /**
             * Get row ID field definition
             * @return {object} Row ID field definition
             * @function
             */
            this.getRowIdField = function () {
                return _this.getField(_this.getRowIdFieldName());
            };
            /**
             * Get links
             * @return {array} Array of links
             * @function
             */
            this.getLinks = function () {
                return _this.metadata.links;
            };
            /**
             * Get field type
             * @param {(string|object)} field Field name or definition
             * @return {string} Type (one of <code>constants.TYPE_*</code>)
             * @function
             */
            this.getFieldType = function (field) {
                if (typeof field === 'string')
                    field = _this.getField(field);
                if (field)
                    return field.type;
            };
            /**
             * Get field label
             * @param {(string|object)} field Field name or definition
             * @return {string} Field label
             * @function
             */
            this.getFieldLabel = function (field) {
                if (typeof field === 'string')
                    field = _this.getField(field);
                if (field)
                    return field.label;
            };
            /**
             * Get value of field for item (or current item)
             * @param {(string|object)} field Field name or definition
             * @param {object} [item] Item (defaults to current item)
             * @return {string|Doc} Value
             * @function
             */
            this.getFieldValue = function (field, item) {
                if (!item)
                    item = _this.item;
                if (field && item) {
                    var val = item[typeof field === 'string' ? field : field.name];
                    if (val && val.mime) // Document?
                        return new doc_1.Doc(val);
                    else
                        return val;
                }
            };
            /**
             * Get the list value of a list of values field for item (or current item)
             * @param {(string|object)} field Field name or definition
             * @param {object} [item] Item (defaults to current item)
             * @return {string} List value
             * @function
             */
            this.getFieldListValue = function (field, item) {
                if (typeof field === 'string')
                    field = _this.getField(field);
                var val = _this.getFieldValue(field, item);
                return field && field.listOfValues ? _this.getListValue(field.listOfValues, val) : val;
            };
            /**
             * Get the list colors of a list of values field for item (or current item)
             * @param {(string|object)} field Field name or definition
             * @param {object} [item] Item (defaults to current item)
             * @return {string} List color and bgcolor
             * @function
             */
            this.getFieldListColors = function (field, item) {
                if (typeof field === 'string')
                    field = _this.getField(field);
                var val = _this.getFieldValue(field, item);
                return field && field.listOfValues ? _this.getListColors(field.listOfValues, val) : val;
            };
            /**
             * Get the data URL of an inlined document/image field for item (or current item)
             * @param {(string|object)} field Field name or definition
             * @param {object} [item] Item (defaults to current item)
             * @return {string} Document/image field data URL (or nothing if the field is not of document/image type or if it is not inlined or if it is empty)
             * @function
             */
            this.getFieldDataURL = function (field, item) {
                if (typeof field !== 'string')
                    field = field.fullinput || field.name;
                var val = _this.getFieldValue(field, item);
                if (val && val.mime) // Inlined
                    return 'data:' + val.mime + ';base64,' + (val.content || val.thumbnail);
            };
            /**
             * Get the field's value as document/image for item (or current item)
             * @param {(string|object)} field Field name or definition
             * @param {object} [item] Item (defaults to current item)
             * @return {string|Doc} Document/image (or nothing if the field is not of document/image type or if it is empty)
             * @function
             */
            this.getFieldDocument = function (field, item) {
                if (typeof field !== 'string')
                    field = field.fullinput || field.input || field.name;
                var val = _this.getFieldValue(field, item);
                if (val && val.mime)
                    return new doc_1.Doc(val);
                else
                    return val;
            };
            /**
             * Get the URL of a document/image field for item (or current item)
             * @param {(string|object)} field Field name or definition
             * @param {object} [item] Item (defaults to current item)
             * @param {boolean} [thumbnail=false] Thumbnail?
             * @return {string} Document/image field URL (or nothing if the field is not of document/image type or if it is empty)
             * @function
             */
            this.getFieldDocumentURL = function (field, item, thumbnail) {
                if (typeof field !== 'string')
                    field = field.fullinput || field.input || field.name;
                var val = _this.getFieldValue(field, item);
                if (val && val.mime) // Inlined
                    val = val.id;
                if (val)
                    return _this.session.parameters.url + _this.session.parameters.docpath
                        + '?object=' + encodeURIComponent(_this.metadata.name)
                        + '&inst=' + encodeURIComponent(_this.metadata.instance)
                        + '&field=' + encodeURIComponent(field)
                        + '&row_id=' + encodeURIComponent(_this.getRowId(item))
                        + '&doc_id=' + encodeURIComponent(val)
                        + (thumbnail ? '&thumbnail=true' : '')
                        + (_this.session.authtoken ? '&_x_simplicite_authorization_=' + encodeURIComponent(_this.session.authtoken) : '');
            };
            /**
             * Get list item value for code
             * @param {array} list List of values
             * @param {string} code Code
             * @return {string} Value
             * @function
             */
            this.getListValue = function (list, code) {
                if (list) {
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var l = list_1[_i];
                        if (l.code === code)
                            return l.value;
                    }
                }
                return code;
            };
            /**
             * Get list item colors (color and background color) for code
             * @param {array} list List of values
             * @param {string} code Code
             * @return {any} Colors
             * @function
             */
            this.getListColors = function (list, code) {
                if (list) {
                    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                        var l = list_2[_i];
                        if (l.code === code)
                            return { color: l.color, bgcolor: l.bgcolor };
                    }
                }
                return { color: 'inherit', bgcolor: 'inherit' };
            };
            /**
             * Set value of field for item (or current item)
             * @param {(string|object)} field Field name or definition
             * @param {(string|object)} value Value
             * @param {object} [item] Item (defaults to current item)
             * @function
             */
            this.setFieldValue = function (field, value, item) {
                if (!item)
                    item = _this.item;
                if (field && item) {
                    item[typeof field === 'string' ? field : field.name] = value instanceof doc_1.Doc ? value.getValue() : value;
                }
            };
            /**
             * Reset values of item (or current item)
             * @param {object} [item] Item (defaults to current item)
             */
            this.resetValues = function (item) {
                if (!item)
                    item = _this.item;
                for (var v in item)
                    delete item[v];
            };
            /**
            * Set values of item (or current item)
            * @param {object|FormData} data Data (plain object or form data)
            * @param {object} [item] Item (defaults to current item)
            */
            this.setFieldValues = function (data, item) { return __awaiter(_this, void 0, void 0, function () {
                var dt;
                var _this = this;
                return __generator(this, function (_a) {
                    if (!item)
                        item = this.item;
                    if (data instanceof FormData) {
                        dt = {};
                        data.forEach(function (v, k) { return dt[k] = v; });
                    }
                    else {
                        dt = data;
                    }
                    return [2 /*return*/, new Promise(function (resolve) {
                            var promises = [];
                            var _loop_1 = function (k) {
                                var v = dt[k];
                                if (v instanceof File)
                                    promises.push(new Promise(function (r) {
                                        new doc_1.Doc().load(v).then(function (doc) {
                                            _this.setFieldValue(k, doc);
                                            r.call(_this);
                                        });
                                    }));
                                else
                                    _this.setFieldValue(k, v);
                            };
                            for (var _i = 0, _a = Object.keys(dt); _i < _a.length; _i++) {
                                var k = _a[_i];
                                _loop_1(k);
                            }
                            Promise.allSettled(promises).then(function () { return resolve.call(_this, item); });
                        })];
                });
            }); };
            /**
             * Is the field the row ID field?
             * @param {object} field Field definition
             * @return {boolean} True if the field is the row ID field
             * @function
             */
            this.isRowIdField = function (field) {
                return !field.ref && field.name === _this.metadata.rowidfield;
            };
            /**
             * Is the field a timestamp field?
             * @param {object} field Field definition
             * @return {boolean} True if the field is a timestamp field
             * @function
             */
            this.isTimestampField = function (field) {
                var n = field.name;
                return !field.ref && (n === 'created_by' || n === 'created_dt' || n === 'updated_by' || n === 'updated_dt');
            };
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
            this.getFilters = function (opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.getFilters';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var p = '';
                            if (opts.context)
                                p += '&context=' + encodeURIComponent(opts.context);
                            if (opts.reset)
                                p += '&reset=' + !!opts.reset;
                            ses.sendRequest(_this.path + '&action=filters' + p, undefined, function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    _this.filters = r.response;
                                    resolve.call(_this, _this.filters);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
            /**
             * Build context option parameters
             * @param {object} options Options
             * @return {string} Option parameters
             * @private
             */
            this.getReqContextOption = function (options) {
                return options.context ? "&context=".concat(encodeURIComponent(options.context)) : '';
            };
            /**
             * Build options parameters
             * @param {object} options Options
             * @return {string} Option parameters
             * @private
             */
            this.getReqOptions = function (options) {
                var opts = _this.getReqContextOption(options);
                var id = options.inlineDocs || options.inlineDocuments || options.inlineImages; // Naming flexibility
                if (id)
                    opts += "&inline_documents=".concat(encodeURIComponent(id.join ? id.join(',') : id));
                var it = options.inlineThumbs || options.inlineThumbnails; // Naming flexibility
                if (it)
                    opts += "&inline_thumbnails=".concat(encodeURIComponent(it.join ? it.join(',') : it));
                var io = options.inlineObjs || options.inlineObjects; // Naming flexibility
                if (io)
                    opts += "&inline_objects=".concat(encodeURIComponent(io.join ? io.join(',') : io));
                return opts;
            };
            /**
             * Convert usual wildcards to filters wildcards
             * @param {object} filter Filter
             * @return {string} Filter with wildcards converted
             * @private
             */
            this.convertFilterWildCards = function (filter) {
                return typeof filter === 'string' ? filter.replace(new RegExp('\\*', 'g'), '%').replace(new RegExp('\\?', 'g'), '_') : filter;
            };
            /**
             * Build request parameters
             * @param {object} data Data
             * @param {boolean} [filters] Filters? Used to convert wildcards if needed
             * @return {string} Request parameters
             * @private
             */
            this.getReqParams = function (data, filters) {
                var p = '';
                if (!data)
                    return p;
                for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                    var i = _a[_i];
                    var k = i[0];
                    var d = i[1] || '';
                    if (d instanceof doc_1.Doc)
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
                        for (var _b = 0, d_1 = d; _b < d_1.length; _b++) {
                            var dd = d_1[_b];
                            p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(filters ? _this.convertFilterWildCards(dd) : dd);
                        }
                    }
                    else {
                        p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(filters ? _this.convertFilterWildCards(d) : d);
                    }
                }
                return p;
            };
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
            this.getCount = function (filters, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.getCount';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var p = _this.getReqContextOption(opts);
                            if (opts.operations === true)
                                p += '&_operations=true';
                            _this.filters = filters || {};
                            ses.sendRequest("".concat(_this.getPath('count', opts)).concat(p), _this.getReqParams(_this.filters, true), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    _this.count = r.response.count;
                                    _this.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                                    _this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                                    _this.list = [];
                                    resolve.call(_this, _this.count);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
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
            this.search = function (filters, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.search';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var p = _this.getReqOptions(opts);
                            if (opts.page > 0)
                                p += "&page=".concat(opts.page - 1);
                            if (opts.metadata === true)
                                p += '&_md=true';
                            if (opts.visible === true)
                                p += '&_visible=true';
                            _this.filters = filters || {};
                            ses.sendRequest("".concat(_this.getPath('search', opts)).concat(p), _this.getReqParams(_this.filters, true), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    if (res.meta)
                                        _this.metadata = r.response.meta;
                                    _this.count = r.response.count;
                                    _this.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                                    _this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                                    _this.list = r.response.list;
                                    resolve.call(_this, _this.list);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
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
            this.get = function (rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.get';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var p = _this.getReqOptions(opts);
                            var tv = opts.treeView;
                            if (tv)
                                p += "&treeview=".concat(encodeURIComponent(tv));
                            if (opts.fields) {
                                for (var _i = 0, _a = opts.fields.length; _i < _a.length; _i++) {
                                    var f = _a[_i];
                                    p += "&fields=".concat(encodeURIComponent(f.replace('.', '__')));
                                }
                            }
                            if (opts.metadata)
                                p += '&_md=true';
                            if (opts.social)
                                p += '&_social=true';
                            ses.sendRequest("".concat(_this.getPath('get', opts), "&").concat(_this.metadata.rowidfield, "=").concat(encodeURIComponent(rowId || _this.getRowId())).concat(p), undefined, function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response type = ' + r.type);
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    if (r.response.meta)
                                        _this.metadata = r.response.meta;
                                    if (r.response.data)
                                        _this.item = tv ? r.response.data.item : r.response.data;
                                    else
                                        _this.item = tv ? r.response.item : r.response;
                                    resolve.call(_this, tv ? r.response : _this.item);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
            /**
             * Get for create
             * @param {object} [opts] Options
             * @param {boolean} [opts.metadata=false] Refresh meta data?
             * @param {function} [opts.error] Error handler function
             * @param {string} [opts.businessCase] Business case label
             * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
             * @function
             */
            this.getForCreate = function (opts) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    opts = opts || {};
                    delete opts.treeview; // Inhibited in this context
                    delete opts.fields; // Inhibited in this context
                    opts.context = constants_1.constants.CONTEXT_CREATE;
                    return [2 /*return*/, this.get(constants_1.constants.DEFAULT_ROW_ID, opts)];
                });
            }); };
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
            this.getForUpdate = function (rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    opts = opts || {};
                    delete opts.treeview; // Inhibited in this context
                    delete opts.fields; // Inhibited in this context
                    opts.context = constants_1.constants.CONTEXT_UPDATE;
                    return [2 /*return*/, this.get(rowId || this.getRowId(), opts)];
                });
            }); };
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
            this.getForCopy = function (rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    opts = opts || {};
                    delete opts.treeview; // Inhibited in this context
                    delete opts.fields; // Inhibited in this context
                    opts.context = constants_1.constants.CONTEXT_COPY;
                    return [2 /*return*/, this.get(rowId || this.getRowId(), opts)];
                });
            }); };
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
            this.getForDelete = function (rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    opts = opts || {};
                    delete opts.treeview; // Inhibited in this context
                    delete opts.fields; // Inhibited in this context
                    opts.context = constants_1.constants.CONTEXT_DELETE;
                    return [2 /*return*/, this.get(rowId || this.getRowId(), opts)];
                });
            }); };
            /**
             * Get specified or current item's row ID value
             * @param {object} [item] Item (defaults to current item)
             * @return {string} Item's row ID value
             * @function
             */
            this.getRowId = function (item) {
                item = item || _this.item;
                if (item)
                    return item[_this.getRowIdFieldName()];
            };
            /**
             * Populate
             * @param {object} [item] Item (defaults to current item)
             * @param {object} [opts] Options
             * @param {function} [opts.error] Error handler function
             * @param {string} [opts.businessCase] Business case label
             * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
             * @function
             */
            this.populate = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.populate';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (item)
                                _this.item = item;
                            ses.sendRequest("".concat(_this.getPath('populate', opts)).concat(_this.getReqOptions(opts)), _this.getReqParams(_this.item), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    _this.item = r.response.data ? r.response.data : r.response;
                                    resolve.call(_this, _this.item);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
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
            this.getFieldLinkedList = function (field, linkedField, code, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.getFieldLinkedList';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (typeof field !== 'string')
                                field = field.fullinput || field.name;
                            if (typeof linkedField !== 'string')
                                linkedField = linkedField.fullinput || linkedField.name;
                            var all = false;
                            if (code === true) {
                                all = true;
                                code = undefined;
                            }
                            else if (typeof code === 'undefined') {
                                code = _this.getFieldValue(field);
                            }
                            ses.sendRequest(_this.getPath('getlinkedlist', opts), _this.getReqParams({ origin: field, input: linkedField, code: code, all: all }), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    _this.item = r.response.result ? r.response.result : r.response;
                                    resolve.call(_this, _this.item);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
            /**
             * Save (create or update depending on item row ID value)
             * @param {object} [item] Item (defaults to current item)
             * @param {object} [opts] Options
             * @param {function} [opts.error] Error handler function
             * @param {string} [opts.businessCase] Business case label
             * @return {promise<object>} Promise to the saved record (also available as the <code>item</code> member)
             * @function
             */
            this.save = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
                var rowId;
                return __generator(this, function (_a) {
                    if (item)
                        this.item = item;
                    rowId = this.item[this.metadata.rowidfield];
                    if (!rowId || rowId === constants_1.constants.DEFAULT_ROW_ID)
                        return [2 /*return*/, this.create(item, opts)];
                    else
                        return [2 /*return*/, this.update(item, opts)];
                    return [2 /*return*/];
                });
            }); };
            /**
             * Create (create or update)
             * @param {object} [item] Item (defaults to current item)
             * @param {object} [opts] Options
             * @param {function} [opts.error] Error handler function
             * @param {string} [opts.businessCase] Business case label
             * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
             * @function
             */
            this.create = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.create';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (item)
                                _this.item = item;
                            _this.item.row_id = constants_1.constants.DEFAULT_ROW_ID;
                            ses.sendRequest("".concat(_this.getPath('create', opts)).concat(_this.getReqOptions(opts)), _this.getReqParams(_this.item), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    _this.item = r.response.data ? r.response.data : r.response;
                                    resolve.call(_this, _this.item);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
            /**
             * Update
             * @param {object} [item] Item (defaults to current item)
             * @param {object} [opts] Options
             * @param {function} [opts.error] Error handler function
             * @param {string} [opts.businessCase] Business case label
             * @return {promise<object>} Promise to the updated record (also available as the <code>item</code> member)
             * @function
             */
            this.update = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.update';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (item)
                                _this.item = item;
                            ses.sendRequest("".concat(_this.getPath('update', opts)).concat(_this.getReqOptions(opts)), _this.getReqParams(_this.item), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    _this.item = r.response.data ? r.response.data : r.response;
                                    resolve.call(_this, _this.item);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
            /**
             * Delete
             * @param {object} [item] Item (defaults to current item)
             * @param {object} [opts] Options
             * @param {function} [opts.error] Error handler function
             * @param {string} [opts.businessCase] Business case label
             * @return {promise<object>} Promise (the <code>item</code> member is emptied)
             * @function
             */
            this.del = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.del';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (item)
                                _this.item = item;
                            ses.sendRequest("".concat(_this.getPath('delete', opts), "&").concat(_this.metadata.rowidfield, "=").concat(encodeURIComponent(_this.item[_this.metadata.rowidfield])), undefined, function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    _this.item = undefined;
                                    delete r.response.undoredo;
                                    resolve.call(_this, r.response);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
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
            this.action = function (action, rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = "BusinessObject.action(".concat(action, ")");
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var p = rowId ? "&".concat(_this.getRowIdFieldName(), "=").concat(encodeURIComponent(rowId)) : '';
                            ses.sendRequest("".concat(_this.getPath(action, opts)).concat(p), _this.getReqParams(opts.parameters), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    var result = r.response.result;
                                    resolve.call(_this, result);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
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
            this.crosstab = function (ctb, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = "BusinessObject.crosstab(".concat(ctb, ")");
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (opts.filters)
                                _this.filters = opts.filters;
                            ses.sendRequest("".concat(_this.getPath(opts.cubes ? 'crosstabcubes' : 'crosstab', opts), "&crosstab=").concat(encodeURIComponent(ctb)), _this.getReqParams(opts.filters || _this.filters, true), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    resolve.call(_this, r.response);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
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
            this.print = function (prt, rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = "BusinessObject.print(".concat(prt, ")");
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (opts.filters)
                                _this.filters = opts.filters;
                            var p = '';
                            if (opts.all)
                                p += '&all=' + !!opts.all;
                            if (opts.mailing)
                                p += '&mailing=' + !!opts.mailing;
                            if (rowId)
                                p += "&".concat(_this.getRowIdFieldName(), "=").concat(encodeURIComponent(rowId));
                            ses.sendRequest("".concat(_this.getPath('print', opts), "&printtemplate=").concat(encodeURIComponent(prt)).concat(p), undefined, function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    resolve.call(_this, new doc_1.Doc(r.response));
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
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
            this.placemap = function (pcm, filters, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = "BusinessObject.placemap(".concat(pcm, ")");
                    ses = this.session;
                    this.filters = filters || {};
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (opts.filters)
                                _this.filters = opts.filters;
                            ses.sendRequest("".concat(_this.getPath('placemap', opts), "&placemap=").concat(encodeURIComponent(pcm)), _this.getReqParams(_this.filters, true), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    resolve.call(_this, r.response);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
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
            this.setParameter = function (param, value, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.setParameter';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var p = { name: param };
                            if (value)
                                p.value = value;
                            ses.sendRequest(_this.getPath('setparameter', opts), _this.getReqParams(p), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    var result = r.response.result;
                                    resolve.call(_this, result);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
            /**
             * Get an object parameter
             * @param {string} param Parameter name
             * @param {object} [opts] Options
             * @param {function} [opts.error] Error handler function
             * @param {string} [opts.businessCase] Business case label
             * @return {promise<object>} Promise to the parameter value
             * @function
             */
            this.getParameter = function (param, opts) { return __awaiter(_this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'BusinessObject.getParameter';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var p = { name: param };
                            ses.sendRequest(_this.getPath('getparameter', opts), _this.getReqParams(p), function (res, status) {
                                var r = ses.parseResponse(res, status);
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                                if (r.type === 'error') {
                                    var err = ses.getError(r.response, undefined, origin);
                                    if (!(opts.error || ses.error).call(_this, err))
                                        reject.call(_this, err);
                                }
                                else {
                                    var result = r.response.result;
                                    resolve.call(_this, result);
                                }
                            }, function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            }); };
            /**
             * Get an object resource URL
             * @param {string} code Resource code
             * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
             * @return {string} Object resource URL
             * @function
             */
            this.getResourceURL = function (code, type) {
                return _this.session.getResourceURL(code, type, _this.metadata.name, _this.metadata.id);
            };
            this.session = ses;
            var inst = instance || 'api_' + name;
            this.metadata = new businessobjectmetadata_1.BusinessObjectMetadata(name, inst);
            this.cacheKey = this.session.getBusinessObjectCacheKey(name, inst);
            this.path = this.session.parameters.objpath + '?object=' + encodeURIComponent(name) + '&inst=' + encodeURIComponent(inst);
            this.item = {};
            this.filters = {};
            this.list = [];
        }
        /**
         * Get path
         * @param {string} action Action
         * @param {object} [opts] Options
         * @param {string} [opts.businessCase] Business case label
         */
        BusinessObject.prototype.getPath = function (action, opts) {
            var bc = opts && opts.businessCase ? "&_bc=".concat(encodeURIComponent(opts.businessCase)) : '';
            return "".concat(this.path, "&action=").concat(encodeURIComponent(action)).concat(bc);
        };
        return BusinessObject;
    }());
    exports.BusinessObject = BusinessObject;
});
//# sourceMappingURL=businessobject.js.map