const fs = require("fs");
const [n, m] = fs.readFileSync(0, "utf8").trim().split(" ").map(Number);

let result = [];

const dfs = (sequence) => {
  if (sequence.length === m) {
    result.push(sequence.join(" "));
    return;
  }

  for (let i = 1; i <= n; i++) {
    sequence.push(i);
    dfs(sequence);
    sequence.pop();
  }
};

dfs([]);
console.log(result.join("\n"));
