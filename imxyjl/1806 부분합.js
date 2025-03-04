const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [n, s] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let startIdx = 0;
let endIdx = 0;

const ps = Array.from({length: n}, () => 0);
ps[0] = arr[0];
for(let i=1; i<arr.length; i++)
{
     ps[i] = arr[i] + ps[i-1];
}
const calculateSum = (startIdx, endIdx) => {  
    return ps[endIdx] - (startIdx > 0 ? ps[startIdx - 1] : 0);
};

let isPossible = false;
let minLen = arr.length;

while(startIdx < arr.length && endIdx < arr.length){ 
    if(calculateSum(startIdx, endIdx) >= s){
        minLen = Math.min(minLen, endIdx-startIdx+1);
        startIdx++;
        isPossible = true;
    }  else{
        endIdx++;
    }      
}

console.log(isPossible? minLen: 0);
