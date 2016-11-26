var express=require("express");
var morgan=require("morgan");
var assert=require("assert");
var mongodb=require("mongodb").MongoClient;


var match_list=express.Router();



match_list.route("/:team1/:team2/:year")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-type":"text/plain"});
	  next();
})
.get(function(request,response,next){
    //response.end("this is get request for the last");

    var team1=request.params.team1;
    var team2=request.params.team2;
    var year=request.params.year;

     mongodb.connect("mongodb://localhost:27017/visualCric",function(error,db){
	   	   if(error){
	   	   	  return console.error(error);
	   	   }//error found

	   	   var collection=db.collection("match_list");
	   	   collection.find({"teams":[team1,team2],"year":year}).toArray(function(error,data){
               
	   	   		console.log(data)
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


module.exports=match_list;