var express=require('express');
var mongodb=require('mongodb').MongoClient;

var home_header=express.Router();


home_header.route('/')
.all(function(req,res,next){
    
   res.writeHead(200,{"Content-Type":"text/plain"});
    next();
})
.get(function(req,res,next){
    
    mongodb.connect('mongodb://localhost:27017/visualCric',function(err,db){
        if(err){
            return console.error(err);
        }
        
        
        
        var collection=db.collection('home_header');
        
        collection.find({}).toArray(function(error,data){
            console.log(data);
            res.end(JSON.stringify(data[0]));
            db.close();

        })
            
           
        
    })
    
})

module.exports=home_header;
