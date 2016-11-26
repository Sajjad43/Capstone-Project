var express=require("express");
var mongodb=require("mongodb");

var team_batting_partnership=require("./team_batting_partnership.js");
var team_bowling_performance=require("./team_bowling_performance.js");
var team_individual_batting_performance=require("./team_individual_batting_performance.js");
var team_runs_every_10_overs=require("./team_runs_every_10_overs.js");
var team_years_played=require("./team_years_played.js");


var team=express.Router();


team.route("/")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-Type":"text/plain"});
	  next();
})
.get(function(request,response,next){
    response.end("this is get request for the last");
})
.post(function(request,response,next){

})
.delete(function(request,response,next){

});



exports.team=team;
exports.team_years_played=team_years_played;
exports.team_batting_partnership=team_batting_partnership;
exports.team_bowling_performance=team_bowling_performance;
exports.team_individual_batting_performance=team_individual_batting_performance;
exports.team_runs_every_10_overs=team_runs_every_10_overs;

