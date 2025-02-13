const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const t = Number(input[0]); // 테스트 케이스 수
let currentLine = 1; // 현재 처리할 줄 번호

for (let test = 0; test < t; test++) {
  const [m, n, k] = input[currentLine].split(' ').map(Number);
  currentLine++;

  // 그래프 및 방문 배열 초기화
  const graph = Array.from({ length: n }, () => Array(m).fill(0));
  const visited = Array.from({ length: n }, () => Array(m).fill(false));

  // 배추 위치 채우기
  const positions = input.slice(currentLine, currentLine + k);
  positions.forEach((line) => {
    const [x, y] = line.split(' ').map(Number);
    graph[y][x] = 1;
  });

  currentLine += k; // 다음 테스트 케이스로 넘어가기 위해 줄 번호 업데이트

  // bfs로 연결된 배추 그룹룹 찾기
  let count = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (graph[y][x] === 1 && !visited[y][x]) {
        bfs(x, y, graph, visited, m, n);
        count++;
      }
    }
  }

  console.log(count);
}

// bfs 함수 정의
function bfs(x, y, graph, visited, m, n) {
  const queue = [[x, y]];
  visited[y][x] = true;

  const dx = [0, 0, -1, 1]; // 상하좌우 이동
  const dy = [-1, 1, 0, 0];

  while (queue.length > 0) {
    const [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nextX = curX + dx[i];
      const nextY = curY + dy[i];

      if (
        nextX >= 0 &&
        nextX < m &&
        nextY >= 0 &&
        nextY < n &&
        graph[nextY][nextX] === 1 &&
        !visited[nextY][nextX]
      ) {
        visited[nextY][nextX] = true;
        queue.push([nextX, nextY]);
      }
    }
  }
}
