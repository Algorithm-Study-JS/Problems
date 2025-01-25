// 실행시간 : 0.423초, 메모리 : 54.52MB

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on('line', (line) => {
  lines.push(line.split(' ').map(Number));
}).on('close', () => {
  const [N, K] = lines[0];
  const scores = lines[1];
  const sections = lines.slice(2);

  let sum = Array.from({ length: N }, () => 0);

  // 누적 합
  sum[0] = scores[0];
  for (let i = 1; i < N; i++) {
    sum[i] = sum[i - 1] + scores[i];
  }

  // 구간 합
  for ([a, b] of sections) {
    const num = b - a + 1;

    let answer = a === 1 ? sum[b - 1] / num : (sum[b - 1] - sum[a - 2]) / num;

    console.log(answer.toFixed(2));
  }

  process.exit(0);
});
