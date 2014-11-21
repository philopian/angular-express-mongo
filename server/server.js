 var path 		= require("path"); 
 var express 	= require("express");
 var db 		= require('mongodb').Db;
 var bodyParser = require('body-parser');

 var app = express();
 


// back out a directory and into the client directory
var clientPath = path.resolve("..") + "/client/";




/********************** Middleware **********************/
app.use( bodyParser.json() );// to support JSON-encoded bodies




/********************** API **********************/
// get all the comments from the database
app.get("/api/newcomments/", function(req, res, done){

	db.connect("mongodb://localhost:27017/publicInvolvement", function(err, db) {
	  if(err) return console.dir(err)

	    // get all comments
	    db.collection('comments').find({}).toArray(function(err, items) {
	        
	    	// wrap all the points into a geojson object
	        var geoJsonObj = {
	        	type:"FeatureCollection",
	        	features:items
	        };

	        res.send(geoJsonObj);
	        done();
	    });//find
		
	});//db-connection

});//get

// post a new comment to the database
app.post("/api/newcomments/add", function(req, res, done){

  // get the new comment data
  var newCommentToAdd = req.body;

  // connect to mongodb
  db.connect("mongodb://localhost:27017/publicInvolvement", function(err, db) {
    if(err) return console.dir(err)

    // get all comments
    db.collection('comments').insert(newCommentToAdd, function(err, items) {

     console.log(items);

     res.sendStatus(200);
     done();
    });//insert

  });//db-connection

 });//post






 /********************** serve pages **********************/
 /* serves main page */
 app.get("/", function(req, res) {
 	console.log(clientPath);
    res.sendFile(clientPath +'index.html');
 });
 

 

 
 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });