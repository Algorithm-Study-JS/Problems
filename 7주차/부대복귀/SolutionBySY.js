function solution(n, roads, sources, destination) {
    const map = Array.from({length: n + 1}, () => []);
    roads.forEach((road) => {
        map[road[0]].push(road[1]);
        map[road[1]].push(road[0]);
    })

    const dist = Array(n + 1).fill(-1);
    const visited = Array(n + 1).fill(false)
    dist[destination] = 0;
    visited[destination] = true;    
    
    const queue = [[destination, 0]];
    let head = 0;
    
    while(head < queue.length) {
        const [currLocation, currDist] = queue[head++];
        
        map[currLocation].forEach((road) => {
            if(!visited[road]) {
                dist[road] = currDist + 1;
                queue.push([road, currDist + 1]);
                visited[road] = true;
            }
        })
    }
    
    return sources.map(source => dist[source]);
}
