var express=require('express');
var mongodb=require('mongodb').MongoClient;

var player_header=express.Router();


player_header.route('/:player')
.all(function(req,res,next){
    
   res.writeHead(200,{"Content-Type":"text/plain"});
    next();
})
.get(function(req,res,next){
    
    mongodb.connect('mongodb://localhost:27017/visualCric',function(err,db){
        if(err){
            return console.error(err);
        }
        
        
        
        var collection=db.collection('player_header');
        
        collection.findOne({"player_name":req.params.player},function(error,data){
           // console.log(data);
            res.end(JSON.stringify(data));
            db.close();

        })
            
           
        
    })
    
})

module.exports=player_header;
