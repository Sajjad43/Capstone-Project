var express=require("express");
var morgan=require("morgan");
var assert=require("assert");
var mongodb=require("mongodb").MongoClient;


var player_batting_performance_on_different_positions=express.Router();


player_batting_performance_on_different_positions.route("/:player_name")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-Type":"text/plain"});
	  next();
})
.get(function(request,response,next){

	  mongodb.connect("mongodb://localhost:27017/visualCric",function(error,db){
	  	  if(error){
	  	  	  return console.error(error);
	  	  }//error found


	  	  var collection=db.collection("player_batting_performance_on_different_positions");
	  	  collection.find({"batsman_name":request.params.player_name}).toArray(function(error,data){
	  	  	    response.end(JSON.stringify(data));
	  	  	    db.close();
	  	  });
	  });

})
.post(function(request,response,next){

})
.delete(function(request,response,next){

});


module.exports=player_batting_performance_on_different_positions;