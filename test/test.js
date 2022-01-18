import simplicite from '../dist/esm/simplicite.js';

const app = simplicite.session({ url: 'http://localhost:8080', debug: false });
app.info(`Version: ${simplicite.constants.MODULE_VERSION}`);
app.debug('Parameters', app.parameters);

try {
	const user = await app.login({ username: 'designer', password: '<your password>' });
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

	const prd = app.getBusinessObject('DemoProduct');
	const prdMetaData = await prd.getMetaData();
	app.debug(prdMetaData);
	app.info(prd.getLabel());
	const prdType = prd.getField('demoPrdType');
	app.debug(prdType);
	for (const l of prdType.listOfValues) {
		app.info(`  ${l.code} = ${l.value}`);
		const list = await prd.search({ 'demoPrdType': l.code });
		for (const item of list)
			app.info(`    ${prd.getFieldValue('demoPrdReference', item)}: ${prd.getFieldValue('demoPrdType', item)} = ${prd.getFieldListValue('demoPrdType', item)}`);
	}

	const cli = app.getBusinessObject('DemoClient');
	const cliMetaData = await cli.getMetaData();
	app.debug(cliMetaData);
	app.info(cli.getLabel());
	const data = await cli.placemap('DemoClients', { demoCliLastname: '*R*' });
	app.debug(data);
	app.info(`  Placemap ${data.name} = ${data.places.length} places`);
	for (const p of data.places)
		app.info(`    ${p.coords}: ${p.label1} / ${p.label2} / ${p.label3}`);
	
	const res = await app.logout();
	app.debug(res);
	app.info(`${res.login} logged out`);
} catch(err) {
	app.error('Catched error: ' + JSON.stringify(err));
}
