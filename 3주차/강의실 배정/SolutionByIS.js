const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N = 0;  // 강의 개수
let tables = [];

rl.on('line', (line) => {
  if (N === 0) {
    N = Number(line);
  } else {
    const [S, F] = line.split(' ').map(Number);
    tables.push([S, F]);
  }
}).on('close', () => {
  // 끝나는 순서대로 정렬
  tables.sort((a, b) => a[1] - b[1]);

  let ansCnt = 1;
  let now = tables[0][1];

  for (let i = 1; i < N; i++) {
    if (tables[i][0] >= now) {
      now = tables[i][1];
      ansCnt++;
    }
  }
  
  console.log(ansCnt);
});