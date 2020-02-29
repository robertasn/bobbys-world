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

	this.shuffle = function() {
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

		var startX = Math.floor(Math.random() * (this.n - 1)) + 1;
		var startY = 1;

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
				this.shuffle();
				for (var dir = 0; dir < 4; dir++) {
					var adjX = x + this.dx[dir], adjY = y + this.dy[dir];
					var adjX2 = x + this.dx[dir] * 2, adjY2 = y + this.dy[dir] * 2;
					if (this.valid(adjX2, adjY2) && this.cells[this.getID(adjX2, adjY2)] == 0) {
						this.frontier[this.frontierSiz++] = [adjX, adjY, adjX2, adjY2];
					}
				}
			}
		}

		var endX = -1, endY = -1;
		for (var i = 0; i < 50; i++) {
			var x = Math.floor(Math.random() * (this.n - 1)) + 1;;
			var y = this.n - 2;
			if (this.cells[this.getID(x, y)] == 1) {
				endX = x, endY = y;
				break;
			}
		}

		if (endX == -1) {
			for (var x = 0; x < this.n; x++) {
				if (this.cells[this.getID(x, this.n - 2)] == 1) {
					endX = x, endY = this.n - 2;
					break;
				}
			}
		}

		for (var i = 0; i < this.n; i++) {
			var row = "";
			row += (i % 10) + " ";
			for (var j = 0; j < this.n; j++) {
				if (i == startX && j == startY) {
					row += "S ";
				} else if (i == endX && j == endY) {
					row += "E ";
				} else {
					row += (this.cells[this.getID(i, j)] == 1 ? "." : "#") + " ";
				}
			}
			console.log(row);
		}

		arr = [[]];
		for (var i = 0; i < this.n; i++) {
			arr[i] = [];
			for (var j = 0; j < this.n; j++) {
				arr[i][j] = this.cells[this.getID(i, j)];
			}
		}

		return arr;
	}

	// only use with odd maze sizes
}