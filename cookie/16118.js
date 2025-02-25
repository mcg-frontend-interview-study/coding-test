class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  push = (key, value) => {
    const node = { key, value };
    this.heap.push(node);
    this.heapifyUp();
  };

  heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex].key > lastInsertedNode.key) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertedNode;
  };

  pop = () => {
    const size = this.heap.length;
    const rootNode = this.heap[0];

    if (size === 0) return undefined;
    if (size === 1) return this.heap.pop();
    else {
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
    }

    return rootNode;
  };

  heapifyDown = () => {
    let index = 0;
    const rootNode = this.heap[index];
    const size = this.heap.length;

    while (this.getLeftChildIndex(index) < size) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const smallerChildIndex =
        rightChildIndex < size && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[smallerChildIndex].key < rootNode.key) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }

    this.heap[index] = rootNode;
  };

  isEmpty = () => this.heap.length <= 0;
}

const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [n, m] = input.split(" ").map(Number);
const graph = Array.from({ length: n + 1 }, () => []);

rest.forEach((line) => {
  const [start, end, dist] = line.split(" ").map(Number);
  graph[start].push([end, dist * 2]);
  graph[end].push([start, dist * 2]);
});

const getFoxShortestInfo = () => {
  const distance = Array.from({ length: n + 1 }, () => Infinity);
  distance[1] = 0;

  const pq = new PriorityQueue();
  pq.push(0, 1);

  while (!pq.isEmpty()) {
    const { key: cost, value: cur } = pq.pop();

    if (cost > distance[cur]) continue;

    for (const [next, dist] of graph[cur]) {
      const newCost = cost + dist;

      if (newCost < distance[next]) {
        distance[next] = newCost;
        pq.push(newCost, next);
      }
    }
  }

  return distance;
};

const getWolfShortestInfo = () => {
  const distance = Array.from({ length: n + 1 }, () => [Infinity, Infinity]);
  distance[1] = [0, Infinity];

  const pq = new PriorityQueue();
  pq.push(0, [1, 0]);

  while (!pq.isEmpty()) {
    const {
      key: cost,
      value: [cur, cnt],
    } = pq.pop();

    if (cost > distance[cur][cnt]) continue;

    const nextState = cnt ^ 1;

    for (const [next, dist] of graph[cur]) {
      let newCost;
      if (cnt === 0) {
        newCost = cost + dist / 2;
      } else {
        newCost = cost + dist * 2;
      }

      if (newCost < distance[next][nextState]) {
        distance[next][nextState] = newCost;
        pq.push(newCost, [next, nextState]);
      }
    }
  }

  return distance;
};

const foxDistance = getFoxShortestInfo();
const wolfDistance = getWolfShortestInfo();

let answer = 0;
for (let i = 2; i <= n; i++) {
  if (foxDistance[i] < Math.min(wolfDistance[i][0], wolfDistance[i][1])) {
    answer++;
  }
}

console.log(answer);
