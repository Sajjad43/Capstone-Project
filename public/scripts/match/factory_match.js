angular.module('cricket')
    .service('match',['home','$resource','baseUrl',function(home,$resource,baseUrl){
    
        this.team1='';
        this.team2='';
        this.selectedTeam='';
    
    
        this.listTeam=home.listCountry;
    
        this.listMatch=[{
            
            full_date:'18 Sept',
            venue:'mohali',
            winner:'pak'
             
        },{
             full_date:'28 Oct',
             venue:'Delhi',
              winner:'pak'
        },{
             full_date:'8 Sept',
            venue:'mohali',
            winner:'pak'
        },{
             full_date:'23 Jan',
            venue:'mohali',
            result:'ban'
        },{
             date:'18 April',
            venue:'Khulna',
            result:'Sri'
        },{
             date:'1 Sept',
            venue:'mohali',
            result:'pak'
        }]
        
       this.matches=function( teamA, teamB){
           var res=$resource(baseUrl+'match/:A/:B');
           return res.query({A:teamA,B:teamB});
       } 
       
       this.match=function( id){
           var res=$resource(baseUrl+'match/info/:id');
           return res.get({id:id});
       }
       
       this.graph=function(country,matchId,graphId){
           var res=$resource(baseUrl+'match/graph/:country/:match/:id');
           return res.get({country:country,match:matchId,id:graphId});
       }
        
        
        
        
    
    }])

    