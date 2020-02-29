

let a = 0;
canvas_width = 800
canvas_height= 800
resolution = 50
cell_array = []

function setup() {
  createCanvas(canvas_width,canvas_height);
  background(100);
  cols = floor(canvas_width/resolution);
	rows = floor(canvas_height/ resolution);
  cell_number = floor(canvas_width/resolution);


  // -- Input array  example
  input_array = new Array(rows);
  for(i=0; i<rows; i++){
    input_array[i] = new Array(cols);
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

  // creating the map
  for(i=0; i<cell_number; i++){
    for(j=0; j<cell_number; j++){
      cell_new = Cell(i,j,resolution,input_array[i][j]);
      cell_array.push(cell_new);
    }
  }

  // adding the player
  player = new Player(10,10,resolution);
  // player.show();
}



function draw() {
  background(100);
  for(i=0; i<cell_number; i++){
    for(j=0; j<cell_number; j++){
      cell_new = Cell(i,j,resolution,input_array[i][j]);
      cell_array.push(cell_new);
    }
  }
  // player.show(20,20);
  player.show();

}

// function keyReleased() {
//   player.setRotation(0);
//   player.boosting(false);
// }

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    player.update_movement(3);
  } else if (keyCode == LEFT_ARROW) {
    player.update_movement(4);
  } else if (keyCode == UP_ARROW) {
    player.update_movement(1);
  } else if (keyCode == DOWN_ARROW) {
    player.update_movement(2);
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
