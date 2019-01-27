const login = require("../routes/login");
const register = require('../routes/register');
const getDatabase = require('../bin/getDatabase');

test("User sends request to login with correct username and password", done => {
	getDatabase(db => {

		const users = db.getCollection("users");
		users.clear();

		register.DoRegistration({
			db: db,
			body: {
				username: "admin",
				password: "admin"
			}
		});

		const response = login.findUserAndSign({
			db: db,
			body: {
				username: "admin",
				password: "admin"
			}
		});

		/**
		 * NOTE: Not closing the database will cause tests to hang
		 * This took me forever to debug since it won't even show on --detectOpenHandle.
		 *
		 */
		db.close();

		expect(response.status).toEqual(200);
		expect(response.message.username).toEqual('admin');
		expect(response.message.jwt).toBeDefined();
		done();
	});
});

test("User sends request to login with incorrect username and password", done => {
	getDatabase(db => {

		const users = db.getCollection("users");
		users.clear();


		register.DoRegistration({
			db: db,
			body: {
				username: "admin",
				password: "admin"
			}
		});

		const response = login.findUserAndSign({
			db: db,
			body: {
				username: "admin",
				password: "admin123"
			}
		});

		db.close();

		expect(response.status).toEqual(401);
		done();
	});
});