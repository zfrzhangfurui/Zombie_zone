//building = function(name,points){
//    Entity.call(this,name,painter,left,top);
//    this.building_shape = new Polygon(); 
//    this.points = points;
//    
//}
//
//building.prototype ={
//    get_point: function(){
//      var points_length = this.points.length;
//        for(i = 0; i < points_length; i++){
//            this.building_shape.addPoint(this.points[i][0],this.points[i][1]);
//        }
//    },
//     paint : function(context){
//            if (this.painter !== undefined && this.visible) {
//                if(!game.structure_switch){
//                    this.painter.paint(this, context);
//                }else{
//                    this.structure_paint(context);
//                }
//            
//         }
//    },
//}

maps = function(width,height){
    this.width = width;
    this.height = height;
    //this.collision_entity = collision_entity;
}