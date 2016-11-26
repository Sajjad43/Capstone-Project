angular.module('cricket')


.service('home',['$resource','baseUrl',function($resource,baseUrl){
    
    
    this.generalInfo=function(){
         var res=$resource(baseUrl+'home')
            return res.get();
    }
        
  this.listCountry=[]
    
 this.matching= function(state,viewValue) {
        console.log(viewValue);  
     
        
        return state.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
    } 
    
    
    
}])