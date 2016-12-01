var express=require("express");
var morgan=require("morgan");
var assert=require("assert");
var http=require("http");
//var match_batsman_vs_bowler=require("./match/match_batsman_vs_bowler.js");

var matchRouter=require("./match/matchRouter.js");
var teamRouter=require("./team/teamRouter.js");
var playerRouter=require("./player/playerRouter.js");
var home_header=require('./home_header.js');



var app=express();
//var server=http.createServer(app);

app.use("/",express.static("public"));





//codes for app.use() goes here

app.use('/home_header',home_header);


app.use("/match",matchRouter.match);
app.use("/match/match_batsman_vs_bowler",matchRouter.match_batsman_vs_bowler);
app.use("/match/match_bowling_performance",matchRouter.match_bowling_performance);
app.use("/match/match_partnership_analysis",matchRouter.match_partnership_analysis);
app.use("/match/match_run_comparision",matchRouter.match_run_comparision);
app.use("/match/match_run_conceded_by_bowlers",matchRouter.match_run_conceded_by_bowlers);
app.use("/match/match_run_contribution_of_each_batsman",matchRouter.match_run_contribution_of_each_batsman);
app.use("/match/match_list",matchRouter.match_list);
app.use("/match/match_header",matchRouter.match_header);



app.use("/team",teamRouter.team);
app.use('/team/team_years_played',teamRouter.team_years_played);
app.use("/team/team_batting_partnership",teamRouter.team_batting_partnership);
app.use("/team/team_bowling_performance",teamRouter.team_bowling_performance);
app.use("/team/team_individual_batting_performance",teamRouter.team_individual_batting_performance);
app.use("/team/team_runs_every_10_overs",teamRouter.team_runs_every_10_overs);
app.use('/team/team_header',teamRouter.team_header);


app.use("/player",playerRouter.player);
app.use("/player/player_batting_performance_for_matches",playerRouter.player_batting_performance_for_matches);
app.use("/player/player_batting_performance_on_different_positions",playerRouter.player_batting_performance_on_different_positions);
app.use("/player/player_bowling_performance",playerRouter.player_bowling_performance);
app.use('/player/player_list',playerRouter.player_list)
app.use('/player/player_header',playerRouter.player_header)




app.listen(1000,"127.0.0.1",function(){
	  console.log("The server is running at localhost:1000");
});









