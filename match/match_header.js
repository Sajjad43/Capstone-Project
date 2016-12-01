var express=require('express');
var mongodb=require('mongodb').MongoClient;

var match_header=express.Router();


match_header.route('/:team1/:team2/:date')
.all(function(req,res,next){
    
   res.writeHead(200,{"Content-Type":"text/plain"});
    next();
})
.get(function(req,res,next){
    
    mongodb.connect('mongodb://localhost:27017/visualCric',function(err,db){
        if(err){
            return console.error(err);
        }
        
        var team1=req.params.team1;
        var team2=req.params.team2;
        var date=req.params.date;
        
        var collection=db.collection('match_header');
        
        collection.findOne({"match.teams":[team1,team2],"match.dates.0":date},function(error,data){
           // console.log(data);
            res.end(JSON.stringify(data));
            db.close();

        })
    })
    
})

module.exports=match_header;
