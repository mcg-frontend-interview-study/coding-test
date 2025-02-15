class Queue {
  constructor() {
    this.storage = new Object();
    this.front = 0;
    this.rear = 0;
  }

  size() {
    return this.rear - this.front;
  }

  enqueue(element) {
    this.storage[this.rear] = element;
    this.rear++;
  }

  dequeue() {
    let removed = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;

    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return removed;
  }
}

const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [n, m] = input.split(" ").map(Number);
const matrix = rest.map((row) => row.split("").map(Number));
const visited = Array.from({ length: n }, () => Array.from({ length: m }, () => [0, 0]));
const directions = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const bfs = (startX, startY) => {
  const queue = new Queue();
  queue.enqueue([startX, startY, 0]);
  visited[startX][startY][0] = 1;

  while (queue.size() > 0) {
    const [x, y, isPunch] = queue.dequeue();

    if (x === n - 1 && y === m - 1) {
      return visited[x][y][isPunch];
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      // 방문하지 않은 유효한 점
      if (nx >= 0 && nx < n && ny >= 0 && ny < m && visited[nx][ny][isPunch] === 0) {
        const nextDistance = visited[nx][ny][isPunch] + 1;
        // 0이라면
        if (matrix[nx][ny] === 0 && (visited[nx][ny][isPunch] === 0 || visited[nx][ny][isPunch] > nextDistance)) {
          visited[nx][ny][isPunch] = visited[x][y][isPunch] + 1;
          queue.enqueue([nx, ny, isPunch]);
          // 1이지만 벽을 부수지 않았다면
        } else if (matrix[nx][ny] === 1 && isPunch === 0 && visited[nx][ny][1] === 0) {
          visited[nx][ny][1] = visited[x][y][0] + 1;
          queue.enqueue([nx, ny, 1]);
        }
      }
    }
  }

  return -1;
};

console.log(bfs(0, 0));
