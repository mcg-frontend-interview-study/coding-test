const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0]);
const boomInfo = input.slice(1, n + 1).map((x) => x.split(''));
const playingInfo = input.slice(n + 1, input.length).map((x) => x.split(''));
let graph = Array.from({ length: n }, () => Array(n).fill('.'));
const boomPlaces = Array.from({ length: n }, () => []);
// 1. 지뢰인 경우
// 모든 지뢰 자리를 전부 *로 표
// 2. 지뢰가 아닌 경우
// 상, 하, 좌, 우, 왼쪽위대각선, 오른쪽위대각선, 왼쪽아래대각선, 오른쪽아래대각선

findBoom();
isOpen();
graph.forEach((line) => {
    console.log(line.join(''));
})

// 전체를 돌면서 해당 자리가 열렸는지 확인
function isOpen() {
    let boom = false;
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            // 열렸는데 지뢰다. 모든 지뢰칸을 다 '*'
            if(playingInfo[i][j] === 'x' && boomInfo[i][j] === '*') {
                boom = true;
            } else if(playingInfo[i][j] === 'x' && boomInfo[i][j] === '.') {
                graph[i][j] = aroundBoomCount(i, j);
            }
        }
    }
    if(boom) changeBoom();
    return;
}

// 지뢰 위치 저장 함수
function findBoom() {
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(boomInfo[i][j] === '*') boomPlaces[i].push(j);
        }
    }
}

// 주변 지뢰 개수를 구하는 함수
function aroundBoomCount(x, y) {
    let count = 0;
    const dx = [0, 0, -1, 1, -1, 1, -1, 1];
    const dy = [-1, 1, 0, 0, -1, -1, 1, 1];
    for(let i = 0; i < 8; i++) {
        const cx = x + dx[i];
        const cy = y + dy[i];
        if(cx >= 0 && cy >= 0 && cx < n && cy < n) {
            if(boomPlaces[cx].includes(cy)) {
                count += 1;
            }
        }
    }
    return count;
}

// 모든 지뢰 칸을 다 *로 표시
function changeBoom() {
    for(let i = 0; i < boomPlaces.length; i++) {
        if(boomPlaces[i].length > 0) {
            for(let j = 0; j < boomPlaces[i].length; j++) {
                const y = boomPlaces[i][j];
                graph[i][y] = '*'; 
            }
        }
    }
}
