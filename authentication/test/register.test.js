const register = require("../routes/register");
const getDatabase = require("../bin/getDatabase");

test("User sends request to register with a username and password", done => {
	getDatabase(db => {
		const users = db.getCollection("users");
		users.clear();

		register
			.DoRegistration({
				db: db,
				body: {
					username: "admin",
					password: "admin"
				}
			})
			.then(response => {
				db.close();
				expect(response.status).toEqual(200);
				done();
			});
	});
});

test("User sends request to register but user exists", done => {
	getDatabase(db => {
		const users = db.getCollection("users");
		users.clear();
		register
			.DoRegistration({
				db: db,
				body: {
					username: "admin",
					password: "admin"
				}
			})
			.then(response => {
				db.close();
				expect(response.status).toEqual(200);
				getDatabase(db => {
					register
						.DoRegistration({
							db: db,
							body: {
								username: "admin",
								password: "admin"
							}
						})
						.then(response => {
							db.close();
							expect(response.status).toEqual(401);
							done();
						});
				});
			});
	});
});
