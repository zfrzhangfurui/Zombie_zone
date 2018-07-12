Entity = function (name,painter,left,top){
    
            
            if (name !== undefined)      this.name = name;
            if (painter !== undefined)   this.painter = painter;
            this.left = left;
            this.top = top;
            this.left_screen;
            this.top_screen;
            
            
        
      
 /*-----------------------------------------------------------------------------------------------------------------------------------*/ 
          
            
        
    }


  Entity.prototype ={
                    
               visible: true,
               painter: undefined,
           
              paint : function(context){
           
           },
      
        } 




