// 실행시간 : 2.798초, 메모리 : 149.45MB

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line.split(' ').map(Number));
}).on('close', () => {
  const N = lines.shift();
  let lessons = lines;
  let answer = 0;

  // 종료 시간 정렬(짧은게 앞에 오도록)
  lessons.sort((a, b) => {
    // 종료 시간이 같으면 시작 시간 정렬
    if (a[1] === b[1]) return a[0] - b[0];

    return a[1] - b[1];
  });

  let lastTime = 0;
  for (let i = 0; i < N; i++) {
    let [start, end] = lessons[i];

    if (start >= lastTime) {
      answer++;
      lastTime = end;
    }
  }

  console.log(answer);

  process.exit(0);
});
