angular.module('cricket',['ui.bootstrap','ui.router','iso-3166-country-codes','ngCookies',"highcharts-ng",'ngResource','ng-typeahead'])
.constant('baseUrl','http://localhost:3000/')
.config(function($stateProvider,$urlRouterProvider){
    
    $stateProvider
        .state('home',{
            url:'/home',
            views:{
                'header':{
                    templateUrl:'views/home_header.html',

                },
                'content':{
                    templateUrl:'views/home.html',
                    controller:'home'
                }
            }
        })
        .state('about',{
            url:'/about',
            views:{
                'header':{
                    templateUrl:'views/header.html'
                },
                'content':{
                    templateUrl:'views/about.html'
                }
            }
        })
    
        .state('team',{
            url:'/team',
            views:{
                'header':{
                    templateUrl:'views/header.html',

                },
                'content@':{
                    templateUrl:'views/team.html',
                   
                },
                'info@team':{
                    template:'<center><h3>Select a team</h3></center>'
                }
               
            }
        
        })
    
    .state('team.select',{
        
        params:{
            team:null,
            year:null
        },
        views:{
            
                'info@team':{
                    templateUrl:'views/team/info.html',
                    controller:'info'
                },
                'graphBlock@team':{
                    templateUrl:'views/team/graph.html'
                    
                },
                'graph@team.select':{
                    templateUrl:'views/team/team_bat_1.html',
                    controller:'team_bat_1'
                }
        }
    })
    
      
     .state('team.select.performance',{
        
            url:'/:id',
            views:{
                'graph@team.select':{
                    
                    template:function($stateParams){
                        if($stateParams.id<=3){
                            return "<div><div id='team_bat_"+($stateParams.id)+"'></div></div>";
                        }
                        else{
                            return "<div><div id='team_bowl_"+($stateParams.id-3)+"'></div></div>";
                        }
                    },
                    controllerProvider:function($stateParams){
                         if($stateParams.id<=3){
                            return 'team_bat_'+$stateParams.id;
                        }
                        else{
                            return 'team_bowl_'+($stateParams.id-3)
                        }
                    }
                }
            }
     })    
      
     $urlRouterProvider.otherwise('/home');
    
})