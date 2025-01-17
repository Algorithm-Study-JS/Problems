function solution(n) {
    let answer = 0;
    
    const copyMap = (arr) => arr.map(row => [...row]);
    
    const check = (r, c, arr) => {
        // 가로 세로
        for(let i = 0; i < n; i++) {
            arr[r][i] = true;
            arr[i][c] = true;
        }
        
        // 왼쪽 상단 대각선
        let nr = r;
        let nc = c;
        while(nr >= 0 && nc >= 0) {
            arr[nr--][nc--] = true;
        }
        
        // 왼쪽 하단 대각선
        nr = r;
        nc = c;
        while(nr < n && nc >= 0) {
            arr[nr++][nc--] = true;
        }
        
        // 우측 상단 대각선
        nr = r;
        nc = c;
        while(nr >= 0 && nc < n) {
            arr[nr--][nc++] = true;
        }
        
        // 우측 하단 대각선
        nr = r;
        nc = c;
        while(nr < n && nc < n) {
            arr[nr++][nc++] = true;
        }
        
        return arr;
    }
    
    const dfs = (col, arr) => {
        // basecase
        if(col === n) {
            answer++;
            return;
        }
        
        // recursive
        for(let i = 0; i < n; i++) {
            // 불가능한 곳 패스
            if(arr[i][col]) continue;
            
            dfs(col + 1, check(i, col, copyMap(arr)));
        }
    }
    
    dfs(0, Array.from({length: n}, () => new Array(n).fill(false)));
    
    return answer;
}
