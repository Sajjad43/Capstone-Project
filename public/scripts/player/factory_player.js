angular.module('cricket')

.service('player',['$resource','baseUrl',function($resource,baseUrl){
    
    this.playerList=[
        {
            name:'Tamin',
            country:'Bangladesh',
            type:'Bat'
        },
         {
            name:'Shariar',
            country:'Bangladesh',
            type:'Bat'
        },
         {
            name:'Ashraful',
            country:'Bangladesh',
            type:'Bat'
        },
         {
            name:'Habibul',
            country:'Bangladesh',
            type:'Bat'
        },
         {
            name:'Alok',
            country:'Bangladesh',
            type:'Bat/Bowl'
        },
         {
            name:'Rubel',
            country:'Bangladesh',
            type:'Bowl'
        }]
    
    this.players=function( country){
        var res=$resource(baseUrl+'player/:country');
        return res.query({country:country});
    }
    
    this.individualStats=function(name){
         
        var res=$resource(baseUrl+'player/stats/:name');
        return res.get({name:name});
    }
    
    this.graph=function(name, id){
         
        var res=$resource(baseUrl+'player/graph/:name/:id');
        return res.get({name:name,id:id});
    }
    
    
}])