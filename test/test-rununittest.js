import simplicite from '../dist/esm/simplicite.js';

const app = simplicite.session({
	url: process && process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	username: process && process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer',
	password: process && process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer',
	debug: process && process.env.TEST_SIMPLICITE_DEBUG === 'true'
});

try {
	const user = await app.login();
	app.info(`Logged in as ${user.login}`);

	const scr = await app.getBusinessObject('Script');
	const list = await scr.search({ scr_code: 'DemoTests' });
	const res = await scr.action('scriptRunTestClass', list[0].row_id);
	app.info(JSON.stringify(res, null, 2));

	await app.logout();
	app.info(`${user.login} logged out`);

	app.info('OK');
} catch(err) {
	app.error('Catched error: ' + (err.message || JSON.stringify(err)));
}
