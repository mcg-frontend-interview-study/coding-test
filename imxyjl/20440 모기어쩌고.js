const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const n = Number(input[0]);

const t = [];
let line = 1;
for(line; line<input.length; line++){
    const [s, e] = input[line].split(' ').map(Number);
    t.push([s,e]);
}

const ps = [];
t.forEach(([s, e]) => {
    ps.push([s, 1]);
    ps.push([e, -1]);
});

ps.sort((a,b) => a[0] - b[0]);

let maxStart, maxEnd = 0;
let curCnt = 0, maxCnt = 0, curIdx = 0;
while(curIdx < ps.length){
    const curPos = ps[curIdx][0];

    // 중복된 좌표값이 남아있는 경우를 처리 -> 앞서 정렬했기 때문에 가능!
    while(curIdx < ps.length && ps[curIdx][0] === curPos){
        curCnt += ps[curIdx][1];
        curIdx++;
    }

    // 조사한 수에 대한 처리
    if(curCnt < maxCnt){
        if(maxEnd ===0) maxEnd = ps[curIdx-1][0]; // curIdx 하면 안됨. 이미 줄어든 상태이기 때문
    } 
    if(curCnt > maxCnt){
        maxCnt = curCnt;
        maxStart = curPos;
        maxEnd = 0; // 왜? -> 새로운 끝을 지정해주기 위해서
        // 문제에서 언젠가 퇴장 시간이 꼭 주어지므로 end가 0인 채로 끝나는 케이스는 없다!
    }
}

console.log(maxCnt);
console.log(maxStart, maxEnd);
