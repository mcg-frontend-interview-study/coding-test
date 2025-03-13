const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0]);
const arr = input.slice(1).map(Number);

let cur = 0;
const ans = [];
const stack = [];

const play = () => {
    for (let i = 0; i < arr.length; i++) {
        while (cur < arr[i]) {
            stack.push(++cur);
            ans.push('+');
        }

        if (stack.length === 0 || stack.at(-1) !== arr[i]) {
            return false; 
        }

        stack.pop();
        ans.push('-');
    }
    return true;
};

if (!play()) console.log("NO");
else console.log(ans.join('\n'));
