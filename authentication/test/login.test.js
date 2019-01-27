const login = require("../routes/login");
const loki = require("lokijs");

function getDatabase(callback) {
	let db = new loki("user_db.json", {
		autoload: true,
		autoloadCallback: () => {
			if (db.getCollection("users") === null) {
				db.addCollection("users");
				callback(db);
			} else {
				callback(db);
			}
		},
		autosave: true,
		autosaveInterval: 4000
	});
}

test("User sends request to login with correct username and password", done => {
	getDatabase(db => {
		const response = login.findUserAndSign({
			db: db,
			body: {
				username: "utkarsh",
				password: "utkarshgoel867"
			}
		});
		/**
		 * NOTE: Not closing the database will cause tests to hang
		 * This took me forever to debug since it won't even show on --detectOpenHandle.
		 *
		 */
		db.close();

		expect(response.status).toEqual(200);
		expect(response.message.username).toEqual('utkarsh');
		expect(response.message.jwt).toBeDefined();
		done();
	});
});

test("User sends request to login with incorrect username and password", done => {
	getDatabase(db => {
		const response = login.findUserAndSign({
			db: db,
			body: {
				username: "utkarsh",
				password: "utkarshgoel"
			}
		});
		db.close();

		expect(response.status).toEqual(401);
		done();
	});
});