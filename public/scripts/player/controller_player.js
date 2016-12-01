var app=angular.module('cricket')

    .controller('playerelect',['$scope','$state','$stateParams','$cookies','home','ISO3166','$resource',function($scope,$state,$stateParams,$cookies,home,ISO3166,$resource){
       
        $scope.team="";$scope.year="";
         $scope.countries=home.listCountry;
         $scope.startsWith =home.matching;
        $scope.playerSubmit=function(){
            
            $state.go('player.playerSelect',{team:$scope.team,year:$scope.year},{reload:true});
            
        }

    }])

    .controller('infoPlayer',['$scope','$stateParams','$cookies','$resource',function($scope,$stateParams,$cookies,$resource){
       
         $scope.player=$stateParams.player;
         $scope.team=$stateParams.team;
         $scope.year=$stateParams.year;    
        
        $resource('/player/player_header/:player_name').get({player_name:$scope.player},function(item){
            console.log(item);
            $scope.header=item;
        })
               
        
        
       
    }])

    .controller('playerList',['$scope','$cookies','player','$stateParams','$resource',function($scope,$cookies,player,$stateParams,$resource){
       
        var team=$stateParams.team;
        var year=$stateParams.year;
        
       var user= $resource('/player/player_list/:team/:year');
        
        user.query({team:team,year:year},function(item){
            console.log(item[0].player_list);
            $scope.playerList=item[0];
        })
    
        
       
         
        
    }])


    .controller('player_bat_2',['$scope','$stateParams','$resource',function($scope,$stateParams,$resource){

        
        
        var player=$stateParams.player;
        var year=$stateParams.year;
        
        
        var player_bat2=new Highcharts.chart('player_bat_2',{
            
         
            title:{
                text:"Best performance of the batsmen on the respective batting position"
            },
            xAxis:{
                type:'category',
                title:{
                    text:'Position'
                }
            },
            tooltip:{
              shared:true
            },
            yAxis:[{
                title:{
                    text:'No of times batted',
                    style:{
                     color:Highcharts.getOptions().colors[3]
                    }
                },
                labels:{
                    style:{
                     color:Highcharts.getOptions().colors[3]
                    }
                }
            },{
                title:{
                    text:'Batting Average',
                    style:{
                        color:Highcharts.getOptions().colors[8]
                    }
                },
                labels:{
                    style:{
                        color:Highcharts.getOptions().colors[8]
                    }
                },
                opposite:true
            }],
            series:[{
                name:'No of times played',
                color:Highcharts.getOptions().colors[3],
                
            },{
                name:'Batting Average',
                color:Highcharts.getOptions().colors[8],
                yAxis:1
            }]
        })
        
        
         var user=$resource('/player/player_batting_performance_on_different_positions/:player_name');
        var match=[],runs=[],balls=[];
        
        user.query({player_name:player},function(arr){
            console.log(arr);
            
           player_bat2.series[0].setData(arr[0].positions_played);
            player_bat2.series[1].setData(arr[0].average_runs_positions);
            
        })
        
        
        
        // set Data 
      
        
        
    }])

    .controller('player_bowl_1',['$scope','$stateParams','$resource',function($scope,$stateParams,$resource){

        var player=$stateParams.player;
        var year=$stateParams.year;
        
        var player_bowl1=new Highcharts.chart('player_bowl_1',{
            
            title:{
                text:'Bowling Performance'
            },
            xAxis:{
                type:'category',
               
                title:{
                    text:'Match'
                }
            },
            yAxis:[{
                    labels:{
                        style:{
                          color:Highcharts.getOptions().colors[7]
                        }
                    },
                    title:{
                        text:'Run',
                        style:{
                            color:Highcharts.getOptions().colors[7]
                        }
                    }
                },{
                    labels:{
                      style:{
                         color:Highcharts.getOptions().colors[3]
                      }
                    },
                    title:{
                        text:'Over',
                        style:{
                            color:Highcharts.getOptions().colors[3]
                        }
                    },
                    opposite:true
                },{
                   labels:{
                      style:{
                         color:Highcharts.getOptions().colors[0]
                      }
                    },
                    title:{
                        text:'Wicket',
                        style:{
                           color:Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite:true
                }
            ],
            tooltip:{
                shared:true
            },
            series:[{
                type:'column',
                name:'Run',
                
                color:   Highcharts.getOptions().colors[7]
            },{
                type:'column',
                name:'Over',
                yAxis:1,
                color:Highcharts.getOptions().colors[3]

            },{
                name:'wicket',
                
                yAxis:2
              }]
        })
        
        
        
         var user=$resource('/player/player_bowling_performance/:player_name/:year');
        var overs=[],runs=[],wickets=[],match=[];
        
        user.query({player_name:player,year:year},function(arr){
            console.log(arr);
            
            for(var i=0;i<arr.length;i++){
                if(arr[i].team==arr[i].match.teams[0])
                    match.push(arr[i].match.teams[0]+"\n("+arr[i].match.dates[0]+")");
                if(arr[i].team==arr[i].match.teams[1])
                    match.push(arr[i].match.teams[1]+"\n("+arr[i].match.dates[0]+")");
                
                runs.push(arr[i].total_runs_conceded);
                overs.push(arr[i].total_overs_played);
                wickets.push(arr[i].total_wickets_taken);
                
                
            }
            
        player_bowl1.xAxis[0].setCategories(match) ;
        player_bowl1.series[0].setData(runs);
        player_bowl1.series[1].setData(overs);
        player_bowl1.series[2].setData(wickets);
            
            
        })
        
        
        
        
       
      
        
       
    }])

    .controller('player_bat_1',['$scope','$stateParams','$resource',function($scope,$stateParams,$resource){

        var player=$stateParams.player;
        var year=$stateParams.year;
        console.log(year);
        
        var player_bat1= new Highcharts.chart('player_bat_1',{
            chart:{
              type:'column'  
            },
            title:{
                text:'Team Batting performance for consecutive matches'
            },
            xAxis:{
                type:'category',
                title:{
                    text:'Matches'
                }
            },
            yAxis:[
                {
                   labels:{
                       style:{
                        color: Highcharts.getOptions().colors[1]
                       }
                   },
                   title:{
                        text:'Runs',
                        style:{
                            color:Highcharts.getOptions().colors[1]
                        }
                     }
                }],
            tooltip:{
              shared:true
            },
            series:[]
        });
        
        var user=$resource('/player/player_batting_performance_for_matches/:player_name/:year');
        var match=[],runs=[],balls=[];
        
        user.query({player_name:player,year:year},function(arr){
            console.log(arr);
            
            for(var i=0;i<arr.length;i++){
                if(arr[i].team!=arr[i].match.teams[0])
                    match.push(arr[i].match.teams[0]+"("+arr[i].match.dates[0]+")");
                if(arr[i].team!=arr[i].match.teams[1])
                    match.push(arr[i].match.teams[1]+"("+arr[i].match.dates[0]+")");
                
                runs.push(arr[i].total_runs);
                balls.push(arr[i].total_balls);
                
                
            }
            
            player_bat1.xAxis[0].setCategories(match);
            player_bat1.addSeries({name:'Run',data:runs});
            player_bat1.addSeries({name:'Ball',data:balls});
            
            
        })
        
        
        
        
        //player_bat1.xAxis[0].setCategories(['1','2','3','4','5we']);
       // player_bat1.series[0].setData([30,50,6,7,18]);
       // player_bat1.series[1].setData([50,22,16,37,48]);
        
        
        
        
    }]);