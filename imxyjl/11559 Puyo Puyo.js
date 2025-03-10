const fs = require('fs');
const bd = fs.readFileSync(0, 'utf-8').trim().split('\n').map(row => row.split(''));  // 문자 배열로 변환

let totalCount = 0;
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

// 뿌요를 아래로 내리는 함수
const gravity = () => {
    for (let y = 0; y < 6; y++) { // 각 열을 기준으로 진행
        for (let x = 10; x >= 0; x--) {  // 위에서 아래로 순회하면서 이동
            if (bd[x][y] !== '.' && bd[x + 1][y] === '.') {
                let nx = x;
                while (nx + 1 < 12 && bd[nx + 1][y] === '.') {
                    bd[nx + 1][y] = bd[nx][y];
                    bd[nx][y] = '.';
                    nx++;
                }
            }
        }
    }
};


// 현재 탐색 대상에 인접한 뿌요의 좌표 조사
const bfs = (startX, startY, vis) => {
    const visPos = [[startX, startY]];
    const q = [[startX, startY]];
    const color = bd[startX][startY];

    vis[startX][startY] = true;

    while (q.length > 0) {
        const [curX, curY] = q.shift();

        for (let dir = 0; dir < 4; dir++) {
            const nx = curX + dx[dir];
            const ny = curY + dy[dir];

            if (nx >= 12 || nx < 0 || ny >= 6 || ny < 0) continue;
            if (bd[nx][ny] === '.' || bd[nx][ny] !== color || vis[nx][ny]) continue;

            q.push([nx, ny]);
            visPos.push([nx, ny]);
            vis[nx][ny] = true;
        }
    }
    return visPos;
};

while (true) {
    const vis = Array.from({ length: 12 }, () => Array(6).fill(false));
    let isBomb = false;
    let toRemove = [];

    for (let i = 0; i < 12; i++) {
        for (let k = 0; k < 6; k++) {
            if (bd[i][k] !== '.' && !vis[i][k]) {
                const curVisPos = bfs(i, k, vis);
                if (curVisPos.length >= 4) {
                    isBomb = true;
                    toRemove.push(...curVisPos);
                }
            }
        }
    }
  
    toRemove.forEach(([x, y]) => bd[x][y] = '.');

    gravity();

    if (!isBomb) break;
    else totalCount++;
}
console.log(totalCount);
