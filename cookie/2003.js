const fs = require("fs");
const [input, rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [n, m] = input.split(" ").map(Number);
const numbers = rest.split(" ").map(Number);

let left = 0;
let right = 0;
let answer = 0;

while (left < n && right < n) {
  let sum = 0;
  for (let i = 0; i <= right - left; i++) {
    sum += numbers[left + i];
  }

  if (sum === m) {
    answer++;
  }

  if (sum <= m) {
    if (right < numbers.length - 1) {
      right++;
    } else {
      left++;
    }
  } else {
    left++;
  }
}

console.log(answer);
