

let a = 0;
canvas_width = 20 * 37
canvas_height= 20 * 37
resolution = 20
cell_array = []

function setup() {
  createCanvas(canvas_width,canvas_height);
  background(100);
  cols = floor(canvas_width/resolution);
	rows = floor(canvas_height/ resolution);
  cell_number = floor(canvas_width/resolution);


  // -- Input array  example
  input_array = new Array_Generator().generate(rows);
  
  // input_array = new Array(rows);
  // for(i=0; i<rows; i++){
  //   input_array[i] = new Array(cols);
  // }
  // // populating the array
  // for(i=0;i<input_array.length;i++){
  //   for(j=0;j<input_array[i].length;j++){
  //     if(j%4==0){
  //       input_array[i][j]=false;
  //     }else {
  //       input_array[i][j]=true;
  //     }
  //   }
  // }
  // console.log(input_array);
  // -- -- -- -- -- -- -- -- -- --

  // creating the map
  for(i=0; i<cell_number; i++){
    for(j=0; j<cell_number; j++){

      var is_obstacle = !(input_array[i][j] >= 1 && input_array[i][j] <= 3);
      var has_shop = (input_array[i][j] == 4);
      var has_coin = (input_array[i][j] == 3);
      var is_end = (input_array[i][j] == 2);
      var is_start = (input_array[i][j] == 5); 
      cell_new = Cell(i,j,resolution,is_obstacle, has_coin, has_shop, is_end, is_start);
      cell_array.push(cell_new);
    }
  }

  // adding the player
  player = new Player(10,10,resolution);
  // player.show();
}



function draw() {
  player.move(20,20);
  player.show();

}

function keyReleased() {
  player.setRotation(0);
  player.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    // Do nothing
  } else if (keyCode == RIGHT_ARROW) {
    player.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    player.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    player.boosting(true);
  }
}

// draw with lines
function draw_resolution(){
  stroke(0)
  for (i = 0; i < cells; i++) {
    line(i*resolution,0,i*resolution,0+canvas_height);
    line(0,i*resolution,i+canvas_width,i*resolution);
  }
}
