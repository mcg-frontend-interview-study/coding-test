const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map((Number));
const arr = input[1].split(' ').map((Number));
const points = input.slice(2, 2 + m).map((x) => x.split(' ').map((Number)));

const prefixSum = Array({ length: n + 1 }).fill(0);

// 누적합을 채우기 ~
for(let i = 1; i <= n; i++) {
    prefixSum[i] = arr[i - 1] + prefixSum[i - 1];
}

// 구간합을 구하기 ~
const results = [];
for(let a = 0; a < m; a++) {
    const [i, j] = points[a];
    const sum = prefixSum[j] - prefixSum[i - 1];
    results.push(sum);
}

console.log(results.join('\n'))
