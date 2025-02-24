const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");
const n = parseInt(input, 10);

const lineInfo = rest
  .map((row) => {
    const [gender, point] = row.split(" ").map(Number);
    return { gender: gender === 0 ? -1 : gender, point };
  })
  .sort((a, b) => a.point - b.point);

let answer = -Infinity;

let map = new Map();
let balance = 0;

map.set(0, -1);

for (let i = 0; i < lineInfo.length; i++) {
  balance += lineInfo[i].gender;

  if (map.has(balance)) {
    const left = map.get(balance) + 1;
    const right = i;

    answer = Math.max(answer, lineInfo[right].point - lineInfo[left].point);
  } else {
    map.set(balance, i);
  }
}

console.log(answer);
