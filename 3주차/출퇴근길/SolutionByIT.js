const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" ").map(Number));
}).on('close', () => {
    const [n, m] = lines[0], nodes = lines.slice(1, m + 1), [home, company] = lines[m + 1];
    const adj = Array.from({ length: n + 1 }, () => []);
    
    nodes.forEach(([from, to]) => {
        adj[from].push(to);
    });
    
    const bfs = (start, end) => {
        const queue = [start];
        const visited = Array(n + 1).fill(false);
        visited[start] = true;
        
        const reachable = new Set();

        while (queue.length > 0) {
            const node = queue.shift();
            
            if (node === end) {
                continue;
            }
            
            adj[node].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    reachable.add(neighbor);
                    queue.push(neighbor);
                }
            });
        }

        return reachable;
    };

    const homeReachable = bfs(home, company), companyReachable = bfs(company, home);

    const commonNodes = [...homeReachable].filter(node => companyReachable.has(node));

    // console.log(homeReachable)
    // console.log(companyReachable)
    
    console.log(commonNodes.length);
    
    process.exit(0);
});
