const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M, K] = input[0].split(' ').map(Number); // 도시 수 N, 도로 수 M, 면접장 수 K
const info = input.slice(1, M + 1).map((x) => x.split(' ').map(Number));
const testCities = input[M + 1].split(' ').map(Number);

// testCities에서 각 정점으로 가는데 그 중에서 최단은 무엇일까?
const graph = Array.from({ length: N + 1 }, () => []);
for(let i = 0; i < M; i++) {
    // 도시의 번호 U에서 V까지의 거리 C
    // 역방향 그래프를 만들어야 한다. 
    const [U, V, C] = info[i];
    graph[V].push([U, C]) 
}

// 다익스트라 실행
// 한번에 넣고 다익스트라 한번 실행 내에서 찾아야 함
const dist = dijkstra(testCities);

// 가장 먼 거리와 해당 도시 찾기
let maxDist = -1;
let minCity = -1;
for (let i = 1; i <= N; i++) {
    if (dist[i] !== Infinity && dist[i] > maxDist) {
        maxDist = dist[i];
        minCity = i;
    }
}

console.log(minCity);
console.log(maxDist);

function dijkstra(startNodes) {
    const INF = Infinity;
    const dist = Array(N + 1).fill(INF);
    const heap = [];

    // 여러 개의 시작점
    for (const start of startNodes) {
        dist[start] = 0;
        makePush(heap, [0, start]); // 거리, 정점
    }

    while(heap.length > 0) {
        const [curDist, curNode] = makePop(heap);
        if(curDist > dist[curNode]) continue;

        for(const [nextNode, weight] of graph[curNode]) {
            const newDist = curDist + weight;

            if(newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                makePush(heap, [newDist, nextNode]);
            }
        }
    }
    return dist;
}

// 우선순위 큐
function makePush(heap, value) {
    heap.push(value);
    heapifyUp(heap, heap.length - 1);
}

function makePop(heap) {
    if(heap.length === 0) return null;
    if(heap.length === 1) return heap.pop();
    
    swap(heap, 0, heap.length - 1);
    const min = heap.pop();
    heapifyDown(heap, 0);
    return min;
}

function heapifyUp(heap, index) {
    if(index === 0) return;
    const parent = Math.floor((index - 1) / 2);
    
    if(heap[parent][0] > heap[index][0]) {
        swap(heap, parent, index);
        heapifyUp(heap, parent);
    }
}

function heapifyDown(heap, index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if(left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
    if(right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;

    if(smallest !== index) {
        swap(heap, index, smallest);
        heapifyDown(heap, smallest);
    }
}

function swap(heap, i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}
