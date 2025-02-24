const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

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
        delete this.arr[this.front]
        this.front++;
        
        if(this.front === this.end) this.front = this.end = 0;
        return tmp;
    }
}

const testCases = [];
const T = Number(input[0])

let lineCnt = 1;
while(lineCnt < input.length){
    const bd = [];
    const [w, h] = input[lineCnt++].split(' ').map(Number);
    
    for(let i=0; i<h; i++){
        bd.push(input[lineCnt++].split(''));
    }
    testCases.push({bd, w, h});
    
}

const dx = [1,0,-1,0];
const dy = [0,1,0,-1];


for(let i=0; i<testCases.length; i++){
    const {bd, w, h} = testCases[i];
    const dist = Array.from({length: h}, () => Array(w).fill(-1));
    const fireDist = Array.from({length: h}, () => Array(w).fill(-1));

    const q = new Q(); // 이름 조심!

    const fireBfs = () => {
        while(q.size() > 0){
            const [curX, curY] = q.deq();
    
            for(let dir =0; dir<4; dir++){
                const nx = curX + dx[dir];
                const ny = curY + dy[dir];
    
                if(nx <0 || nx >=h || ny<0 || ny >=w) continue;
                if(bd[nx][ny] === '#' || fireDist[nx][ny] >= 0) continue;

                fireDist[nx][ny] = fireDist[curX][curY] + 1;
                q.enq([nx, ny]);
            }
        }
    };
    
    const peopleBfs = (startX, startY) =>{
        const q = new Q();
        dist[startX][startY] = 0;
        q.enq([startX, startY]);

        while(q.size() > 0){
            const [curX, curY] = q.deq();
    
            for(let dir =0; dir<4; dir++){
                const nx = curX + dx[dir];
                const ny = curY + dy[dir];
    
                if(nx < 0 || nx  >= h || ny<0 || ny >=w){
                    return dist[curX][curY] + 1;
                }
                if(bd[nx][ny] === '#' || dist[nx][ny] >=0) continue;
                if(fireDist[nx][ny] >= 0 && fireDist[nx][ny] <=dist[curX][curY]+1) continue;

                dist[nx][ny] = dist[curX][curY] + 1;
                q.enq([nx, ny]);
            }
        }
        return -1;
    };
    

    let [startX, startY] = [0, 0];
    for(let j=0; j<h; j++){
        for(let k=0; k<w; k++){
            if(bd[j][k] === '@') {
                [startX, startY] = [j, k];
            }
            if(bd[j][k] === '*') {
                q.enq([j,k]);
                fireDist[j][k] = 0;
            }
        }
    }
    
    fireBfs();
    const ans = peopleBfs(startX, startY);
    ans === -1 ? console.log("IMPOSSIBLE") : console.log(ans);
}
