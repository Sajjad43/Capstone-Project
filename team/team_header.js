var express=require('express');
var mongodb=require('mongodb').MongoClient;

var team_header=express.Router();


team_header.route('/:team/:year')
.all(function(req,res,next){
    
   res.writeHead(200,{"Content-Type":"text/plain"});
    next();
})
.get(function(req,res,next){
    
    mongodb.connect('mongodb://localhost:27017/visualCric',function(err,db){
        if(err){
            return console.error(err);
        }
        
        
        
        var collection=db.collection('team_header');
        
        collection.findOne({"team":req.params.team,"year":''+req.params.year},function(error,data){
           // console.log(data);
            res.end(JSON.stringify(data));
            db.close();

        })
            
           
        
    })
    
})

module.exports=team_header;
