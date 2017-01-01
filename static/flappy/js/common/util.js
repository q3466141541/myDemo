 var util = {
     angleToRadian : function(angel){
         return Math.PI / 180 * angel;
     },

     random : function(min , max){
         return Math.random() * (max - min) + min;
     },
     extend : function( o1 ,o2){
         for(var key in o2){
             if(o2.hasOwnProperty(key)){
                 o1[key] = o2[key];
             }
         }
     }
 }