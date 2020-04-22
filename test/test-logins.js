var app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080/simplicite',
	debug: false
});

var debug = true;

app.setUsername(process.env.TEST_SIMPLICITE_USERNAME || 'designer');
app.setPassword(process.env.TEST_SIMPLICITE_PASSWORD || 'designer');
app.login().then(function(res) {
	if (debug) console.log(res);
	console.log('Logged in as ' + res.login);
	return app.getGrant({ inlinePicture: false }).then(function(grant) {
		if (debug) console.log(grant);
		console.log('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
		return app.logout();
	}).then(function(res) {
		if (debug) console.log(res);
		console.log('Logged out');
		app.setUsername('website');
		app.setPassword('simplicite');
		return app.login().then(function(res) {
			if (debug) console.log(res);
			console.log('Logged in as ' + res.login);
			return app.getGrant({ inlinePicture: false }).then(function(grant) {
				if (debug) console.log(grant);
				console.log('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
				return app.logout();
			}).then(function(res) {
				if (debug) console.log(res);
				console.log('Logged out');
			});
		});
	});
}).fail(function(e) {
	console.error('Login failed (status: ' + e.status + ', message: ' + e.message + ')');
});
