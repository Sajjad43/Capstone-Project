var express=require("express");
var match=express.Router();
var mongodb=require('mongodb').MongoClient;



var match_batsman_vs_bowler=require("./match_batsman_vs_bowler.js");
var match_bowling_performance=require("./match_bowling_performance.js");
var match_partnership_analysis=require("./match_partnership_analysis.js");
var match_run_comparision=require("./match_run_comparision.js");
var match_run_conceded_by_bowlers=require("./match_run_conceded_by_bowlers.js");
var match_run_contribution_of_each_batsman=require("./match_run_contribution_of_each_batsman");
var match_list=require("./match_list");



match.route("/")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-type":"text/plain"});
	  next();
})
.get(function(request,response,next){
    //response.end("this is get request for the last");
    
 
    mongodb.connect("mongodb://localhost:27017/visualCric",function(error,db){
     	    if(error){
                return console.error(error);
     	    }//error found
            console.log('connected');
        //, "match.dates.0":{$regex:new RegExp(year)}
     	    var collection=db.collection("team_runs_every_10_overs");
            var arr=collection.distinct('team',function(err,data){
            
                   //console.log(data);
                response.end(JSON.stringify(data));
                                                   
                                                         
            })
                 
              
     	    
     	  });
     
})

exports.match_list=match_list;
exports.match=match;
exports.match_batsman_vs_bowler=match_batsman_vs_bowler;
exports.match_bowling_performance=match_bowling_performance;
exports.match_partnership_analysis=match_partnership_analysis;
exports.match_run_comparision=match_run_comparision;
exports.match_run_conceded_by_bowlers=match_run_conceded_by_bowlers;
exports.match_run_contribution_of_each_batsman=match_run_contribution_of_each_batsman;