

function Player(x,y, dimension){

  // actual pixel position
  this.pos_x = x;
  this.pos_y = y;
  //movement
  this.vel = 0;
  this.orientation = 4;
  // trinagle positions default
  this.x1 = this.pos_x-5;
  this.y1 = this.pos_y+10;
  this.x2 = this.pos_x;
  this.y2 = this.pos_y-10;
  this.x3 = this.pos_x+5;
  this.y3 = this.pos_y+10;
  this.figure = triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3);

  this.pos_xx = 0;
  this.pos_yy = 0;

  // update movement
  this.update_movement = function(type){
      this.set_oriention(type);
      this._move(type);
  }

  // check_orientation before movement
  this.set_oriention = function(type){
    if(type==null){
        this.orientation = 1;
    }else {
      this.orientation = type;
    }
  }

  // movement
  this._move = function(type){

  }

  // draw player
  this.draw_player = function(){
    switch(this.orientation){
      case 1: // facing up
        this.x1 = this.pos_x-5;
        this.y1 = this.pos_y+10;
        this.x2 = this.pos_x;
        this.y2 = this.pos_y-10;
        this.x3 = this.pos_x+5;
        this.y3 = this.pos_y+10;
        break;
      case 2: // facing down
        this.x1 = this.pos_x-5;
        this.y1 = this.pos_y-10;
        this.x2 = this.pos_x;
        this.y2 = this.pos_y+10;
        this.x3 = this.pos_x+5;
        this.y3 = this.pos_y-10;
        break;
      case 3: // facing right
        this.x1 = this.pos_x-10;
        this.y1 = this.pos_y+5;
        this.x2 = this.pos_x-10;
        this.y2 = this.pos_y-5;
        this.x3 = this.pos_x+10;
        this.y3 = this.pos_y;
        break;
      case 4: // facing left
        this.x1 = this.pos_x-10;
        this.y1 = this.pos_y;
        this.x2 = this.pos_x+10;
        this.y2 = this.pos_y-5;
        this.x3 = this.pos_x+10;
        this.y3 = this.pos_y+5;
        break;
      default: // facing up
      this.x1 = this.pos_x-5;
      this.y1 = this.pos_y+10;
      this.x2 = this.pos_x;
      this.y2 = this.pos_y-10;
      this.x3 = this.pos_x+5;
      this.y3 = this.pos_y+10;
      break;
    }
    fill(255,50,50,150);
    triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3);
    fill(0,0,0);
  }

  // displaying the player
  this.show = function(){
    this.draw_player();
  };

}
