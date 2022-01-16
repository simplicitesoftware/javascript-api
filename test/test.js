import simplicite from '../dist/esm/simplicite.js';

const app = simplicite.session({ url: 'http://localhost:8080', debug: false });
app.info(`Version: ${simplicite.constants.MODULE_VERSION}`);
app.debug('Parameters', app.parameters);

try {
	const user = await app.login({ username: 'designer', password: 'designer' });
	app.debug(user);
	app.info(`Logged in as ${user.login} with authentication token ${user.authtoken}`);

	const grant = await app.getGrant();
	app.debug(grant);
	app.info(`Hello ${grant.getFirstname()} ${grant.getLastname()}`);

	const appinfo = await app.getAppInfo();
	app.debug(appinfo);
	app.info(`Using platform version ${appinfo.platformversion}`);

	const devinfo = await app.getDevInfo();
	app.debug(devinfo);
	app.info(`Using development version ${devinfo.version}`);

	const sys = app.getBusinessObject('SystemParam');
	const sysMetaData = await sys.getMetaData();
	app.debug(sysMetaData);
	const sysType = sys.getField('sys_type');
	app.debug(sysType);
	for (const l of sysType.listOfValues)
		app.info(`${l.code} = ${l.value}`);
	const list = await sys.search({ 'sys_type': 'APP' });
	for (const item of list)
		app.info(`${sys.getFieldValue('sys_code', item)}: ${sys.getFieldValue('sys_type', item)} = ${sys.getFieldListValue('sys_type', item)}`);

	const res = await app.logout();
	app.debug(res);
	app.info(`${res.login} logged out`);
} catch(err) {
	app.error('Catched error: ' + JSON.stringify(err));
}
