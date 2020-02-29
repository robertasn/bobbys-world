

let a = 0;
canvas_size = 550
offset = 5;
resolution = canvas_size / (offset * 2 + 1)
cell_array = []
input_array = []

function setup() {
  createCanvas(canvas_size, canvas_size);
  background(100);
  dimension = 11;
  generator = new Array_Generator();
  generator.generate(dimension);
  input_array = generator.arr;
  console.log(input_array);
  player = new Player(canvas_size/2, canvas_size/2, dimension);
  player.pos_xx = 5
  player.pos_yy = 5
}



function draw() {
  background(100);

  x = player.pos_xx - offset;
  y = player.pos_yy - offset;
  for (var i = 0; i < offset*2 + 1; i++) {
    for (var j = 0; j < offset*2 + 1; j++) {
      xi = x + i;
      yj = y + j;
      if ((xi < 0) || (xi >= dimension) || (yj < 0) || (yj >= dimension)) {
        cell_new = Cell(xi,yj,resolution,true, false, false, false, false);
      }
      else {
        var is_obstacle = !(input_array[xi][yj] >= 1 && input_array[xi][yj] <= 3);
        if (input_array[xi][yj] == 5) {
          is_obstacle = false;
        }
        var has_shop = (input_array[xi][yj] == 4);
        var has_coin = (input_array[xi][yj] == 3);
        var is_end = (input_array[xi][yj] == 2);
        var is_start = (input_array[xi][yj] == 5);
        cell_new = Cell(xi,yj,resolution,is_obstacle, has_shop, has_coin, is_end, is_start);
      }
      cell_array.push(cell_new);
    }
  }
  player.show();
}

function keyPressed() {
  switch(keyCode) {
    case UP_ARROW:   //up
      this.player.set_oriention(1);
      if (!input_array[this.player.pos_xx][this.player.pos_yy - 1]) {
        this.player.pos_yy--;
      }
      break;//
    case DOWN_ARROW:   // down
      this.player.set_oriention(2);
      if (!input_array[this.player.pos_xx][this.player.pos_yy + 1]) {
        this.player.pos_yy++;
      }
      break;
    case RIGHT_ARROW:   // right
      this.player.set_oriention(3);
      if (!input_array[this.player.pos_xx + 1][this.player.pos_yy]) {
        this.player.pos_xx++;
      }
      break;
    case LEFT_ARROW:   // left
      this.player.set_oriention(4);
      if (!input_array[this.player.pos_xx - 1][this.player.pos_yy]) {
        this.player.pos_xx--;
      }
      break;
  }
}