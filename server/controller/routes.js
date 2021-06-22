var express = require('express');
var path = require('path');


const mysql = require('mysql');
const databaseString = process.env.JAWSDB_URL || process.env.LOCAL_DATABASE
const db = mysql.createConnection(databaseString);
databaseConnection.connect();


var router = express.Router();

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.get('/characters', function(req, res){
	/*
		Write a SQL query to get all of the sesame street characters
		and send all of that data to the client side
	*/
	db.query("SELECT * FROM sesameStreet", function(err, data){
		try{
			if(err){
				throw err
			}
			console.log(data);
			res.json({success: true, data: data});
		}catch(e){
			res.json({success: false, error: e});
		}
	})
});

router.post('/characters', function(req, res){
	/*
		Write a SQL Query to insert a character into the sesame street characters table

		This information will come from the inputs on the client side, and can be accessed
		here by the req.body

		If the insertion into the database was successful, report to the client that it was
		successful.

		If there was an error inserting into the database, then report to the client that
		there was an error
	*/
	let name = req.body.name;
	let species = req.body.species;
	let performed_by = req.body.performed_by;
	let description = req.body.description;

	let create = "INSERT INTO sesameStreet (name, species, performed_by, description) VALUES ('"+name+"', '"+species+"', '"+performed_by+"', '"+description+"')";
	db.query(create, function(err, data){
		try{
			if(err){
				throw error
			}
			console.log(data);
			if(data.affectedRows != 0){
				res.json({success: true, message: "Added" + " " +name+ " " + "Successfully"})
			}else{
				res.status(404).json({success: false, message: "No information updated"});
			}
		}catch(e){
			res.json({success: false, message: "No information updated"});
		}
	})
});

module.exports = router;
