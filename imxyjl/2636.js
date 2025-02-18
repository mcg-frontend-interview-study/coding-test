const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const bd = input.slice(1).map(line => line.split(' ').map(Number));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

let time = 0;
let lastCheeseCount = 0;

const markEdge = () => {
    const vis = Array.from({ length: n }, () => Array(m).fill(0));
    const q = [[0, 0]];
    vis[0][0] = 1;

    while (q.length) {
        const [x, y] = q.shift();
        bd[x][y] = -1; 

        for (let dir = 0; dir < 4; dir++) {
            const nx = x + dx[dir];
            const ny = y + dy[dir];

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if (vis[nx][ny]) continue;

            if (bd[nx][ny] <= 0) {
                vis[nx][ny] = 1;
                q.push([nx, ny]);
            }
        }
    }
};


const meltCheese = () => {
    let cheeseCount = 0;
    const toMelt = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (bd[i][j] === 1) {
                cheeseCount++;
                let isEdge = false;

                for (let dir = 0; dir < 4; dir++) {
                    const nx = i + dx[dir];
                    const ny = j + dy[dir];

                    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
                    if (bd[nx][ny] === -1) isEdge = true;
                }

                if (isEdge) toMelt.push([i, j]);
            }
        }
    }

    toMelt.forEach(([x, y]) => (bd[x][y] = 0));
    return cheeseCount;
};

while (1) {
    markEdge(); 
    const cheeseCount = meltCheese();

    if (cheeseCount === 0) break; 

    lastCheeseCount = cheeseCount;
    time++;
}

console.log(time, lastCheeseCount);
