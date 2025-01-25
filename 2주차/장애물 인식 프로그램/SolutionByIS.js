const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let N = 0;
const map = [];
const blocks = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const checkBounds = (x, y) => {
  return x >= 0 && x < N && y >= 0 && y < N;
}

const calcTotal = (x, y) => {
  let Q = [];
  Q.push([x, y]);
  map[x][y] = 'V';
  let sum = 1;

  while(Q.length > 0) {
    const size = Q.length;

    for (let i = 0; i < size; i++) {
      const [x, y] = Q.shift();
      for (let d = 0; d < 4; d++) {
        const nx = x + dx[d];
        const ny = y + dy[d];
        if (checkBounds(nx, ny) && map[nx][ny] === '1') {
          Q.push([nx, ny]);
          map[nx][ny] = 'V';
          sum++;
        }
      }
    }
  }
  blocks.push(sum);
}

rl.on('line', (line) => {
  if (N === 0) {
    N = Number(line);
  } else {
    map.push(line.split(""));
  }
}).on('close', () => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === '1') {
        calcTotal(i, j);
      }
    }
  }

  // sort는 문자열 기준 정렬, 숫자 정렬 시 비교 함수 명시적으로 작성
  blocks.sort((a, b) => a - b);
  console.log(blocks.length);
  blocks.forEach((el) => {
    console.log(el);
  })
  process.exit(0);
})