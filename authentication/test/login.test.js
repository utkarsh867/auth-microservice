const login = require("../routes/login");
const loki = require("lokijs");

jest.mock('lokijs');

function getDatabase (callback) {
	let db = new loki("../user_db.json", {
		autoload: true,
		autoloadCallback: () => {
			if (db.getCollection("users") === null) {
				console.log("Creating collection");
				db.addCollection("users");
				callback(db)
			} else {
				console.log("Collection user exists");
				callback(db)
			}
		},
		autosave: true,
		autosaveInterval: 4000
	});
}

describe("When user makes a /login request with correct details", () => {
	it("should respond with the JWT Token", async () => {
		getDatabase((db)=>{
			const response = login({
				db: db,
				username: "utkarsh",
				password: "utkarshgoel867"
			});
			expect(response).toBeDefined();
			expect(response.username).toEqual('utkarsh');
			expect(response.jwt).toBeDefined();
		})
	});
});

describe("When user makes a /login request with incorrect details", () => {
	it("should respond with error", async () => {
		getDatabase((db)=>{
			const response = login({
				db: db,
				username: "utkarsh",
				password: "utkarshgoel867"
			});
			expect(response.status).toEqual(401);
		})
	});
});