var express=require("express");
var morgan=require("morgan");
var assert=require("assert");
var mongodb=require("mongodb").MongoClient;


var player_batting_performance_for_matches=express.Router();


player_batting_performance_for_matches.route("/:player_name/:year")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-Type":"text/plain"});
	  next();
})
.get(function(request,response,next){
     mongodb.connect("mongodb://localhost:27017/visualCric",function(error,db){
     	  if(error){
     	  	return console.error(error);
     	  }//error found
     	  var collection=db.collection("player_batting_performance_for_matches");
     	  collection.find({"batsman_name":request.params.player_name,"match.dates.0":{$regex:new RegExp(request.params.year)}}).limit(7).toArray(function(error,data){
     	  	   console.log(data);  
              response.end(JSON.stringify(data));
     	  	    db.close();
     	  });
     });
})
.post(function(request,response,next){

})
.delete(function(request,response,next){

});


module.exports=player_batting_performance_for_matches;