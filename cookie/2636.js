const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [n, m] = input.split(" ").map(Number);
const matrix = rest.map((row) => row.split(" ").map(Number));

const directions = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

const bfs = (startX, startY) => {
  const visited = Array.from({ length: n }, () => Array.from({ length: m }).fill(false));
  const queue = [[startX, startY]];

  while (queue.length) {
    const [x, y] = queue.shift();
    visited[x][y] = true;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < n && ny >= 0 && ny < m && !visited[nx][ny]) {
        visited[nx][ny] = true;

        if (matrix[nx][ny] === 0) {
          queue.push([nx, ny]);
        } else {
          matrix[nx][ny] = -1;
        }
      }
    }
  }

  let meltingCheeseCount = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === -1) {
        meltingCheeseCount++;
        matrix[i][j] = 0;
      }
    }
  }

  return meltingCheeseCount;
};

let countMap = new Map();
let count = 0;

for (;;) {
  const meltingCheeseCount = bfs(0, 0);
  countMap.set(count, meltingCheeseCount);

  if (meltingCheeseCount === 0) {
    console.log(count);
    console.log(countMap.get(count - 1));
    break;
  }

  count++;
}
