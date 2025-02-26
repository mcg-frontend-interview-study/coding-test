const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [n, m] = input.split(" ").map(Number);
const matrix = rest.map((row) => row.split(""));
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const visited = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }).fill(false));

const hasCycle = () => {
  const dfs = (x, y, px, py, target) => {
    if (visited[x][y]) return true; // 방문한 노드를 다시 만나면 사이클

    visited[x][y] = true;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < n && ny >= 0 && ny < m && matrix[nx][ny] === target) {
        if (!(nx === px && ny === py)) {
          if (dfs(nx, ny, x, y, target)) return true;
        }
      }
    }
    return false;
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j]) {
        if (dfs(i, j, -1, -1, matrix[i][j])) return true;
      }
    }
  }

  return false;
};

hasCycle() ? console.log("Yes") : console.log("No");
