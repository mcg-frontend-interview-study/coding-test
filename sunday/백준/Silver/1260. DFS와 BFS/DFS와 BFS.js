const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// 정점의 개수 N, 간선의 개수 M, 탐색 시작 정점 V
const [n, m, v] = input[0].split(' ').map(Number);
const points = input.slice(1).map((x) => x.split(' ').map(Number));

path();

function path() {
    // 그래프 초기화
    const graph = Array.from({ length: n + 1 }, () => []);
    points.forEach(([start, end]) => {
        graph[start].push(end);
        graph[end].push(start);
    });

    // 정점 번호가 작은 것을 먼저 방문하기 위해 정렬
    graph.forEach((x) => x.sort((a, b) => a - b));

    dfs(v);
    bfs(v);
    
    function dfs(start) {
        const visited = Array.from({ length: n + 1 }).fill(false);
        const action = [];
        const stack = [start];

        while (stack.length > 0) {
            const curNode = stack.pop();
            if (!visited[curNode]) {
                visited[curNode] = true;
                action.push(curNode);

                // 스택에 추가 시, 내림차순 정렬하여 작은 정점이 나중에 push되게 해야
                // pop할 때 작은 정점부터 방문할 수 있다.
                const nextNodes = graph[curNode].slice().sort((a, b) => b - a);
                stack.push(...nextNodes);
            }
        }
        console.log(action.join(' '));
    }

		function bfs(start) {
		    const visited = Array(n + 1).fill(false);
		    const action = [];
		    const queue = [start];
		    visited[start] = true; 
		
		    while (queue.length > 0) {
		        const curNode = queue.shift();
		        action.push(curNode);  
		
		        graph[curNode].forEach(point => {
		            if (!visited[point]) {
		                visited[point] = true;  
		                queue.push(point);
		            }
		        });
		    }
		    console.log(action.join(' '));
		}
}
