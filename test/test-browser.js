import simplicite from '../dist/esm/simplicite.js';

const elt = (id, html, append) => {
	const e = document.getElementById(id);
	if (e && html)
		e.innerHTML = (append ? e.innerHTML : '') + html;
	return e;
};

const error = (id, err, append) => {
	elt(id || 'message', '<span class="error">Error: ' + JSON.stringify(err) + '</span>', append);
};

try {
	const url = 'https://demo.dev.simplicite.io';
	const debug = false;
	const username = 'website';
	const password = 'simplicite';

	const app = simplicite.session({ url: url, debug: debug });
	app.debug('params', app.parameters);

	elt('message', `Version: ${simplicite.constants.MODULE_VERSION}`);

	app.getHealth().then(health => {
		app.debug('health', health);
		elt('health', JSON.stringify(health, null, 2));
		return app.login({ username: username, password: password });
	}).then(user => {
		app.debug('user', user);
		return app.getGrant({ inlinePicture: true, inlineTexts: true });
	}).then(grant => {
		app.debug('grant', grant);
		app.debug('grant', 'Text value: ' + grant.T('ABOUT'));
		elt('grant', 'Hello ' + grant.getFirstname() + ' ' + grant.getLastname() + ' (' + grant.getLogin() + ')' + '<br/><img src="' + grant.picture.getDataURL() + '"/>');

		app.getAppInfo().then(async appinfo => {
			app.debug('appinfo', appinfo);
			elt('appinfo', JSON.stringify(appinfo, null, 2));
		}).catch(err => {
			error('appinfo', err);
		});

		app.getSysInfo().then(sysinfo => {
			app.debug('sysinfo', sysinfo);
			elt('sysinfo', JSON.stringify(sysinfo, null, 2));
		}).catch(err => {
			error('sysinfo', err);
		});

		app.getDevInfo().then(devinfo => {
			app.debug('devinfo', devinfo);
			elt('devinfo', JSON.stringify(devinfo, null, 2));
		}).catch(err => {
			error('devinfo', err);
		});

		app.getNews({ inlineImages: true }).then(news => {
			app.debug('news', news);
			let h = '<ul>';
			for (const n of news)
				h += '<li>' + (n.image ? '<img src="' + n.image.getDataURL() + '"/><br/>' : '') + n.title + ' (' + n.date + '): ' + n.content + '</li>';
			h += '</ul>';
			elt('news', h);
		}).catch(err => {
			error('news', err);
		});

		const obj = app.getBusinessObject('WebNews');
		obj.getMetaData().then(metadata => {
			app.debug('obj', 'metadata', metadata);
			return obj.search({ nws_lang: 'ANY' }, { inlineDocuments: [ 'nws_image' ] });
		}).then(list => {
			app.debug('obj', 'list', list);
			let h = '<ul>';
			for (const item of list) {
				const img = obj.getFieldValue('nws_image', item);
				h += '<li>' + (img ? '<img src="' + img.getDataURL() + '"/><br/>' : '') + obj.getFieldValue('nws_title', item) + ' (' + obj.getFieldValue('nws_date', item) + '): ' + obj.getFieldValue('nws_description', item) + '</li>';
			}
			h += '</ul>';
			elt('obj', h);
		}).catch(err => {
			error('obj', err);
		}).finally(() => {
			app.logout();
		});
	}).catch(err => {
		error('message', err, true);
	});

} catch (e) {
	error('message', e, true);
}
