var debug = true;

var app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080/simplicite',
	debug: false
});

app.setUsername('admin');
app.setPassword('simplicite');

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
		return app.login({ username: 'website', password: 'simplicite' }).then(function(res) {
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
}).catch(function(e) {
	console.error('Login failed (status: ' + e.status + ', message: ' + e.message + ')');
});
