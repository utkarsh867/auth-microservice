const hello = require('../routes/hello');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');

test('User makes a request with a JWT token with Bearer method', done => {
	const token = jwt.sign(
		{
			username: 'admin',
			password: 'admin'
		},
		CONFIG.JWTSECRET,
		{ expiresIn: 120 }
	);
	const response = hello.VerifyJWT({
		headers: {
			authorization: `Bearer ${token}`
		}
	});

	expect(response).toBeDefined();
	expect(response.status).toEqual(200);
	expect(response.message).toEqual('Hello admin');

	done();
});

test('User makes a request with a JWT token with invalid method', done => {
	const token = jwt.sign(
		{
			username: 'admin',
			password: 'admin'
		},
		CONFIG.JWTSECRET,
		{ expiresIn: 120 }
	);
	const response = hello.VerifyJWT({
		headers: {
			authorization: token
		}
	});

	expect(response).toBeDefined();
	expect(response.status).toEqual(401);

	done();
});

