var express=require('express');

var mongodb=require('mongodb').MongoClient;

var years_played=express.Router();

years_played.route('/')
.all(function(req,res,next){
   
    res.writeHead(200,{
        "Content-type":'text/json'
    });
    next();
})
.get(function(req,res,next){

    var team=req.params.team_name;
     mongodb.connect('mongodb://localhost:27017/visualCric',function(err,db){
        
        if(err){
            return console.error(err);
        }
        
        var collection=db.collection('team_years_played');
        
        collection.find().toArray(function(err,data){
            
            res.end(JSON.stringify(data));
            db.close()
        })
        
        
    })
    
})

module.exports=years_played;