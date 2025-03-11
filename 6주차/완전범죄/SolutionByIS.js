function solution(info, n, m) {
  let len = info.length; // 물건의 개수
  let visited = new Set();
  let result = Infinity; // A 도둑이 남긴 최소 흔적

  // 현재 인덱스 / 현재 A 도둑의 흔적 / 현재 B 도둑의 흔적
  function dfs(cur, a, b) {
    // 경찰에 붙잡히는 경우: return
    if (a >= n || b >= m) {
      return;
    }

    // 모든 물건을 탐색
    if (cur === len) {
      result = Math.min(result, a);
      return;
    }

    let state = `${cur}-${a}-${b}`;
    if (visited.has(state)) {
      return;
    }

    visited.add(state);

    dfs(cur + 1, a + info[cur][0], b); // A 도둑이 훔침
    dfs(cur + 1, a, b + info[cur][1]); // B 도둑이 훔침
  }

  dfs(0, 0, 0);
  return result === Infinity ? -1 : result;
}
