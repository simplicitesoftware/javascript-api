/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 3.1.4
 * @license Apache-2.0
 */

import { constants } from './constants';
import { Doc } from './doc';
import { Grant } from './grant';
import { BusinessObjectMetadata } from './businessobjectmetadata';
import { BusinessObject } from './businessobject';
import { ExternalObjectMetadata } from './externalobjectmetadata';
import { ExternalObject } from './externalobject';
import { SessionParams } from './sessionparams';
import { Session } from './session';

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
