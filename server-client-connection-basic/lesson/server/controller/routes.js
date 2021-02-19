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
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

/*
   This route is showing that you can set up a route and send any information that you want
   It doesn't necessarily need to come from the database
*/
router.get('/whatever', function(req, res){
	res.json({message: "I just wanted to say whatever bro"})
})

router.get('/dogs', function(req, res){
  const allDogBreedsSelectQuery = "SELECT * FROM dog_breeds";
  databaseConnection.query(allDogBreedsSelectQuery, function(err, data){
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

//this post route is connected to an event on the front end/client side
//whatever the client sends through will be the req.body
//we will be using our dog_breeds example from the last lesson
//instead of using postman, we'll be using the "Insert New Dog Breed" form from the front end
router.post('/dogs', function(req, res){
	console.log(req.body)
	let breed;
	// if breed comes in as a blank string, set it to null,
	// because a blank string is not seen as null to the database
	if(req.body.breed === ""){
		breed = null
	} else {
		breed = "'"+req.body.breed+"'"
	}

  let insertDogBreedQuery = "INSERT INTO dog_breeds (breed, origin, size, average_life_span) VALUES ";
  insertDogBreedQuery += "(";
  insertDogBreedQuery += breed+",";
  insertDogBreedQuery += "'"+req.body.origin+"',";
  insertDogBreedQuery += "'"+req.body.size+"',";
  insertDogBreedQuery += "'"+req.body.average_life_span+"'";
  insertDogBreedQuery += ")";
  console.log("Insert Dog Breed Query: " + insertDogBreedQuery);
  databaseConnection.query(insertDogBreedQuery, function(err, data){
    try {
      if(err){
        throw err
      }
			// sending this response back to the client if this is successful
			// this response will end up in the callback of this post on the client side
      res.json({success: true, message: "Dog Breed added to database successfully"})
    } catch (e) {
			// sending this response back to the client if this is not successful
			// this response will end up in the callback of this post on the client side
      res.json({success: false, error: e})
    }
  });
});

//exporting routes to be imported in our server.js
module.exports = router;
