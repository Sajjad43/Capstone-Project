angular.module('cricket')
.config(function($stateProvider,$urlRouterProvider){
    
    $stateProvider
     .state('player',{
            url:'/player',
            views:{
                'header':{
                    templateUrl:'views/header.html',
                },
                'content@':{
                    templateUrl:'views/player.html',
                },
                'info@player':{
                   template:'<center><h3>Select team and year</h3></center>'
                },
                'graphBlock@player':{
                    template:"<center><h4>No records</h4></center>"
                }
                
            }  
    })
    
    .state('player.playerSelect',{
        params:{
          team:null,
          year:null
        },
        views:{
           'playerList@player':{
                    templateUrl:'views/player/playerList.html',
                    controller:'playerList'
            }, 
            'info@player':{
                   template:'<center><h3>Select a player from the list</h3></center>'
            },
        }
        
        
    })
    .state('player.playerSelect.playerList',{
        url:'/:player',
        views:{
            
            'info@player':{
                    templateUrl:'views/player/info.html',
                    controller:'infoPlayer'
            },
            'graphBlock@player':{
                    templateUrl:'views/player/graph.html'
            },
            'graph@player.playerSelect.playerList':{
                templateUrl:'views/player/player_bat_1.html',
                controller:'player_bat_1'
            }
        }
    })
 
    .state('player.playerSelect.playerList.performance',{
        url:'/:id',
        views:{
            'graph@player.playerSelect.playerList':{
                template:function($stateParams){
                    if($stateParams.id<=2){
                        return "<div><div id='player_bat_"+($stateParams.id)+"'></div></div>";
                    }
                    else{
                        return "<div><div id='player_bowl_"+($stateParams.id-2)+"'></div></div>";
                    }
                },
                controllerProvider:function($stateParams){
                     if($stateParams.id<=2)
                        return 'player_bat_'+$stateParams.id;
                    
                    else
                        return 'player_bowl_'+($stateParams.id-2);
                }
            }
        }
        
    })
    
})
     