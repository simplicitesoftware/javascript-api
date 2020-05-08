![Simplicit&eacute; Software](https://www.simplicite.io/resources/logos/logo250.png)
* * *

<a href="https://www.simplicite.io"><img src="https://img.shields.io/badge/author-Simplicite_Software-blue.svg?style=flat-square" alt="Author"></a>&nbsp;<img src="https://img.shields.io/badge/license-Apache--2.0-orange.svg?style=flat-square" alt="License"> [![Gitter chat](https://badges.gitter.im/org.png)](https://gitter.im/simplicite/Lobby)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=simplicitesoftware_nodejs-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=simplicitesoftware_nodejs-api)

Simplicit&eacute;&reg; node.js&reg; &amp; browser JavaScript API
================================================================

[![NPM](https://nodei.co/npm/simplicite.png?downloads=true&downloadRank=true)](https://nodei.co/npm/simplicite/) 

Introduction
------------

This is the node.js&reg; &amp; browser **JavaScript API** for the [Simplicit&eacute;&reg; platform](http://www.simplicitesoftware.com).

It can be used in **server-side** node applications, in a **client-side** web applications
(e.g. by building a bundle with [browserify](http://browserify.org) and/or by using various dedicated frameworks)
or in **native** JavaScript-based mobile frameworks.

> **Note**: for browser compatibility reasons this module is implemented in ES5

To install it:

```bash
npm install
```

Basic usage:

```javascript
const app = require('simplicite').session({ url: '<my instance base URL>' });
app.login({ username: '<my username>', password: '<my password>' }).then(function() {
	let obj = app.getBusinessObject('MyObject');
	app.search().then(function(res) {
		// Do something with search result (available both as res and as obj.list)
		// Etc.
	});
}).fail(function(reason) {
	console.error('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
});
```

Check `test*.js` for other examples of basic usage.

For more advanced examples, check these repositories:

- **Server-side**:
	- [Node.js&reg; demo](https://github.com/simplicitesoftware/nodejs-demo)
- **Client-side**:
	- [Plain web demo](https://github.com/simplicitesoftware/web-demo)
	- [Vue.js&reg; demo](https://github.com/simplicitesoftware/vue-demo)
	- [React&reg; demo](https://github.com/simplicitesoftware/react-demo)
	- [Angular&reg; demo](https://github.com/simplicitesoftware/angular-demo)
- **Native**:
	- [ReactNative&reg; demo](https://github.com/simplicitesoftware/react-native-demo)

Minify
------

Install _Uglify-JS_:

```bash
[sudo] npm install -g uglify-js
```

Build (this generates the minified `dist/simplicite.min.js` file):

```bash
npm run build
```

Test
----

Install _Jest_:

```bash
[sudo] npm install -g jest
```

Set the environment variables for your Simplicité instance:

- `TEST_SIMPLICITE_SCHEME` defaults to `'http'`
- `TEST_SIMPLICITE_HOST` defaults to `'localhost'`
- `TEST_SIMPLICITE_PORT` defaults to `8080`
- `TEST_SIMPLICITE_ROOT` defaults to `''` (root webapp)
- `TEST_SIMPLICITE_URL` defaults to `http://localhost:8080`
- `TEST_SIMPLICITE_ADMIN_SERNAME` defaults to `'designer'`
- `TEST_SIMPLICITE_ADMIN_PASSWORD` defaults to `'designer'`
- `TEST_SIMPLICITE_USERNAME` defaults to `'website'`
- `TEST_SIMPLICITE_PASSWORD` defaults to `'simplicite'`

Run tests (this generates the `coverage` folder):

```bash
npm run test
```

Documentation
-------------

Install _JSDoc_:

```bash
[sudo] npm install -g jsdoc
```

Generate documentation:

```bash
npm run jsdoc
```

Publish
-------

This is only done by Simplicit&eacute; Software.

```bash
npm publish
```

License
-------

Copyright Simplicit&eacute; Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
