/**
 * Document
 * @class
 */
declare class Doc {
    /**
     * Constructor
     * @param [value] {string|object} Document name or value
     * @param [value.name] Document name
     * @param [value.mime] Document MIME type
     * @param [value.content] Document content
     */
    constructor(value?: any);
    /**
     * Document ID
     * @member {string}
     */
    id?: string;
    /**
     * Document MIME type
     * @member {string}
     */
    mime?: string;
    /**
     * Document name
     * @member {string}
     */
    name?: string;
    /**
     * Document content as base 64
     * @member {string}
     */
    content?: string;
    /**
     * Document thumbnail as base 64
     * @member {string}
     */
    thumbnail?: string;
    /**
     * Get the document ID
     * @return {string} ID
     * @function
     */
    getId: () => string;
    /**
     * Get the document MIME type
     * @return {string} MIME type
     * @function
     */
    getMIMEType: () => string;
    /**
     * Alias to <code>getMIMEType</code>
     * @return {string} MIME type
     * @function
     */
    getMimeType: () => string;
    /**
     * Set the document MIME type
     * @param {string} mime MIME type
     * @return {Doc} This document for chaining
     * @function
     */
    setMIMEType: (mime: string) => Doc;
    /**
     * Alias to <code>setMIMEType</code>
     * @param {string} mime MIME type
     * @function
     */
    setMimeType: (mime: string) => Doc;
    /**
     * Get the document name
     * @return {string} Name
     * @function
     */
    getName: () => string;
    /**
     * Alias to <code>getName</code>
     * @return {string} Name
     * @function
     */
    getFileName: () => string;
    /**
     * Alias to <code>getName</code>
     * @return {string} Name
     * @function
     */
    getFilename: () => string;
    /**
     * Set the document name
     * @param {string} name Name
     * @return {Doc} This document for chaining
     * @function
     */
    setName: (name: string) => Doc;
    /**
     * Alias to <code>setName</code>
     * @param {string} name Name
     * @function
     */
    setFileName: (name: string) => Doc;
    /**
     * Alias to <code>setName</code>
     * @param {string} name Name
     * @function
     */
    setFilename: (name: string) => Doc;
    private cleanContent;
    /**
     * Get the document content (encoded in base 64)
     * @return {string} Content
     * @function
     */
    getContent: () => string;
    /**
     * Get the document thumbnail (encoded in base 64)
     * @return {string} Thumbnail
     * @function
     */
    getThumbnail: () => string;
    /**
     * Get the document content as a buffer
     * @param {any} data Content data
     * @return {buffer} Content data as buffer
     * @private
     */
    private getBuffer;
    /**
     * Get the document content as an array buffer
     * @return {ArrayBuffer} Content as an array buffer
     * @function
     */
    getContentAsArrayBuffer: () => ArrayBuffer;
    /**
     * Get the document thumbnail as an array buffer
     * @return {ArrayBuffer} Thumbnail as an array buffer
     * @function
     */
    getThumbnailAsArrayBuffer: () => ArrayBuffer;
    /**
     * Get the document content as a text
     * @return {string} Content as plain text
     * @function
     */
    getContentAsText: () => string;
    /**
     * Set the document content
     * @param {string} content Content (encoded in base 64)
     * @return {Doc} This document for chaining
     * @function
     */
    setContent: (content: string) => Doc;
    /**
     * Set the document content from plain text string
     * @param {string} content Content as plain text string
     * @return {Doc} This document for chaining
     * @function
     */
    setContentFromText: (content: string) => Doc;
    /**
     * Get the document data URL
     * @param {boolean} [thumbnail=false] Thumbnail? If thumbnail does not exists the content is used.
     * @return {string} Data URL or nothing if content is empty
     * @function
     */
    getDataURL: (thumbnail?: boolean) => string;
    /**
     * Load file
     * @param file File to load
     * @return {promise<Doc>} A promise to the document
     * @function
     */
    load: (file?: File) => Promise<Doc>;
    /**
     * Get the document as a plain value object
     * @return {object} Value object
     * @function
     */
    getValue: () => any;
}
export { Doc };
