const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
input.pop();

input.map((line) => {
  const [a, b] = line.split(" ").map(Number);
  console.log(a > b ? "Yes" : "No");
});
