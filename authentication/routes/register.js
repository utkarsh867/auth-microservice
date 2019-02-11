const bcrypt = require("bcrypt");

function encrypt(plainTextPassword, callback) {
	bcrypt.hash(plainTextPassword, 10, callback);
}

async function DoRegistration(req) {
	let responseMessage = {
		status: 0,
		message: ""
	};

	if (req.body && req.body.username) {
		let db = req.db;
		let users = db.getCollection("users");

		if (users.findOne({ username: req.body.username }) === null) {
			await new Promise(resolve => {
				encrypt(req.body.password, (err, hash) => {
					users.insert({
						username: req.body.username,
						password: hash
					});
					resolve();
				});
			});
			responseMessage.status = 200;
			responseMessage.message = "Registered";
		} else {
			responseMessage.status = 401;
			responseMessage.message = "User already exists";
		}
	} else {
		responseMessage.status = 401;
		responseMessage.message = "Error in database";
	}
	return responseMessage;
}

function Register(req, res) {
	return DoRegistration(req).then(response => {
		res.status(response.status).json(response.message);
	});
}

module.exports = { Register, DoRegistration };
