const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const [n, m, x] = input[0].split(' ').map(Number);
const adj = Array.from({length: n+1}, () => []);
const revAdj = Array.from({length: n+1}, () => []);

class PQ{
    constructor(){
        this.h = [];
    }
    size(){
        return this.h.length;
    }
    swap(idx1, idx2){
        [this.h[idx1], this.h[idx2]] =   [this.h[idx2], this.h[idx1]]; 
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
        let pIdx = Math.floor((curIdx-1)/2);

        while(
            this.h[pIdx] && this.h[pIdx] > this.h[curIdx]
        ){
            this.swap(pIdx, curIdx);
            curIdx = pIdx;
            pIdx = Math.floor((curIdx-1)/2);
        }
    }
    bubbleD(){
        let curIdx = 0;
        let leftIdx = curIdx * 2 + 1, rightIdx = curIdx * 2 + 2;
        while(
            (this.h[leftIdx] && this.h[leftIdx] < this.h[curIdx]) ||
            (this.h[rightIdx] && this.h[rightIdx] < this.h[curIdx])
        ){
            let smallerIdx= leftIdx;
            if(this.h[rightIdx] && this.h[rightIdx] < this.h[smallerIdx]) smallerIdx = rightIdx;

            this.swap(smallerIdx, curIdx);
            curIdx = smallerIdx;
            leftIdx = curIdx * 2 + 1, rightIdx = curIdx * 2 + 2;
        }
    }
}

const getDis = (startV, isRev = false) =>{
    const pq = new PQ();
    const dist = Array.from({length: n+1}, () => Infinity); // 조심!
    
    dist[startV] = 0; 
    pq.add([startV, dist[startV]]);

    while(pq.size() >0){
        const [curV, curW] = pq.remove();
        if(dist[curV] !== curW) continue;

        const adjList = isRev ? revAdj : adj;
        adjList[curV].forEach(v =>{
            const [nextV, nextW] = v;
            const tmpW = nextW + dist[curV];
            if(tmpW >= dist[nextV]) return; 

            dist[nextV] = tmpW;
            pq.add([nextV, dist[nextV]]);
        });
    } 
    return dist;
};

for(let i=1; i<input.length; i++){
    const [u, v, w] = input[i].split(' ').map(Number);
    adj[u].push([v, w]);
    revAdj[v].push([u,w]);
}

let max = 0;
const res = getDis(x);
const revRes = getDis(x, true);
for(let i=1; i<=n; i++) max = Math.max(max, res[i] + revRes[i]);
console.log(max)
