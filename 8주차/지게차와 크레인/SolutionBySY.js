function solution(storage, requests) {
    const n = storage.length + 2, m = storage[0].length + 2
    let map = storage.map(str => str.split(""));
    
    // 테두리 넣어주기
    map = map.map(arr => ["x", ...arr, "x"]);
    map.unshift(Array(m).fill("x"));
    map.push(Array(m).fill("x"));
    
    // 크레인 작업
    const operateCrane = (target) => {
        for(let r = 1; r < n - 1; r++) {
            for(let c = 1; c < m - 1; c++) {
                if(map[r][c] === target) {
                    map[r][c] = "x";
                }
            }
        }
    }
    
    // 지게차 작업
    const operateFork = (target) => {
        const dr = [-1, 0, 1, 0];
        const dc = [0, 1, 0, -1];
        
        const visited = Array.from({length: n}, () => Array(m).fill(false));
        visited[0][0] = true;
        const queue = [[0, 0]];
        let head = 0;
        
        while(head < queue.length) {
            const [currR, currC] = queue[head++];
            
            for(let d = 0; d < 4; d++) {
                const nr = currR + dr[d];
                const nc = currC + dc[d];
                
                if(nr >= 0 && nr < n && nc >= 0 && nc < m && !visited[nr][nc]) {
                    // 빈 곳이면 큐에 넣고
                    if(map[nr][nc] === "x") {
                        queue.push([nr, nc]);
                    // 타겟이면 제거
                    } else if(map[nr][nc] === target) {
                        map[nr][nc] = "x";
                    }
                    
                    visited[nr][nc] = true;
                }
            }
        }
    }
    
    for(const request of requests) {
        // 지게차
        if(request.length === 1) {
            operateFork(request);
        // 크레인
        } else if(request.length === 2) {
            operateCrane(request[0]);
        }
    }
    
    return map.flat().filter(val => val !== "x").length;
}
