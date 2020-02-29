

function Player(x,y,res,){

  // actual pixel position
  this.pos_x = x;
  this.pos_y = y;
  this.resolution = res;
  // cell position
  this.pos_x_cell = this.pos_x/this.resolution;
  this.pos_y_cell = this.pos_y/this.resolution;
  // circle diameter
  this.diam = 5;
  //movement
  this.vel = 0;
  this.orientation = 4;
  // trinagle positions default
  this.x1 = this.pos_x-5;
  this.y1 = this.pos_y+10;
  this.x2 = this.pos_x;
  this.y2 = this.pos_y-10;
  this.x3 = this.pos_x+5;
  this.y3 = this.pos_y+10
  this.figure = triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3);

  // update movement
  this.update_movement = function(type){
    if(this.orientation != type){
      this.set_orienttion(type);
    } else {
      this._move(type);
    }
  }

  // check_orientation before movement
  this.set_orienttion = function(type){
    if(type==null){
        this.orientation = 1;
    }else {
      this.orientation = type;
    }
  }

  // movement
  this._move = function(type){
    switch(type) {
      case 1:   //up
        this.pos_y-=50;
        break;//
      case 2:   // down
        this.pos_y+=50;
        break;
      case 3:   // right
        this.pos_x+=50;
        break;
      case 4:   // left
        this.pos_x-=50;
        break;
      default:
        this.pos_x = this.pos_x;
        this.pos_y = this.pos_y;
      }
  }



  // update positions the player
  this.update_position = function(x_new,y_new){
    this.pos_x = x_new;
    this.pos_y = y_new;
  };

  // update cell position
  this.update_position_cell = function(){
    this.pos_x_cell = this.pos_x/this.resolution;
    this.pos_y_cell = this.pos_y/this.resolution;
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
    // push()
    triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3);
    // pop()
    fill(0,0,0);
  }

  // displaying the player
  this.show = function(){
    // fill(255,50,50,150);
    this.draw_player();
    // console.log(this.figure);
    // circle(this.pos_x,this.pos_y, this.diam);
  };

}
