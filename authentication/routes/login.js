let CONFIG = require("../config");
let jwt = require("jsonwebtoken");

function findUserAndSign(req) {
	let db = req.db;
	if (
		db.getCollection("users").findOne({ username: req.body.username }) === null
	) {
		return {status: 401, message: "Bad request"};
	} else {
		let userDetails = db
			.getCollection("users")
			.findOne({ username: req.body.username });
		if (userDetails.password === req.body.password) {
			return {
				status: 200,
				message: {
					username: req.body.username,
					jwt: jwt.sign(
						{
							username: req.body.username,
							password: req.body.password
						},
						CONFIG.JWTSECRET,
						{ expiresIn: 120 }
					)
				}
			}
		} else {
			return {status: 401, message: "Bad request"};
		}
	}
}

function Login(req, res) {
	const response = findUserAndSign(req);
	res.status(response.status).json(response.message);

	// let db = req.db;
	// if (
	// 	db.getCollection("users").findOne({ username: req.body.username }) === null
	// ) {
	// 	res.status(401).json({
	// 		error: {
	// 			message: "Bad username or password"
	// 		}
	// 	});
	// } else {
	// 	let userDetails = db
	// 		.getCollection("users")
	// 		.findOne({ username: req.body.username });
	// 	if (userDetails.password === req.body.password) {
	// 		res.status(200).json({
	// 			username: req.body.username,
	// 			jwt: jwt.sign(
	// 				{
	// 					username: req.body.username,
	// 					password: req.body.password
	// 				},
	// 				CONFIG.JWTSECRET,
	// 				{ expiresIn: 120 }
	// 			)
	// 		});
	// 	} else {
	// 		res.status(401).json({
	// 			error: {
	// 				message: "Bad password"
	// 			}
	// 		});
	// 	}
	// }
}

module.exports = {Login, findUserAndSign};
