

var game = new Game('Zombie_zone', 'ctx');


// Loading....................................................
var loadButton = document.getElementById('loadButton');
var FPS = document.getElementById('FPS');
var information_bar = document.getElementById('information');
var structure_button = document.getElementById('structure_button');
game.queueImage('img/running-girl.jpg');
game.queueImage('img/runningGrant.png');
game.queueImage('img/tank.png');
game.queueImage('img/grass.png');

interval = setInterval(function(e){
    loadingPercentComplete = game.loadImages();
    console.log(loadingPercentComplete);
    
    if(loadingPercentComplete === 100){
        console.log("loading complete")
        clearInterval(interval);
        loading();
        game.start();
    }
}, 16);

loading = function(){
     Key_listener();
     extend(Sprite.prototype,Entity.prototype);
  //  extend(building.prototype,Entity.prototype);
     Hero.spritesheet = game.getImage('img/tank.png');
    Hero_1.spritesheet = game.getImage('img/tank.png');
    
    initial_sprite();
     
}



initial_sprite = function(){
    Hero.set_screen_position(Map_level_1);
    Hero.component();
    Hero.initial_point();
    
    Hero_1.set_screen_position(Map_level_1);
    Hero_1.component();
    Hero_1.initial_point();
}


//moveLeftToRight = {
//       lastMove: 0,
//       
//       execute: function (sprite, context, time) {
//         if (this.lastMove !== 0) {
//           sprite.left -= sprite.velocityX *
//                          ((time - this.lastMove) / 1000); 
//
//           if (sprite.left < 0) {
//              sprite.left = canvas.width;
//           }
//         }
//         this.lastMove = time;
//       }
//    }

 var runnerCells = [
     [
         [
          
          { left: 24, top: 0, width: 80, height: 92 },
          { left: 280, top: 0, width: 80, height: 92 },
         ],
         
         [ { left: 24, top: 0, width: 80, height: 92 },
           { left: 152, top: 0, width: 80, height: 92 },
           { left: 280, top: 0, width: 80, height: 92 },
           { left: 152, top: 0, width: 80, height: 92 },
           { left: 536, top: 0, width: 80, height: 92 },
           { left: 664, top: 0, width: 80, height: 92 },
           { left: 792, top: 0, width: 80, height: 92 },
           { left: 920, top: 0, width: 80, height: 92 },
         ]
     
     ],
     
     [
         [
           { left: 24, top: 97, width: 80, height: 52 },
         ],
         
         [ { left: 24, top: 97, width: 80, height: 52 },
           { left: 152, top: 97, width: 80, height: 52 },
           { left: 280, top: 97, width: 80, height: 52 },
           { left: 408, top: 97, width: 80, height: 52 },
           { left: 536, top: 97, width: 80, height: 52 },
         ]
     ]
    ];


Map_level_1_collision_entity = {};
//building_1 = new building([[100,100],[120,100],[120,120],[100,120]]);

var Map_level_1 = new maps(1800,1800);

//var sprite_sheet = new SpriteSheetPainter(runnerCells);


var Hero_animate = new Sprite_image(runnerCells,['tank_body','barrel']);
var Hero_animate_1 = new Sprite_image(runnerCells,['tank_body','barrel']);

//(name,type,painter,left,top,width,height,velocity) 
var Hero = new Sprite('Hero','player',Hero_animate,300,500,80,70,100);
var Hero_1 = new Sprite('Hero','enemy',Hero_animate_1,400,600,80,70,100);




game.startAnimate = function(time){
}
game.paintUnderSprites = function(time){
   
       // running(game.context);
        
        FPS.innerHTML = 'Game FPS:'+ Math.floor(game.fps) + ' <br/>'+ 'Game Time:' + game.gameTime +'<br/>';
        
       Hero.update(game.context,time,Map_level_1.width,Map_level_1.height);
       Hero.paint(game.context);
        Hero_1.update(game.context,time,Map_level_1.width,Map_level_1.height);
        Hero_1.paint(game.context);
       
}


game.endAnimate = function(){
    
}