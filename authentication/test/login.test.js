const login = require("../routes/login");
const loki = require("lokijs");

function getDatabase(callback) {
	let db = new loki("user_db.json", {
		autoload: true,
		autoloadCallback: () => {
			if (db.getCollection("users") === null) {
				console.log("Creating collection");
				db.addCollection("users");
				callback(db);
			} else {
				console.log("Collection user exists");
				callback(db);
			}
		},
		autosave: true,
		autosaveInterval: 4000
	});
}

test("User sends request to login", done => {
	getDatabase(db => {
		const response = login.findUserAndSign({
			db: db,
			body: {
				username: "utkarsh",
				password: "utkarshgoel867"
			}
		});
		expect(response.status).toEqual(200);

		/**
		 * NOTE: Not closing the database will cause tests to hang
		 * This took me forever to debug since it won't even show on --detectOpenHandle.
		 *
		 */
		db.close();
		done();
	});
});
