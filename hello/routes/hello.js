let jwt = require("jsonwebtoken");

async function VerifyJWT(req) {
	if (req.headers && req.headers.authorization) {
		try {
			// The Bearer method adds a 'Bearer' in the start of the key
			const token = req.headers.authorization.substring(7);
			req.user = await jwt.verify(token, process.env.JWTSECRET);
			return { status: 200, message: `Hello ${req.user.username}` };
		} catch (err) {
			return { status: 401, message: "JWT invalid" };
		}
	} else {
		return { status: 401, message: "No token provided" };
	}
}

function Hello(req, res) {
	VerifyJWT(req).then(response => {
		res.status(response.status).json(response.message);
	});
}

module.exports = { Hello, VerifyJWT };
