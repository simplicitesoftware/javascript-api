import simplicite from '../dist/esm/simplicite.js';

const app = simplicite.session({
	debug: process && process.env.TEST_SIMPLICITE_DEBUG === 'true'
});
app.info(`Version: ${simplicite.constants.MODULE_VERSION}`);
app.debug('Parameters', app.parameters);

try {
	const data = JSON.stringify(app.parameters, null, 4);
	app.info(`Initial string length = ${data.length}`);
	const compressedBlob = await app.compressData(data);
	app.info(`Compressed blob size = ${compressedBlob.size}`);
	const uncompressedData = await app.uncompressData(compressedBlob);
	app.info(`Uncompressed string length = ${uncompressedData.length}`);
	app.info(JSON.parse(uncompressedData));
	app.info('OK');
} catch(err) {
	app.error('Catched error: ' + (err.message || JSON.stringify(err)));
}
