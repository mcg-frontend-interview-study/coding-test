const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

class PQ{
    constructor() {
        this.h = [];
    }
    size() {
        return this.h.length;
    }
    swap(idx1, idx2) {
        [this.h[idx1], this.h[idx2]] = [this.h[idx2], this.h[idx1]];
    }
    add(v) {
        this.h.push(v);
        this.bubbleU(); 
    }
    remove() {
        if (this.h.length === 0) return null;
        if (this.h.length === 1) return this.h.pop();

        const toRemove = this.h[0];
        this.h[0] = this.h.pop();
        this.bubbleD(); 
        return toRemove;
    }

    bubbleU() {
        let idx = this.h.length - 1;
        let pIdx = Math.floor((idx - 1) / 2);

        while (
            this.h[pIdx] &&
            this.h[idx][0] < this.h[pIdx][0]
        ) {
            this.swap(idx, pIdx);
            idx = pIdx;
            pIdx = Math.floor((idx - 1) / 2);
        }
    }

    bubbleD() {
        let idx = 0;
        let leftIdx = idx * 2 + 1;
        let rightIdx = idx * 2 + 2;

        while (
            (this.h[leftIdx] && this.h[leftIdx][0] < this.h[idx][0]) ||
            (this.h[rightIdx] && this.h[rightIdx][0] < this.h[idx][0])
        ) {
            let smallerIdx = leftIdx;
            if (
                this.h[rightIdx]  &&
                this.h[rightIdx][0] < this.h[smallerIdx][0]
            ) {
                smallerIdx = rightIdx;
            }

            this.swap(idx, smallerIdx);
            idx = smallerIdx;
            leftIdx = idx * 2 + 1;
            rightIdx = idx * 2 + 2;
        }
    }
}

const pq = new PQ();
const v = Number(input[0]);
const e = Number(input[1]);
const adj = Array.from({length: v+1}, () => []);
const d = Array.from({length: v+1}, () => Infinity);
const pre = Array.from({length: v+1}, () => 0);

for(let i=2; i<input.length - 1; i++){
    // 출발 도시 번호, 도착지 번호, 비용 
    const [u, v, w] = input[i].split(' ').map(Number);
    adj[u].push([w,v]);
}

const [sv, ev] = input[input.length-1].split(' ').map(Number);
d[sv] = 0;
pq.add([d[sv], sv]);


while(pq.size() >0){
    const [curW, curV] = pq.remove();
    if(d[curV] !== curW) continue;

    adj[curV].forEach((next) =>{
        const [nextW, nextV] = next;
        const tmpW = nextW + d[curV];
        if(tmpW > d[nextV]) return;

        d[nextV] = tmpW ;
        pre[nextV] = curV;
        pq.add([d[nextV], nextV]);
    })
}

const res = [];
let curV = ev;
while(curV !== sv){
    res.push(curV);
    curV = pre[curV];
}
res.push(curV);

console.log(d[ev]);
console.log(res.length);
console.log(res.reverse().join(' '));
