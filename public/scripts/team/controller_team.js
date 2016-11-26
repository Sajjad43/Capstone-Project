var app=angular.module('cricket')

   
    .controller('teamSelect',['$scope','$stateParams','$state','$cookies','home','ISO3166','team',function($scope,$stateParams,$state,$cookies,home,ISO3166,$team){
      
     
         //get the country and year
        $scope.team="";
        $scope.year="";
        
        $scope.countries=home.listCountry;
        $scope.startsWith=home.matching;
        
         
        $scope.teamSubmit=function(){
            
            
            $state.go('team.select',{team:$scope.team,year: $scope.year},{reload:true});
        }
        
        $scope.$watch('team',function(newVal,oldVal){
            console.log(newVal);
        })
        
        
    }])

    .controller('team_bat_3',['$scope','$resource','$stateParams',function($scope,$resource,$stateParams){
        
        var team=$stateParams.team;
        var year=$stateParams.year;
        
        
       var team_bat3 = new Highcharts.chart('team_bat_3',{
               
               chart:{
                   type:'heatmap',
                   marginTop:'40',
                   marginBottom:'80',
                   plotBorderWidth:1
               },
                xAxis:{
                    title:{
                        text:'Player'
                    }
                },
                yAxis:{
                    title:{
                         text:'Match'
                    }
                },
                title:{
                    text:'Individual batting performance'
                },
                colorAxis:{
                    minColor:'#FFFFFF',
                    maxColor:'#33cc33'
                },
                legend:{
                    align:'right',
                    verticalAlign:'top',
                    symbolHeight:280,
                    y:25,
                    layout:'vertical'
                },
                tooltip:{
                  formatter:function(){
                      return '<b>'+team_bat3.xAxis[0].categories[this.point.x]+'-'+team_bat3.yAxis[0].categories[this.point.y]+'='+
                          this.point.value+'<b>';
                  }  
                },
                series:[{
                        name:'Run',
                        data:[{}],
                        dataLabels:{
                            enabled:true,
                            color: '#000000'
                        },
                        borderWidth:1
                }]
            })

       var user=$resource("/team/team_individual_batting_performance/:team_name/:year");
       
       user.query({team_name:team,year:year},function(arr){
          console.log(arr);


       });
       
       var axisX=['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon']
       var axisY=['Aus', 'Bng', 'Ind', 'Sri', 'Pak'];
       var array=[
                    [0,0,23],[0,1,43],[0,2,34],[0,3,43],[0,4,44],
                    [1,0,23],[1,1,43],[1,2,34],[1,3,33],[1,4,54],
                    [2,0,34],[2,1,13],[2,2,34],[2,3,93],[2,4,4],
                    [3,0,73],[3,1,43],[3,2,24],[3,3,63],[3,4,24],
                    [4,0,32],[4,1,53],[4,2,14],[4,3,93],[4,4,14],
                ];
     
        team_bat3.xAxis[0].setCategories(axisX);
        team_bat3.yAxis[0].setCategories(axisY);
        team_bat3.series[0].setData(array);
     
    }])

    .controller('team_bowl_1',['$scope','$resource','$stateParams',function($scope,$resource,$stateParams){
        
        var team=$stateParams.team;
        var year=$stateParams.year;
        
      
        var team_bowl1=new Highcharts.chart('team_bowl_1',{
                
                title:{
                    text:"Bowling performance of the team"
                },
                xAxis:{
                    title:{
                        text:'team'
                    }
                },
                yAxis:[
                    {
                      min:0,
                      title:{
                        text:'Balls',
                        style:{
                            color:Highcharts.getOptions().colors[3]
                        }  
                      },
                      labels:{
                            style:{
                                 color:Highcharts.getOptions().colors[3]
                            }
                      }
                          
                    },
                    {
                        title:{
                            text:'Wickets',
                            style:{
                              color:Highcharts.getOptions().colors[5]
                            }
                        },
                        labels:{
                              style:{
                                 color:Highcharts.getOptions().colors[5]
                              }
                         },
                       
                        opposite:true,
                        max:10,
                        
                        tickInterval:1
                       
                    }
                ],
                tooltip:{
                   enabled:true
                },
                series:[
                    {   type:'column',
                        name:"Boundary",
                        stacking:'normal',
                        
                    },
                    {   type:'column',
                        name:"Extras",
                        stacking:'normal',
                    },
                    {   type:'column',
                        name:"Dot balls",
                        stacking:'normal',
                    
                    },
                    {   type:'column',
                        name:"1s",
                        stacking:'normal',
                        
                    },
                    {   type:'column',
                        name:"2s & 3s",
                        stacking:'normal',
                        
                    },{
                       
                        name:'wicket',
                        yAxis:1
                    }
                
                ]
            
        });
        
      
        
        
        
        var xAxis=new Array(),runConcede=new Array(),extras=new Array(),boundaryBall=new Array(),dotBalls=new Array(),wickets=new Array();

        var user=$resource("/team/team_bowling_performance/:team_name/:year");
        
        user.query({team_name:team,year:year},function(arr){
              console.log(arr);
              var team2;

              for(var i=0;i<arr.length;i++){
                 if(team == arr[i].match.teams[0]){
                     team2=arr[i].match.teams[1];
                }else{
                     team2=arr[i].match.teams[0];
                }

                 xAxis.push(team2+"("+arr[i].match.dates+")");
                 runConcede.push(arr[i].total_runs_given);
                 extras.push(arr[i].total_extras);
                 boundaryBall.push(arr[i].total_boundary_balls);
                 dotBalls.push(arr[i].total_dot_balls);
                 wickets.push(arr[i].total_wickets);

              }


            team_bowl1.xAxis[0].setCategories(xAxis);
            
            team_bowl1.series[0].setData(runConcede);
       
            team_bowl1.series[1].setData(extras);
            
            team_bowl1.series[2].setData(boundaryBall);
        
            team_bowl1.series[3].setData(dotBalls);
        
            team_bowl1.series[5].setData(wickets);
        


        });

        
        
        
        
    }])


    .controller('team_bat_1',['$scope','$state','team','$resource','$stateParams',function($scope,$state,team,$resource,$stateParams){
        
         var team=$stateParams.team;
         var year=$stateParams.year;

         

       
        var team_bat1=new Highcharts.chart('team_bat_1',{
            
            title: {
                text: 'Team Statistics',
            },
           
           xAxis: {
               
                title: {
                    text: 'Over'
                }
            },
            yAxis: {
                title: {
                    text: 'Runs'
                }
            },
            tooltip: {
                valueSuffix: 'runs'
            },
            series: []

        });

        var team2;
       
        var xAxis=['10', '20', '30', '40', '50'];
        team_bat1.xAxis[0].setCategories(xAxis);
        
        var user =$resource('/team/team_runs_every_10_overs/:team_name/:year');
        
         user.query({team_name:team,year:year},function(arr){
            console.log(arr.length);
          

            
            //var data=[{name:"match-1",data:arr[0].runs_every_10_overs}];
            var data=[];
            for (var i = 0; i < arr.length; i++) {

                if(team == arr[i].match.teams[0]){
                     team2=arr[i].match.teams[1];
                }else{
                     team2=arr[i].match.teams[0];
                }
                data.push({name:""+team2+" ("+arr[i].match.dates+")",data:arr[i].runs_every_10_overs});
            }


            for(var i=0;i<data.length;i++)
              team_bat1.addSeries(data[i]);


         })

        
        /*var data=[
            {   name: 'Match 1',
                data: [10, 25, 8, 17, 31]
            },{
                name: 'Match 2',
                data: [2, 15, 27, 19, 24]
            },{
                name: 'Match 3',
                data: [0, 6 , 15, 30, 24]
            }
        ];*/
       
        //for(var i=0;i<data.length;i++)
          //  team_bat1.addSeries(data[i]);
        
    /*  team.infoStat().$promise.then(function(response){
            console.log(response)
        },function(response){
            console.log("error");
        });*/
       
    }])

    .controller('team_bat_2',['$scope','ISO3166','$resource','$state','$stateParams',function($scope,ISO3166,$resource,$state,$stateParams){
     
        var team=$stateParams.team;
        var year=$stateParams.year;
         
        console.log(year);


        
       var team_bat2= Highcharts.chart('team_bat_2',{
            chart:{
               type: 'column'
            },
            title: {
                text: 'Batting Partnership Number'
            },
            xAxis:{
                categories:['1','2','3','4','5','6','7','8','9','10'],
                
                title: {
                    text: 'Partnership',
                    style:{
                        color:Highcharts.getOptions().colors[7]
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Run',
                    align: 'high',
                     style:{
                        color:Highcharts.getOptions().colors[7]
                    }
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' runs'
            },
            series: []
    
        })
       
        var team2;
        user = $resource("/team/team_batting_partnership/:team_name/:year");
        user.query({team_name:team,year:year},function(arr){
              console.log(arr);
            var data=new Array();

            
            for(var i=0;i<arr.length;i++){
                if(team == arr[i].match.teams[0]){
                     team2=arr[i].match.teams[1];
                }else{
                     team2=arr[i].match.teams[0];
                }
              data.push({name:team2+" ("+arr[i].match.dates+")", data:arr[i].partnership_runs});
            }

            for(var i=0;i<data.length;i++)
                    team_bat2.addSeries(data[i]);
        });
     /*  var data=[{
                name: 'Match-1',
                data: [107, 50,104,45,67,7,5]
            },{
                name: 'Match-2',
                data: [33, 78, 100,5,67,8,23]
            }, {
                name: 'Match-3',
                data: [75, 110, 65,45,67,2]
            },{
                name: 'Match-4',
                data: [35, 10,5,4,56,43,2]
            },{
                name: 'Match-5',
                data: [75, 20, 50,45,3,21,2]
            }]
       */
       
       
    }])

    .controller('info',['$scope','$state','$stateParams','ISO3166','$cookies','$resource',function($scope,$state,$stateParams,ISO3166,$cookies,$resource){

        $scope.country=$stateParams.team;
        $scope.year=$stateParams.year;
       
    }])
    