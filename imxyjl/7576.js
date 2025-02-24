const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
input.shift();

const bd = input.map(str => str.split(' ').map(Number));
const dist = Array.from({length: m}, () => Array(n).fill(0));
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

class Q {
    constructor(){
        this.arr = {};
        this.front = 0;
        this.end = 0;
    }
    size(){
        return this.end - this.front;
    }
    enq(v){
        this.arr[this.end++] = v;
    }

    deq(){
        const tmp = this.arr[this.front];
        delete this.arr[this.front];
        this.front++;

        if(this.front === this.end) this.front = this.end = 0;
      
        return tmp;
    }
}

const q = new Q();

for(let i=0; i<m; i++){
    for(let k=0; k<n; k++){
        if(bd[i][k] === 1) q.enq([i,k]);
        if(bd[i][k] === 0) dist[i][k] = -1;
    }
}

while(q.size() > 0){
    const [curX, curY] = q.deq(); //시간초과예상...

    for(let dir=0; dir<4; dir++){
        const nx = curX + dx[dir];
        const ny = curY + dy[dir];

        if(nx <0 || nx>=m || ny <0 || ny >=n) continue;
        if(dist[nx][ny] >=0 || bd[nx][ny] === -1) continue; // 2번째 조건이 이미 1번째에 포함됨

        bd[nx][ny] = 1; // dist 조건만으로 정확한 거리를 구할 수 있음. 1로 바꾸는 것도 불필요함
        dist[nx][ny] = dist[curX][curY] + 1;
        q.enq([nx, ny]);
    }
}

const isPossible = () => {
    let max = 0;
    for(let i=0; i<m; i++){
        for(let k=0; k<n; k++){
            if(bd[i][k] === 0) return -1;
            max = Math.max(max, dist[i][k]);
        }
    }
   return max; 
}

console.log(isPossible());
