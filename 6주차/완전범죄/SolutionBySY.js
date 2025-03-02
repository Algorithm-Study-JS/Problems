function solution(info, n, m) {
    let min = Infinity;
    const memo = new Set();
    
    const dfs = (idx, a, b) => {
        // basecase
        if(idx === info.length) {
            min = Math.min(min, a);
            return;
        }
        
        // 이미 탐색한 경로 가지치기
        const key = `${idx}-${a}-${b}`
        if(memo.has(key)) {
            return;
        }
        
        // recursive        
        memo.add(key);
        
        const newA = a + info[idx][0];
        const newB = b + info[idx][1];
        
        if(newA < n && newA < min) {
            dfs(idx + 1, newA, b);
        }
        
        if(newB < m) {
            dfs(idx + 1, a, newB);
        }
    }
    
    dfs(0, 0, 0);
    
    return min === Infinity ? -1 : min;
}
