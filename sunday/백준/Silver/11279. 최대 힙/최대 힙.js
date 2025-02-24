const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0]);
const commands = input.slice(1, 1 + n).map(Number);

const heap = [];

function makePush(value) {
    heap.push(value);
    heapifyUp(heap.length - 1);
}

function makePop() {
    if (heap.length === 0) return 0;
    if (heap.length === 1) return heap.pop();

    swap(0, heap.length - 1);
    const max = heap.pop();
    heapifyDown(0);

    return max;
}

function heapifyUp(index) {
    if (index === 0) return;
    let parent = Math.floor((index - 1) / 2);
    if (heap[index] > heap[parent]) {
        swap(index, parent);
        heapifyUp(parent);
    }
}

function heapifyDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let largest = index;

    if (left < heap.length && heap[left] > heap[largest]) largest = left;
    if (right < heap.length && heap[right] > heap[largest]) largest = right;

    if (largest !== index) {
        swap(index, largest);
        heapifyDown(largest);
    }
}

function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
}

const results = [];
for (let command of commands) {
    if (command === 0) {
        results.push(makePop());
    } else {
        makePush(command);
    }
}

console.log(results.join('\n'));
