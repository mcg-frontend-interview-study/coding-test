const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0]);
const arr = input[1].split(' ').map(Number).reverse();

const ans = Array.from({length: n}, () => 0);
const stack = [[arr[0], 0]];

for(let i=1; i<n; i++){
    let curNum = arr[i];
    let stackLen = stack.length;

    while(stack.length > 0 && stack.at(-1)[0] < curNum ){
            const [num, numIdx] = stack.pop();
            ans[numIdx] = n- i;
    }

    stack.push([curNum, i]);
}

while(stack.length > 0){
    const [_, numIdx] = stack.pop();
    ans[numIdx] = 0;
}
console.log(ans.reverse().join(' '))
