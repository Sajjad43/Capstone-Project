var express=require("express");
var mongodb=require("mongodb");

var player_batting_performance_for_matches=require("./player_batting_performance_for_matches.js");
var player_batting_performance_on_different_positions=require("./player_batting_performance_on_different_positions.js");
var player_bowling_performance=require("./player_bowling_performance.js");
var player_list=require('./playerList.js')
var player_header=require('./player_header.js')

var player=express.Router();


player.route("/")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-Type":"text/plain"});
	  next();
})
.get(function(request,response,next){
        response.end("this is player");
})
.post(function(request,response,next){

})
.delete(function(request,response,next){

});


exports.player_list=player_list;
exports.player=player;
exports.player_batting_performance_for_matches=player_batting_performance_for_matches;
exports.player_batting_performance_on_different_positions=player_batting_performance_on_different_positions;
exports.player_bowling_performance=player_bowling_performance;
exports.player_header=player_header;

