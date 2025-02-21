const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const arr = [0, ...input[1].split(' ').map(Number)];

let line = 2;
const testCase = [];
for(line; line<input.length; line++){
    const [i, j] = input[line].split(' ').map(Number);
    testCase.push([i,j]);
}

const dp = Array.from({length:n+1}).fill(0);

dp[1] = arr[1];

for(let k=2; k<=n; k++){
    dp[k] = dp[k-1] + arr[k];
}

for(let t=0; t<m; t++){
    const [i, j] = testCase[t];
    console.log(dp[j] - dp[i-1]);
}
