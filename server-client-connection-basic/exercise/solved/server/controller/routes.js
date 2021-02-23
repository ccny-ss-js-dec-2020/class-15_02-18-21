//importing dependencies
var express = require('express');
//you do not have to do npm i for this, as it is built into node
var path = require('path');

var mysql = require('mysql');
const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
databaseConnection.connect();

//storing express.Router() in a variable
//which is built into express to store and export your routes
var router = express.Router();

//connecting your home route to an html file on the client side
//this will what you see at http://localhost:3000
//the connnection to an html page will always be a "get"
router.get('/', function(req,res){
	//research path & path.join on stack overflow
	//console.log(req)
	//console.log(dirname)
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.get('/characters', function(req, res){
  const allCharactersQuery = "SELECT * FROM sesame_street_characters";
  databaseConnection.query(allCharactersQuery, function(err, data){
    try {
      if(err){
        throw err
      }
      res.json({success: true, data: data})
    } catch (e) {
      res.json({success: false, error: e})
    }
  });
});

router.post('/characters', function(req, res){
  let insertCharacterQuery = "INSERT INTO sesame_street_characters (name, species, performedBy, description) VALUES ";
  insertCharacterQuery += "(";
  insertCharacterQuery += "'"+req.body.name+"',";
  insertCharacterQuery += "'"+req.body.species+"',";
  insertCharacterQuery += "'"+req.body.performedBy+"',";
  insertCharacterQuery += "'"+req.body.description+"'";
  insertCharacterQuery += ")";
  console.log("Insert Character Query: " + insertCharacterQuery);
  databaseConnection.query(insertCharacterQuery, function(err, data){
    try {
      if(err){
        throw err
      }
			// sending this response back to the client if this is successful
			// this response will end up in the callback of this post on the client side
      res.json({success: true, message: "Character added to database successfully", newCharacter: req.body})
    } catch (e) {
			// sending this response back to the client if this is not successful
			// this response will end up in the callback of this post on the client side
      res.json({success: false, error: e})
    }
  });
});

//exporting routes to be imported in our server.js
module.exports = router;
