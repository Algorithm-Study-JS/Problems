function solution(maps) {
  const [n, m] = [maps.length, maps[0].length];
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let answer = -1;

  // 게임 맵 밖
  const isMap = (x, y) => {
    if (x < 0 || y < 0 || x >= n || y >= m) return false;
    else return true;
  };

  const bfs = () => {
    let queue = [];
    let visited = Array.from({ length: n }, () => new Array(m).fill(0));

    queue.push([0, 0]);
    visited[0][0] = 1;

    while (queue.length > 0) {
      let [nx, ny] = queue.shift();
      if (nx === n - 1 && ny === m - 1) {
        answer = visited[nx][ny];
        break;
      }

      for (let d of dir) {
        let [dx, dy] = [nx + d[0], ny + d[1]];

        if (!isMap(dx, dy) || visited[dx][dy] !== 0) continue;

        if (maps[dx][dy] === 1) {
          queue.push([dx, dy]);
          visited[dx][dy] = visited[nx][ny] + 1;
        }
      }
    }
  };

  bfs();

  return answer;
}
