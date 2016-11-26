var express=require("express");
var morgan=require("morgan");
var assert=require("assert");
var mongodb=require("mongodb").MongoClient;



var match_batsman_vs_bowler=express.Router();

match_batsman_vs_bowler.route("/")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-Type":"text/plain"});
	  next();
})
.get(function(request,response,next){
	   var team1=request.param("team1");
	   var team2=request.param("team2");


	   mongodb.connect("mongodb://localhost:27017/visualCric",function(error,db){
	   	   if(error){
	   	   	  return console.error(error);
	   	   }//error found

	   	   var collection=db.collection("match_batsman_vs_bowler");
	   	   collection.findOne({"match.teams":[team1,team2]},function(error,data){
               response.end(JSON.stringify(data));
               db.close();
	   	   });
	   });

	   
	   
	   
})
.post(function(request,response,next){

})
.put(function(request,response,next){

})
.delete(function(request,response,next){
	
});


module.exports=match_batsman_vs_bowler;