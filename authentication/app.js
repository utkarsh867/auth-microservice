const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const loki = require("lokijs");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	let db = new loki("user_db.json", {
		autoload: true,
		autoloadCallback: () => {
			if (db.getCollection("users") === null) {
				console.log("Creating collection");
				db.addCollection("users");
				req.db = db;
				next();
			} else {
				console.log("Collection user exists");
				req.db = db;
				next();
			}
		},
		autosave: true,
		autosaveInterval: 4000
	});
});

app.route("/login").post(loginRouter.findUserAndSign);
app.route("/register").post(registerRouter.Register);

module.exports = app;
