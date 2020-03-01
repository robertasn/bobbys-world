function Coin(x, y, resolution, sketch) {
  this.x = x;
  this.y = y;
  this.radius = resolution / 2;
  this.display = function() {
    sketch.fill(255, 255, 0);
    sketch.circle(x, y, this.radius);
    sketch.fill(0, 0, 0);
  }
}

function Shop(x, y, res, sketch) {
  this.x = x;
  this.y = y;
  this.resolution = res;
  this.display = function() {
    sketch.fill(0, 100, 0);
    sketch.rect(this.x, this.y, this.x + this.resolution, this.y + this.resolution);
    sketch.fill(0, 0, 0);
  }
}

function End(x, y, res, sketch) {
  this.x = x;
  this.y = y;
  this.resolution = res;
  this.display = function() {
    sketch.fill(139, 0, 139);
    sketch.rect(this.x, this.y, this.x + this.resolution, this.y + this.resolution);
    sketch.fill(0, 0, 0);
  }
}

function Cell(x,y,res,is_obstacle, has_coin, has_shop, is_end, is_start, sketch){
  // initioalize variables
  this.resolution = res;
  this.pos_x = x*this.resolution;
  this.pos_y = y*this.resolution;
  this.is_obstacle = is_obstacle; // True or False
  this.has_coin = has_coin;
  this.has_shop = has_shop;
  this.is_end = is_end;
  this.is_start = is_start;
  this.sketch = sketch;

  // console.log(this.pos_x, this.pos_y, this.resolution,this.resolution)
  // make the square
  if(this.is_obstacle){ // obstacle color
    this.sketch.stroke(0,0,0);
    this.sketch.fill(100,100,100);
  } else {
    this.sketch.stroke(0,0,0);
    this.sketch.fill(255,255,255);
  }
  this.sketch.rect(this.pos_x,this.pos_y,this.pos_x + this.resolution,this.pos_y + this.resolution);
  if (this.has_coin) {
    coin = new Coin(this.pos_x + this.resolution / 2, this.pos_y + this.resolution / 2, resolution, this.sketch);
    coin.display();
  } else if (this.is_end) {
    end = new End(this.pos_x, this.pos_y, this.resolution, this.sketch);
    end.display();
  } else if (this.has_shop) {
    shop = new Shop(this.pos_x, this.pos_y, this.resolution, this.sketch);
    shop.display();
  } else if (this.is_start) {

  }
  this.sketch.noFill();
}