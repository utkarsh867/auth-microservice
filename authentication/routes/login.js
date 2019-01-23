let express = require("express");
let router = express.Router();

let CONFIG = require("../config");
let jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
	let db = req.db;
	if (
		db.getCollection("users").findOne({ username: req.body.username }) === null
	) {
		res.status(401).json({
			error: {
				message: "Bad username or password"
			}
		});
	} else {
		let userDetails = db
			.getCollection("users")
			.findOne({ username: req.body.username });
		if (userDetails.password === req.body.password) {
			res.json({
				username: req.body.username,
				jwt: jwt.sign(
					{
						username: req.body.username,
						password: req.body.password
					},
					CONFIG.JWTSECRET,
					{ expiresIn: 120 }
				)
			});
		} else {
			res.status(401).json({
				error: {
					message: "Bad password"
				}
			});
		}
	}
});

module.exports = router;
