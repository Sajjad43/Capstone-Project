'use strict';

var myApp = angular.module('cricket')
   
        .controller('home',['$scope','$state','$cookies','home','ISO3166','$resource',function($scope,$state,$cookies,home,ISO3166,$resource){
            
           $scope.countries=home.listCountry;
            
            var map = AmCharts.makeChart( "mapdiv", {
                 
                        "type": "map",
                        "dataProvider": {
                          "map": "worldLow",
                          "getAreasFromMap": true,
                        },
                        "areasSettings": {
                            "selectedColor": "#CC0000",
                        },
                        "smallMap": {},
                  });
            
            var countries=[];
            
            
            var user=$resource('/match');
            user.query(function(item){
              
                
                home.listCountry=item;

                
                for(var i=0;i<item.length;i++){
                        console.log(ISO3166.getCountryCode(item[i]));
                        
                    
                    
                        if(item[i]=="West Indies"){
                             countries.push({'id':ISO3166.getCountryCode('Jamaica'),"selectable":true,'showAsSelected':true});
                             countries.push({'id':ISO3166.getCountryCode('Trinidad and Tobago'),"selectable":true,'showAsSelected':true});
                            
                        }
                        else if(item[i]==('England'||'Wales'||'Scotland')){
                            countries.push({'id':ISO3166.getCountryCode('United Kingdom'),"selectable":true,'showAsSelected':true})
                        }
                       else{                      
                           countries.push({'id':ISO3166.getCountryCode(item[i]),"selectable":true,'showAsSelected':true});
                      }
                        
                    
                }
                map.dataProvider.areas=countries;
                map.validateData();

            })
            
               
    

    }])

.controller('countries',['$scope','home','$cookies','$state','$resource',function($scope,home,$cookies,$state,$resource){
    $scope.countryList=home.listCountry();
    
    
    
    $resource('192.168.0.102:1000/team/team_batting_partnership/:id',{id:'@id'}).get({id:'Pakistan'},function(data){
         console.log(data);
    })
    
    
    $scope.c=function(x){
        console.log(x);
        $cookies.put('country',x);    
        $state.transitionTo('team');
    }
    
}])

   