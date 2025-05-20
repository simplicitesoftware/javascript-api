var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Document
 * @class
 */
class Doc {
    /**
     * Constructor
     * @param [value] {string|object} Document name or value
     * @param [value.name] Document name
     * @param [value.mime] Document MIME type
     * @param [value.content] Document content
     */
    constructor(value) {
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
    getId() {
        return this.id;
    }
    /**
     * Get the document MIME type
     * @return {string} MIME type
     * @function
     */
    getMIMEType() {
        return this.mime;
    }
    /**
     * Set the document MIME type
     * @param {string} mime MIME type
     * @return {Doc} This document for chaining
     * @function
     */
    setMIMEType(mime) {
        this.mime = mime;
        return this; // Chain
    }
    /**
     * Get the document name
     * @return {string} Name
     * @function
     */
    getName() {
        return this.name;
    }
    /**
     * Set the document name
     * @param {string} name Name
     * @return {Doc} This document for chaining
     * @function
     */
    setName(name) {
        this.name = name;
        return this; // Chain
    }
    cleanContent(content) {
        return content.startsWith('data:') ? content.replace(/data:.*;base64,/, '') : content;
    }
    /**
     * Get the document content (encoded in base 64)
     * @return {string} Content
     * @function
     */
    getContent() {
        return this.content;
    }
    /**
     * Get the document thumbnail (encoded in base 64)
     * @return {string} Thumbnail
     * @function
     */
    getThumbnail() {
        return this.thumbnail;
    }
    ;
    /**
     * Get the document content as a buffer
     * @param {any} data Content data
     * @return {buffer} Content data as buffer
     * @private
     */
    getBuffer(data) {
        return Buffer.from(data, 'base64');
    }
    /**
     * Get the document content as an array buffer
     * @return {ArrayBuffer} Content as an array buffer
     * @function
     */
    getContentAsArrayBuffer() {
        return this.getBuffer(this.content).buffer;
    }
    /**
     * Get the document thumbnail as an array buffer
     * @return {ArrayBuffer} Thumbnail as an array buffer
     * @function
     */
    getThumbnailAsArrayBuffer() {
        return this.getBuffer(this.thumbnail || '').buffer;
    }
    /**
     * Get the document content as a text
     * @return {string} Content as plain text
     * @function
     */
    getContentAsText() {
        return this.getBuffer(this.content).toString('utf-8');
    }
    /**
     * Set the document content
     * @param {string} content Content (encoded in base 64)
     * @return {Doc} This document for chaining
     * @function
     */
    setContent(content) {
        this.content = this.cleanContent(content);
        return this; // Chain
    }
    /**
     * Set the document content from plain text string
     * @param {string} content Content as plain text string
     * @return {Doc} This document for chaining
     * @function
     */
    setContentFromText(content) {
        this.content = Buffer.from(content, 'utf-8').toString('base64');
        return this; // Chain
    }
    /**
     * Get the document data URL
     * @param {boolean} [thumbnail=false] Thumbnail? If thumbnail does not exists the content is used.
     * @return {string} Data URL or nothing if content is empty
     * @function
     */
    getDataURL(thumbnail) {
        if (this.content)
            return 'data:' + this.mime + ';base64,' + (thumbnail && this.thumbnail ? this.thumbnail : this.content);
    }
    /**
     * Load file
     * @param file File to load
     * @return {promise<Doc>} A promise to the document
     * @function
     */
    load(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    if (file) {
                        this.name = file.name;
                        this.mime = file.type;
                        const reader = new FileReader();
                        reader.onload = () => {
                            this.content = reader.result ? this.cleanContent(reader.result) : '';
                            resolve(this);
                        };
                        reader.readAsDataURL(file); // this sets the result as a string
                    }
                    else {
                        this.content = '';
                        resolve(this);
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    /**
     * Get the document as a plain value object
     * @return {object} Value object
     * @function
     */
    getValue() {
        return {
            id: this.id,
            name: this['filename'] && !this.name ? this['filename'] : this.name, // Backward compatibility
            mime: this.mime,
            content: this.content,
            thumbnail: this.thumbnail
        };
    }
}
export { Doc };
//# sourceMappingURL=doc.js.map