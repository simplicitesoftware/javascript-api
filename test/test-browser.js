import simplicite from '../build/esm/simplicite.js';

const elt = (id, html) => {
	const el = document.getElementById(id);
	if (el && html) el.innerHTML = html;
	return el;
};

const error = err => {
	console.error('Error', err);
	elt('message', `<span style="color: red;">Error: ${err.message}</span>`);
};

const app = simplicite.session({
	url: 'http://localhost:8080',
	debug: false,
	errorHandler: error
});
console.log(app.params);

elt('message', `Version: ${simplicite.constants.MODULE_VERSION}`);

app.getHealth().then(health => {
	console.log('HEALTH', health);
	elt('health', JSON.stringify(health, null, 2));
	return app.login({ username: 'designer', password: 'designer' });
}).then(user => {
	console.log('USER', user);
	elt('user', 'Hello ' + user.login);
	return app.getGrant({ inlinePicture: true, inlineTexts: true });
}).then(grant => {
	console.log('GRANT', grant);
	console.log('ABOUT text value: ' + grant.T('ABOUT'));
	elt('picture', '<img src="' + grant.picture.getDataURL() + '"/>')
	return app.getAppInfo();
}).then(appinfo => {
	console.log('APPINFO', appinfo);
	elt('appinfo', JSON.stringify(appinfo, null, 2));
	return app.getSysInfo();
}).then(sysinfo => {
	console.log('SYSINFO', sysinfo);
	elt('sysinfo', JSON.stringify(sysinfo, null, 2));
	return app.getDevInfo();
}).then(devinfo => {
	console.log('DEVINFO', devinfo);
	elt('devinfo', JSON.stringify(devinfo, null, 2));
	return app.getNews({ inlineImages: true });
}).then(news => {
	console.log('NEWS', news);
	let h = '<ul>';
	for (const n of news)
		h += '<li>' + (n.image ? '<img src="' + n.image.getDataURL() + '"/> ' : '') + n.title + ' (' + n.date + '): ' + n.content + '</li>';
	h += '</ul>';
	elt('news', h);
	return app.logout();
}).then(logout => {
	console.log(logout);
}).catch(error);
