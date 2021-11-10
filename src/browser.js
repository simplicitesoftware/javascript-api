import simplicite from '../dist/esm/simplicite.js';

if (typeof globalThis !== 'undefined')
	// eslint-disable-next-line no-undef
	globalThis.simplicite = simplicite;
else if (typeof self !== 'undefined')
	self.simplicite = simplicite;
else if (typeof window !== 'undefined')
	window.simplicite = simplicite;
else if (typeof global !== 'undefined')
	global.simplicite = simplicite;
else
	throw new Error('Unable to find global object');
