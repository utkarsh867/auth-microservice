let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function signJwtToken(username, password) {
	return jwt.sign(
		{
			username: username,
			password: password
		},
		process.env.JWTSECRET,
		{ expiresIn: 120 }
	);
}

function findUserAndSign(req) {
	let db = req.db;
	let users = db.getCollection("users");

	let responseMessage = {
		status: 0,
		message: ""
	};

	if (users.findOne({ username: req.body.username }) === null) {
		responseMessage.status = 401;
		responseMessage.message = "No such user";
		return responseMessage;
	} else {
		let userDetails = db
			.getCollection("users")
			.findOne({ username: req.body.username });
		let token = signJwtToken(req.body.username, req.body.password);
		if (bcrypt.compareSync(req.body.password, userDetails.password)) {
			responseMessage.status = 200;
			responseMessage.message = { username: req.body.username, jwt: token };
			return responseMessage;
		} else {
			responseMessage.status = 401;
			responseMessage.message = "Bad request";
			return responseMessage;
		}
	}
}

function Login(req, res) {
	const response = findUserAndSign(req);
	res.status(response.status).json(response.message);
}

module.exports = { Login, findUserAndSign };
