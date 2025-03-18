function solution(storage, requests) {
  let answer = 0;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const [n, m] = [storage.length, storage[0].length];
  let map = storage.map((row) => [...row]);

  const checkBound = (x, y) => x >= 0 && y >= 0 && x < n && y < m;

  const checkBounds = (x, y) => {
    if (x === 0 || y === 0 || x === n - 1 || y === m - 1) return true;

    for (let d = 0; d < 4; d++) {
      const nx = x + dx[d],
        ny = y + dy[d];
      if (checkBound(nx, ny) && map[nx][ny] === 0) return true;
    }
    return false;
  };

  // 0으로 바꿔줄 때 -1 확인
  const changePath = (sx, sy) => {
    let Q = [[sx, sy]];
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    visited[sx][sy] = true;

    while (Q.length) {
      const [x, y] = Q.pop();
      for (let d = 0; d < 4; d++) {
        const nx = x + dx[d],
          ny = y + dy[d];
        if (checkBound(nx, ny) && !visited[nx][ny] && map[nx][ny] === -1) {
          map[nx][ny] = 0;
          visited[nx][ny] = true;
          Q.push([nx, ny]);
        }
      }
    }
  };

  // 지게차
  const operateForklift = (alph) => {
    const Q = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (map[i][j] === alph && checkBounds(i, j)) {
          Q.push([i, j]);
        }
      }
    }

    while (Q.length) {
      const [x, y] = Q.pop();
      map[x][y] = 0;
      changePath(x, y);
    }
  };

  // 크레인
  const operateCrane = (alph) => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (map[i][j] === alph) {
          map[i][j] = checkBounds(i, j) ? 0 : -1;
          if (map[i][j] === 0) changePath(i, j);
        }
      }
    }
  };

  for (const request of requests) {
    request.length >= 2 ? operateCrane(request[0]) : operateForklift(request);
  }

  return map.flat().reduce((acc, cell) => acc + (cell !== 0 && cell !== -1), 0);
}
