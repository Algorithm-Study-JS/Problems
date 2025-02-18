function solution(m, n, puddles) {
  const mod = 1000000007;
  
  // 웅덩이 정보
  const puddleArr = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));
  for (const [x, y] of puddles) {
    puddleArr[y][x] = true;
  }
  
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  dp[1][1] = 1;
  
  for (let y = 1; y <= n; y++) {
    for (let x = 1; x <= m; x++) {
      if (puddleArr[y][x]) {
        dp[y][x] = 0; // 웅덩이면 0
        continue;
      }
      
      if (x === 1 && y === 1)
          continue;
      
      const fromLeft = x > 1 ? dp[y][x - 1] : 0;
      const fromUp = y > 1 ? dp[y - 1][x] : 0;
      dp[y][x] = (fromLeft + fromUp) % mod;
    }
  }
  
  return dp[n][m];
}

// 정확성  테스트
// 테스트 1 〉	통과 (0.13ms, 33.4MB)
// 테스트 2 〉	통과 (0.16ms, 33.4MB)
// 테스트 3 〉	통과 (0.30ms, 33.5MB)
// 테스트 4 〉	통과 (0.26ms, 33.5MB)
// 테스트 5 〉	통과 (0.31ms, 33.4MB)
// 테스트 6 〉	통과 (0.38ms, 33.5MB)
// 테스트 7 〉	통과 (0.37ms, 33.4MB)
// 테스트 8 〉	통과 (0.31ms, 33.4MB)
// 테스트 9 〉	통과 (0.37ms, 33.4MB)
// 테스트 10 〉	통과 (0.30ms, 33.4MB)

// 효율성  테스트
// 테스트 1 〉	통과 (1.06ms, 33.5MB)
// 테스트 2 〉	통과 (0.60ms, 33.5MB)
// 테스트 3 〉	통과 (0.72ms, 33.6MB)
// 테스트 4 〉	통과 (0.81ms, 33.6MB)
// 테스트 5 〉	통과 (0.78ms, 33.5MB)
// 테스트 6 〉	통과 (1.04ms, 33.5MB)
// 테스트 7 〉	통과 (0.62ms, 33.4MB)
// 테스트 8 〉	통과 (0.83ms, 33.5MB)
// 테스트 9 〉	통과 (0.91ms, 33.5MB)
// 테스트 10 〉	통과 (0.87ms, 33.5MB)