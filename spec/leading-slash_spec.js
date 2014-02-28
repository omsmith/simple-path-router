/* global describe, it, before */

'use strict';

var router = new (require('../'))().listen(),
	request = require('supertest')(router._server);

describe('router', function () {
	before(function (done) {
		router
			.when('abc', function (req, res) {
				res.statusCode = 200;
				res.end('/abc');
			});

		done();
	});

	it('should add a leading slash to routes', function (done) {
		request
			.get('/abc')
			.expect(200)
			.expect('/abc')
			.end(done);
	});
});
