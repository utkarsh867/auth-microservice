const hello = require("../routes/hello");
const jwt = require("jsonwebtoken");

test("User makes a request with a JWT token with Bearer method", done => {
	const token = jwt.sign(
		{
			username: "admin",
			password: "admin"
		},
		process.env.JWTSECRET,
		{ expiresIn: 120 }
	);
	hello
		.VerifyJWT({
			headers: {
				authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			expect(response).toBeDefined();
			expect(response.status).toEqual(200);
			expect(response.message).toEqual("Hello admin");

			done();
		});
});

test("User makes a request with a JWT token with invalid method", done => {
	const token = jwt.sign(
		{
			username: "admin",
			password: "admin"
		},
		process.env.JWTSECRET,
		{ expiresIn: 120 }
	);
	hello
		.VerifyJWT({
			headers: {
				authorization: token
			}
		})
		.then(response => {
			expect(response).toBeDefined();
			expect(response.status).toEqual(401);

			done();
		});
});
