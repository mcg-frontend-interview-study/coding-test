const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// 세로(v), 가로(h)
const [v, h] = input[0].split(' ').map(Number);
const grid = input.slice(1).map((line) => line.split('').map(Number));

// 상하좌우 탐색 좌표
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs() {
    // 3차원 visited: [x][y][isBroken]
    const visited = Array.from({ length: v }, () => 
        Array.from({ length: h }, () => Array(2).fill(false))
    );

    // 큐 초기화: [x, y, isBroken, distance]
    const queue = [[0, 0, 0, 1]];
    visited[0][0][0] = true;
    let front = 0;

    while (front < queue.length) {
		    // shift로 시간초과가 나서 front를 통해 인덱스를 옮겨가는 방식으로 수정
        const [x, y, isBroken, dist] = queue[front++];

        // 목적지 도착 시 거리 반환
        if (x === v - 1 && y === h - 1) {
            return dist;
        }

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            // 범위 체크
            if (nx >= 0 && nx < v && ny >= 0 && ny < h) {
                // 벽을 만나고 아직 부순 적이 없을 때
                if (grid[nx][ny] === 1 && isBroken === 0 && !visited[nx][ny][1]) {
                    // 부수고, 해당 자리를 방문했다고 처리.
                    visited[nx][ny][1] = true;
                    // queue에 isBroken자리를 1로 넣어주고 거리를 더 해 준다. 
                    queue.push([nx, ny, 1, dist + 1]);
                }

                // 벽이 아니고 방문하지 않았을 때
                if (grid[nx][ny] === 0 && !visited[nx][ny][isBroken]) {
		                // 방문 처리를 해 준다.
                    visited[nx][ny][isBroken] = true;
		                // queue에 현재 넣어야 할 값을 넣는다.
                    queue.push([nx, ny, isBroken, dist + 1]);
                }
            }
        }
    }

    // 도달할 수 없는 경우
    return -1;
}

// 결과 출력
console.log(bfs());
