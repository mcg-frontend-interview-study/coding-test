const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);
const nodeInfo = input[1].split(' ').map(Number);
const removeN = Number(input[2]);

// 트리 그래프 만들기 (부모 → 자식 형태)
const graph = Array.from({ length: N }, () => []);
let root = -1;
for (let i = 0; i < N; i++) {
    const parent = nodeInfo[i];
    if (parent === -1) {
        root = i; // 루트 노드 저장
    } else {
        graph[parent].push(i);
    }
}

// 삭제할 노드와 그 하위 노드들 제거 (DFS 사용)
function deleteNode(node) {
    graph[node] = []; // 해당 노드의 자식 리스트를 비움
    for (let i = 0; i < N; i++) {
        if (graph[i].includes(node)) {
            graph[i] = graph[i].filter(child => child !== node); // 부모 노드에서도 제거
        }
    }
    for (const child of graph[node]) {
        deleteNode(child);
    }
}

if (removeN !== root) deleteNode(removeN); // 루트 노드는 삭제할 수 없다.

// 리프 노드 개수 세기 (DFS 사용)
// 단순 반복문으로 구현시 부모가 삭제된 노드가 있는 경우 문제가 생길 수 있다. 
function countLeafNodes(node) {
    if (graph[node].length === 0) return 1; // 자식이 없으면 리프 노드

    let leafCount = 0;
    for (const child of graph[node]) {
        leafCount += countLeafNodes(child);
    }
    return leafCount;
}

// 루트 노드가 삭제되지 않았다면, 리프 노드 개수 출력
console.log(root === removeN ? 0 : countLeafNodes(root));
