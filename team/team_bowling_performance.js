var express=require("express");
var morgan=require("morgan");
var assert=require("assert");
var mongodb=require("mongodb").MongoClient;


var team_bowling_performance=express.Router();


team_bowling_performance.route("/:team_name/:year")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-Type":'text/plain'});
	  next();
})
.get(function(request,response,next){
     mongodb.connect("mongodb://localhost:27017/visualCric",function(error,db){
     	   if(error){
     	   	  return console.error(error);
     	   }//error found

     	   var collection=db.collection("team_bowling_performance");
     	   collection.find({"team":request.params.team_name,"match.dates.0":new RegExp(request.params.year),"match.match_type":"ODI"}).limit(5).toArray(function(error,data){
     	   	    response.end(JSON.stringify(data));
     	   	    db.close();
     	   });
     });
})
.post(function(request,response,next){

})
.delete(function(request,response,next){

});


module.exports=team_bowling_performance;