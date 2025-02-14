const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
input.shift();
const bd = input.map(str => str.split('').map(Number));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const dist = Array.from({ length: n }, () => Array(m).fill(-1));

const q = [];
q.push([0, 0]); 
dist[0][0] = 0;

while (q.length) {
    const [curX, curY] = q.shift();

    for (let dir = 0; dir < 4; dir++) {
        const nx = curX + dx[dir];
        const ny = curY + dy[dir];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue; 
        if (dist[nx][ny] !== -1 || bd[nx][ny] === 0) continue;

        dist[nx][ny] = dist[curX][curY] + 1;
        q.push([nx, ny]);

        if (nx === n - 1 && ny === m - 1) {
            console.log(dist[nx][ny] + 1);
            return;
        }
    }
}
