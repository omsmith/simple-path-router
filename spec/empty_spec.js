/* global describe, it */

'use strict';

var router = new (require('../'))().listen(),
	request = require('supertest')(router._server);

describe('router', function () {
	it('should 404 with no routes defined', function (done) {
		request
			.get('/')
			.expect(404)
			.end(done);
	});
});
