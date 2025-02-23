function solution(n) {
    // n이 짝수일때와 홀수일때 반복해서 들어가는 이동 경로가 다름
    const even = [[1, 2], [2, 3], [3, 1]];
    const odd = [[1, 3], [3, 2], [2, 1]];
    
    const dp = Array.from({length: n + 1}, () => new Array());
    dp[1] = [[1, 3]];
    
    for(let i = 2; i <= n; i++) {
        // n일때 이동 횟수는 이전 n-1 횟수의 * 2 - 1번
        const seqLen = dp[i - 1].length * 2 + 1;
        
        for(let j = 0; j < seqLen; j++) {
            // j가 짝수 일때
            if(j % 2 === 0) {
                // n이 짝수이면
                if(i % 2 === 0) {
                    dp[i].push(even[j / 2 % 3]);
                // n이 홀수이면
                } else {
                    dp[i].push(odd[j / 2 % 3])
                }
            // j가 홀수이면 이전 배열의 경로를 가져옴
            } else {
                dp[i].push(dp[i - 1][(j - 1) / 2]);
            }
        }
    }
    
    return dp[n];
}
