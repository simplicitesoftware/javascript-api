![Simplicit&eacute; Software](https://www.simplicite.io/resources/logos/logo250-grey.png)
* * *

<a href="https://www.simplicite.io"><img src="https://img.shields.io/badge/author-Simplicite_Software-blue.svg?style=flat-square" alt="Author"></a>&nbsp;<img src="https://img.shields.io/badge/license-Apache--2.0-orange.svg?style=flat-square" alt="License">

Simplicit&eacute;&reg; node.js&reg; &amp; browser JavaScript API
================================================================

Introduction
------------

This is the node.js&reg; &amp; browser **JavaScript API client module** for the [Simplicit&eacute;&reg; platform](https://www.simplicitesoftware.com).

> **Note**: Versions 2.x.y are packaged as ES6 modules. For ES5 (CommonJS) module packaging, use 1.x.y versions.
> ES6 module packaging is not suitable for old browsers like Internet Explorer.

Usage
-----

Basic usage is something like:

```javascript
import simplicite from 'simplicite';

const app = simplicite.session({ url: '<my instance base URL>' });

try {
	const user = await app.login({ username: '<my username>', password: '<my password>' });
	console.log('Hello ' + user.login + '!');
	const obj = app.getBusinessObject('MyObject');
	const list = await obj.search();
	// Do something with the search results list
	// Etc.
}).catch(err => {
	console.error(err.message);
});
```

Check the [GitHub repository](https://github.com/simplicitesoftware/nodejs-api) `test/test*.js`
files for other examples of basic usage.

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

See the [documentation](https://simplicitesoftware.github.io/nodejs-api/) for details.

License
-------

Copyright 2014-2021 Simplicit&eacute; Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
