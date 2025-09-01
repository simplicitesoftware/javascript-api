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
	constructor(value?: any) {
		Object.assign(this, typeof value == 'string' ? { name: value } : value || {});

		// Backward compatibility
		if (this['filename'] && !this.name) {
			this. name = this['filename'];
			this['filename'] = undefined;
		}
	}

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
	public getId(): string {
		return this.id;
	}

	/**
	 * Get the document MIME type
	 * @return {string} MIME type
	 * @function
	 */
	public getMIMEType(): string {
		return this.mime;
	}

	/**
	 * Alias to <code>getMIMEType</code>
	 * @return {string} MIME type
	 * @function
	 */
	public getMimeType = this.getMIMEType;

	/**
	 * Set the document MIME type
	 * @param {string} mime MIME type
	 * @return {Doc} This document for chaining
	 * @function
	 */
	public setMIMEType(mime: string): Doc {
		this.mime = mime;
		return this; // Chain
	}

	/**
	 * Alias to <code>setMIMEType</code>
	 * @param {string} mime MIME type
	 * @function
	 */
	public setMimeType = this.setMIMEType;

	/**
	 * Get the document name
	 * @return {string} Name
	 * @function
	 */
	public getName(): string {
		return this.name;
	}

	/**
	 * Alias to <code>getName</code>
	 * @return {string} Name
	 * @function
	 */
	public getFileName = this.getName;

	/**
	 * Alias to <code>getName</code>
	 * @return {string} Name
	 * @function
	 */
	public getFilename = this.getName;

	/**
	 * Set the document name
	 * @param {string} name Name
	 * @return {Doc} This document for chaining
	 * @function
	 */
	public setName(name: string): Doc {
		this.name = name;
		return this; // Chain
	}

	/**
	 * Alias to <code>setName</code>
	 * @param {string} name Name
	 * @function
	 */
	public setFileName = this.setName;

	/**
	 * Alias to <code>setName</code>
	 * @param {string} name Name
	 * @function
	 */
	public setFilename = this.setName;

	private cleanContent(content: string): string {
		return content.startsWith('data:') ? content.replace(/data:.*;base64,/, '') : content;
	}

	/**
	 * Get the document content (encoded in base 64)
	 * @return {string} Content
	 * @function
	 */
	public getContent(): string {
		return this.content;
	}

	/**
	 * Get the document thumbnail (encoded in base 64)
	 * @return {string} Thumbnail
	 * @function
	 */
	public getThumbnail(): string {
		return this.thumbnail;
	};

	/**
	 * Get the document content as a buffer
	 * @param {any} data Content data
	 * @return {buffer} Content data as buffer
	 * @private
	 */
	private getBuffer(data: any): Buffer {
		return Buffer.from(data, 'base64');
	}

	/**
	 * Get the document content as an array buffer
	 * @return {ArrayBuffer} Content as an array buffer
	 * @function
	 */
	public getContentAsArrayBuffer(): ArrayBuffer {
		return this.getBuffer(this.content).buffer as ArrayBuffer;
	}

	/**
	 * Get the document thumbnail as an array buffer
	 * @return {ArrayBuffer} Thumbnail as an array buffer
	 * @function
	 */
	public getThumbnailAsArrayBuffer(): ArrayBuffer {
		return this.getBuffer(this.thumbnail || '').buffer as ArrayBuffer;
	}

	/**
	 * Get the document content as a text
	 * @return {string} Content as plain text
	 * @function
	 */
	public getContentAsText(): string {
		return this.getBuffer(this.content).toString('utf-8');
	}

	/**
	 * Set the document content
	 * @param {string} content Content (encoded in base 64)
	 * @return {Doc} This document for chaining
	 * @function
	 */
	public setContent(content: string): Doc {
		this.content = this.cleanContent(content);
		return this; // Chain
	}

	/**
	 * Set the document content from plain text string
	 * @param {string} content Content as plain text string
	 * @return {Doc} This document for chaining
	 * @function
	 */
	public setContentFromText(content: string): Doc {
		this.content = Buffer.from(content, 'utf-8').toString('base64');
		return this; // Chain
	}

	/**
	 * Get the document data URL
	 * @param {boolean} [thumbnail=false] Thumbnail? If thumbnail does not exists the content is used.
	 * @return {string} Data URL or nothing if content is empty
	 * @function
	 */
	public getDataURL(thumbnail?: boolean): string {
		if (this.content)
			return 'data:' + this.mime + ';base64,' + (thumbnail && this.thumbnail ? this.thumbnail : this.content);
	}

	/**
	 * Load file
	 * @param file File to load
	 * @return {promise<Doc>} A promise to the document
	 * @function
	 */
	public async load(file?: File): Promise<Doc> {
		return new Promise((resolve, reject) => {
			try {
				if (file) {
					this.name = file.name;
					this.mime = file.type;
					const reader = new FileReader();
					reader.onload = () => {
						this.content = reader.result ? this.cleanContent(reader.result as string) : '';
						resolve(this);
					};
					reader.readAsDataURL(file); // this sets the result as a string
				} else {
					this.content = '';
					resolve(this);
				}
			} catch (e: any) {
				reject(e);
			}
		});
	}

	/**
	 * Get the document as a plain value object
	 * @return {object} Value object
	 * @function
	 */
	public getValue(): any {
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