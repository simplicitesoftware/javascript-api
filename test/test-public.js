import simplicite from '../dist/esm/simplicite.js';
import assert from 'assert';

const app = simplicite.session({
	url: process && process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	endpoint: 'uipublic',
	debug: process && process.env.TEST_SIMPLICITE_DEBUG === 'true'
});

app.info('Version: ' + simplicite.constants.MODULE_VERSION);
app.debug('Parameters', app.parameters);

const obj = app.getBusinessObject('WebNews');

obj.search().then(res => {
	app.debug(res);
	assert.ok(res);
	assert.ok(res.length);
	app.info('OK');
}).catch(err => {
	app.error(err);
});
