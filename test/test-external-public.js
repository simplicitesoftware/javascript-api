import simplicite from '../dist/esm/simplicite.js';
import assert from 'assert';

const app = simplicite.session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	endpoint: 'public',
	debug: process.env.TEST_SIMPLICITE_DEBUG == 'true'
});

app.debug('Parameters', app.parameters);

const params = { name: 'Simplicite public (URL parameter)' };
const data = { name: 'Simplicite public (posted in JSON)' };

let ext = app.getExternalObject('AppExt2');
ext.call(params).then(res => { // GET call
	app.info(res);
	assert.ok(res.method == 'get');
	return ext.call(null, data); // POST call without params
}).then(res => {
	app.info(res);
	assert.ok(res.method == 'post');
	return ext.call(params, data); // POST call with params
}).then(res => {
	app.info(res);
	assert.ok(res.method == 'post');
}).catch(err => {
	app.error(err);
});
