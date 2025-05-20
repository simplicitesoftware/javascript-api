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
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Doc = void 0;
    /**
     * Document
     * @class
     */
    var Doc = /** @class */ (function () {
        /**
         * Constructor
         * @param [value] {string|object} Document name or value
         * @param [value.name] Document name
         * @param [value.mime] Document MIME type
         * @param [value.content] Document content
         */
        function Doc(value) {
            var _this = this;
            /**
             * Get the document ID
             * @return {string} ID
             * @function
             */
            this.getId = function () {
                return _this.id;
            };
            /**
             * Get the document MIME type
             * @return {string} MIME type
             * @function
             */
            this.getMIMEType = function () {
                return _this.mime;
            };
            /**
             * Alias to <code>getMIMEType</code>
             * @return {string} MIME type
             * @function
             */
            this.getMimeType = this.getMIMEType;
            /**
             * Set the document MIME type
             * @param {string} mime MIME type
             * @return {Doc} This document for chaining
             * @function
             */
            this.setMIMEType = function (mime) {
                _this.mime = mime;
                return _this; // Chain
            };
            /**
             * Alias to <code>setMIMEType</code>
             * @param {string} mime MIME type
             * @function
             */
            this.setMimeType = this.setMIMEType;
            /**
             * Get the document name
             * @return {string} Name
             * @function
             */
            this.getName = function () {
                return _this.name;
            };
            /**
             * Alias to <code>getName</code>
             * @return {string} Name
             * @function
             */
            this.getFileName = this.getName;
            /**
             * Alias to <code>getName</code>
             * @return {string} Name
             * @function
             */
            this.getFilename = this.getName;
            /**
             * Set the document name
             * @param {string} name Name
             * @return {Doc} This document for chaining
             * @function
             */
            this.setName = function (name) {
                _this.name = name;
                return _this; // Chain
            };
            /**
             * Alias to <code>setName</code>
             * @param {string} name Name
             * @function
             */
            this.setFileName = this.setName;
            /**
             * Alias to <code>setName</code>
             * @param {string} name Name
             * @function
             */
            this.setFilename = this.setName;
            /**
             * Get the document content (encoded in base 64)
             * @return {string} Content
             * @function
             */
            this.getContent = function () {
                return _this.content;
            };
            /**
             * Get the document thumbnail (encoded in base 64)
             * @return {string} Thumbnail
             * @function
             */
            this.getThumbnail = function () {
                return _this.thumbnail;
            };
            /**
             * Get the document content as an array buffer
             * @return {ArrayBuffer} Content as an array buffer
             * @function
             */
            this.getContentAsArrayBuffer = function () {
                return _this.getBuffer(_this.content).buffer;
            };
            /**
             * Get the document thumbnail as an array buffer
             * @return {ArrayBuffer} Thumbnail as an array buffer
             * @function
             */
            this.getThumbnailAsArrayBuffer = function () {
                return _this.getBuffer(_this.thumbnail || '').buffer;
            };
            /**
             * Get the document content as a text
             * @return {string} Content as plain text
             * @function
             */
            this.getContentAsText = function () {
                return _this.getBuffer(_this.content).toString('utf-8');
            };
            /**
             * Set the document content
             * @param {string} content Content (encoded in base 64)
             * @return {Doc} This document for chaining
             * @function
             */
            this.setContent = function (content) {
                _this.content = _this.cleanContent(content);
                return _this; // Chain
            };
            /**
             * Set the document content from plain text string
             * @param {string} content Content as plain text string
             * @return {Doc} This document for chaining
             * @function
             */
            this.setContentFromText = function (content) {
                _this.content = Buffer.from(content, 'utf-8').toString('base64');
                return _this; // Chain
            };
            /**
             * Get the document data URL
             * @param {boolean} [thumbnail=false] Thumbnail? If thumbnail does not exists the content is used.
             * @return {string} Data URL or nothing if content is empty
             * @function
             */
            this.getDataURL = function (thumbnail) {
                if (_this.content)
                    return 'data:' + _this.mime + ';base64,' + (thumbnail && _this.thumbnail ? _this.thumbnail : _this.content);
            };
            /**
             * Load file
             * @param file File to load
             * @return {promise<Doc>} A promise to the document
             * @function
             */
            this.load = function (file) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            try {
                                if (file) {
                                    _this.name = file.name;
                                    _this.mime = file.type;
                                    var reader_1 = new FileReader();
                                    reader_1.onload = function () {
                                        _this.content = reader_1.result ? _this.cleanContent(reader_1.result) : '';
                                        resolve(_this);
                                    };
                                    reader_1.readAsDataURL(file); // this sets the result as a string
                                }
                                else {
                                    _this.content = '';
                                    resolve(_this);
                                }
                            }
                            catch (e) {
                                reject(e);
                            }
                        })];
                });
            }); };
            /**
             * Get the document as a plain value object
             * @return {object} Value object
             * @function
             */
            this.getValue = function () {
                return {
                    id: _this.id,
                    name: _this['filename'] && !_this.name ? _this['filename'] : _this.name, // Backward compatibility
                    mime: _this.mime,
                    content: _this.content,
                    thumbnail: _this.thumbnail
                };
            };
            Object.assign(this, typeof value == 'string' ? { name: value } : value || {});
            // Backward compatibility
            if (this['filename'] && !this.name) {
                this.name = this['filename'];
                this['filename'] = undefined;
            }
        }
        Doc.prototype.cleanContent = function (content) {
            return content.startsWith('data:') ? content.replace(/data:.*;base64,/, '') : content;
        };
        /**
         * Get the document content as a buffer
         * @param {any} data Content data
         * @return {buffer} Content data as buffer
         * @private
         */
        Doc.prototype.getBuffer = function (data) {
            return Buffer.from(data, 'base64');
        };
        return Doc;
    }());
    exports.Doc = Doc;
});
//# sourceMappingURL=doc.js.map