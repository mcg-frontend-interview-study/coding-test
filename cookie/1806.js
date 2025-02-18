const fs = require("fs");
const [input, rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [n, m] = input.split(" ").map(Number);
const sequence = rest.split(" ").map(Number);

let answer = Infinity;
let left = 0;
let right = 0;

const prefixSum = Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
  prefixSum[i] = prefixSum[i - 1] + sequence[i - 1];
}

while (right <= n) {
  let sum = prefixSum[right] - prefixSum[left];

  if (sum >= m) {
    answer = Math.min(answer, right - left);
    left++;
  } else {
    right++;
  }
}

console.log(answer === Infinity ? 0 : answer);
