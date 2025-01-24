// 실행시간 : 0.049초, 메모리 : 7.96MB

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const N = Number(lines.shift());
  const map = lines.map((line) => line.split('').map(Number));

  let visited = Array.from({ length: N }, () => Array(N).fill(false));
  let answer = [];

  // 지도 밖
  const isMap = (x, y) => {
    if (x < 0 || y < 0 || x >= N || y >= N) return false;
    else return true;
  };

  // 블록 체크
  const check = (x, y) => {
    let queue = [[x, y]];
    visited[x][y] = true;

    let count = 1;

    while (queue.length) {
      let [nx, ny] = queue.shift();

      for (d of dir) {
        let [dx, dy] = [nx + d[0], ny + d[1]];

        if (!isMap(dx, dy) || visited[dx][dy]) continue;

        if (map[dx][dy] === 0) continue;

        queue.push([dx, dy]);
        visited[dx][dy] = true;
        count++;
      }
    }

    answer.push(count);
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j] || map[i][j] === 0) continue;
      check(i, j);
    }
  }

  answer.sort((a, b) => a - b);

  console.log(answer.length);
  answer.forEach((v) => console.log(v));

  process.exit(0);
});
