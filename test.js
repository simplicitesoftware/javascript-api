var simplicite = require("simplicite");

var demo = simplicite.session({
  url: "http://localhost:8080",
  root: "demo",
  login: "designer",
  password: "designer"
});
console.log(demo.metadata);

var prd = demo.getBusinessObject("DemoProduct");
console.log(prd.metadata);

var plcord = demo.getBusinessProcess("DemoPlaceNewOrder");
console.log(plcord.metadata);
