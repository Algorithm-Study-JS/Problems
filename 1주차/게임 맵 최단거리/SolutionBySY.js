function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;
    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];

    let answer = -1;
    const visited = Array.from({length: n}, () => new Array(m).fill(false));
    visited[0][0] = true;
    const queue = [];
    queue.push([0, 0, 1]);

    // BFS
    while(queue.length) {
        const [currR, currC, currDist] = queue.shift();
        
        // 도착하면 종료
        if(currR === n - 1 && currC === m - 1) {
            answer = currDist;
            break;
        }
        
        for(let d = 0; d < 4; d++) {
            const nr = currR + dr[d];
            const nc = currC + dc[d];
            
            if(nr >= 0 && nr < n && nc >= 0 && nc < m && maps[nr][nc] && !visited[nr][nc]) {
                visited[nr][nc] = true;
                queue.push([nr, nc, currDist + 1]);
            }
        }
    }
    
    return answer;
}
