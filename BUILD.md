Install
-------

```bash
npm install
```

Test
----

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

Run the unit tests, this generates the `coverage` folder:

```bash
npm run test
```

Build
-----

Check syntax and rules:

```bash
npm run lint
```

Generates the minified `dist/simplicite.min.js` file:

```bash
npm run build
```

Documentation
-------------

Generate documentation:

```bash
npm run doc
```

Publish
-------

Check package to be published:

```bash
npm pack
tar tvfz simplicite-1.x.y.tgz
rm simplicite-1.x.y.tgz

```
Publish to npm repository:

```bash
npm publish --tag 1.x.y
```

Deprecate previous version:

```bash
npm deprecate simplicite@1.x.y-1 'Deprecated'
```