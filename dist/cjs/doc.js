"use strict";
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
        /**
         * Alias to <code>getMIMEType</code>
         * @return {string} MIME type
         * @function
         */
        this.getMimeType = this.getMIMEType;
        /**
         * Alias to <code>setMIMEType</code>
         * @param {string} mime MIME type
         * @function
         */
        this.setMimeType = this.setMIMEType;
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
        Object.assign(this, typeof value == 'string' ? { name: value } : value || {});
        // Backward compatibility
        if (this['filename'] && !this.name) {
            this.name = this['filename'];
            this['filename'] = undefined;
        }
    }
    /**
     * Get the document ID
     * @return {string} ID
     * @function
     */
    Doc.prototype.getId = function () {
        return this.id;
    };
    /**
     * Get the document MIME type
     * @return {string} MIME type
     * @function
     */
    Doc.prototype.getMIMEType = function () {
        return this.mime;
    };
    /**
     * Set the document MIME type
     * @param {string} mime MIME type
     * @return {Doc} This document for chaining
     * @function
     */
    Doc.prototype.setMIMEType = function (mime) {
        this.mime = mime;
        return this; // Chain
    };
    /**
     * Get the document name
     * @return {string} Name
     * @function
     */
    Doc.prototype.getName = function () {
        return this.name;
    };
    /**
     * Set the document name
     * @param {string} name Name
     * @return {Doc} This document for chaining
     * @function
     */
    Doc.prototype.setName = function (name) {
        this.name = name;
        return this; // Chain
    };
    Doc.prototype.cleanContent = function (content) {
        return content.startsWith('data:') ? content.replace(/data:.*;base64,/, '') : content;
    };
    /**
     * Get the document content (encoded in base 64)
     * @return {string} Content
     * @function
     */
    Doc.prototype.getContent = function () {
        return this.content;
    };
    /**
     * Get the document thumbnail (encoded in base 64)
     * @return {string} Thumbnail
     * @function
     */
    Doc.prototype.getThumbnail = function () {
        return this.thumbnail;
    };
    ;
    /**
     * Get the document content as a buffer
     * @param {any} data Content data
     * @return {buffer} Content data as buffer
     * @private
     */
    Doc.prototype.getBuffer = function (data) {
        return Buffer.from(data, 'base64');
    };
    /**
     * Get the document content as an array buffer
     * @return {ArrayBuffer} Content as an array buffer
     * @function
     */
    Doc.prototype.getContentAsArrayBuffer = function () {
        return this.getBuffer(this.content).buffer;
    };
    /**
     * Get the document thumbnail as an array buffer
     * @return {ArrayBuffer} Thumbnail as an array buffer
     * @function
     */
    Doc.prototype.getThumbnailAsArrayBuffer = function () {
        return this.getBuffer(this.thumbnail || '').buffer;
    };
    /**
     * Get the document content as a text
     * @return {string} Content as plain text
     * @function
     */
    Doc.prototype.getContentAsText = function () {
        return this.getBuffer(this.content).toString('utf-8');
    };
    /**
     * Set the document content
     * @param {string} content Content (encoded in base 64)
     * @return {Doc} This document for chaining
     * @function
     */
    Doc.prototype.setContent = function (content) {
        this.content = this.cleanContent(content);
        return this; // Chain
    };
    /**
     * Set the document content from plain text string
     * @param {string} content Content as plain text string
     * @return {Doc} This document for chaining
     * @function
     */
    Doc.prototype.setContentFromText = function (content) {
        this.content = Buffer.from(content, 'utf-8').toString('base64');
        return this; // Chain
    };
    /**
     * Get the document data URL
     * @param {boolean} [thumbnail=false] Thumbnail? If thumbnail does not exists the content is used.
     * @return {string} Data URL or nothing if content is empty
     * @function
     */
    Doc.prototype.getDataURL = function (thumbnail) {
        if (this.content)
            return 'data:' + this.mime + ';base64,' + (thumbnail && this.thumbnail ? this.thumbnail : this.content);
    };
    /**
     * Load file
     * @param file File to load
     * @return {promise<Doc>} A promise to the document
     * @function
     */
    Doc.prototype.load = function (file) {
        return __awaiter(this, void 0, void 0, function () {
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
        });
    };
    /**
     * Get the document as a plain value object
     * @return {object} Value object
     * @function
     */
    Doc.prototype.getValue = function () {
        return {
            id: this.id,
            name: this['filename'] && !this.name ? this['filename'] : this.name, // Backward compatibility
            mime: this.mime,
            content: this.content,
            thumbnail: this.thumbnail
        };
    };
    return Doc;
}());
exports.Doc = Doc;
//# sourceMappingURL=doc.js.map