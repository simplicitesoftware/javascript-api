import s from '../dist/esm/simplicite.js';

if (typeof globalThis !== 'undefined')
	// eslint-disable-next-line no-undef
	globalThis.simplicite = s;
else if (typeof self !== 'undefined')
	self.simplicite = s;
else if (typeof window !== 'undefined')
	window.simplicite = s;
else if (typeof global !== 'undefined')
	global.simplicite = s;
else
	throw new Error('Unable to find global object');
