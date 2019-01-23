var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
	if(req.body && req.body.username){
		let db = req.db;
		if(db.getCollection('users').findOne({username: req.body.username}) === null){
			db.getCollection('users').insert({username: req.body.username, password: req.body.password});
			res.send("Registered");
		}
		else{
			res.send("User already exists")
		}
	}
	else{
		res.send("There was an error");
	}
});

module.exports = router;