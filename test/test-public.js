import simplicite from '../build/esm/simplicite.js';
import assert from 'assert';

const debug = process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = simplicite.session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	endpoint: 'public',
	debug: debug
});

app.debug('Parameters', app.parameters);

const obj = app.getBusinessObject('WebNews');

obj.search().then(res => {
	app.debug(res);
	assert.ok(res);
	assert.ok(res.length);
}).catch(err => {
	app.error(err);
});
