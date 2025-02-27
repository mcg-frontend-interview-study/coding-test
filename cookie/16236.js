const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const n = parseInt(input, 10);
const matrix = rest.map((row) => row.split(" ").map(Number));

let babySharkLevel = 2;
let levelUpCount = 0;
let totalDistance = 0;

const directions = [
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];
let sharkPoint = [-1, -1];

const careBabyShark = () => {
  const bfs = () => {
    // 아기상어 초기위치 찾기
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 9) {
          sharkPoint = [i, j];
          break;
        }
      }
    }

    const visited = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }).fill(false));

    const queue = [[...sharkPoint, 0]];
    const [startX, startY] = sharkPoint;
    visited[startX][startY] = true;
    const targets = [];

    while (queue.length) {
      const [x, y, dist] = queue.shift();

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
        if (babySharkLevel >= matrix[nx][ny] && !visited[nx][ny]) {
          visited[nx][ny] = true;
          queue.push([nx, ny, dist + 1]);

          // 잡아먹을 물고기 후보의 좌표
          if (babySharkLevel > matrix[nx][ny] && matrix[nx][ny] !== 0) {
            targets.push({ point: [nx, ny], count: dist + 1 });
          }
        }
      }
    }

    // 더 이상 잡아먹을 물고기가 없을 때 return false;
    if (targets.length === 0) {
      return false;
    }

    let shortestCount = Infinity;

    targets.forEach((target) => {
      shortestCount = Math.min(shortestCount, target.count);
    });

    // 거리가 동일하면 북쪽으로, 그것이 여러 개라면 왼쪽 먹기
    const findFishes = targets.filter((target) => target.count === shortestCount);
    findFishes.sort((a, b) => {
      if (a.point[0] !== b.point[0]) return a.point[0] - b.point[0];
      return a.point[1] - b.point[1];
    });

    // 처음에 있는 먹잇감 먹은 뒤, 레벨업 여부 판단하고, 상어를 그 위치로 이동 후 누적 이동거리 반영
    const [x, y] = findFishes[0].point;

    levelUpCount++;
    if (levelUpCount === babySharkLevel) {
      babySharkLevel++;
      levelUpCount = 0;
    }

    matrix[x][y] = 9;
    const [sharkX, sharkY] = sharkPoint;
    matrix[sharkX][sharkY] = 0;
    totalDistance += findFishes[0].count;

    return true;
  };

  while (true) {
    if (!bfs()) break;
  }

  console.log(totalDistance);
};

careBabyShark();
