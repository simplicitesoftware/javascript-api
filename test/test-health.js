const assert = require('assert').strict;

const debug = process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	debug: debug
});
if (debug) console.log(app.parameters);

app.getHealth().then(health => {
	delete health._scope; // Clean scope from response
	if (debug) console.log(health);
	assert.ok(health.platform.status == 'OK');
	console.log('Status = ' + health.platform.status);
}).catch(err => {
	delete err._scope; // Clean scope from response
	console.error(err);
});
