var level = 1;
var timer = 0;
var isPaused = false;
var trig_display_endpoint = 0

function won() {
  fetch('https://bobbysworld.online/submit', {
    method: 'POST',
    body: timer
  }).then(() => {
    window.location.href="https://bobbysworld.online/scoreboard"
  })
}

var s1 = function (sketch) {
  let a = 0;
  visibility = 4;
  offset = 4;
  dimension = 7;
  canvas_size = 400
  resolution = canvas_size / (offset * 2 + 1)
  cell_array = []
  input_array = []
  onMap = false;
  was_visited = [[]]
  cur_balance = 0;
  dx = [1, -1, 0, 0];
  dy = [0, 0, 1, -1];


  setup1 = function() {
    canvas1 = sketch.createCanvas(canvas_size, canvas_size);
    canvas1.position(0, 125);
    sketch.background(100);
    generator = new Array_Generator();
    generator.generate(dimension);
    input_array = generator.arr;
    console.log(input_array);
    player = new Player(canvas_size/2, canvas_size/2, dimension, resolution, sketch);
    player.pos_xx = generator.startX;
    player.pos_yy = generator.startY;
    cur_endX = generator.endX;
    cur_endY = generator.endY;
    player.balance = cur_balance;

    for (i = 0; i < dimension; i++) {
      was_visited[i] = [];
      for (j = 0; j < dimension; j++) {
        was_visited[i][j] = 0;
      }
    }
    was_visited[player.pos_xx][player.pos_yy] = 1;
    popup_window = new pop_up_window(canvas_size,canvas_size,sketch);
  }

  sketch.setup = function() {
    setup1();
  }



  sketch.draw = function() {
    sketch.background(100);

    x = player.pos_xx - offset;
    y = player.pos_yy - offset;

    if (!onMap) {
      was_visited[player.pos_xx][player.pos_yy] = 1;
      if (input_array[player.pos_xx][player.pos_yy] == 3) {
        input_array[player.pos_xx][player.pos_yy] = 1;
        player.balance++;
      }
      if (input_array[player.pos_xx][player.pos_yy] == 2) {
        // REACHED ENDPOINT - display image
        if (trig_display_endpoint == 0) {
          trig_display_endpoint = 1;
        }
        
        if(trig_display_endpoint == 1) {
          console.log("LOOP");
          popup_window.display_text(level);
          return;
        }

        trig_display_endpoint = 0;
        dimension += 4; //change this
        level++;
        if (level < 6) {
          cur_balance = player.balance;
          setup1();
        } else {
          won();
          fail;
        }
        return;
      }

      for (dir = 0; dir < 4; dir++) {
        adjX = player.pos_xx + dx[dir];
        adjY = player.pos_yy + dy[dir];
        if (adjX >= 0 && adjX < dimension && adjY >= 0 && adjY < dimension) {
          if (!isObstacle(adjX, adjY) && was_visited[adjX][adjY] == 0) {
            was_visited[adjX][adjY] = 2;
          }
        }
      }
    }

    for (var i = 0; i < offset*2 + 1; i++) {
      for (var j = 0; j < offset*2 + 1; j++) {
        xi = x + i;
        yj = y + j;
        if ((xi < 0) || (xi >= dimension) || (yj < 0) || (yj >= dimension)) {
          cell_new = Cell(i,j,resolution,true, false, false, false, false, !onMap, sketch);
        }
        else {
          var has_shop = (input_array[xi][yj] == 4);
          var has_coin = (input_array[xi][yj] == 3);
          var is_end = (input_array[xi][yj] == 2);
          var is_start = (input_array[xi][yj] == 5);
          var is_visible;
          if (!onMap) {
            is_visible = 1;
          } else {
            is_visible = was_visited[xi][yj];
          }
          cell_new = Cell(i,j,resolution,this.isObstacle(xi, yj), has_coin, has_shop, is_end, is_start, is_visible, sketch);
        }
        cell_array.push(cell_new);
      }
    }
    player.show();
  }

  sketch.keyPressed = function() {
    switch(this.sketch.keyCode) {
      case this.sketch.UP_ARROW:   //up
        console.log(this.onMap);
        if (this.onMap) {
          break;
        }
        this.player.set_oriention(1);
        if (!isObstacle(this.player.pos_xx, this.player.pos_yy - 1)) {
          this.player.pos_yy--;
        }

        break;//
      case this.sketch.DOWN_ARROW:   // down
        if (this.onMap) {
          break;
        }
        this.player.set_oriention(2);
        if (!isObstacle(this.player.pos_xx, this.player.pos_yy + 1)) {
          this.player.pos_yy++;
        }
        break;
      case this.sketch.RIGHT_ARROW:   // right
        if (this.onMap) {
          break;
        }
        this.player.set_oriention(3);
        if (!isObstacle(this.player.pos_xx + 1, this.player.pos_yy)) {
          this.player.pos_xx++;
        }
        break;
      case this.sketch.LEFT_ARROW:   // left
        if (this.onMap) {
          break;
        }
        this.player.set_oriention(4);
        if (!isObstacle(this.player.pos_xx - 1, this.player.pos_yy)) {
          this.player.pos_xx--;
        }
        break;
      case this.sketch.SHIFT:
        if (onMap) {
          offset = visibility;
        }
        else {
          offset = (dimension-1) / 2;
        }
        resolution = canvas_size / (offset * 2 + 1)
        this.player.toggleCenter(resolution);
        onMap = !onMap;
        break;
      case this.sketch.CONTROL:
        if (trig_display_endpoint == 1) {
          trig_display_endpoint = 2;
        }
        break;
    }
  }

  this.isObstacle = function(xi, yj) {
    var aaa = !(input_array[xi][yj] >= 1 && input_array[xi][yj] <= 3);
    if (input_array[xi][yj] == 5) {
      aaa = false;
    }
    return aaa;
  }

  this.timer = window.setInterval(function() {
    if (!isPaused) {
      timer++;
    }
  }, 1000)
}

var s2 = function (sketch) {
  sketch.setup = function() {
    canvas2 = sketch.createCanvas(400, 100);
    canvas2.position(0, 0);
    sketch.background(100);
  }



  sketch.draw = function() {
    sketch.background(100);
  }
}

var s3 = function (sketch) {
  let img;
  sketch.setup = function() {
    canvas3 = sketch.createCanvas(200, 100);
    canvas3.position(425, 0);
    sketch.background(100);

    img = sketch.loadImage('https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png');
  }


  sketch.draw = function() {
    sketch.background(100);
    sketch.noSmooth();
    img.resize(50, 50);
    sketch.image(img, 10, 10);
    sketch.textSize(20);
    if (player.balance < 10) {
      sketch.text(player.balance, 30, 85);
    } else {
      sketch.text(player.balance, 25, 85);
    }
    sketch.textSize(40);
    sketch.text(this.formatTime(), 80, 65);
    sketch.fill(255);
  }

  this.formatTime = function() {
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }
}

var s4 = function (sketch) {
  sketch.setup = function() {
    canvas4 = sketch.createCanvas(200, 400);
    canvas4.position(425, 125);
    sketch.background(100);
  }



  sketch.draw = function() {
    sketch.background(100);
  }
}

new p5(s1, 'container');
new p5(s2, 'container');
new p5(s3, 'container');
new p5(s4, 'container');