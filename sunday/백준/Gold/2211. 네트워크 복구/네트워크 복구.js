const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// 서로 연결되어 있다 -> 인접 리스트
// 최소 개수의 회선만 복구해야 한다.
const [N, M] = input[0].split(' ').map(Number);
const info = input.slice(1, M + 1).map((x) => x.split(' ').map(Number));
const heap = [];

// 그래프를 만들자
const graph = Array.from({length: N + 1}, () => []);
for(let i = 0; i < info.length; i++) {
     const [A, B, C] = info[i];

    graph[A].push([B, C]) // [정점, 비용];
    graph[B].push([A, C]) 
}
// console.log(graph)

// 일단 슈퍼컴퓨터 최소 찾자
const [dist, prev] = dijkstra(1);
// console.log(dist);
// console.log(prev);

const results = [];
for(let i = 0; i < prev.length; i++) {
    if(prev[i] !== -1) {
        results.push([i, prev[i]]);
    }
}

console.log(results.length)
results.forEach((result) => {
    console.log(result.join(' '))
})

// 다익스트라
function dijkstra(start){
    const INF = Infinity;
    const dist = Array(N + 1).fill(INF);
    // 최단 경로 트리를 이용하는 것이 이 문제의 키!
    const prev = Array(N + 1).fill(-1);    
    
    makePush([0, 1]) // 비용, 정점
    dist[start] = 0;

    while(heap.length > 0) {
        const [curDist, curNode] = makePop();
        if(curDist > dist[curNode]) continue;
        
        for(const [nextNode, weight] of graph[curNode]) {
            const newDist = curDist + weight;
            if(newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                prev[nextNode] = curNode;
                makePush([newDist, nextNode]);
            }
        }
    }
    return [dist, prev];
}

function makePush(value) {
    heap.push(value);
    heapifyUp(heap.length - 1);
}

function makePop() {
    if(heap.length === 0) return;
    if(heap.length === 1) return heap.pop();

    swap(0, heap.length - 1);
    const min = heap.pop();
    heapifyDown(0);
    return min;
}

function heapifyUp(index) {
    if(index < 1) return;
    const parent = Math.floor((index - 1) / 2);

    if(heap[parent][0] > heap[index][0]) {
        swap(parent, index);
        heapifyUp(parent);
    }
}

function heapifyDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;
    
    if(left < heap.length && heap[left][0] < heap[index][0]) smallest = left;
    if(right < heap.length && heap[right][0] < heap[index][0]) smallest = right;
    
    if(index !== smallest) {
        swap(index, smallest);
        heapifyDown(smallest);
    }
}

function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}