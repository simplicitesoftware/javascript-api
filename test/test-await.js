import simplicite from '../dist/esm/simplicite.js';

const app = simplicite.session({
	url: process && process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	debug: process && process.env.TEST_SIMPLICITE_DEBUG === 'true'
});
app.info(`Version: ${simplicite.constants.MODULE_VERSION}`);
app.debug('Parameters', app.parameters);

// Note that business case labels are purely informative

try {
	const health = await app.health({ businessCase: 'Instance health check' });
	app.debug(health);
	app.info(`Status: ${health.platform.status}`);

	const user = await app.login({
		username: process && process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer',
		password: process && process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer'
	});
	app.debug(user);
	app.info(`Logged in as ${user.login} with authentication token ${user.authtoken}`);

	const grant = await app.getGrant({ businessCase: 'User grant'});
	app.debug(grant);
	app.info(`Hello ${grant.getFirstname()} ${grant.getLastname()}`);

	const appinfo = await app.getAppInfo({ businessCase: 'Application information' });
	app.debug(appinfo);
	app.info(`Using platform version ${appinfo.platformversion}`);

	const devinfo = await app.getDevInfo({ businessCase: 'Development information' });
	app.debug(devinfo);
	app.info(`Using development version ${devinfo.version}`);

	const prd = app.getBusinessObject('DemoProduct');
	const prdMetaData = await prd.getMetaData({ businessCase: 'Product meta data' });
	app.debug(prdMetaData);
	app.info(prd.getLabel());
	const prdType = prd.getField('demoPrdType');
	app.debug(prdType);
	for (const l of prdType.listOfValues) {
		app.info(`  ${l.code} = ${l.value}`);
		const list = await prd.search({ 'demoPrdType': l.code }, { businessCase: `Products of type ${l.value}` });
		for (const item of list)
			app.info(`    ${prd.getFieldValue('demoPrdReference', item)}: ${prd.getFieldValue('demoPrdType', item)} = ${prd.getFieldListValue('demoPrdType', item)}`);
	}

	const cli = app.getBusinessObject('DemoClient');
	const cliMetaData = await cli.getMetaData({ businessCase: 'Customer meta data'});
	app.debug(cliMetaData);
	app.info(cli.getLabel());
	const data = await cli.placemap('DemoClients', { demoCliLastname: '*R*' }, { businessCase: 'Place map for customers with last name starting with R'});
	app.debug(data);
	app.info(`  Placemap ${data.name} = ${data.places.length} places`);
	for (const p of data.places)
		app.info(`    ${p.coord}: ${p.label1} / ${p.label2} / ${p.label3}`);

	const ctc = app.getBusinessObject('DemoContact');
	const ctcMetaData = await ctc.getMetaData({ businessCase: 'Contact meta data'});
	app.debug(ctcMetaData);
	app.info(ctc.getLabel());
	const ctcType = ctc.getField('demoCtcType');
	const ctcSubType = ctc.getField('demoCtcSubType');
	for (const t of ctcType.listOfValues) {
		const subTypes = await ctc.getFieldLinkedList(ctcType, ctcSubType, t.code);
		app.debug(subTypes);
		app.info(`  Type = ${t.code} (${t.value}) -> sub-types list = ${subTypes.name || '<none>'}`);
		for (const st of subTypes.items)
			if (st.code)
				app.info(`    ${st.code} (${st.value})`);
	}

	const res = await app.logout();
	app.debug(res);
	app.info(`${res.login} logged out`);

	app.info('OK');
} catch(err) {
	app.error('Catched error: ' + (err.message || JSON.stringify(err)));
}
