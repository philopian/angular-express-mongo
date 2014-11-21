 var path 		= require("path"); 
 var express 	= require("express");
 var db 		= require('mongodb').Db;

 var app = express();
 


// back out a directory and into the client directory
var clientPath = path.resolve("..") + "/client/";



/* API */
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
	    });
		
	});

});
 app.post("/api/newcomments/add", function(req, res, done){


  console.log(req.data);

  //db.connect("mongodb://localhost:27017/publicInvolvement", function(err, db) {
  // if(err) return console.dir(err)
  //
  // // get all comments
  // db.collection('comments').insert({}).toArray(function(err, items) {
  //
  //  // wrap all the points into a geojson object
  //  var geoJsonObj = {
  //   type:"FeatureCollection",
  //   features:items
  //  };
  //
  //  res.send(geoJsonObj);
  //  done();
  // });
  //
  //});

 });







 /* serves main page */
 app.get("/", function(req, res) {
 	console.log(clientPath);
    res.sendFile(clientPath +'index.html');
 });
 
  app.post("/user/add", function(req, res) {
    /* some server side logic */
    res.send("OK");
  });
 







 /* serves all the static files */
 // app.get(/^(.+)$/, function(req, res){
 //     console.log('static file request : ' + req.params);
 //     res.sendfile( clientPath + req.params[0]);
 // });
 
 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });