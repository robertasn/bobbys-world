

let a = 0;
visibility = 2;
offset = 2;
dimension = 21;
canvas_size = 550
resolution = canvas_size / (offset * 2 + 1)
cell_array = []
input_array = []
onMap = false;
was_visited = [[]]

function setup() {
  createCanvas(canvas_size, canvas_size);
  background(100);
  generator = new Array_Generator();
  generator.generate(dimension);
  input_array = generator.arr;
  console.log(input_array);
  player = new Player(canvas_size/2, canvas_size/2, dimension, resolution);
  player.pos_xx = generator.startX;
  player.pos_yy = generator.startY;
  
  for (i = 0; i < dimension; i++) {
    was_visited[i] = [];
    for (j = 0; j < dimension; j++) {
      was_visited[i][j] = 0;
    }
  }
  was_visited[player.pos_xx][player.pos_yy] = 1;
}



function draw() {
  background(100);

  x = player.pos_xx - offset;
  y = player.pos_yy - offset;

  if (!onMap) {
    was_visited[player.pos_xx][player.pos_yy] = 1;
  }

  for (var i = 0; i < offset*2 + 1; i++) {
    for (var j = 0; j < offset*2 + 1; j++) {
      xi = x + i;
      yj = y + j;
      if ((xi < 0) || (xi >= dimension) || (yj < 0) || (yj >= dimension)) {
        cell_new = Cell(i,j,resolution,true, false, false, false, false, !onMap);
      }
      else {
        var has_shop = (input_array[xi][yj] == 4);
        var has_coin = (input_array[xi][yj] == 3);
        var is_end = (input_array[xi][yj] == 2);
        var is_start = (input_array[xi][yj] == 5);
        cell_new = Cell(i,j,resolution,isObstacle(xi, yj), has_coin, has_shop, is_end, is_start, (!onMap || was_visited[xi][yj]));
      }
      cell_array.push(cell_new);
    }
  }
  player.show();
}

function keyPressed() {
  switch(keyCode) {
    case UP_ARROW:   //up
      console.log(this.onMap);
      if (this.onMap) {
        break;
      }
      this.player.set_oriention(1);
      if (!isObstacle(this.player.pos_xx, this.player.pos_yy - 1)) {
        this.player.pos_yy--;
      }

      break;//
    case DOWN_ARROW:   // down
      if (this.onMap) {
        break;
      }
      this.player.set_oriention(2);
      if (!isObstacle(this.player.pos_xx, this.player.pos_yy + 1)) {
        this.player.pos_yy++;
      }
      break;
    case RIGHT_ARROW:   // right
      if (this.onMap) {
        break;
      }
      this.player.set_oriention(3);
      if (!isObstacle(this.player.pos_xx + 1, this.player.pos_yy)) {
        this.player.pos_xx++;
      }
      break;
    case LEFT_ARROW:   // left
      if (this.onMap) {
        break;
      }
      this.player.set_oriention(4);
      if (!isObstacle(this.player.pos_xx - 1, this.player.pos_yy)) {
        this.player.pos_xx--;
      }
      break;
    case 32:
      if (onMap) {
        offset = visibility;
      }
      else {
        offset = (dimension-1) / 2;
      }
      resolution = canvas_size / (offset * 2 + 1)
      this.player.toggleCenter(resolution);
      onMap = !onMap;
  }
}

function isObstacle(xi, yj) {
  var aaa = !(input_array[xi][yj] >= 1 && input_array[xi][yj] <= 3);
  if (input_array[xi][yj] == 5) {
    aaa = false;
  }
  return aaa;
}