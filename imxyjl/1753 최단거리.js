const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

// 정점, 간선의 개수
const [v, e] = input[0].split(' ').map(Number);
const sv = Number(input[1]);

// 정점과 인접한 정점들을 기록하는 배열
const adj = Array.from({ length: v+1 }, () => []);
// 최단거리(최소가중치)를 저장하는 배열
const d = Array.from({length: v+1}, () => Infinity);

for(let i=2; i<input.length; i++){
    // u에서 v로 가는 가중치 w인 간선
    const [u, v, w] = input[i].split(' ').map(Number);
    adj[u].push([w,v]);
}

class MinHeap {
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

const pq = new MinHeap();
d[sv] = 0;
// 우선순위 큐에 0(가중치), 시작점 추가
pq.add([d[sv], sv]); 

while(pq.size() >0){
    const [curW, curV] = pq.remove();
    // 현재 가중치 최소값이 최단거리 테이블의 값과 같은가?
    // 다르다면 예전에 넣어둔 최소 가중치가 더 작은 값으로 갱신되었다는 의미이므로 pass
    if(d[curV] !== curW) continue;

    // 현재 정점에서 이용 가능한 간선들을 조사
    adj[curV].forEach((next) =>{
        const [nextW, nextV] = next;
        // 기존에 저장된 가중치보다 현재 탐색 가중치가 크면 pass
        const tmpW = d[curV] + nextW;
       if(d[nextV] <= tmpW) return; 
        
        d[nextV] = tmpW;
        pq.add([d[nextV], nextV]);
    });
}

for(let i=1; i<=v; i++){
    if(d[i] === Infinity) console.log("INF");
    else console.log(d[i]);
}
