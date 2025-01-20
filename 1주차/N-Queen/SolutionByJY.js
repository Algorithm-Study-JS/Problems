function solution(n) {
  let answer = 0;
  let map = Array.from({ length: n }, () => 0);

  // 놓을 수 있는지 확인
  const check = (map, row) => {
    for (let i = 0; i < row; i++) {
      if (map[i] === map[row]) return false;
      if (Math.abs(map[row] - map[i]) === row - i) return false;
    }

    return true;
  };

  const solve = (map, row) => {
    if (row === n) {
      answer++;
      return;
    }

    // 퀸 놓기
    for (let i = 0; i < n; i++) {
      map[row] = i;
      if (!check(map, row)) continue;

      solve(map, row + 1);
    }
  };

  solve(map, 0);

  return answer;
}
