class Node {
  constructor(value) {
    this.cur = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  push(element) {
    const node = new Node(element);
    if (this.length === 0) {
      this.front = node;
    } else {
      this.rear.next = node;
    }

    this.rear = node;
    this.length++;
  }

  pop() {
    if (this.length === 0) return false;
    const removeElement = this.front.cur;
    this.front = this.front.next;
    this.length--;
    return removeElement;
  }
}

const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [n, m, k] = input.split(" ").map(Number);
const matrix = rest.map((row) => row.split("").map(Number));

const distance = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => Array.from({ length: k + 1 }).fill(Infinity))
);
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const bfs = (startX, startY) => {
  const queue = new Queue();
  distance[startX][startY][0] = 1;
  queue.push([startX, startY, 0]);

  while (queue.size()) {
    const [x, y, breakCount] = queue.pop();

    if (x === n - 1 && y === m - 1) {
      return distance[x][y][breakCount];
    }

    const nextDistance = distance[x][y][breakCount] + 1;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < n && ny >= 0 && ny < m && distance[nx][ny][breakCount] === Infinity) {
        // 0이고 이전보다 더 나은 결과가 있을 때
        if (matrix[nx][ny] === 0 && distance[nx][ny][breakCount] > nextDistance) {
          distance[nx][ny][breakCount] = nextDistance;
          queue.push([nx, ny, breakCount]);
          // 1이지만 아직 breakCount보다 넘치지 않았을 때
        } else if (matrix[nx][ny] === 1 && breakCount < k && distance[nx][ny][breakCount + 1] > nextDistance) {
          distance[nx][ny][breakCount + 1] = nextDistance;
          queue.push([nx, ny, breakCount + 1]);
        }
      }
    }
  }

  return -1;
};

console.log(bfs(0, 0));
