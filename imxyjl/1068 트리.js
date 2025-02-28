const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0]);
const treeInfo = input[1].split(' ').map(Number);
const toRemove = Number(input[2]);

const tree = Array.from({ length: n }, () => []);

let root = 0;
let leafCnt = 0;

for (let i = 0; i < n; i++) {
    if (treeInfo[i] === -1) root = i;
    else tree[treeInfo[i]].push(i); 
}

const dfs = (curNode) => {
    if (curNode === toRemove) return -1; // 삭제 노드 처리
    if (tree[curNode].length === 0) { // 리프 노드일 경우
        leafCnt++;
        return 0;
    }

    // 탐색할 자식이 있는 경우 
    tree[curNode].forEach(child => {
        const dfsRes = dfs(child);
        // 자식이 하나 있었는데 그 자식이 삭제된 노드인 경우 해당 노드도 leaf
        if (dfsRes === -1 && tree[curNode].length === 1){
            leafCnt++
        }
    });
};

if (root !== toRemove) dfs(root);
console.log(leafCnt);
