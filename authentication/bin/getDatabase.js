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

module.exports = getDatabase;