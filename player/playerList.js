var express=require('express'),
    playerList=express.Router(),
    mongodb=require('mongodb').MongoClient;




playerList.route('/:team/:date')
.all(function(req,res,next){
    //res.writeHead(200,{'Content-type':"text/plain"});
    next();
})
.get(function(req,res,next){
    
    var team=req.params.team;
    var date=req.params.date;
    
   console.log(team+ ' '+date); mongodb.connect("mongodb://localhost:27017/visualCric",function(error,db){
	   	   if(error){
	   	   	  return console.error(error);
	   	   }//error found

	   	   var collection=db.collection("player_list_yearwise");
	   	   collection.find({"team_name":team,"year":date+""}).toArray(function(error,data){
               
	   	   		console.log(data);
               res.json(data);
               db.close();
	   	   });
	   });
    
    
})

module.exports=playerList;