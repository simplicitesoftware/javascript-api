import simplicite from '../dist/esm/simplicite.js';

const url = 'https://demo.dev.simplicite.io';
const debug = true;
const username = 'website';
const password = 'simplicite';

const elt = (id, html) => {
	const el = document.getElementById(id || currentId);
	if (el && html) el.innerHTML = html;
	return el;
};

let currentId = 'message';
function error(err) {
	elt(currentId, '<span style="color: red;">Error: ' + err.message + '</span>');
}

const app = simplicite.session({ url: url, debug: debug, errorHandler: error });
app.debug('PARAMS', app.parameters);

elt('message', `Version: ${simplicite.constants.MODULE_VERSION}`);

let obj;

app.getHealth().then(health => {
	currentId = 'health';
	app.debug(currentId, health);
	elt(currentId, JSON.stringify(health, null, 2));
	return app.login({ username: username, password: password });
}).then(user => {
	currentId = 'user';
	app.debug('user', user);
	return app.getGrant({ inlinePicture: true, inlineTexts: true });
}).then(grant => {
	currentId = 'grant';
	app.debug(currentId, grant);
	app.debug(currentId, 'Text value: ' + grant.T('ABOUT'));
	elt(currentId, 'Hello ' + grant.getFirstname() + ' ' + grant.getLastname() + ' (' + grant.getLogin() + ')' + '<br/><img src="' + grant.picture.getDataURL() + '"/>');
	return app.getAppInfo();
}).then(appinfo => {
	currentId = 'appinfo';
	app.debug(currentId, appinfo);
	elt(currentId, JSON.stringify(appinfo, null, 2));
	return app.getSysInfo();
}).then(sysinfo => {
	currentId = 'sysinfo';
	app.debug(currentId, sysinfo);
	elt(currentId, JSON.stringify(sysinfo, null, 2));
	return app.getDevInfo();
}).then(devinfo => {
	currentId = 'devinfo';
	app.debug(currentId, devinfo);
	elt(currentId, JSON.stringify(devinfo, null, 2));
	return app.getNews({ inlineImages: true });
}).then(news => {
	currentId = 'news';
	app.debug(currentId, news);
	let h = '<ul>';
	for (const n of news)
		h += '<li>' + (n.image ? '<img src="' + n.image.getDataURL() + '"/><br/>' : '') + n.title + ' (' + n.date + '): ' + n.content + '</li>';
	h += '</ul>';
	elt(currentId, h);
	obj = app.getBusinessObject('WebNews');
	return obj.getMetaData();
}).then(metadata => {
	currentId = 'obj';
	app.debug(currentId, 'metadata', metadata);
	return obj.search({ nws_lang: 'ANY' }, { inlineDocuments: [ 'nws_image' ] });
}).then(list => {
	app.debug(currentId, 'list', list);
	let h = '<ul>';
	for (const item of list) {
		const img = obj.getFieldValue('nws_image', item);
		h += '<li>' + (img ? '<img src="' + img.getDataURL() + '"/><br/>' : '') + obj.getFieldValue('nws_title', item) + ' (' + obj.getFieldValue('nws_date', item) + '): ' + obj.getFieldValue('nws_description', item) + '</li>';
	}
	h += '</ul>';
	elt(currentId, h);
	return app.logout();
}).then(logout => {
	app.debug(logout);
}).catch(error);
