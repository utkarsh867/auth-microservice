let express = require("express");
let router = express.Router();
let jwt = require("jsonwebtoken");
let CONFIG = require("../config");

/* GET home page. */
router.get("/", function(req, res) {
	if (req.headers && req.headers.authorization) {
		try {
			const token = req.headers.authorization.substring(7);
			console.log(token);
			req.user = jwt.verify(token, CONFIG.JWTSECRET);

			res.send(`Hello ${req.user.username}`);
		} catch (err) {
			return res.status(401).json({
				error: {
					msg: "Authentication of the JWT token failed!"
				}
			});
		}
	} else {
		return res.status(401).json({
			error: {
				msg: "There was no JWT Token"
			}
		});
	}
});

module.exports = router;
