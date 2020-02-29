function Array_Generator() {
	this.n;
	this.cells = [];
	this.frontier = [[]];
	this.frontierSiz = 0;
	this.dx = [1, -1, 0, 0];
	this.dy = [0, 0, 1, -1];

	this.valid = function(x, y) {
		if (x >= 1 && x < this.n - 1 && y >= 1 && y < this.n - 1) {
			return true;
		} else {
			return false;
		}
	}

	this.getID = function(x, y) {
		return x * this.n + y;
	}

	this.shuff = function() {
		for (var iteration = 0; iteration < 5; iteration++) {
			var a = Math.floor(Math.random() * 4);
			var b = Math.floor(Math.random() * 4);
			
			var temp = this.dx[a];
			this.dx[a] = this.dx[b];
			this.dx[b] = temp;

			temp = this.dy[a];
			this.dy[a] = this.dy[b]
			this.dy[b] = temp;
		}
	}

	this.generate = function(siz) {
		this.n = siz;
		for (var i = 0; i < this.n; i++) {
			for (var j = 0; j < this.n; j++) {
				this.cells[this.getID(i, j)] = 0;
			}
		}

		var startX = 1;
		var startY = Math.floor(Math.random() * (this.n - 1)) + 1;

		this.frontier[this.frontierSiz++] = [startX, startY, startX, startY];
		// console.log(startX + " " + startY);

		while (this.frontierSiz > 0) {
			var index = Math.floor(Math.random() * this.frontierSiz);
			var current = this.frontier[index];
			this.frontier[index] = this.frontier[this.frontierSiz - 1];
			this.frontierSiz--;

			var x = current[2], y = current[3];
			var xx = current[0], yy = current[1];
			if (this.cells[this.getID(x, y)] == 0) {
				this.cells[this.getID(x, y)] = this.cells[this.getID(xx, yy)] = 1;
				this.shuff();
				for (var dir = 0; dir < 4; dir++) {
					var adjX = x + this.dx[dir], adjY = y + this.dy[dir];
					var adjX2 = x + this.dx[dir] * 2, adjY2 = y + this.dy[dir] * 2;
					if (this.valid(adjX2, adjY2) && this.cells[this.getID(adjX2, adjY2)] == 0) {
						this.frontier[this.frontierSiz++] = [adjX, adjY, adjX2, adjY2];
					}
				}
			}
		}

		// for (var i = 0; i < 50; i++) {
		// 	var x = this.n - 2;
		// 	var y = Math.floor(Math.random() * this.n);
		// 	if (this.cells[this.getID(x, y)] == 1) {
		// 		endX = x, endY = y;
		// 		break;
		// 	}
		// }

		// if (endY == -1) {
		// 	for (var y = 0; y < this.n; y++) {
		// 		if (this.cells[this.getID(this.n - 2, y)] == 1) {
		// 			endX = this.n - 2, endY = y;
		// 			break;
		// 		}
		// 	}
		// }

		endX = this.n - 2;
		var endY = -1;

		endLocs = [];
		cu = 0;
		for (y = 0; y < this.n; y++) {
			if (this.cells[this.getID(x, y)] == 1) {
				count = 0;
				for (dir = 0; dir < 4; dir++) {
					adjX = endX + this.dx[dir], adjY = y + this.dy[dir];
					if (this.cells[this.getID(adjX, adjY)] == 0) {
						count++;
					}
				}
				if (count == 3) {
					endLocs[cu++] = y;
				}
			}
		}

		endY = endLocs[Math.floor(Math.random() * cu)];

		// for (var i = 0; i < this.n; i++) {
		// 	var row = "";
		// 	row += (i % 10) + " ";
		// 	for (var j = 0; j < this.n; j++) {
		// 		if (i == startX && j == startY) {
		// 			row += "S ";
		// 		} else if (i == endX && j == endY) {
		// 			row += "E ";
		// 		} else {
		// 			row += (this.cells[this.getID(i, j)] == 1 ? "." : "#") + " ";
		// 		}
		// 	}
		// 	console.log(row);
		// }

		arr = [[]];
		for (var i = 0; i < this.n; i++) {
			arr[i] = [];
			for (var j = 0; j < this.n; j++) {
				if (i == 0 || i == this.n - 1 || j == 0 || j == this.n - 1) {
					arr[i][j] = 0;
				} else {
					if (this.cells[this.getID(i, j)] == 1) {
						if (i == endX && j == endY) {
							arr[i][j] = 2; // ending cell
						} else if (i == startX && j == startY) {
							arr[i][j] = 5;
						} else if (Math.random() * 10 > 9) {
							arr[i][j] = 3; // coin
						} else {
							arr[i][j] = 1;
						}
					} else {
						if (Math.random() * 500 > 480) {
							arr[i][j] = 4;
						} else {
							arr[i][j] = 0;
						}
					}
				}
			}
		}

		return arr;
	}

	// only use with odd maze sizes
}
// 0 - wall
// 1 - no wall
// 2 - end cell
// 3 - coin cell
// 4 - shop cell
// 5 - start cell