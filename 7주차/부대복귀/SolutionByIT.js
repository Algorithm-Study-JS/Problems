function solution(n, roads, sources, destination) {
    const memo = Array(n + 1).fill(-1);
    const graph = Array.from({ length: n + 1 }, () => []);
    
    for (let [from, to] of roads) {
        graph[from].push(to);
        graph[to].push(from);
    }
    
    function bfs() {
        const queue = [destination];
        memo[destination] = 0;
        
        while (queue.length) {
            const node = queue.shift();
            const currentDistance = memo[node];
            
            for (let neighbor of graph[node]) {
                if (memo[neighbor] === -1) {
                    memo[neighbor] = currentDistance + 1;
                    queue.push(neighbor);
                }
            }
        }
    }
    
    bfs();
    
    return sources.map(source => memo[source]);
}
