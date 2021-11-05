import simplicite from '../dist/esm/simplicite.js';

const url = 'http://localhost:8080';
const debug = true;
const username = 'designer';
const password = 'designer';

const elt = (id, html) => {
	const el = document.getElementById(id);
	if (el && html) el.innerHTML = html;
	return el;
};

function error(err) {
	elt('message', '<span style="color: red;">Error: ' + err.message + '</span>');
}

const app = simplicite.session({ url: url, debug: debug, errorHandler: error });
app.debug('PARAMS', app.parameters);

elt('message', `Version: ${simplicite.constants.MODULE_VERSION}`);

let obj;

app.getHealth().then(health => {
	app.debug('HEALTH', health);
	elt('health', JSON.stringify(health, null, 2));
	return app.login({ username: username, password: password });
}).then(user => {
	app.debug('USER', user);
	return app.getGrant({ inlinePicture: true, inlineTexts: true });
}).then(grant => {
	app.debug('GRANT', grant);
	app.debug('ABOUT text value: ' + grant.T('ABOUT'));
	elt('user', 'Hello ' + grant.getFirstname() + ' ' + grant.getLastname() + ' (' + grant.getLogin() + ')' + '<br/><img src="' + grant.picture.getDataURL() + '"/>');
	return app.getAppInfo();
}).then(appinfo => {
	app.debug('APPINFO', appinfo);
	elt('appinfo', JSON.stringify(appinfo, null, 2));
	return app.getSysInfo();
}).then(sysinfo => {
	app.debug('SYSINFO', sysinfo);
	elt('sysinfo', JSON.stringify(sysinfo, null, 2));
	return app.getDevInfo();
}).then(devinfo => {
	app.debug('DEVINFO', devinfo);
	elt('devinfo', JSON.stringify(devinfo, null, 2));
	return app.getNews({ inlineImages: true });
}).then(news => {
	app.debug('NEWS', news);
	let h = '<ul>';
	for (const n of news)
		h += '<li>' + (n.image ? '<img src="' + n.image.getDataURL() + '"/><br/>' : '') + n.title + ' (' + n.date + '): ' + n.content + '</li>';
	h += '</ul>';
	elt('news', h);
	obj = app.getBusinessObject('WebNews');
	return obj.getMetaData();
}).then(metadata => {
	app.debug('OBJ METADATA', metadata);
	return obj.search({ nws_lang: 'ANY' }, { inlineDocuments: [ 'nws_image' ] });
}).then(list => {
	app.debug('OBJ', list);
	let h = '<ul>';
	for (const item of list) {
		const img = obj.getFieldValue('nws_image', item);
		h += '<li>' + (img ? '<img src="' + img.getDataURL() + '"/><br/>' : '') + obj.getFieldValue('nws_title', item) + ' (' + obj.getFieldValue('nws_date', item) + '): ' + obj.getFieldValue('nws_description', item) + '</li>';
	}
	h += '</ul>';
	elt('obj', h);
	return app.logout();
}).then(logout => {
	app.debug(logout);
}).catch(error);
