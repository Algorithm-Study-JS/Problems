const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" ").map(Number));

    
}).on('close', () => {
    const [n, m] = lines[0];
    const [start, end] = lines[m + 1];

    const nodes = Array.from({length: n + 1}, () => []);
    const nodesReverse = Array.from({length: n + 1}, () => []);
    
    lines.slice(1, m + 1).forEach((node) => {
        const [s, e] = node;
        nodes[s].push(e);
        nodesReverse[e].push(s);
    })

    // 자바스크립트 엔진으로 인한 스택 오버플로우
    // const dfs = (curr, arr, visited) => {
    //     if(visited[curr]) {
    //         return;
    //     }

    //     visited[curr] = true;

    //     arr[curr].forEach((node) => {
    //         if(!visited[node]) {
    //             dfs(node, arr, visited);
    //         }
    //     })
    // }

    // 시스템 스택을 사용하지 않고, 배열로 스택 구현
    const bfs = (curr, arr, visited) => {
        const stack = [curr];
        visited[curr] = true;

        while(stack.length) {
            const node = stack.pop();

            arr[node].forEach((nextNode) => {
                if(!visited[nextNode]) {
                    visited[nextNode] = true;
                    stack.push(nextNode);
                }
            })
        }
    }

    const fromStart = new Array(n + 1).fill(false);
    const fromEnd = new Array(n + 1).fill(false);
    const toStart = new Array(n + 1).fill(false);
    const toEnd = new Array(n + 1).fill(false);

    fromStart[end] = true;
    bfs(start, nodes, fromStart);
    
    fromEnd[start] = true;
    bfs(end, nodes, fromEnd);

    bfs(start, nodesReverse, toStart);
    
    bfs(end, nodesReverse, toEnd);

    let count = 0;

    for(let i = 1; i <= m; i++) {
        if(fromStart[i] && fromEnd[i] && toStart[i] && toEnd[i]) {
            count++;
        }
    }

    console.log(count - 2);
});
