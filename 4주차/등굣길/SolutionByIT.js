function solution(m, n, puddles) {
    const MOD = 1000000007;
    
    const map = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    
    puddles.forEach(([x, y]) => {
        map[y][x] = -1;
    });

    map[1][1] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (map[i][j] === -1) {
                map[i][j] = 0;
            } else {
                if (i > 1) map[i][j] += map[i - 1][j];
                if (j > 1) map[i][j] += map[i][j - 1];
                map[i][j] %= MOD;
            }
        }
    }

    return map[n][m];
}
