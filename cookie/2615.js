const fs = require("fs");
const matrix = fs
  .readFileSync(0, "utf8")
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const getStoneCount = (directions, stone, point, count) => {
  const [dx, dy] = directions;
  const [curX, curY] = point;
  const nx = curX + dx;
  const ny = curY + dy;

  if (nx >= 0 && nx < 19 && ny >= 0 && ny < 19) {
    if (matrix[nx][ny] === stone) {
      return getStoneCount(directions, stone, [nx, ny], count + 1);
    }
  }

  return count;
};

let answerStone = 0;
const answerList = [];

for (let i = 0; i < 19; i++) {
  for (let j = 0; j < 19; j++) {
    if (matrix[i][j] !== 0) {
      const startPosition = [i, j];
      // 8방향 찾기
      const startValue = matrix[i][j];

      for (const [dx, dy] of directions) {
        const nx = i + dx;
        const ny = j + dy;

        if (nx >= 0 && nx < 19 && ny >= 0 && ny < 19) {
          if (matrix[nx][ny] === startValue) {
            // 그 방향과 반대 방향으로 계속 탐색하게 해야함
            const currentDirectionCount = getStoneCount([dx, dy], startValue, [nx, ny], 2);
            const oppositeX = dx !== 0 ? -dx : 0;
            const oppositeY = dy !== 0 ? -dy : 0;

            const oppositeDirectionCount = getStoneCount([oppositeX, oppositeY], startValue, [i, j], 0);

            if (currentDirectionCount + oppositeDirectionCount === 5) {
              answerStone = startValue;
              answerList.push([i, j]);
            }
          }
        }
      }
    }
  }
}

answerList.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  else return a[1] - b[1];
});

console.log(answerStone);
if (answerList.length !== 0) {
  console.log(answerList[0].map((number) => number + 1).join(" "));
}
