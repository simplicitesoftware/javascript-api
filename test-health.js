var simplicite = require("./simplicite");

var app = simplicite.session({
	host: "demo.apps.simplicite.io",
	port: 80,
	scheme: "http",
	root: "",
	debug: false
});
var sys;

app.getHealth().then(function(health) {
	console.log(health);
});
