const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, E] = input[0].split(' ').map(Number);
const [v1, v2] = input[E+1].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

// 그래프를 채우자. 양방향 인접 리스트
for(let i = 1; i <= E; i++) {
    const [a, b, c] = input[i].split(' ').map(Number);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
}

// 최소힙
const heap = [];
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
    if(index === 0) return;
    const parent = Math.floor((index - 1) / 2);
    
    if(heap[index][0] < heap[parent][0]) {
        swap(parent, index);
        heapifyUp(parent);
    }
}

function heapifyDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let smallest = index;

    if(left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
    if(right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;

    if(smallest !== index) {
        swap(index, smallest);
        heapifyDown(smallest);
    }
}

function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}

// 다익스트라 실행 부분
let result = -1;
const paths = [[1, v1, v2, N], [1, v2, v1, N]];
let minCount = Infinity;

for (let path of paths) {
    let count = 0;
    for (let j = 0; j < path.length - 1; j++) {
        const start = path[j];
        const end = path[j + 1];
        const dist = dijkstra(start);
        if (dist[end] === Infinity) {
            count = Infinity;
            break;
        }
        count += dist[end];
    }
    minCount = Math.min(minCount, count);
}

console.log(minCount === Infinity ? -1 : minCount);

function dijkstra(start) {
    heap.length = 0;
    const INF = Infinity;
    const dist = Array.from({ length: N + 1 }).fill(INF);

    dist[start] = 0;
    makePush([0, start]) // [거리, 노드]

    // 최단 거리를 갱신하자. 
    while(heap.length > 0) {
        const [curDist, curNode] = makePop();
        // 현재 dist에 저장되어 있는 값이 더 작으니까 패스
        if (curDist > dist[curNode]) continue;

        for (const [nextNode, weight] of graph[curNode]) {
            const newDist = curDist + weight;
            if (newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                makePush([newDist, nextNode]);
            }
        }
    }
    return dist
}
