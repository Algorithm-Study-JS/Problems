function solution(m, n, puddles) {
    const mod = 1000000007;
    const dp = Array.from({length: n}, () => new Array(m).fill(0));
    const puddleSet = new Set();
    
    for(const [c, r] of puddles) {
        puddleSet.add(`${r - 1}, ${c - 1}`);    
    }
    
    dp[0][0] = 1;
    
    for(let r = 1; r < n; r++) {
        dp[r][0] = puddleSet.has(`${r}, 0`) ? 0 : dp[r - 1][0];
    }
    
    for(let c = 1; c < m; c++) {
        dp[0][c] = puddleSet.has(`0, ${c}`) ? 0 : dp[0][c - 1];
    }
    
    for(let r = 1; r < n; r++) {
        for(let c = 1; c < m; c++) {
            if(puddleSet.has(`${r}, ${c}`)) {
                dp[r][c] = 0;
            } else {
                dp[r][c] = (dp[r - 1][c] + dp[r][c - 1]) % mod;
            }
        }
    }
    
    return dp[n - 1][m - 1];
}
