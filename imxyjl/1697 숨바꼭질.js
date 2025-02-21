const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
const [n, m] = input.split(' ').map(Number);

const dist = Array(100001).fill(-1);
class Q{
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
        if(this.front === this.end ) this.front = this.end = 0;
        return tmp;
    }
}

const q = new Q();
q.enq(n);
dist[n] = 0;

const move = (dir, curX) => {
    if(dir === 0) return curX - 1;
    if(dir===1) return curX + 1;
    if(dir===2) return curX * 2;
}

const bfs = () =>{
   while(q.size() > 0){ 
     const curX = q.deq();

    if(curX === m) return dist[curX];
     
    for(let dir=0; dir<3; dir++){
        const nx = move(dir,curX);

        if(nx <0 || nx>=100000)continue;
        if(dist[nx] >=0) continue;

        dist[nx] = dist[curX] + 1;
        q.enq(nx);
    }
    } 
}
console.log(bfs());
