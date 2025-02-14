const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = Number(input[0]); 
input.shift();
let bd = input.map(str => str.split(''));

const dx = [1,0,-1,0];
const dy = [0,1,0,-1];
let vis = Array.from({length: 101}, () => Array(101).fill(0));

let normal = 0;
let color = 0;


// 일반 bfs
const bfs = (start, end) => {
    for(let i=0; i<n; i++){
        for(let k=0; k<n; k++){
            if(vis[i][k] === 1) continue;

            const curColor = bd[i][k];
            let q = [];
            q.push([i,k]);
            vis[i][k] = 1;

             while(q.length){
                const [curX, curY] = q.shift();
                 
                for(let dir=0; dir<4; dir++){
                    const nx = curX + dx[dir];
                    const ny = curY + dy[dir];

                    if(nx< 0 || nx >=n || ny <0 || ny >=n) continue;
                    if(vis[nx][ny] ===1 || bd[nx][ny] !== curColor) continue;

                    q.push([nx, ny]);
                    vis[nx][ny] = 1;
                }
            }
            normal++;
        }
    }
}

// 색약
const cbfs = (start, end) => {
    for(let i=0; i<n; i++){
        for(let k=0; k<n; k++){
            if(vis[i][k] === 1) continue;

            const curColor = bd[i][k];
            const q = [];
            q.push([i,k]);
            vis[i][k] = 1;

             while(q.length){
                const [curX, curY] = q.shift();
                 
                for(let dir=0; dir<4; dir++){
                    const nx = curX + dx[dir];
                    const ny = curY + dy[dir];

                    if(nx< 0 || nx >=n || ny <0 || ny >=n) continue;
                    if(vis[nx][ny] ===1 || bd[nx][ny] !== curColor) continue;

                    q.push([nx, ny]);
                    vis[nx][ny] = 1;
                }
            }
            color++;
        }
    }
}

bfs(0,0);

for (let i = 0; i < bd.length; i++) {
    for (let j = 0; j < bd[i].length; j++) {
        if (bd[i][j] === 'R')  bd[i][j] = 'G';
        
    }
}

q= [];
vis = Array.from({length: 101}, () => Array(101).fill(0));
cbfs(0,0);
console.log(normal, color);
