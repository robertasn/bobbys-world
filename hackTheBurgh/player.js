

function Player(x,y,res,){

  // actual pixel position
  this.pos_x = x;
  this.pos_y = y;
  this.resolution = res;
  // cell position
  this.pos_x_cell = this.pos_x/res;
  this.pos_y_cell = this.pos_y/res;
  // circle diameter
  this.diam = 5;
  //movement


  // move the player
  this.move = function(x_new,y_new){
    this.pos_x = x_new;
    this.pos_y = y_new;
  };

  // displaying the player
  this.show = function(){
    fill(255,50,50,150);
    circle(this.pos_x,this.pos_y, this.diam);
    fill(0,0,0);
  };

}
