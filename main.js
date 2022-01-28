// -----------------------function for finding if element exists and getting element cordinates ---------------------------
function searchValue(matrix, alphabet) {
  let cordinates = [];

  //   if (matrix instanceof Array) {
  for (let k = 0; k < alphabet.length; k++) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === alphabet[k]) {
          cordinates.push({ x: i, y: j });
        }
      }
    }
  }
  return cordinates;
}

let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const matrix = [
  [1, 1, 1, "a", 1, 1, 1],
  [1, 1, "e", 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  ["d", 1, 1, 1, 1, 1, "b"],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, "c", 1, 1, 1],
];

let search = searchValue(matrix, alphabet);

//--------------------------------- BFS algorithm for gething the shortest path from source to destination in matrix ----------------------
class Cell {
  constructor(x, y, dist, prev) {
    this.x = x;
    this.y = y;
    this.dist = dist; //distance
    this.prev = prev; //parent cell in the path
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}

class ShortestPathBetweenCellsBFS {
  //BFS, Time O(n^2), Space O(n^2)
  shortestPath(matrix, start, end) {
    var sx = start[0];
    var sy = start[1];
    var dx = end[0];
    var dy = end[1];
    //if start or end value is 0, return
    if (matrix[sx][sy] == 0 || matrix[dx][dy] == 0) {
      console.log("There is no path.");
      return;
    }
    //initialize the cells
    var m = matrix.length;
    var n = matrix[0].length;
    var cells = [];
    for (let i = 0; i < m; i++) {
      cells[i] = [];
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] != 0) {
          cells[i][j] = new Cell(i, j, Number.MAX_VALUE, null);
        }
      }
    }
    //breadth first search
    var queue = [];
    var src = cells[sx][sy];
    src.dist = 0;
    queue.push(src);
    var dest = null;
    var p;
    while ((p = queue.shift()) != null) {
      //find destination
      if (p.x == dx && p.y == dy) {
        dest = p;
        break;
      }
      // moving up
      this.visit(cells, queue, p.x - 1, p.y, p);
      // moving left
      this.visit(cells, queue, p.x, p.y - 1, p);
      // moving down
      this.visit(cells, queue, p.x + 1, p.y, p);
      //moving right
      this.visit(cells, queue, p.x, p.y + 1, p);
      // down right
      this.visit(cells, queue, p.x + 1, p.y + 1, p);
      // up right
      this.visit(cells, queue, p.x + 1, p.y - 1, p);
      // down left
      this.visit(cells, queue, p.x - 1, p.y + 1, p);
      // up left
      this.visit(cells, queue, p.x - 1, p.y - 1, p);
    }

    //compose the path if path exists
    if (dest == null) {
      console.log("there is no path.");
      return;
    } else {
      let path = [];
      p = dest;
      do {
        path.unshift(p);
      } while ((p = p.prev) != null);
      // console.log(`${path}`);
      return path;
    }
  }

  //function to update cell visiting status, Time O(1), Space O(1)
  visit(cells, queue, x, y, parent) {
    //out of boundary
    if (
      x < 0 ||
      x >= cells.length ||
      y < 0 ||
      y >= cells[0].length ||
      cells[x][y] == null
    ) {
      return;
    }
    //update distance, and previous node
    var dist = parent.dist + 1;
    var p = cells[x][y];
    if (dist < p.dist) {
      p.dist = dist;
      p.prev = parent;
      queue.push(p);
    }
  }
}

myObj = new ShortestPathBetweenCellsBFS();

function star(parametar) {
  for (let i = 0; i < parametar.length; i++) {
    matrix[parametar[i].x][parametar[i].y] = "*";
  }
}

function space() {
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 1) {
        matrix[i][j] = " ";
      }
    }
  }
}

/// ------------------------------------------///
function connect(position) {
  for (let i = 0; i < position.length - 1; i++) {
    let start = position[i].x;
    let start1 = position[i].y;
    let end = position[i + 1].x;
    let end1 = position[i + 1].y;
    let startingPosition = [start, start1];
    let endingPosition = [end, end1];

    // invoking BFS algorithm
    let path = myObj.shortestPath(matrix, startingPosition, endingPosition);
    // invoking star function
    star(path);
  }
  // invoking function for empty space
  space();

  var s = "";
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {
      s += matrix[i][j] + " ";
    }
    s += "\n";
  }
  console.log(s);
}

connect(search);
