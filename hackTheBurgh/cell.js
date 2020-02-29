

function Cell(x,y,res,is_obstacle){
  // initioalize variables
  this.resolution = res;
  this.pos_x = x*this.resolution;
  this.pos_y = y*this.resolution;
  this.is_obstacle = is_obstacle; // True or False

  // console.log(this.pos_x, this.pos_y, this.resolution,this.resolution)
  // make the square
  if(this.is_obstacle){ // obsdtacle color
    stroke(0,0,0);
    fill(100,100,100);
  } else {
    stroke(0,0,0);
    fill(255,255,255);
  }
  rect(this.pos_x,this.pos_y,this.pos_x+resolution,this.pos_y+resolution);
  noFill();
}
