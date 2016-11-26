var express=require("express");
var morgan=require("morgan");
var assert=require("assert");
var mongodb=require("mongodb").MongoClient;


var player_bowling_performance=express.Router();


player_bowling_performance.route("/:player_name/:year")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-Type":"text/plain"});
	  next();
})
.get(function(request,response,next){

	     mongodb.connect("mongodb://localhost:27017/visualCric",function(error,database){
	     	    if(error){
	     	    	  return console.error(error);
	     	    }//error found

	     	    var collection=database.collection("player_bowling_performance");

	     	    collection.find({"bowler_name":request.params.player_name,"match.dates.0":new RegExp(request.params.year)}).limit(7).toArray(function(error,data){
                     
                     
                     response.end(JSON.stringify(data));
                     database.close();
                     
                     

	     	    });
	     });
      
})
.post(function(request,response,next){

})
.delete(function(request,response,next){

});


module.exports=player_bowling_performance;