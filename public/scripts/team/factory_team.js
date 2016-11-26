angular.module('cricket')
//.constant('baseUrl','http//localhost:3000/')
.service('team',['$resource','baseUrl',function($resource,baseUrl){
    
    this.infoStat=function( country){
         var res=$resource(baseUrl+'team/:country');
            return  res.get({country:country});
    }
    
    this.graph=function( country, id){
         var res=$resource(baseUrl+'team/graph/:country/:id');
            return  res.get({country:country,id:id});
    }
        
    
    
}])