const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map((Number));
const arr = input.slice(1, n + 1).map((x) => x.split(' ').map((Number)));
const k = Number(input[n+1])
const points = input.slice(n+2).map((x) => x.split(' ').map((Number)));

const prefixSum = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))

for(let i = 1; i <= n; i++) {
    for(let j = 1; j <= m; j++) {
        prefixSum[i][j] = 
            arr[i - 1][j - 1] +
            prefixSum[i - 1][j] +
            prefixSum[i][j - 1] -
            prefixSum[i - 1][j - 1];
    }
}

const results = [];

for(let a = 0; a < k; a++) {
    const [i, j, x, y] = points[a];

    const sum =
        prefixSum[x][y] -
        prefixSum[i - 1][y] -
        prefixSum[x][j - 1] +
        prefixSum[i - 1][j - 1];

    results.push(sum);
}

console.log(results.join('\n'));