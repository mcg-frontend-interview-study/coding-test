const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const n = Number(input[0]);

class PQ{
    constructor(){
        this.h = [];
    }
    size(){
        return this.h.length;
    }
    swap(idx1, idx2){
        [this.h[idx1], this.h[idx2]] =  [this.h[idx2], this.h[idx1]] 
    }
    add(v){
        this.h.push(v);
        this.bubbleU();
    }
    remove(){
        if(this.h.length === 0) return null;
        if(this.h.length ===1) return this.h.pop();

        const toRemove = this.h[0];
        this.h[0] = this.h.pop();
        this.bubbleD();
        return toRemove;
    }
    bubbleU(){
        let curIdx = this.h.length - 1;
        let pIdx = Math.floor((curIdx-1) /2);

        while(this.h[pIdx] && this.h[curIdx] > this.h[pIdx])
        {
            this.swap(curIdx, pIdx);
            curIdx = pIdx;
            pIdx =  Math.floor((curIdx-1) /2);
        }
    }
    bubbleD(){
        let curIdx = 0;
        let leftIdx = curIdx * 2 +1, rightIdx = curIdx *2 + 2;

        while(
            (this.h[leftIdx] && this.h[leftIdx] > this.h[curIdx])||
            (this.h[rightIdx] &&this.h[rightIdx] > this.h[curIdx])
        ){
            let biggerIdx = leftIdx;
            if(this.h[rightIdx] && this.h[rightIdx] > this.h[leftIdx]) biggerIdx = rightIdx;

            this.swap(biggerIdx, curIdx);
            curIdx = biggerIdx;
            leftIdx = curIdx * 2 +1, rightIdx = curIdx *2 + 2;
        }
    }
}

const pq = new PQ();
const assignList = Array.from({length: n+1}, () => []);

for(let i=1; i<input.length; i++){
    const [dead, cup] = input[i].split(' ').map(Number);
    assignList[dead].push(cup);
}

let cupSum = 0;

for(let i=n; i >= 1; i--){
    assignList[i].forEach(cup => pq.add(cup));

    if(pq.size() === 0) continue;
    cupSum += pq.remove();
}

console.log(cupSum);
