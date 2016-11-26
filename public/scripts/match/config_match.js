angular.module('cricket')
.config(function($stateProvider,$urlRouterProvider){
    
    $stateProvider
     
    .state('match',{
        url:'/match',
        views:{
            'header':{
                templateUrl:'views/header.html'
            },
            'content@':{
                templateUrl:'views/match.html'
                
            },
            'info@match':{
                template:"<center><h3>Select the teams,Click on the blue buttom on the left</h3></center>"
                
            }
        }
    })
    
    .state('match.selectMatch',{
        
        params:{
          host:null,
          opponent:null,
          year:null    
        },
        views:{ 
              
            'info@match':{
                template:"<center><h3>Select a match</h3></center>"    

                },
            'matchList@match':{
                templateUrl:'views/match/match_list.html',
                controller:'matchList'   
            }    
        }
    })
    .state('match.selectMatch.matchList',{
        url:'/:match',//use match id here instead date,do the update the view file
        views:{ 
             
            'info@match':{
                templateUrl:'views/match/match_info.html',
                controller:'match_info'
            },
           
            'graphBlock@match':{
                templateUrl:'views/match/graph.html',
                controller:'match_info'
            },
            
            'graph@match.selectMatch.matchList':{
                templateUrl:'views/match/match_bat_1.html',
                controller:'match_bat_1'
            }
          
        }
    })
    
    .state('match.selectMatch.matchList.performance',{
               
        url:'/:team/:id',
        views:{
               
            
            'graph@match.selectMatch.matchList' :{
              
                
                template:function($stateParams){
                    if($stateParams.id<=3)                   
                        return "<div><div id='match_bat_"+$stateParams.id+"'></div></div>"
                     else
                         return "<div><div id='match_bowl_"+($stateParams.id-3)+"'></div></div>" 
                },
                controllerProvider:function($stateParams){
                    if($stateParams.id<=3)
                    {
                      
                        return 'match_bat_'+$stateParams.id;
                    }
                    else{
                      
                        return 'match_bowl_'+($stateParams.id-3);
                    }
                }
            }  
        }
    })
    
})
       
   