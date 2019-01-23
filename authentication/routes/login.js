let express = require("express");
let router = express.Router();

let CONFIG = require("../config");
let jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
	if (req.body.username === "admin" && req.body.password === "admin") {
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
		/*
		 * If the username or password was wrong, return 401 ( Unauthorized )
		 * status code and JSON error message
		 */
		res.status(401).json({
			error: {
				message: "Bad username or password"
			}
		});
	}
});

module.exports = router;
