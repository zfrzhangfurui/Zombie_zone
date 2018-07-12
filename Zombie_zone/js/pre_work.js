
//obj1 is the class that inherit from obj2;

extend = function(obj1,obj2){
    for(attr_obj2 in obj2){
        var attr = attr_obj2.toString();
        var case_switch = true;
       for(attr_obj1 in obj1){
           if(attr_obj1.toString() == attr){
               case_switch = false;
               break;
           }
       }
        
        if(case_switch ===true){
             obj1[attr_obj2] = obj2[attr_obj2];
        }
    }
}


//add key listener
Key_listener = function(){
  
        game.canvas.addEventListener("mousemove",function(mouse){
            game.mouse_x = mouse.clientX;
            game.mouse_y = mouse.clientY;
			 game.windowToCanvas(mouse.clientX,mouse.clientY);
            
        });
    
    document.addEventListener("mousemove",function(mouse){
                if(game.mouse_x === mouse.clientX && game.mouse_y === mouse.clientY){
                    game.Crosshairs = true;
                }else{
                    game.Crosshairs = false;
                }
            
        });
    
    
    /*-------------------------------------------------------------------------------------------------------------------*/
    
    
    
    
    
            structure_button.addEventListener("click",function(){
                game.structure_switch = !game.structure_switch;
            });
        //key pair 
     /*-------------------------------------------------------------------------------------------------------------------*/
            game.addKeyListener(
                                {
                                    key:'a',
                                    listener:function(){
                                       Hero.turn_left = true;
                                     
                                    }
                                }
            );
    
            game.addKeyListener_keyup(
                                {
                                    key:'a',
                                    listener:function(){
                                        Hero.turn_left = false;
                                    }
                                }
            );
     /*-------------------------------------------------------------------------------------------------------------------*/
            game.addKeyListener(
                                {
                                    key:'space',
                                    listener:function(){
                                        Hero.move_top = true;
                                    }
                                }
            );
    
            game.addKeyListener_keyup(
                                {
                                    key:'space',
                                    listener:function(){
                                        Hero.move_top = false;
                                    }
                                }
            );
    
            
/*-------------------------------------------------------------------------------------------------------------------*/
            game.addKeyListener(
                                {
                                    key:'d',
                                    listener:function(){
                                        Hero.turn_right = true;
                                    }
                                }
            );
    
            game.addKeyListener_keyup(
                                {
                                    key:'d',
                                    listener:function(){
                                        Hero.turn_right = false;
                                    }
                                }
            );
    
    /*-------------------------------------------------------------------------------------------------------------------*/
            game.addKeyListener(
                                {
                                    key:'w',
                                    listener:function(){
                                        Hero.move_forward = true;
                                    }
                                }
            );
    
            game.addKeyListener_keyup(
                                {
                                    key:'w',
                                    listener:function(){
                                        Hero.move_forward = false;
                                    }
                                }
            );
    
    
}

