

let a = 0;
canvas_size = 550
offset = 5;
resolution = canvas_size / (offset * 2 + 1)
cell_array = []

function setup() {
  createCanvas(canvas_size, canvas_size);
  background(100);
  dimension = 10


  // -- Input array  example
  input_array = new Array(dimension);
  for(i=0; i<dimension; i++){
    input_array[i] = new Array(dimension);
  }
  // populating the array
  for(i=0;i<input_array.length;i++){
    for(j=0;j<input_array[i].length;j++){
      if(j%4==0){
        input_array[i][j]=false;
      }else {
        input_array[i][j]=true;
      }
    }
  }
  // console.log(input_array);
  // -- -- -- -- -- -- -- -- -- --

  player = new Player(canvas_size/2, canvas_size/2, dimension);
}



function draw() {
  background(100);

  x = player.pos_xx - offset;
  y = player.pos_yy - offset;
  console.log(x, y);
  for (var i = 0; i < offset*2 + 1; i++) {
    for (var j = 0; j < offset*2 + 1; j++) {
      if ((x + i < 0) || (x + i >= dimension) || (y + j < 0) || (y + j >= dimension)) {
        cell_new = Cell(i,j,resolution,true);
      }
      else {
        cell_new = Cell(i,j,resolution,input_array[x + i][y + j]);
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