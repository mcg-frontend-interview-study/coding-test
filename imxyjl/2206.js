const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
input.shift();

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
const bd = input.map(line => line.split('').map(Number));

function create3DArray(x, y, z, initV = 0) {
  return Array.from({ length: x }, () =>
    Array.from({ length: y }, () =>
      Array.from({ length: z }, () => initV)
    )
  );
}

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
        
        if(this.front === this.end){
            this.front = this.end = 0;
        }
        
        return tmp;
    } 
}


const bfs = (bx, by) => {
    const dist = create3DArray(n, m, 2, -1);
    const q = new Q();
    q.enq([0,0,0]);

    dist[0][0][0] = 0;

    while(q.size() > 0){
        const [curX, curY, isBroken] = q.deq();

        if(curX === n-1 && curY === m-1) return dist[curX][curY][isBroken] + 1;

        for(let dir=0; dir<4; dir++){       
            const nx = curX + dx[dir];
            const ny = curY + dy[dir];

            if(nx <0 || nx >=n || ny <0 || ny >=m) continue;

            if (bd[nx][ny] === 0 && dist[nx][ny][isBroken] === -1) {
                dist[nx][ny][isBroken] = dist[curX][curY][isBroken] + 1;
                q.enq([nx, ny, isBroken]);
            } else if (bd[nx][ny] === 1 && isBroken === 0 && dist[nx][ny][1] === -1) {
                dist[nx][ny][1] = dist[curX][curY][0] + 1;
                q.enq([nx, ny, 1]);
            }
        }
    }
    return -1; 
};

console.log(bfs(0, 0));
