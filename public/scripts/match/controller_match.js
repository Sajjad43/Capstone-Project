var app=angular.module('cricket')

     .controller('matchSelect',['$scope','match','$cookies','$state','home','ISO3166','$resource',function($scope,match,$cookies,$state,home,ISO3166,$resource){
            
            $scope.host="",$scope.opponent="",$scope.year;
             $scope.countries=home.listCountry;
            $scope.startsWith=home.matching;
         
         
            $scope.matchSubmit=function(){
                console.log("gfgh"+$scope.host+$scope.opponent);
                console.log($scope.year);
                
                $state.go('match.selectMatch',{host:$scope.host,opponent:$scope.opponent,year:$scope.year},{reload:true});
            }
            
         
     }])
    .controller('matchList',['$scope','match','$stateParams','$resource',function($scope,match,$stateParams,$resource){
            
            var host=$stateParams.host;
            var opponent=$stateParams.opponent
            var year=$stateParams.year;

            console.log(match.listMatch);
            //$scope.matchList=match.listMatch
            var user =$resource('/match/match_list/:team01/:team02/:year');
            user.query({team01:host,team02:opponent,year:year},function(item){
                console.log(item);

                $scope.listMatch=item;
                match.selectedTeam=host;
            })
            




            console.log($stateParams.host+$stateParams.opponent);
    }])

 
    .controller('match_info',['$scope','match','$stateParams','$resource',function($scope,match,$stateParams,$resource){
       
        $scope.team1=$stateParams.host;
        $scope.team2=$stateParams.opponent;
        $scope.selectTeam=match.selectedTeam;
        
        $scope.match=$stateParams.match;
        $scope.mode='batting';
        

        
        console.log($scope.match);
        
        $scope.changeTeam=function(team){
            $scope.selectTeam=team;
            match.selectedTeam=team;
        }
        
      
        
    }])
    
     .controller('match_bowl_3',['match','$scope','$resource','$stateParams',function(match,$scope,$resource,$stateParams){
            //we need an addition parameter for match id 
         
         
         var team1=$stateParams.host;
         var team2=$stateParams.opponent;
         var match_date=$stateParams.match;
         var selectedTeam=match.selectedTeam;
         
         
         
         var match_bowl3=new  Highcharts.chart('match_bowl_3',{
                title: {
                      text: 'Bowling Performance'
                },
                xAxis: {
                      categories: ['Run Concede', 'Dot Balls', 'Overs', 'Extras']
                },
                labels: {
                    items: [{
                        html: 'Wickets',
                        style: {
                            left: '5px',
                            top: '5px',
                            color:'black'
                        }
                    }]
                },
                series: []

        });
         

         var user=$resource('/match/match_bowling_performance/:team01/:team02/:match_date');
         user.get({team01:team1,team02:team2,match_date:match_date},function(item){
             
              var series=new Array();
              console.log(item);
            

             if(selectedTeam==item.first_innings.bowling_team)
                    {
                      series=item.first_innings.bowler_runs_dots_overs_extras;  
                      series[series.length-1].data=item.first_innings.bowler_wickets;
                    }  
             else
                   {
                    series=item.second_innings.bowler_runs_dots_overs_extras;
                    series[series.length-1].data=item.second_innings.bowler_wickets;
                  }

                  series[series.length-1].center=[15,5];
           
         for(var i=0;i<series.length;i++)
                match_bowl3.addSeries(series[i]);
                   


         
         })

        
         //for(var i=0;i<player.length;i++)
         //    var bowler={};
         //     bowler.graph='column'
         //     bowler.name='jane'
         //     bowler.data=[]
         //     series.push(bowler)
         
         
         
         /*var series=[
                {
                    type: 'column',
                    name: 'Jane',
                    data: [3, 2, 1, 3]
                },{
                    type: 'column',
                    name: 'John',
                    data: [2, 3, 5, 7]
                },{
                    type: 'column',
                    name: 'Joe',
                    data: [4, 3, 3, 9]
                },{
                    type: 'column',
                    name: 'KAMAL',
                    data: [5, 12, 4, 5]
                },
                {
                    type: 'pie',
                    name: 'wickets',
                    center: [100, 80],
                    size: 100,
                    showInLegend: false,
                    dataLabels: {
                        enabled: false
                    }
                }];
         
         series[series.length-1].data=[{
                            name: 'Jane',
                            y: 13,
                        },{
                            name: 'John',
                            y: 23,
                        },{
                            name: 'Joe',
                            y: 19,
                        }]
         */
         
    }])

    .controller('match_bowl_2',['match','$scope','$resource','$stateParams',function(match,$scope,$resource,$stateParams){

        
                 var team1=$stateParams.host;
         var team2=$stateParams.opponent;
         var match=$stateParams.match;
        var selectedTeam=match.selectedTeam;
        var match_bowl2=new Highcharts.chart('match_bowl_2',{
                 
                     chart:{
                        type:'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 1
                     },
                     colorAxis: {
                         min: 0,
                         minColor: '#FFFFFF',
                         maxColor: Highcharts.getOptions().colors[0]
                    },
                    legend: {
                        align: 'right',
                        layout: 'vertical',
                        margin: 0,
                        verticalAlign: 'top',
                         y: 25,
                        symbolHeight: 280
                    },
                    title:{
                         text:"Batsman VS Bowler"
                    },
                    xAxis:{
                        title:{
                              text:'Batsman'
                        }
                    },
                    yAxis:{
                        title:{
                            text:'Bowler'
                        }  
                    },
                    tooltip:{
                        formatter:function(){
                            return '<b>'+match_bowl2.xAxis[0].categories[this.point.x]+"-"+
                                    match_bowl2.yAxis[0].categories[this.point.y]+"="+this.point.value+"</b>"
                         }
                    },   
                    series:[{
                      name:'Batsman and Bowler',
                      borderWidth:1,
                     
                      dataLabels:{
                         enabled:true,
                         color:'#000000'
                       }
                        
                    }]
             
            });
        
        match_bowl2.xAxis[0].setCategories(['Shoaib','Khalid','Sami','Razzaq','Shafiq','Azhar','Yaqat','Hayes','Nana']);
        match_bowl2.yAxis[0].setCategories(['Balaji','RPSingh','Yuvraj','Dravid']);
        var data= [ [0,0,33],[0,1,42],[0,2,34],[0,3,94],
                    [1,0,23],[1,1,4],[1,2,54],[1,3,54],
                    [2,0,23],[2,1,2],[2,2,24],[2,3,24],
                    [3,0,2],[3,1,24],[3,2,54],[3,3,34],
                    [4,0,2],[4,1,24],[4,2,54],[4,3,34],
                    [5,0,2],[5,1,24],[5,2,54],[5,3,34],
                    [6,0,2],[6,1,24],[6,2,54],[6,3,34],
                    [7,0,2],[7,1,24],[7,2,54],[7,3,34],
                    [8,0,2],[8,1,24],[8,2,54],[8,3,34],
                ];
        match_bowl2.series[0].setData(data);
        
        
        
    }])

    .controller('match_bat_3',['match','$scope','$resource','$stateParams',function(match,$scope,$resource,$stateParams){
       
        var team1=$stateParams.host;
        var team2=$stateParams.opponent;
        var match_date=$stateParams.match;//this is the date of the match
        var selectedTeam=match.selectedTeam;
        
        var marker={
                           
                    fillColor:'white',
                    lineWidth:2,
                    radius:4,
                    states:{
                        hover:{
                            fillColor:'white',
                            lineWidth:2,
                            lineColor:Highcharts.getOptions().colors[8]
                        }

                    },
                    lineColor: Highcharts.getOptions().colors[7]
            };
            
        var match_bat3=new Highcharts.chart('match_bat_3',{
            title:{
              text:"Run comparison analysis"
            },
            xAxis:{
                title:{
                    text:'Overs'
                },
                type:"linear",
                tickInterval:10,
                min:0,
                max:50
                
            },
            yAxis:{
                title:{
                    text:'Runs'
                }
            },
            series:[]
         });


        var series=new Array();
        var user=$resource("/match/match_run_comparision/:team01/:team02/:match_date");
        user.get({team01:team1,team02:team2,match_date:match_date},function(item){
                console.log(item);

                series=item.runs_every_10_overs;

                for(var i=0;i<series.length;i++)
                     match_bat3.addSeries(series[i]);
        
                  //if(selectedTeam==item.first_innings.team)
                    //series=item.first_innings.batsman_runs_every_10_overs;    
                  //else
                    //series=item.second_innings.batsman_runs_every_10_overs;
       
        });

       
    }])

     .controller('match_bowl_1',['match','$scope','$resource','$stateParams',function(match,$scope,$resource,$stateParams){
  
         
         var team1=$stateParams.host;
        var team2=$stateParams.opponent;
        var selectedTeam=match.selectedTeam;
        var match_date=$stateParams.match;
         var match_bowl1=new  Highcharts.chart('match_bowl_1',{
                    chart:{
                         type:'bar'
                    },
                    title:{
                        text:'Run concede by each bowler over the 10overs interval'
                    },
                    xAxis: {
                        //categories: ['10', '20', '30', '40', '50'],
                        title:{
                           text:'Over No'
                        }
                    },
                    yAxis:{
                        minTickInterval:10,
                        title:{
                            text:'Runs'
                        }
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },
                    series:new Array()
				    
         });
         

         
         var user=$resource('/match/match_run_conceded_by_bowlers/:team01/:team02/:match_date');
         user.get({team01:team1,team02:team2,match_date:match_date},function(item){
             
              var series=new Array();
              console.log(item);
              if(selectedTeam==item.first_innings.bowling_team)
                    series=item.first_innings.bowler_runs_conceded_every_10_overs;    
             else
                    series=item.second_innings.bowler_runs_conceded_every_10_overs;

             /*if(selectedTeam==item.first_innings.team)
                    series=item.first_innings.partnership_runs;    
             else
                    series=item.second_innings.partnership_runs;
            */
                match_bowl1.xAxis[0].setCategories(['10', '20', '30', '40', '50']);
                
                console.log(series);
                for(var i=0;i<series.length;i++)
                     match_bowl1.addSeries(series[i]);             
         
         })



/*
         var data=[
                {   name:"Shoaib",
                    data:[{x:0,y:23},{x:2,y:45}]
                },{
                    name:"Inzamam",
                    data:[0,4,25,134,0]
                },{
                    name:"Shoaib khan",
                     data:[{x:2,y:25},{x:0,y:47},{x:4,y:23}]
                 },{
                    name:"Waqar",
                     data:[0,14,39,24,4]
                 },{
                    name:"Amir",
                    data:[0,4,4,15,41]

             }]*/
         
        
     }])

    .controller('match_bat_2',['$scope','$state','$resource','$stateParams','match',function($scope,$state,$resource,$stateParams,match){
        console.log($state.$current.name);
         var team1=$stateParams.host;
         var team2=$stateParams.opponent;
         var match_date=$stateParams.match;
         var selectedTeam=match.selectedTeam;

         console.log(match.selectedTeam);
        
         var match_bat2=new Highcharts.chart('match_bat_2',{
                chart:{
                     type:'column'
                },
                title:{
                    text:'Partnership Analysis of the team'
                },
                 xAxis: {
                    title:{
                         text:'Partnership No'
                    }
                 },
                 yAxis:{
                    minTickInterval:10,
                    title:{
                        text:'Runs'
                    }
                },
                series: []
            });
        
         var user=$resource('/match/match_partnership_analysis/:team01/:team02/:match_date');
         user.get({team01:team1,team02:team2,match_date:match_date},function(item){
             
              console.log(item);
              console.log(match.selectedTeam);

             if(selectedTeam==item.first_innings.team)
                    series=item.first_innings.partnership_runs;    
             else
                    series=item.second_innings.partnership_runs;

                 match_bat2.xAxis[0].setCategories(['1','2','3','4','5','6','7','8','9','10']);
              for(var i=0;i<series.length;i++)
                   match_bat2.addSeries(series[i]);
         
         })

         /*

        var series=[
            {
                name:"Shoaib",
                data:[{x:0,y:23},{x:2,y:45}]
            },{
                name:"Inzamam",
                data:[{x:0,y:47},{x:2,y:25},{x:4,y:23}]
            },{
                name:"Shoaib khan",
                data:[0,61,0,4]
            },{
                name:"Razzaq khan",
                data:[0,0,0,4]
            },{
                 name:"Sajjad",
                 data:[{x:9,y:35}]
            }]
        */
        
        
     
    }])

    .controller('match_bat_1',['$scope','$resource','$stateParams','match',function($scope,$resource,$stateParams,match){
       
        var team1=$stateParams.host;
        var team2=$stateParams.opponent;

        var year=$stateParams.match;
        var selectedTeam=match.selectedTeam;

        console.log(team1);
        console.log(team2);

         var match_date=$stateParams.match;
        var match_bat1=new Highcharts.chart('match_bat_1',{
                chart:{
                        type:'bar'
                },
                title:{
                        text:'Run contribution of each batsman'
                },
                xAxis: {
                        title:{
                          text:'Per 10 overs'
                        }
                },
                yAxis:{
                    type:'linear',
                    title:{
                         text:'Runs'
                    }
                },
                series: []
        });
        
        var series=new Array();
        console.log(team1+"  and   "+team2);
        var user=$resource("/match/match_run_contribution_of_each_batsman/:team01/:team02/:year");
        user.get({team01:team1,team02:team2,year:year},function(item){
                  console.log(selectedTeam);
                  console.log(item);


                  if(selectedTeam==item.first_innings.team)
                    series=item.first_innings.batsman_runs_every_10_overs;    
                  else
                    series=item.second_innings.batsman_runs_every_10_overs;
                
                match_bat1.xAxis[0].setCategories(['10', '20', '30', '40', '50']);
                for(var i=0;i<series.length;i++)
                      match_bat1.addSeries(series[i]);


        });
        
        /*var series=[{
                        name:"Yasir",
                        data:[{x:0,y:6},{x:4,y:7}]
                    },{
                         name:"Inzamam",
                         data:[54,4,5,3,0]
                    },{
                        name:"Imran khan",
                        data:[0,4,0,0,4]
                    },{
                        name:"Sayeed Anwar",
                        data:[0,5,10,0,0]
                    },{
                        name:"Shoaib malik",
                        data:[0,0,10,20,4]
                    },{
                        name:"Hussain Anwar",
                        data:[0,0,10] 
                    },{
                        name:"Afridi Anwar",
                        data:[0,0,19]
                    }];
                    */
                
            
      }]);



