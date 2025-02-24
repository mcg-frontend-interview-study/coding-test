const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const n = parseInt(input, 10);
const mosquitoes = rest.map((time) => time.split(" ").map(Number));

const timeTableMap = new Map();

for (let i = 0; i < n; i++) {
  const [start, end] = mosquitoes[i];

  timeTableMap.set(start, (timeTableMap.get(start) || 0) + 1);
  timeTableMap.set(end, (timeTableMap.get(end) || 0) - 1);
}

const timeTable = [...timeTableMap].sort((a, b) => a[0] - b[0]);

let sum = 0;
let max = 0;
let answerStart = 0;
let answerEnd = 0;

let opened = false;

timeTable.forEach((timeInfo) => {
  const [time, mosquitoes] = timeInfo;
  sum += mosquitoes;

  if (sum > max) {
    max = sum;
    answerStart = time;
    opened = true;
  } else if (sum < max && opened) {
    answerEnd = time;
    opened = false;
  }
});

console.log(max);
console.log(`${answerStart} ${answerEnd}`);
