function DoRegistration(req) {
	if (req.body && req.body.username) {
		let db = req.db;
		let users = db.getCollection("users");
		if (users.findOne({ username: req.body.username }) === null) {
			users.insert({
				username: req.body.username,
				password: req.body.password
			});
			return { status: 200, message: "Registered" };
		} else {
			return { status: 401, message: "User exists" };
		}
	} else {
		return { status: 401, message: "Error in database" };
	}
}

function Register(req, res) {
	const response = DoRegistration(req);
	res.status(response.status).json(response.message);
}

module.exports = { Register, DoRegistration};
