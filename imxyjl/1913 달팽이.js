const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0]); const target = Number(input[1]);

const bd = Array.from({ length: n }, () => Array(n).fill(0));

    const center = Math.floor(n / 2);
    let x = center;
    let y = center; 

    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];

    let cnt = 1; 
    let rx = 0, ry = 0;
    bd[x][y] = cnt++;

    if (target === 1) {
        rx = x + 1;
        ry = y + 1;
    }

    for (let i = 1; i <= center; i++) { 
        // 현재 위치에서 위로 한 칸 이동(새로운 테두리 제작)
        let nx = x - i;
        let ny = y - i;
        
        let step = i * 2; // 한 변에서 이동하는 거리 

        for (let j = 0; j < 4; j++) { // 네 방향 (오른 → 아래 → 왼 → 위)
            for (let k = 0; k < step; k++) { // step만큼 이동
                nx += dx[j];
                ny += dy[j];

                    bd[nx][ny] = cnt;
                    if (cnt === target) {
                        rx = nx + 1;
                        ry = ny + 1;
                    }
                    cnt++;
                }
        }
    }

bd.forEach(row => console.log(row.join(' ')));
console.log(rx, ry);
