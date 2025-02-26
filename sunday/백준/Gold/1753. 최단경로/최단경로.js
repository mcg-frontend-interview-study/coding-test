const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [V, E] = input[0].split(' ').map(Number); 
const start = Number(input[1]); 

// 그래프
const graph = Array.from({ length: V + 1 }, () => []);
for (let i = 2; i < E + 2; i++) {
    const [u, v, w] = input[i].split(' ').map(Number);
    graph[u].push([v, w]); 
}

// 최소힙
const heap = [];

function makePush(value) {
    heap.push(value);
    heapifyUp(heap.length - 1);
}

function makePop() {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();

    swap(0, heap.length - 1);
    const min = heap.pop();
    heapifyDown(0);

    return min;
}

function heapifyUp(index) {
    if (index === 0) return;
    let parent = Math.floor((index - 1) / 2);
    if (heap[index][0] < heap[parent][0]) { 
        swap(index, parent);
        heapifyUp(parent);
    }
}

function heapifyDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let smallest = index;

    if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
    if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;

    if (smallest !== index) {
        swap(index, smallest);
        heapifyDown(smallest);
    }
}

function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}

// 다익스트라
function dijkstra(start) {
    const INF = Infinity;
    const dist = Array(V + 1).fill(INF);
    dist[start] = 0;

    makePush([0, start]); 

    while (heap.length > 0) {
        const [curDist, curNode] = makePop(); 

        if (curDist > dist[curNode]) continue; 

        for (const [nextNode, weight] of graph[curNode]) {
            const newDist = curDist + weight;

            if (newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                makePush([newDist, nextNode]); 
            }
        }
    }

    return dist.slice(1).map(d => (d === INF ? "INF" : d)).join('\n');
}

console.log(dijkstra(start));
