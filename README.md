# simple-path-router

A simple path-only router

## Example
```
'use strict';

var PathRouter = require('simple-path-router');

var router = new PathRouter()
	.when('/', serveWeb)
	.when('/api', serveApi);

require('http')
	.createServer(router.dispatch)
	.listen(10000);

function serveWeb (req, res) {
	console.log('web!');
	res.statusCode = 200;
	res.end();
}

function serveApi (req, res) {
	console.log('api!');
	res.statusCode = 200;
	res.end();
}
```
