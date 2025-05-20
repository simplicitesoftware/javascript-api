import { ExternalObjectMetadata } from './externalobjectmetadata';
import { Session } from './session';

/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instantiate this class directly
 * but rather call <code>getExternalObject</code></span>.
 * @class
 */
class ExternalObject {
	/**
	 * Constructor
	 * @param {Session} ses Session
	 * @param {string} name Business object name
	 */
	constructor(ses: Session, name: string) {
		this.session = ses;

		this.metadata = new ExternalObjectMetadata(name);
		this.path = `${this.session.parameters.extpath}/${encodeURIComponent(name)}`;
	}

	/**
	 * Session
	 * @member {Session}
	 * @private
	 */
	private session: Session;

	/**
	 * Metadata
	 * @member {ExternalObjectMetadata}
	 */
	public metadata: ExternalObjectMetadata;

	/**
	 * Path
	 * @member {string}
	 * @private
	 */
	private path: string;

	/**
	 * Get name
	 * @return {string} Name
	 * @function
	 */
	public getName(): string {
		return this.metadata.name;
	}

	/**
	 * Build URL-encoded parameters
	 * @param {object} params URL parameters as key/value pairs
	 * @return {string} URL-encoded parameters
	 * @function
	 */
	public callParams(params: any): string {
		let p = '';
		if (!params) return p;
		for (const i of Object.entries(params)) {
			const k: string = i[0];
			const v: any = i[1] || '';
			if (v.sort) { // Array ?
				for (const vv of v)
					p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(vv);
			} else {
				p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(v);
			}
		}
		return p;
	}

	/**
	 * Call an external object
	 * @param {object} [params] Optional URL parameters
	 * @param {object|string|FormData} [data] Optional body data (for 'POST' and 'PUT' methods only)
	 * @param {object} [opts] Options
	 * @param {string} [opts.path] Absolute or relative path (e.g. absolute '/my/mapped/path' or relative 'my/additional/path')
	 * @param {object} [opts.method] Optional method 'GET', 'POST', 'PUT' or 'DELETE' (defaults to 'GET' if data is not set or 'POST' if data is set)
	 * @param {function} [opts.contentType] Optional data content type (for 'POST' and 'PUT' methods only)
	 * @param {function} [opts.accept] Optional accepted response type (e.g. 'application/json")
	 * @param {function} [opts.error] Error handler function
	 * @param {string} [opts.businessCase] Business case label
	 * @return {promise<object>} Promise to the external object content
	 * @function
	 */
	public async call(params?: any, data?: string|FormData|any, opts?: any): Promise<any> {
		const origin = 'ExternalObject.call';
		const ses: Session = this.session;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p = '';
			if (params)
				p = this.callParams(params);
			if (opts.businessCase)
				p += `_bc=${encodeURIComponent(opts.businessCase)}`;
			const m: string = opts.method ? opts.method.toUpperCase() : (data ? 'POST' : 'GET');
			const h: any = {};
			if (opts.contentType) {
				h['content-type'] = opts.contentType;
			} else if (data && !(data instanceof FormData)) { // Try to guess type...
				h['content-type'] = typeof data === 'string' ? 'application/x-www-form-urlencoded' : 'application/json';
			} // FormData = multipart/form-data with boundary string => handled by fetch
			//if (ses.parameters.compress)
			//	h['content-encoding'] = 'gzip';
			if (opts.accept)
				h.accept = opts.accept === 'json' ? 'application/json' : opts.accept;
			let b: string = ses.getBearerTokenHeader();
			if (b) {
				h[ses.authheader] = b;
			} else {
				b = ses.getBasicAuthHeader();
				if (b)
					h[ses.authheader] = b;
			}
			const u: string = ses.parameters.url + (opts.path && opts.path.startsWith('/') ? opts.path : this.path + (opts.path ? '/' + opts.path : '')) + (p !== '' ? '?' + p : '');
			const d: any = data ? (typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data)) : undefined;
			ses.debug('[simplicite.ExternalObject.call] ' + m + ' ' + u + (d ? ' with ' + d : ''));
			fetch(u, {
				method: m,
				headers: h,
				//compress: ses.parameters.compress,
				signal: AbortSignal.timeout(ses.parameters.timeout),
				body: d
			}).then((res: any) => {
				const type: string = res.headers.get('content-type');
				ses.debug(`[${origin}] HTTP status = ${res.status}, response content type = ${type}`);
				if (type && type.startsWith('application/json')) { // JSON
					res.json().then(jsonData => {
						resolve.call(this, jsonData, res.status, res.headers);
					}).catch((err: any) => {
						err = ses.getError(err, undefined, origin);
						if (!(opts.error || ses.error).call(this, err)) reject.call(this, err);
					});
				} else if (type && (type.startsWith('text/') || type.startsWith('application/yaml'))) { // Text
					res.text().then(textData => {
						resolve.call(this, textData, res.status, res.headers);
					}).catch((err: any) => {
						err = ses.getError(err, undefined, origin);
						if (!(opts.error || ses.error).call(this, err)) reject.call(this, err);
					});
				} else { // Binary
					res.arrayBuffer().then(binData => {
						resolve.call(this, binData, res.status, res.headers);
					}).catch((err: any) => {
						err = ses.getError(err, undefined, origin);
						if (!(opts.error || ses.error).call(this, err)) reject.call(this, err);
					});
				}
			}).catch((err: any) => {
				err = ses.getError(err, undefined, origin);
				if (!(opts.error || ses.error).call(this, err)) reject.call(this, err);
			});
		});
	}

	/**
	 * Alias to <code>call</code>
	 * @function
	 */
	public invoke = this.call;
}

export { ExternalObject };