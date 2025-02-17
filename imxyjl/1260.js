const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m, v] = input[0].split(' ').map(Number);
input.shift();

const adj = Array.from({ length: n + 1 }, () => []);
input.forEach(line =>{
    const [v1, v2] = line.split(' ').map(Number);
    adj[v1].push(v2);
    adj[v2].push(v1)
});

adj.forEach(edges => edges.sort((a, b) => a - b));

const bfsRes = [];
const bfsVis = Array(n + 1).fill(0);
const bfs = () =>{
 
        const q = [v];
        bfsRes.push(v);
        bfsVis[v] = 1;

        while(q.length){
            const v1 = q.shift();
            adj[v1].forEach(v2 => {
                if(!bfsVis[v2]){
                    
                    q.push(v2);
                    bfsVis[v2] = 1;
                    bfsRes.push(v2);
                }
            })
        }
    
}

const dfsRes = [];
const dfsVis = Array.from({length: n+1}).fill(0);

const dfs = (curV) => {
    dfsVis[curV] = 1;
    dfsRes.push(curV);
    
    adj[curV].forEach(v2 =>{
        if(!dfsVis[v2]) dfs(v2); 
    });
};

bfs();
dfs(v);

console.log(dfsRes.join(' '));
console.log(bfsRes.join(' '));
