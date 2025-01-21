function solution(n) {
  let answer = 0;
  let queens = []; // 퀸 위치 저장 배열 (x, y)

  function possible(x, y) {
    for (let [a, b] of queens) {
      // 1) 해당 열 or 행에 이미 퀸이 있는 경우: 불가능
      if (a === x || b === y) return false;
      // 2) 대각선 상에 퀸이 있는 경우: 불가능
      if (Math.abs(a - x) === Math.abs(b - y)) return false;
    }
    return true;
  }

  function dfs(row) {
    if (row === n) {
      answer += 1;
    }
    for (let i = 0; i < n; i++) {
      if (!possible(row, i)) continue;
      queens.push([row, i]);
      dfs(row + 1);
      queens.pop();
    }
  }

  dfs(0);
  return answer;
}
