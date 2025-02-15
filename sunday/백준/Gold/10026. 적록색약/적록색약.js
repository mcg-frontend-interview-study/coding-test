const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0]);
const grid = input.slice(1).map((x) => x.split(''));

console.log(gDiffrentRCheck(), gEqualRCheck())

function gDiffrentRCheck() {
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    let gDiffrentRCount = 0;

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                gDiffrentRBfs(i, j, visited);
                gDiffrentRCount += 1;
            }
        }
    }
    return gDiffrentRCount
}

function gEqualRCheck() {
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    let gEqualRCount = 0;

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                gEqualRBfs(i, j, visited);
                gEqualRCount += 1;
            }
        }
    }
    return gEqualRCount
}

function gDiffrentRBfs(x, y, visited) {
    const queue = [[x, y]];
    visited[x][y] = true;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    const curColor = grid[x][y];

    while(queue.length > 0) {
        const [curX, curY] = queue.shift();

        for(let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny]) {
                if (grid[nx][ny] === curColor) {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                    }
            }
            
        }
    }
}

function gEqualRBfs(x, y, visited) {
    const queue = [[x, y]];
    visited[x][y] = true;

    const dx = [-1, 1, 0, 0]; 
    const dy = [0, 0, -1, 1];

    const curColor = grid[x][y];

    while (queue.length > 0) {
        const [curX, curY] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny]) {
                if (curColor === 'R' || curColor === 'G') {
                    if (grid[nx][ny] === 'R' || grid[nx][ny] === 'G') {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                    }
                } else {
                    if (grid[nx][ny] === curColor) {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                    }
                }
            }
        }
    }
}
