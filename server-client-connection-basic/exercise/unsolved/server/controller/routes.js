var express = require('express');
var path = require('path');

var mysql = require('mysql');
const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
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
});

module.exports = router;
