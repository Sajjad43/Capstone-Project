var express=require("express");
var morgan=require("morgan");
var assert=require("assert");
var mongodb=require("mongodb").MongoClient;


var team_runs_every_10_overs=express.Router();


team_runs_every_10_overs.route("/:team_name/:year")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-Type":"text/plain"});
	  next();
})
.get(function(request,response,next){
    
     console.log("request");
     mongodb.connect("mongodb://localhost:27017/visualCric",function(error,db){
     	  if(error){
     	  	  return console.error(error);
     	  }//error found

     	  var collection=db.collection("team_runs_every_10_overs");
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


module.exports=team_runs_every_10_overs;