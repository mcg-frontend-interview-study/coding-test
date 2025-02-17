const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// v: 세로(행), h: 가로(열)
const [v, h] = input[0].split(' ').map(Number);
const grid = input.slice(1).map((x) => x.split(' ').map(Number));

// 상하좌우 탐색 좌표
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let time = 0;                 // 모든 치즈가 녹는 데 걸리는 시간
let lastCheeseCount = 0;      // 마지막에 남아 있던 치즈 개수

while (true) {
    const cheeseCount = countCheese();
    if (cheeseCount === 0) break; // 치즈가 없으면 종료
    lastCheeseCount = cheeseCount;

    bfs();
    time += 1;
}

console.log(time);
console.log(lastCheeseCount);

function bfs() {
    const visited = Array.from({ length: v }, () => Array(h).fill(false));
    const meltingCandidates = [];

    const queue = [[0, 0]];
    visited[0][0] = true;

    while (queue.length > 0) {
        const [x, y] = queue.shift(); // shift() 사용

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx >= 0 && nx < v && ny >= 0 && ny < h && !visited[nx][ny]) {
                visited[nx][ny] = true;

                if (grid[nx][ny] === 1) {
                    // 치즈라면 녹일 후보에 추가
                    meltingCandidates.push([nx, ny]);
                } else if (grid[nx][ny] === 0) {
                    // 공기라면 탐색 확장
                    queue.push([nx, ny]);
                }
            }
        }
    }

    // 치즈 녹이기
    meltingCandidates.forEach(([x, y]) => {
        grid[x][y] = 0; 
    });
}

// 현재 치즈 개수 계산
function countCheese() {
    let count = 0;
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < h; j++) {
            if (grid[i][j] === 1) count += 1;
        }
    }
    return count;
}
