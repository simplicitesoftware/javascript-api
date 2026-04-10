/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 3.1.6
 * @license Apache-2.0
 */

import { constants } from './constants.js';
import { Doc } from './doc.js';
import { Grant } from './grant.js';
import { BusinessObjectMetadata } from './businessobjectmetadata.js';
import { BusinessObject } from './businessobject.js';
import { ExternalObjectMetadata } from './externalobjectmetadata.js';
import { ExternalObject } from './externalobject.js';
import { SessionParams } from './sessionparams.js';
import { Session } from './session.js';

/**
 * Simplicite application session. Same as <code>new Session(parameter)</code>.
 * @param {object} params Parameters (see session class for details)
 * @return {Session} session
 */
const session = (params: SessionParams): Session => {
	return new Session(params);
};

export default {
	constants,
	session: session,
	Session,
	Doc,
	Grant,
	BusinessObjectMetadata,
	BusinessObject,
	ExternalObjectMetadata,
	ExternalObject
};
