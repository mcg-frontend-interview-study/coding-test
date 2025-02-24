const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [n, m] = input.split(" ").map(Number);

const matrix = rest.slice(0, n).map((row) => row.split(" ").map(Number));
const points = rest.slice(n, n + m).map((row) => row.split(" ").map(Number));

const prefixSum = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    prefixSum[i][j] = prefixSum[i - 1][j] + prefixSum[i][j - 1] + matrix[i - 1][j - 1] - prefixSum[i - 1][j - 1];
  }
}

points.forEach((point) => {
  const [x1, y1, x2, y2] = point;
  const rangeSum = prefixSum[x2][y2] - prefixSum[x1 - 1][y2] - prefixSum[x2][y1 - 1] + prefixSum[x1 - 1][y1 - 1];
  console.log(rangeSum);
});
