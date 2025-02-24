const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const graph = input.slice(1, n + 1).map((x) => x.split(' ').map(Number));
const points = input.slice(n + 1, n + m + 1).map((x) => x.split(' ').map(Number));

// 누적합 구하기
const prefixSum = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
        prefixSum[i][j] =
            graph[i - 1][j - 1] +   
            prefixSum[i - 1][j] +   
            prefixSum[i][j - 1] -   
            prefixSum[i - 1][j - 1]; 
    }
}

// 구간합 구하기
const results = [];
for (let i = 0; i < m; i++) {
    const [x1, y1, x2, y2] = points[i];

    const sum =
        prefixSum[x2][y2] -
        prefixSum[x1 - 1][y2] -
        prefixSum[x2][y1 - 1] +
        prefixSum[x1 - 1][y1 - 1];

    results.push(sum);
}

console.log(results.join('\n'));
