const assert = require('assert').strict;

const debug = true;//process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	endpoint: 'public',
	debug: debug
});
if (debug) console.log(app.parameters);

const obj = app.getBusinessObject('WebNews');

obj.search().then(res => {
	if (debug) console.log(res);
}).catch(err => {
	console.error(err);
});
