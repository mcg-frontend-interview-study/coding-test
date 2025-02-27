const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m, r] = input[0].split(' ').map(Number);
const items = input[1].split(' ').map(Number);
let maxItemCount = 0;

// 그래프 생성 (양방향 인접 리스트)
const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 2; i < r + 2; i++) {
    const [a, b, l] = input[i].split(' ').map(Number);
    graph[a].push([b, l]);
    graph[b].push([a, l]);
}
// 최소 힙
const heap = [];

function dijkstra(start) {
    const INF = Infinity;
    const dist = Array(n + 1).fill(INF);

    // 시작점 초기화
    dist[start] = 0;
    makePush([0, start]); // [거리, 노드] 저장

    while (heap.length > 0) {
        const [curDist, curNode] = makePop();
        if (curDist > dist[curNode]) continue;
        
        // 현재 노드 curNode에서 갈 수 있는 모든 nextNode(인접한 노드) 확인.
        // 현재까지의 거리 curDist에 간선의 가중치 weight를 더해서 새로운 거리(newDist) 계산.
        // 더 짧은 경로를 발견하면 dist[nextNode] 갱신.
        // 갱신된 경우, 최소 힙에 (거리, 노드) 추가.
        for (const [nextNode, weight] of graph[curNode]) {
            const newDist = curDist + weight;
            if (newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                makePush([newDist, nextNode]);
            }
        }
    }

    // m 이하의 거리인 지역들의 아이템 개수를 합산
    let totalItems = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] <= m) totalItems += items[i - 1];
    }

    return totalItems;
}

// 모든 정점을 시작점으로 설정하여 최대 아이템 개수 찾기
for (let i = 1; i <= n; i++) {
    maxItemCount = Math.max(maxItemCount, dijkstra(i));
}

console.log(maxItemCount);

// 최소 힙
function makePush(value) {
    heap.push(value);
    heapifyUp(heap.length - 1);
}

function makePop() {
    if (heap.length === 0) return;
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
