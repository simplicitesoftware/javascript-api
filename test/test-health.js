var app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080/simplicite',
	debug: false
});

app.getHealth().then(function(health) {
	delete health._scope; // Clean scope from response
	console.log(health);
}).catch(function(err) {
	console.error(err);
});
