function solution(n, m, x, y, r, c, k) {

  // 사전순 (d: 하 > l: 좌 > r: 우 > u: 상)
  const di = ["d", "l", "r", "u"];
  const dx = [1, 0, 0, -1];  
  const dy = [0, -1, 1, 0];

  let answer = null;

  // 시작점과 도착점 사이 맨해튼 거리(최소 거리)
  const dist = Math.abs(x - r) + Math.abs(y - c);

  // 최소 거리보다 k가 작거나
  // k - 최소 거리 차가 홀수일 경우 불가능: 격자 왕복으로 해결할 수 없음
  if (dist > k || (k - dist) % 2 !== 0)
    return "impossible";

  function dfs(x, y, path) {
    // 이미 정답을 찾은 경우: return
    if (answer !== null) return;

    // 이동 횟수 === k인 경우: 경로 저장
    if (path.length === k) {
      if (x === r && y === c) {
        answer = path;
      }
      return;
    }

    // 현재 좌표에서 도착점까지의 최소 거리보다 남은 이동 횟수가 작은 경우: 도착 불가능 > return
    const currentDist = Math.abs(r - x) + Math.abs(c - y);
    if (k - path.length < currentDist)
      return;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 1 || nx > n || ny < 1 || ny > m)
        continue;

      dfs(nx, ny, path + di[i]);
    }
  }

  dfs(x, y, "");
  return answer === null ? "impossible" : answer;
}

// 정확성  테스트
// 테스트 1 〉	통과 (0.27ms, 33.5MB)
// 테스트 2 〉	통과 (0.26ms, 33.5MB)
// 테스트 3 〉	통과 (0.05ms, 33.4MB)
// 테스트 4 〉	통과 (0.31ms, 33.5MB)
// 테스트 5 〉	통과 (0.22ms, 33.4MB)
// 테스트 6 〉	통과 (0.20ms, 33.5MB)
// 테스트 7 〉	통과 (0.20ms, 33.4MB)
// 테스트 8 〉	통과 (0.19ms, 33.4MB)
// 테스트 9 〉	통과 (1.86ms, 36.8MB)
// 테스트 10 〉	통과 (1.92ms, 36.8MB)
// 테스트 11 〉	통과 (1.91ms, 37.1MB)
// 테스트 12 〉	통과 (1.82ms, 37.1MB)
// 테스트 13 〉	통과 (1.93ms, 37.1MB)
// 테스트 14 〉	통과 (1.86ms, 37.1MB)
// 테스트 15 〉	통과 (1.86ms, 37.1MB)
// 테스트 16 〉	통과 (1.88ms, 37.1MB)
// 테스트 17 〉	통과 (2.01ms, 37.1MB)
// 테스트 18 〉	통과 (1.90ms, 37.2MB)
// 테스트 19 〉	통과 (2.62ms, 37.1MB)
// 테스트 20 〉	통과 (2.02ms, 37.2MB)
// 테스트 21 〉	통과 (1.77ms, 37.1MB)
// 테스트 22 〉	통과 (234.83ms, 36.7MB)
// 테스트 23 〉	통과 (2.00ms, 37MB)
// 테스트 24 〉	통과 (1.91ms, 37.2MB)
// 테스트 25 〉	통과 (1.81ms, 37.1MB)
// 테스트 26 〉	통과 (1.82ms, 37.1MB)
// 테스트 27 〉	통과 (2.05ms, 37.1MB)
// 테스트 28 〉	통과 (1.88ms, 37.1MB)
// 테스트 29 〉	통과 (1.79ms, 37.1MB)
// 테스트 30 〉	통과 (1.81ms, 37.1MB)
// 테스트 31 〉	통과 (0.06ms, 33.6MB)