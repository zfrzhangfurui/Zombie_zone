var Sprite = function (name,type,painter,left,top,width,height,velocity) {
    Entity.call(this,name,painter,left,top);
    this.type = type;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.velocityX = 0;
    this.velocityY = 0;
    //angle that the sprite towards
    this.body_rotate_velocity = Math.PI/180*90;
    
    // 左减右加
    //body movement
    this.body_angle =  0;
    this.magnitude_center_to_point = 0;
    this.angle_center_to_point = 0;
    this.tank_shape = new Polygon();
    this.move_forward = false;
    this.turn_right = false;
    this.turn_left = false;
    //barrel movement
    this.barrel_angle = 0;  
    this.barrel_rotate_velocity = Math.PI/180;
    this.shoot = false;
    
}


Sprite.prototype = {
   visible : true,
   shape_angine:undefined,
    
   //initial the movements_picker and index 
    component:function(){
        var component_length = this.painter.component.length;
        for(i = 0; i< component_length;i++){
            this.painter.movements_picker.push(0);
            this.painter.cellIndex.push(0);
            this.painter.lastAdvance.push(0);
            this.painter.PageFlip_interval.push(100);
        }
    },
    
    
    
    
    initial_point:function(){
        
        var i;
        this.magnitude_center_to_point = Math.sqrt(Math.pow(this.height/2,2)+Math.pow(this.width/2,2));
         i = this.height/ this.width;
        this.angle_center_to_point = Math.atan(i);
        this.get_point();
    },
    
      get_point:function(){
          var i,j, x_1 , y_1,x_2,y_2;
         for(q = 0; q<2; q++){
            var k = q==0 ? 1: -1;
            i = this.body_angle + k * this.angle_center_to_point;
            if(q == 0){
                x_1 = Math.cos(i) * this.magnitude_center_to_point;
                y_1 = Math.sin(i) * this.magnitude_center_to_point;
            }else{
                x_2 = Math.cos(i) * this.magnitude_center_to_point;
                y_2 = Math.sin(i) * this.magnitude_center_to_point;
            }
            
        }
        this.tank_shape.points = [];
        j = this.give_exactly_location(x_1,y_1);
        this.tank_shape.addPoint(j[0],j[1]);
        
        j = this.give_exactly_location(x_2,y_2);
        this.tank_shape.addPoint(j[0],j[1]);
        
        x_1 = -x_1;
        y_1 = -y_1;
        j = this.give_exactly_location(x_1,y_1);
        this.tank_shape.addPoint(j[0],j[1]);
        x_2 = - x_2;
        y_2 = - y_2;
        j = this.give_exactly_location(x_2,y_2);
        this.tank_shape.addPoint(j[0],j[1]);
        
    },
       
    
    
    
     give_exactly_location : function (x,y){
            var return_point = [];
            x = this.left_screen + x;
            y = this.top_screen - y ;
            return_point.push(x,y);
            
            return return_point;
        },
    
        set_screen_position : function(game_map){
                if(this.type =='player'){
                        if(this.top >= game.SCREEN_HEIGHT/2 && this.top <= game_map.height - game.SCREEN_HEIGHT/2){
                        this.top_screen = game.SCREEN_HEIGHT/2;
                    }else{
                        if(this.top < game.SCREEN_HEIGHT/2){
                            this.top_screen = this.top;
                        }else if(this.top > game_map.height - game.SCREEN_HEIGHT/2){
                            this.top_screen = game.SCREEN_HEIGHT - game_map.height + this.top;
                        }
                    }

                    if(this.left >= game.SCREEN_WIDTH/2 && this.left <= game_map.width - game.SCREEN_WIDTH/2){
                        this.left_screen = game.SCREEN_WIDTH/2;
                    }else{
                        if(this.left < game.SCREEN_WIDTH/2){
                            this.left_screen = this.left;
                        }else if(this.left > game_map.width - game.SCREEN_WIDTH/2){
                            this.left_screen = game.SCREEN_WIDTH - game_map.width + this.left;
                        }
                    }
                }
            
            else if(this.type == 'enemy'){
                    this.top_screen = Hero.top_screen + (this.top - Hero.top);
                    this.left_screen = Hero.left_screen + (this.left - Hero.left);
                }
        },
   /*-------------------------------------------------------------------------------------------------------------------*/ 
    paint : function(context){
            if (this.painter !== undefined && this.visible) {
                if(!game.structure_switch){
                    this.painter.paint(this, context);
                }else{
                    this.structure_paint(context);
                }
            
         }
    },
    
    structure_paint: function(context){
       var point_length = this.tank_shape.points.length, x,y;
        for(i = 0; i < point_length; i++){
            x = this.tank_shape.points[i].x;
            y = this.tank_shape.points[i].y;
            if(i == 0){
                context.beginPath();
                context.moveTo(x,y);
                context.save();
                context.fillStyle = 'red';
                context.fillRect(x-2,y-2,4,4);
                context.restore();
                
            }else{
                context.lineTo(x,y);
                
                 context.save();
                context.fillStyle = 'blue';
                context.fillRect(x-2,y-2,4,4);
                context.restore();
            }
            
            if(i == point_length - 1){
                 context.save();
                context.fillStyle = 'green';
                context.fillRect(x-2,y-2,4,4);
                context.restore();
                
                context.closePath();
                context.strokeRect(this.left_screen - 2,this.top_screen - 2, 4,4);
                context.stroke();
            }
        }
        
        if(this.type == 'player'){
            var q = 180 /Math.PI * this.barrel_angle,barrel_x,barrel_y;
            console.log(Math.floor(q));
            barrel_x = this.left_screen - 50 * Math.sin(this.barrel_angle);
            barrel_y = this.top_screen - 50 * Math.cos(this.barrel_angle);
            
            
            context.beginPath();
            context.moveTo(this.left_screen,this.top_screen);
            context.lineTo(barrel_x,barrel_y);
            context.save();
            context.strokeStyle = 'red';
            context.stroke(); 
             context.restore();
            context.closePath();
            
                if(game.Crosshairs){
                context.beginPath();
                context.arc(game.mouse_on_canvas_x, game.mouse_on_canvas_y, 20,0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
            }
           
        }
    },
    
    
    update :  function(context,time,map_width,map_height){
        
             this.Steering_and_moving();
        if(this.type == 'player'){
            this.Steering_barrel();
        }
            
            this.set_screen_position(Map_level_1);
             this.get_point();
             this.painter.update_image(context,time);
           // console.log(this.left +'   ' + this.top);
        },
    
    
    set_movement: function(sprite_component,movement){
        
            this.painter.set_movement(this,sprite_component,movement);
        
    },
    
    
    /*-------------------------------------------------------------------------------------------------------------------*/
    
    Steering_and_moving: function(){
        if(this.turn_left === true && this.turn_right === false){
            this.Steering_left();
        }
         if(this.turn_left === false && this.turn_right === true){
            this.Steering_right();
        }
        
        if(this.move_forward === true){
            this.moving_forward();
            this.set_movement('tank_body', 1);
        }else{
            this.set_movement('tank_body', 0);
        }
       
        
    },
    
    
     Steering_right :function(){
                    
                 var move_angle_per_frame = game.pixelsPerFrame(this.body_rotate_velocity);
                 //console.log(move_angle_per_frame);
                 this.body_angle = this.body_angle - move_angle_per_frame;
                 this.barrel_angle = this.barrel_angle - move_angle_per_frame;
                 if(this.body_angle < -2*Math.PI){
                     this.body_angle = this.body_angle + 2*Math.PI;
                 }
     },
     Steering_left :function(){
                 var move_angle_per_frame = game.pixelsPerFrame(this.body_rotate_velocity);
                 //console.log(move_angle_per_frame);
                 this.body_angle = this.body_angle + move_angle_per_frame;
                 if(this.body_angle > 2*Math.PI){
                     this.body_angle = this.body_angle - 2*Math.PI;
                 }
     },
    
    moving_forward : function(){
              var move_pixels_per_frame,velocityX,velocityY;
               move_pixels_per_frame = game.pixelsPerFrame(this.velocity);
                velocityX = -Math.sin(this.body_angle) * move_pixels_per_frame;
                velocityY = -Math.cos(this.body_angle) * move_pixels_per_frame;
                this.top = this.top + velocityY;
                this.left = this.left + velocityX;
                 
    },
    
    
    Steering_barrel: function(){
        var x = game.mouse_on_canvas_x,
            y = game.mouse_on_canvas_y,mouse_angle,gap_mouse_barrel;
        //information_bar.innerHTML = 'mouse on canvas x : ' + x + '<br/>' + 'mouse on canvas y : ' + y + '<br/>';
        x = x - this.left_screen;
        y = y - this.top_screen;
        mouse_angle = Math.acos(- y / Math.sqrt(Math.pow(x,2) + Math.pow(y,2)));
        
        
        if(x < 0){
             // information_bar.innerHTML = information_bar.innerHTML +'<br/>' +'第二或者第三象限';
        }else if(x > 0){
            mouse_angle = 2 * Math.PI - mouse_angle;
            //information_bar.innerHTML = information_bar.innerHTML +'<br/>' +'第一或者第四象限';
          
        }else if(x = 0){
            if(y <= 0){
                mouse_angle = 0;
             //    console.log('y<=0');
            }else if(y > 0){
                mouse_angle = Math.PI;
             //   console.log('y>0');
            }
        }
        //information_bar.innerHTML = information_bar.innerHTML + 'distance to x : ' + x + '<br/>' + 'distance to  y : ' + y  +'<br/>' + 'mouse angle : ' +   (180 / Math.PI) * mouse_angle;
          
        gap_mouse_barrel = this.barrel_angle - mouse_angle;
        
       //information_bar.innerHTML = information_bar.innerHTML + '<br/>' + ' barrel_angle : ' + this.barrel_angle * 180 /Math.PI;
        
       //information_bar.innerHTML = information_bar.innerHTML + '<br/>' + ' gap mouse barrel : ' + gap_mouse_barrel* 180 /Math.PI;
        if(gap_mouse_barrel == 0){
            
        }else if(gap_mouse_barrel > 0){
            if(gap_mouse_barrel <= this.barrel_rotate_velocity || Math.PI * 2 - gap_mouse_barrel <= this.barrel_rotate_velocity){
                this.barrel_angle = mouse_angle;
            }else if(gap_mouse_barrel > this.barrel_rotate_velocity){
                if(gap_mouse_barrel > Math.PI){
                    this.barrel_angle = this.barrel_angle + this.barrel_rotate_velocity;
                }else{
                    this.barrel_angle = this.barrel_angle - this.barrel_rotate_velocity;
                }
                
            }
        }else if(gap_mouse_barrel < 0){
             if( -gap_mouse_barrel <= this.barrel_rotate_velocity || Math.PI * 2 + gap_mouse_barrel <= this.barrel_rotate_velocity){
                this.barrel_angle = mouse_angle;
            }else if( - gap_mouse_barrel > this.barrel_rotate_velocity){
                if(- gap_mouse_barrel > Math.PI){
                    this.barrel_angle = this.barrel_angle - this.barrel_rotate_velocity;
                }else{
                    this.barrel_angle = this.barrel_angle + this.barrel_rotate_velocity;
                } 
            }
        }
        
        if(this.barrel_angle > Math.PI * 2){
            this.barrel_angle = this.barrel_angle - Math.PI * 2;
        }else if(this.barrel_angle < 0){
            this.barrel_angle = this.barrel_angle + Math.PI * 2;
        }
        
    }
    
    
    
    
    
    
    
    
}



 /*=================================================================================================================================*/
var Sprite_image = function (cells,component) {
    this.PageFlip_interval=[];
    this.lastAdvance=[];
    this.cellIndex = [];
    this.movements_picker = [];
    this.cells = cells;
    this.component = component;
    //this variable can control the sprite movements

   return this;
};


// inherit from the function of Entity


Sprite_image.prototype = {
    
	paint: function (Sprite,context) {
        for(i = 0; i< this.component.length; i++){
              var cell = this.cells[i][this.movements_picker[i]][this.cellIndex[i]];
            
                if(this.component[i] ==='barrel'){
                        context.save();
                        context.translate(Sprite.left_screen, Sprite.top_screen -2);
                        context.rotate(-Sprite.barrel_angle);
                        context.drawImage(Sprite.spritesheet, cell.left, cell.top,
                                         cell.width, cell.height,-Sprite.width/2, -Sprite.height/2,
                                         cell.width, cell.height);
                        context.restore();
                }else{
                    context.save();
                    context.translate(Sprite.left_screen,Sprite.top_screen);
                    context.rotate(-Sprite.body_angle);
                    context.drawImage(Sprite.spritesheet, cell.left, cell.top,
                                         cell.width, cell.height,
                                      -Sprite.width/2, -Sprite.height/2,
                                         cell.width, cell.height);
                    context.restore();

                }
                
        }
        //draw Crosshairs
        if(game.Crosshairs){
            context.beginPath();
            context.arc(game.mouse_on_canvas_x, game.mouse_on_canvas_y, 20,0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
        }
        
        
       
	},
    
    update_image :  function(context,time){
            var j = [];
             for(i = 0; i< this.movements_picker.length; i++){
                 if(time - this.lastAdvance[i] > this.PageFlip_interval[i]){
                j[i] = this.advance(i);
                 this.lastAdvance[i] = time;
             }
             
             
            }
            return j;
        },
    
    advance: function (i) {
        
            
             if (this.cellIndex[i] == this.cells[i][this.movements_picker[i]].length-1) {
                    this.cellIndex[i] = 0;
                    return true;
              }
              else {
                 this.cellIndex[i]++;
                 return false;
              }
            
   },
    
    
     set_movement: function(sprite,sprite_component,movement){
        if(this.cells === undefined){
            console.log(sprite.name + ' need painter_cells');
        }else{
                var arr_length = this.component.length;
                for(i = 0; i < arr_length;i++){
                    if(sprite_component === this.component[i]){
        
                        if(movement > this.cells[i].length - 1){
                            console.log( 'undefind movement in component \''+ this.component[i] + '\' for \''+sprite.name + '\'');
                            return;
                        }else{
                                    if(movement !== this.movements_picker[i]){
                                    this.movements_picker[i] = movement;
                                    this.cellIndex[i] = 0;
                                    this.lastAdvance[i] = 0;
                                }
                                return ;
                        }
                    }
                }
           console.log(sprite_component + ' are not in the component list');
        }
             
    },
    
};
