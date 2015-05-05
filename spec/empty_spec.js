/* global afterEach, beforeEach, describe, it */

'use strict';

var request = require('supertest');

var Router = new require('../');

describe('router', function () {
	var router;

	beforeEach(function () {
		router = new Router().listen();
	});

	afterEach(function () {
		router._server.close();
	});

	it('should 404 with no routes defined, by default', function (done) {
		request(router._server)
			.get('/')
			.expect(404)
			.end(done);
	});

	it('should call specified default handler with no routes defined', function (done) {
		var handlerCalled = false;
		router.default(function (req, res) {
			handlerCalled = true;

			res.statusCode = 200;
			res.end();
		});

		request(router._server)
			.get('/')
			.expect(200)
			.expect(function () {
				if (!handlerCalled) {
					throw new Error('expected custom handler to be called');
				}
			})
			.end(done);
	});
});
